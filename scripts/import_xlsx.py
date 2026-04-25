#!/usr/bin/env python3
"""
Import products from an Odoo product.template export (.xlsx) into the
Waduha web app's products.json — deduping against existing items by name.

Usage:
    python3 scripts/import_xlsx.py /path/to/file.xlsx
"""
import json, sys, re, hashlib
from pathlib import Path
import openpyxl

PROJECT = Path(__file__).resolve().parent.parent
PRODUCTS_JSON = PROJECT / "src" / "products.json"

# ---- Category classifier (keyword → category) ------------------------------
# Order matters: first match wins.
CATEGORY_RULES = [
    # Most-specific first
    ("frozen",            r"\b(frozen|ice\s*cream|kulfi|popsicle|gelato)\b"),
    ("bakery",            r"\b(bread|bun|cake|pastry|donut|croissant|rusk|bakery|biscuit\s*cake|samboosa)\b"),
    ("dairy_eggs",        r"\b(milk|cheese|paneer|butter|ghee|yogh?urt|labne[h]?|cream|egg|laban|dahi)\b"),
    ("meat_poultry",      r"\b(chicken|meat|beef|mutton|lamb|fish|prawn|shrimp|tuna|sardine|mackerel|salmon|hen)\b"),
    ("rice_grains",       r"\b(rice|basmati|atta|flour|maida|wheat|sooji|rava|semolina|dal|chana|moong|toor|masoor|urad|grain|barley|oats|millet|bajra|jowar|ragi|quinoa|noodle|pasta|vermicelli|sevai|poha|cornflake|cereal|chapati|paratha|roti|tortilla)\b"),
    ("spices_masala",     r"\b(masala|spice|powder|mirch|chili|chilli|haldi|turmeric|garam|jeera|cumin|coriander|dhania|elaichi|cardamom|clove|laung|black\s*pepper|kali\s*mirch|salt|namak|saunf|fennel|methi|fenugreek|hing|asafoetida|achar|pickle|sambar|biryani|chaat|tandoori|curry|paste|sauce|ketchup|vinegar|mayonnaise|soy|honey|jam|spread|nutella|chutney|tamarind|imli)\b"),
    ("beverages",         r"\b(juice|water|soda|cola|drink|tea|coffee|cappuccino|nestle|tang|rooh|sherbet|sharbat|lassi|yoghurt\s*drink|energy\s*drink|red\s*bull|pepsi|fanta|7up|sprite|mountain\s*dew|mirinda|nestea|liptopn|lipton|nescafe|milo|horlicks|complan|bournvita|protein|shake|smoothie|laban\s*up|laban\s*tab)\b"),
    ("snacks",            r"\b(chips|crisps|biscuit|cookie|chocolate|candy|snack|wafer|popcorn|namkeen|bhujia|sev|mixture|kurkure|cheetos|lays|doritos|pringles|oreo|kitkat|mars|snickers|galaxy|toblerone|gum|chewing|toffee|caramel|nuts|almond|cashew|pista|raisin|kismis|date|khajoor|halwa|laddoo|sweet|dessert|pudding|jelly|gummy)\b"),
    ("household",         r"\b(soap|detergent|wash|cleaner|tissue|spray|freshener|toilet|napkin|toothpaste|toothbrush|shampoo|conditioner|hair|body|lotion|cream|moisturizer|deodorant|perfume|sanitiser|sanitizer|wipes|broom|mop|bucket|brush|cup|plate|fork|spoon|knife|container|bag|foil|aluminium|aluminum|polythene|cling|matchbox|candle|battery|lightbulb|tube\s*light|insecticide|repellent|mosquito|cockroach|rat|mouse|disinfectant|bleach|surf|tide|ariel|persil|comfort|harpic|domex|finish|vim|fairy|dawn|colgate|sensodyne|pepsodent|close\s*up|head\s*&\s*shoulders|pantene|sunsilk|dove|lifebuoy|lux|safeguard|nivea|olay|fair\s*&\s*lovely|fair\s*and\s*lovely|garnier|lakme|himalaya|elegant|comb|razor|shaver|face|talcum|talc|powder\s*for|deo|antiperspirant|aftershave|gel|hair\s*oil|amla|vatika|parachute|coconut\s*oil)\b"),
    ("fruits_vegetables", r"\b(apple|tomato|potato|onion|vegetable|lemon|banana|orange|mango|grape|pineapple|watermelon|melon|cucumber|carrot|cabbage|cauliflower|broccoli|spinach|lettuce|salad|herb|mint|coriander\s*leaves|garlic|ginger|chili|pepper\s*\(green\)|capsicum|brinjal|eggplant|okra|bhindi|ladyfinger|pumpkin|gourd|drumstick|fruit|veg|fresh)\b"),
]

