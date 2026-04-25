#!/usr/bin/env python3
"""
Generate per-product images via Gemini 2.5 Flash Image (`Nano Banana`).

Reads products.json, generates one image per product, saves to
public/products/{id}.webp, and updates products.json with the new path.

Idempotent: if an image already exists on disk, the product is skipped.

Usage:
    python3 scripts/gen_images.py            # full batch
    python3 scripts/gen_images.py --limit 5  # test on 5 products
    python3 scripts/gen_images.py --only id1,id2  # specific IDs only
"""
from __future__ import annotations
import os, sys, json, time, base64, argparse, re
from pathlib import Path
from io import BytesIO
from typing import Optional

# Load .env from ~/claudecode/.env
def _load_env(path: Path) -> None:
    if not path.exists():
        return
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

_load_env(Path.home() / "claudecode" / ".env")

API_KEY = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
if not API_KEY:
    print("ERROR: GEMINI_API_KEY not found in env or ~/claudecode/.env", file=sys.stderr)
    sys.exit(1)

from google import genai
from google.genai import types
from PIL import Image

PROJECT = Path(__file__).resolve().parent.parent
PRODUCTS_JSON = PROJECT / "src" / "products.json"
OUTPUT_DIR = PROJECT / "public" / "products"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

MODEL = "gemini-2.5-flash-image"  # Google's "Nano Banana" stable image gen

# Map our internal categories to natural-language style hints
CATEGORY_STYLE = {
    "fruits_vegetables": "fresh produce on white background, vibrant colors, water droplets",
    "dairy_eggs":        "dairy product on clean white background, refrigerated supermarket style",
    "meat_poultry":      "raw meat product on butcher paper, clean studio lighting",
    "rice_grains":       "packaged grain product on white background, supermarket catalog style",
    "spices_masala":     "packaged spice or masala on clean background, retail product photography",
    "beverages":         "bottle or can of drink on white background, condensation, refreshing look",
    "snacks":            "snack package on white background, retail product photo",
    "household":         "household product on white background, retail catalog style",
    "frozen":            "frozen food product on white background, slight ice crystal effect",
    "bakery":            "freshly baked product on white background, warm tones",
}

def build_prompt(product: dict) -> str:
    name = product["name"]
    cat = product.get("category", "household")
    style = CATEGORY_STYLE.get(cat, CATEGORY_STYLE["household"])
    return (
        f'Studio product photography of "{name}". {style}. '
        f"Square 1:1 composition, centered, sharp focus, photorealistic, "
        f"appetizing/clean style, soft natural daylight, no text overlays, "
        f"no watermarks, no logos other than what naturally appears on the product packaging. "
        f"Single product clearly visible, professional supermarket catalog aesthetic."
    )

def safe_filename(product_id: str) -> str:
    return re.sub(r"[^a-zA-Z0-9_-]", "_", product_id) + ".webp"

def generate_one(client, product: dict) -> str | None:
    """Generate one image. Returns the relative web path on success, None on failure."""
    fname = safe_filename(product["id"])
    out_path = OUTPUT_DIR / fname
    web_path = f"/products/{fname}"

    if out_path.exists() and out_path.stat().st_size > 1000:
        return web_path  # already done

    prompt = build_prompt(product)
    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE"],
            ),
        )
    except Exception as e:
        print(f"  ✗ API error: {e}", file=sys.stderr)
        return None

    # Walk response parts to find inline image data
    image_bytes = None
    if response.candidates:
        for part in response.candidates[0].content.parts or []:
            if getattr(part, "inline_data", None) and part.inline_data.data:
                image_bytes = part.inline_data.data
                break
    if not image_bytes:
        print(f"  ✗ No image in response", file=sys.stderr)
        return None

    # Convert (Gemini returns PNG; we save as WebP for size)
    try:
        img = Image.open(BytesIO(image_bytes))
        # Resize if larger than 800x800 to save space
        if img.width > 800 or img.height > 800:
            img.thumbnail((800, 800), Image.LANCZOS)
        img.save(out_path, "WEBP", quality=85, method=6)
    except Exception as e:
        print(f"  ✗ Image save error: {e}", file=sys.stderr)
        return None

    return web_path

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0, help="Only process first N products")
    ap.add_argument("--only", type=str, default="", help="Comma-separated product IDs")
    ap.add_argument("--throttle", type=float, default=0.5, help="Sleep seconds between requests")
    args = ap.parse_args()

    products = json.loads(PRODUCTS_JSON.read_text())
    if args.only:
        wanted = set(args.only.split(","))
        targets = [p for p in products if p["id"] in wanted]
    else:
        targets = products[:args.limit] if args.limit > 0 else products

    print(f"Generating images for {len(targets)} products → {OUTPUT_DIR}")
    print(f"Model: {MODEL}")

    client = genai.Client(api_key=API_KEY)

    success = fail = skipped = 0
    for i, p in enumerate(targets, start=1):
        fname = safe_filename(p["id"])
        if (OUTPUT_DIR / fname).exists() and (OUTPUT_DIR / fname).stat().st_size > 1000:
            # Already on disk; just make sure JSON points to it
            web = f"/products/{fname}"
            for orig in products:
                if orig["id"] == p["id"]:
                    orig["image_url"] = web
                    break
            skipped += 1
            continue

        print(f"[{i}/{len(targets)}] {p['name'][:50]:50s} ({p.get('category','?')[:18]:18s})", end=" ")
        web = generate_one(client, p)
        if web:
            # Update the master products.json in place
            for orig in products:
                if orig["id"] == p["id"]:
                    orig["image_url"] = web
                    break
            success += 1
            print("✓")
        else:
            fail += 1
            print("✗")

        # Persist progress every 25 successful generations (so partial runs aren't lost)
        if success and success % 25 == 0:
            PRODUCTS_JSON.write_text(json.dumps(products, indent=2, ensure_ascii=False))

        time.sleep(args.throttle)

    PRODUCTS_JSON.write_text(json.dumps(products, indent=2, ensure_ascii=False))

    print(f"\nDone — generated: {success}, skipped (already done): {skipped}, failed: {fail}")
    print(f"Total images in {OUTPUT_DIR}: {len(list(OUTPUT_DIR.glob('*.webp')))}")

if __name__ == "__main__":
    main()