DEFAULT_CATEGORY = "household"  # safe fallback

VALID_CATEGORIES = {
    "fruits_vegetables", "dairy_eggs", "meat_poultry", "rice_grains",
    "spices_masala", "beverages", "snacks", "household", "frozen", "bakery",
}

def classify(name: str) -> str:
    n = name.lower()
    for cat, pattern in CATEGORY_RULES:
        if re.search(pattern, n):
            return cat
    return DEFAULT_CATEGORY

def slug_id(name: str) -> str:
    """Stable ID derived from the name (so re-imports don't duplicate)."""
    h = hashlib.sha1(name.lower().strip().encode()).hexdigest()[:18]
    return f"xlsx_{h}"

def clean_name(raw: str) -> str:
    if raw is None:
        return ""
    s = str(raw).strip()
    s = re.sub(r"\s+", " ", s)
    # Title-case but preserve all-caps brand names if they're short
    if s and s[0].islower():
        s = s[0].upper() + s[1:]
    return s

def main(xlsx_path: str):
    # 1. Load existing products
    existing = json.loads(PRODUCTS_JSON.read_text())
    existing_names = {p["name"].lower().strip() for p in existing if p.get("name")}
    print(f"Existing: {len(existing)} products, {len(existing_names)} unique names")

    # 2. Read xlsx
    wb = openpyxl.load_workbook(xlsx_path, data_only=True)
    ws = wb.active
    rows = list(ws.iter_rows(values_only=True))
    headers = [str(c).strip() if c else "" for c in rows[0]]
    print(f"Excel: {len(rows)-1} rows, columns: {headers}")

    name_idx  = headers.index("Name")
    price_idx = headers.index("Sales Price")
    cost_idx  = headers.index("Cost") if "Cost" in headers else None
    unit_idx  = headers.index("Unit of Measure") if "Unit of Measure" in headers else None
    qty_idx   = headers.index("Quantity On Hand") if "Quantity On Hand" in headers else None

    # 3. Walk rows, dedupe, classify
    new_products = []
    skipped_dup = 0
    skipped_invalid = 0
    seen_in_xlsx = set()
    cat_counts = {}

    for i, row in enumerate(rows[1:], start=2):
        raw_name = row[name_idx]
        name = clean_name(raw_name)
        if not name or len(name) < 2:
            skipped_invalid += 1
            continue
        key = name.lower().strip()
        if key in existing_names or key in seen_in_xlsx:
            skipped_dup += 1
            continue
        seen_in_xlsx.add(key)

        try:
            price = float(row[price_idx]) if row[price_idx] is not None else 0.0
        except (TypeError, ValueError):
            price = 0.0
        if price <= 0:
            skipped_invalid += 1
            continue

        unit = str(row[unit_idx]).strip() if unit_idx is not None and row[unit_idx] else "Units"
        try:
            qty = float(row[qty_idx]) if qty_idx is not None and row[qty_idx] is not None else 0
        except (TypeError, ValueError):
            qty = 0

        category = classify(name)
        cat_counts[category] = cat_counts.get(category, 0) + 1

        new_products.append({
            "id": slug_id(name),
            "name": name,
            "name_ar": None,
            "description": None,
            "price": round(price, 2),
            "compare_price": None,
            "category": category,
            "image_url": None,
            "unit": unit,
            "in_stock": True,                   # default true; we don't track real-time stock
            "is_trending": False,
            "is_featured": False,
            "badge": None,
            "sort_order": 0,
        })

    print(f"\nNew products: {len(new_products)}")
    print(f"Skipped (duplicate of existing or earlier in xlsx): {skipped_dup}")
    print(f"Skipped (invalid name/price): {skipped_invalid}")
    print(f"\nCategory distribution of imported products:")
    for cat in sorted(cat_counts, key=lambda c: -cat_counts[c]):
        print(f"  {cat:<22} {cat_counts[cat]}")

    # 4. Merge & write
    merged = existing + new_products
    PRODUCTS_JSON.write_text(json.dumps(merged, indent=2, ensure_ascii=False))
    print(f"\nWrote {len(merged)} products → {PRODUCTS_JSON}")

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "/Users/fahadmustafa/claudecode/Product (product.template) (14).xlsx")
