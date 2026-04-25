#!/usr/bin/env python3
"""
Phase A enhancement (free, no API):
1. Clean product names — Title Case + brand recognition + typo fixes
2. Add category-aware template descriptions
3. Assign category- and sub-type-aware Unsplash images

Idempotent: safe to re-run.
"""
import json, re, hashlib
from pathlib import Path

PROJECT = Path(__file__).resolve().parent.parent
PRODUCTS_JSON = PROJECT / "src" / "products.json"

# ─── 1. NAME CLEANUP ──────────────────────────────────────────────────────
# Brand names that should keep specific casing (lowercase keys, value = display)
BRANDS = {
    "kitkat": "KitKat", "nescafe": "Nescafé", "nestea": "Nestea",
    "pepsi": "Pepsi", "coca-cola": "Coca-Cola", "coca cola": "Coca-Cola",
    "nestle": "Nestlé", "knorr": "Knorr", "maggi": "Maggi", "lipton": "Lipton",
    "nido": "NIDO", "almarai": "Almarai", "rainbow": "Rainbow",
    "philadelphia": "Philadelphia", "kraft": "Kraft", "puck": "Puck",
    "kelloggs": "Kellogg's", "kellogg's": "Kellogg's", "quaker": "Quaker",
    "lays": "Lay's", "lay's": "Lay's", "doritos": "Doritos", "cheetos": "Cheetos",
    "pringles": "Pringles", "oreo": "Oreo", "cadbury": "Cadbury",
    "mars": "Mars", "snickers": "Snickers", "twix": "Twix", "bounty": "Bounty",
    "milky way": "Milky Way", "galaxy": "Galaxy", "ferrero": "Ferrero",
    "rocher": "Rocher", "toblerone": "Toblerone",
    "dove": "Dove", "nivea": "Nivea", "olay": "Olay", "garnier": "Garnier",
    "loreal": "L'Oréal", "l'oreal": "L'Oréal", "pantene": "Pantene",
    "head & shoulders": "Head & Shoulders", "sunsilk": "Sunsilk",
    "dabur": "Dabur", "himalaya": "Himalaya", "vatika": "Vatika",
    "parachute": "Parachute", "amla": "Amla", "vaseline": "Vaseline",
    "colgate": "Colgate", "oral-b": "Oral-B", "pepsodent": "Pepsodent",
    "close up": "Close Up", "sensodyne": "Sensodyne",
    "gillette": "Gillette", "wilkinson": "Wilkinson",
    "harpic": "Harpic", "domex": "Domex", "vim": "Vim",
    "ariel": "Ariel", "tide": "Tide", "persil": "Persil", "comfort": "Comfort",
    "surf": "Surf", "finish": "Finish", "fairy": "Fairy", "dawn": "Dawn",
    "lifebuoy": "Lifebuoy", "lux": "Lux", "safeguard": "Safeguard",
    "tang": "Tang", "rooh afza": "Rooh Afza", "rooh-afza": "Rooh Afza",
    "milo": "Milo", "horlicks": "Horlicks", "complan": "Complan",
    "bournvita": "Bournvita", "ovaltine": "Ovaltine",
    "red bull": "Red Bull", "fanta": "Fanta", "sprite": "Sprite",
    "7up": "7Up", "mirinda": "Mirinda", "mountain dew": "Mountain Dew",
    "rani": "Rani", "barbican": "Barbican",
    "tropicana": "Tropicana", "minute maid": "Minute Maid",
    "del monte": "Del Monte", "dole": "Dole",
    "huggies": "Huggies", "pampers": "Pampers",
    "johnson": "Johnson's", "johnsons": "Johnson's", "johnson's": "Johnson's",
    "fair & lovely": "Fair & Lovely", "fair and lovely": "Fair & Lovely",
    "fair & handsome": "Fair & Handsome",
    "lakme": "Lakmé", "maybelline": "Maybelline", "revlon": "Revlon",
    "vatika": "Vatika", "tresemme": "TRESemmé",
    "dettol": "Dettol", "savlon": "Savlon",
    "indomie": "Indomie", "maggi": "Maggi",
    "haldiram": "Haldiram's", "haldirams": "Haldiram's", "haldiram's": "Haldiram's",
    "mtr": "MTR", "mdh": "MDH", "everest": "Everest", "shan": "Shan",
    "national": "National", "achi": "Achi", "laziza": "Laziza",
    "rafhan": "Rafhan", "tarrar": "Tarrar",
    "milkpak": "Milkpak", "nurpur": "Nurpur",
    "tetley": "Tetley", "tapal": "Tapal",
    "vimto": "Vimto", "shezan": "Shezan", "frooto": "Frooto", "frooti": "Frooti",
    "elegant": "Elegant",  # for "elegant hair care"
}

# Common typos / OCR errors (lowercase patterns → corrections)
TYPOS = {
    r"\bcale\b": "care",         # "hair cale" → "hair care"
    r"\bbisuit\b": "biscuit",
    r"\bcolar\b": "color",
    r"\bsiver\b": "silver",
    r"\bcontaienr\b": "container",
    r"\bdiposable\b": "disposable",
    r"\baluminim\b": "aluminium",
    r"\bvinger\b": "vinegar",
    r"\bavocados\b": "avocado",  # let title case handle plurals separately
    r"\bcheez\b": "cheese",
    r"\bbisquit\b": "biscuit",
}

# Words that should always be uppercase
KEEP_UPPER = {"ml", "l", "kg", "mg", "lb", "oz", "pcs", "pc",
              "uae", "ksa", "usa", "uk", "tv", "cd", "dvd", "led", "lcd",
              "uht", "atm", "cnc", "pvc", "abs", "abs",
              "usb", "gb", "mb", "tb", "hd", "sd", "ssd", "ram", "rom",
              "hdmi", "vga", "dvi", "ac", "dc", "rgb", "uv", "ir",
              "bbq", "diy", "fm", "am", "gps", "rfid"}

# Words that should always be lowercase (unless first word)
KEEP_LOWER = {"and", "or", "of", "with", "for", "the", "in", "on", "at",
              "by", "to", "a", "an"}

def title_case_token(word: str) -> str:
    """Title-case a single token, handling parentheses, hyphens, slashes,
    and common abbreviations."""
    # Strip & remember leading/trailing punctuation
    lead, core, trail = "", word, ""
    while core and core[0] in "([{\"'":
        lead += core[0]; core = core[1:]
    while core and core[-1] in ")]}\"',.;:!?":
        trail = core[-1] + trail; core = core[:-1]
    if not core:
        return word
    low = core.lower()
    if low in KEEP_UPPER:
        out = core.upper()
    elif "-" in core:
        out = "-".join(p.capitalize() if p.lower() not in KEEP_UPPER else p.upper() for p in core.split("-"))
    elif "/" in core:
        out = "/".join(p.capitalize() if p.lower() not in KEEP_UPPER else p.upper() for p in core.split("/"))
    elif core[0].isdigit():
        # "270g", "8g", "9w" → keep digits, lowercase suffix; but "16gb" → "16GB"
        m = re.match(r"^(\d+)([A-Za-z]+)$", core)
        if m:
            num, suf = m.group(1), m.group(2)
            if suf.lower() in KEEP_UPPER:
                out = num + suf.upper()
            else:
                out = num + suf.lower()
        else:
            out = core
    else:
        out = core.capitalize()
    return lead + out + trail

def clean_name(raw: str) -> str:
    if not raw:
        return ""
    s = str(raw).strip()
    if not s:
        return s
    s = re.sub(r"\s+", " ", s)              # collapse whitespace
    s = s.lower()                            # normalize for typo + brand matching

    # Apply typos (do this BEFORE Title Case)
    for pat, sub in TYPOS.items():
        s = re.sub(pat, sub, s)

    # Apply known brand replacements (longest first to avoid sub-matches)
    for brand_key in sorted(BRANDS.keys(), key=len, reverse=True):
        s = re.sub(rf"\b{re.escape(brand_key)}\b", f"§§{brand_key}§§", s)

    # Title-case everything else, then put brands back with proper casing.
    # A token may contain a brand marker like "§§haldiram§§'s" (brand + suffix).
    parts = []
    brand_token = re.compile(r"§§([^§]+)§§")
    for word in s.split():
        if "§§" in word:
            # Replace each brand marker in the token with its proper-cased value;
            # title-case any suffix/prefix text around it.
            def repl(m):
                key = m.group(1)
                return BRANDS.get(key, key.title())
            replaced = brand_token.sub(repl, word)
            parts.append(replaced)
        elif word.lower() in KEEP_LOWER and parts:  # not first word
            parts.append(word.lower())
        else:
            parts.append(title_case_token(word))

    cleaned = " ".join(parts)
    # First word always capitalized
    if cleaned and cleaned[0].islower():
        cleaned = cleaned[0].upper() + cleaned[1:]
    # Restore brand markers that might have leaked through
    cleaned = re.sub(r"§§(\w[\w\s&'.\-]*?)§§", lambda m: BRANDS.get(m.group(1), m.group(1).title()), cleaned)
    return cleaned

# ─── 1b. RE-CLASSIFY (better regex with plural support) ──────────────────
# Stronger than the import classifier — handles plurals + more keywords.
RECLASSIFY_RULES = [
    ("frozen",            r"\b(frozen|ice\s*creams?|kulfis?|popsicles?|gelatos?)\b"),
    ("bakery",            r"\b(breads?|buns?|cakes?|pastr(?:y|ies)|donuts?|croissants?|rusks?|samboosa|samosa|toast|paratha|naan)\b"),
    ("dairy_eggs",        r"\b(milk|cheese|paneer|butter|ghee|yog?h?urts?|labne[h]?|creams?|eggs?|laban|dahi|curd)\b"),
    # Rice/grains/noodles BEFORE meat — so "Chicken Flavoured Noodles" → rice_grains
    ("rice_grains",       r"\b(rice|basmati|atta|flour|maida|wheat|sooji|rava|semolina|dal|chana|moong|toor|masoor|urad|grains?|barley|oats?|millets?|bajra|jowar|ragi|quinoa|noodles?|pasta|vermicelli|sevai|poha|cornflakes?|cereals?|chapatis?|rotis?|tortillas?|spaghetti|macaroni|ramen|mie)\b"),
    ("meat_poultry",      r"\b(chicken|meats?|beef|mutton|lamb|fish|prawns?|shrimps?|tuna|sardines?|mackerel|salmon|hen)\b"),
    # Cooking pantry — oils, honey, sauces, spices. NOTE: honey/oil also match
    # in compound words (e.g. "naturalhoney") to catch concatenated names.
    ("spices_masala",     r"(?:\b(masalas?|spices?|powders?|mirch|chil[il]i?|haldi|turmeric|garam|jeera|cumin|coriander|dhania|elaichi|cardamom|cloves?|laung|black\s*pepper|kali\s*mirch|salt|namak|saunf|fennel|methi|fenugreek|hing|asafoetida|achar|pickles?|sambar|biryani|chaat|tandoori|currys?|pastes?|sauces?|ketchups?|vinegars?|mayonnaises?|soy|jams?|spreads?|nutella|chutneys?|tamarind|imli|sugar|sweetener|isabgol|isapgol|psyllium|olive|sunflower|canola|sesame\s*oil)\b)|(honeys?|oils?)"),
    ("beverages",         r"\b(juices?|waters?|sodas?|colas?|drinks?|teas?|coffees?|cappuccinos?|tang|rooh|sherbets?|sharbats?|lassis?|laban\s*up|laban\s*tab|energy\s*drinks?|red\s*bull|pepsi|fanta|7up|sprite|mountain\s*dew|mirinda|nestea|lipton|nescafe|nescafé|milo|horlicks|complan|bournvita|protein|shakes?|smoothies?|barbican|vimto|frooti|frooto|tropicana|minute\s*maid|del\s*monte|dole)\b"),
    ("snacks",            r"\b(chips?|crisps?|biscuits?|cookies?|chocolates?|candys?|candies|snacks?|wafers?|popcorns?|namkeen|bhujia|sevs?|mixtures?|kurkure|cheetos|lays|lay's|doritos|pringles|oreos?|kitkat|mars|snickers|galaxy|toblerone|gums?|chewing|toffees?|caramels?|nuts?|almonds?|cashews?|pistas?|pistachios?|raisins?|kismis|dates?|khajoor|halwas?|laddoos?|sweets?|desserts?|puddings?|jellys?|jellies|gummys?|gummies|haldiram)\b"),
    # Household — broad utility / personal care / home
    ("household",         r"\b(soaps?|detergents?|washes?|cleaners?|tissues?|sprays?|fresheners?|toilets?|napkins?|toothpastes?|toothbrushes?|shampoos?|conditioners?|hair|body|lotions?|moisturiz|moisturis|deodorants?|perfumes?|sanitiser|sanitizer|wipes?|brooms?|mops?|buckets?|brushes?|cups?|plates?|forks?|spoons?|knives?|knife|containers?|bags?|foils?|aluminium|aluminum|polythene|cling|matchbox|match|candles?|lighters?|batteries|battery|bulbs?|tube\s*lights?|insecticides?|repellents?|mosquito|cockroach|rats?|mouse|disinfectants?|bleach|surf|tide|ariel|persil|comfort|harpic|domex|finish|vim|fairy|dawn|colgate|sensodyne|pepsodent|close\s*up|head\s*&\s*shoulders|pantene|sunsilk|dove|lifebuoy|lux|safeguard|nivea|olay|fair\s*&\s*lovely|fair\s*and\s*lovely|garnier|lakme|himalaya|elegant|combs?|razors?|shavers?|faces?|talcum|talc|deos?|antiperspirants?|aftershaves?|gels?|hair\s*oils?|amla|vatika|parachute|coconut\s*oil|isagol|gillette|wilkinson|dettol|savlon|huggies|pampers|diapers?|baby\s*wipes?|johnsons?|johnson's|surma|kohl|incense|sambrani|loban|clip|hanger|basket|wire|tape|rope|stapler|exercise\s*book|notebook|pen|pencil|eraser|sharpener)\b"),
    ("fruits_vegetables", r"\b(apples?|tomato(?:es)?|potato(?:es)?|onions?|vegetables?|lemons?|bananas?|oranges?|mangoe?s?|grapes?|pineapples?|watermelons?|melons?|cucumbers?|carrots?|cabbages?|cauliflowers?|broccolis?|spinach|lettuce|salads?|herbs?|mints?|garlics?|gingers?|bell\s*peppers?|capsicums?|brinjals?|eggplants?|okra|bhindi|ladyfingers?|pumpkins?|gourds?|drumsticks?|fruits?|veg|fresh\s*produce|berries|berry)\b"),
]

def reclassify(name: str, current: str) -> str:
    n = name.lower()
    for cat, pattern in RECLASSIFY_RULES:
        if re.search(pattern, n):
            return cat
    return current  # keep original if nothing matches

# ─── 2. DESCRIPTIONS (template) ───────────────────────────────────────────
DESCRIPTIONS = {
    "fruits_vegetables": [
        "Fresh, locally-sourced {name}. Hand-picked for the best quality and flavor.",
        "Crisp and farm-fresh {name}, delivered the day you order.",
        "Premium {name} — bursting with natural flavor and goodness.",
    ],
    "dairy_eggs": [
        "Fresh and creamy {name}. A daily kitchen essential.",
        "Premium quality {name}, kept cool from store to door.",
        "{name} — sourced from trusted farms for everyday goodness.",
    ],
    "meat_poultry": [
        "Premium {name}, freshly cut and packed for ultimate freshness.",
        "Quality {name} for your home cooking — tender and flavorful.",
        "Hand-selected {name}, ready for your kitchen.",
    ],
    "rice_grains": [
        "{name} — premium quality grains, perfect for any kitchen.",
        "Authentic {name}, the staple base for hundreds of recipes.",
        "Long-shelf-life {name} — a pantry must-have.",
    ],
    "spices_masala": [
        "Premium {name}. Bring authentic, restaurant-style flavor home.",
        "Aromatic {name} — the secret to flavorful, traditional cooking.",
        "{name} — a kitchen staple for rich, layered dishes.",
    ],
    "beverages": [
        "Refreshing {name}. Chilled and ready to serve.",
        "{name} — your everyday hydration and refreshment.",
        "Crisp, refreshing {name} for any time of day.",
    ],
    "snacks": [
        "{name} — the perfect on-the-go snack for any moment.",
        "Crispy, delicious {name}. Great for sharing or solo enjoyment.",
        "Tasty {name} — a satisfying snack for the whole family.",
    ],
    "household": [
        "{name} — quality you can trust for your home.",
        "Reliable {name} for daily household needs. Effective and dependable.",
        "{name} — a household essential, always good to have on hand.",
    ],
    "frozen": [
        "Conveniently frozen {name}, ready when you are.",
        "{name} — quick to prepare, always fresh, always tasty.",
        "Easy-to-store {name} for fast meals and snacks.",
    ],
    "bakery": [
        "Freshly baked {name}, soft and delicious.",
        "{name} — a wholesome, bakery-fresh favorite.",
        "Warm, fluffy {name} — perfect with any meal.",
    ],
}

def description_for(name: str, category: str) -> str:
    bank = DESCRIPTIONS.get(category, DESCRIPTIONS["household"])
    # Deterministic: pick template from name hash
    h = int(hashlib.md5(name.lower().encode()).hexdigest(), 16) % len(bank)
    return bank[h].format(name=name)

# ─── 3. IMAGE URLS (Unsplash, category + sub-type aware) ──────────────────
# Curated Unsplash photo IDs (long-stable, food/product photography).
# Format: https://images.unsplash.com/{photo_id}?auto=format&fit=crop&w=400&h=400&q=80
def unsplash(photo_id: str) -> str:
    return f"https://images.unsplash.com/{photo_id}?auto=format&fit=crop&w=400&h=400&q=80"

# Sub-type detection rules (pattern → image)
# Order matters; first match wins.
IMAGE_RULES = [
    # Beverages
    (r"\b(coffee|nescafe|cappuccino|nescafé)\b",     unsplash("photo-1495474472287-4d71bcdd2085")),  # coffee beans
    (r"\b(tea|lipton|tetley|tapal|chai)\b",           unsplash("photo-1597318236014-9c0a1f2e7acf")),  # tea cup
    (r"\b(juice|tropicana|frooti|frooto|nectar)\b",   unsplash("photo-1622597467836-f3e6707e1191")),  # juice
    (r"\b(water|aquafina|nestlé\s*pure|nestle\s*pure|mineral)\b",   unsplash("photo-1548839140-29a749e7b8eb")),  # water bottle
    (r"\b(soda|cola|pepsi|coca|fanta|sprite|7up|mirinda|mountain\s*dew|red\s*bull)\b", unsplash("photo-1554866585-cd94860890b7")),  # soda cans
    (r"\b(milk|laban|nido|milkpak)\b",                unsplash("photo-1550583724-b2692b85b150")),  # milk bottle
    # Dairy
    (r"\b(cheese|paneer|philadelphia|kraft)\b",       unsplash("photo-1486297678162-eb2a19b0a32d")),  # cheese
    (r"\b(butter|ghee)\b",                            unsplash("photo-1589985270826-4b7bb135bc9d")),  # butter
    (r"\b(yog?h?urt|yog|dahi)\b",                     unsplash("photo-1571212515416-fef01fc43637")),  # yogurt
    (r"\b(egg|eggs)\b",                               unsplash("photo-1582722872445-44dc5f7e3c8f")),  # eggs
    # Meat
    (r"\b(chicken|hen|poultry)\b",                    unsplash("photo-1587593810167-a84920ea0781")),  # chicken
    (r"\b(beef|mutton|lamb|meat)\b",                  unsplash("photo-1607623814075-e51df1bdc82f")),  # red meat
    (r"\b(fish|tuna|sardine|prawn|shrimp|salmon|mackerel)\b", unsplash("photo-1535473895227-bdecb20fb157")),  # fish
    # Grains
    (r"\b(rice|basmati)\b",                           unsplash("photo-1586201375761-83865001e31c")),  # rice
    (r"\b(atta|flour|maida|wheat)\b",                 unsplash("photo-1574323347407-f5e1ad6d020b")),  # flour
    (r"\b(noodle|pasta|vermicelli|sevai|indomie|maggi)\b", unsplash("photo-1551892374-ecf8754cf8b0")),  # noodles
    (r"\b(dal|lentil|chickpea|chana|moong|toor|masoor|urad|bean|kidney)\b", unsplash("photo-1604857261428-fb56e7e4c3e6")),  # lentils
    (r"\b(oat|cornflake|cereal|muesli|granola|kellogg)\b", unsplash("photo-1517593456564-83e5ba6826ae")),  # cereal
    # Spices & condiments
    (r"\b(masala|spice|powder|mirch|chili|chilli|haldi|turmeric|garam|jeera|cumin|coriander|dhania|cardamom|elaichi|clove|laung|black\s*pepper|kali\s*mirch|saunf|fennel|methi|fenugreek)\b", unsplash("photo-1596040033229-a9821ebd058d")),  # spices
    (r"\b(salt|namak|sugar|sweetener)\b",             unsplash("photo-1594492871048-7c1c8a45b78c")),  # salt/sugar
    (r"\b(ketchup|mayo|mayonnaise|sauce|dressing|mustard|chutney|achar|pickle)\b", unsplash("photo-1620830103381-87c30716f02d")),  # sauce bottle
    (r"\b(honey|jam|nutella|spread|peanut\s*butter)\b", unsplash("photo-1587049352846-4a222e784d38")),  # honey/jam jar
    (r"\b(oil|olive|sunflower|canola|vegetable\s*oil|coconut\s*oil)\b", unsplash("photo-1474979266404-7eaacbcd87c5")),  # cooking oil
    (r"\b(vinegar|soy)\b",                            unsplash("photo-1584736286279-9a6e7c8843a8")),  # vinegar
    # Snacks
    (r"\b(chips|crisps|lays|kurkure|cheetos|doritos|pringles)\b", unsplash("photo-1600952841320-db92ec4047ca")),  # chips bag
    (r"\b(chocolate|kitkat|mars|snickers|twix|cadbury|galaxy|toblerone|ferrero|rocher)\b", unsplash("photo-1623595119708-26b1f7500ddd")),  # chocolate
    (r"\b(biscuit|cookie|oreo|cracker|wafer)\b",      unsplash("photo-1499636136210-6f4ee915583e")),  # biscuits
    (r"\b(candy|gum|toffee|caramel|jelly|gummy|chewing)\b", unsplash("photo-1581798459219-318e76aecc7b")),  # candy
    (r"\b(nut|almond|cashew|pista|raisin|kismis|date|khajoor)\b", unsplash("photo-1599599810769-bcde5a160d32")),  # nuts
    (r"\b(popcorn|namkeen|bhujia|sev|mixture|haldiram)\b", unsplash("photo-1571877227200-a0d98ea607e9")),  # snack mix
    # Bakery
    (r"\b(bread|bun|toast|paratha|chapati|roti|tortilla)\b", unsplash("photo-1509440159596-0249088772ff")),  # bread
    (r"\b(cake|pastry|donut|croissant|rusk|samboosa)\b", unsplash("photo-1578985545062-69928b1d9587")),  # pastry
    # Frozen
    (r"\b(ice\s*cream|kulfi|popsicle|gelato)\b",      unsplash("photo-1488900128323-21503983a07e")),  # ice cream
    (r"\b(frozen)\b",                                 unsplash("photo-1551024506-0bccd828d307")),  # frozen food
    # Fruits & veg
    (r"\b(apple|fruit|grape|orange|mango|banana|berry|melon|pineapple)\b", unsplash("photo-1610348725531-843dff563e2c")),  # fruit
    (r"\b(tomato|potato|onion|garlic|ginger|carrot|cabbage|cauliflower|spinach|cucumber|pepper|capsicum|brinjal|eggplant|okra|bhindi|vegetable|veg)\b", unsplash("photo-1540420773420-3366772f4999")),  # vegetables
    # Household — personal care
    (r"\b(shampoo|conditioner|hair\s*oil|amla|vatika|parachute|sunsilk|pantene|head\s*&\s*shoulders|tresemme|sulphate)\b", unsplash("photo-1626015449729-413f04ad094e")),  # shampoo
    (r"\b(soap|lifebuoy|safeguard|lux|dove)\b",       unsplash("photo-1600857062241-98e5dba7f214")),  # soap bar
    (r"\b(shower|body\s*wash|gel|nivea|olay|garnier)\b", unsplash("photo-1556228720-195a672e8a03")),  # body wash
    (r"\b(toothpaste|toothbrush|colgate|sensodyne|pepsodent|close\s*up|oral-?b)\b", unsplash("photo-1559588674-9bf52aaa1ce8")),  # toothpaste
    (r"\b(deodorant|perfume|fragrance|body\s*spray|axe|rexona|nivea\s*deo)\b", unsplash("photo-1585386959984-a4155224a1ad")),  # deodorant
    (r"\b(face\s*cream|lotion|moisturiz|moisturis|fair\s*&\s*lovely|fair\s*and\s*lovely|fair\s*&\s*handsome)\b", unsplash("photo-1556228453-efd6c1ff04f6")),  # cream
    (r"\b(razor|shave|gillette|wilkinson|aftershave)\b", unsplash("photo-1621607512214-68297480165e")),  # razor
    (r"\b(comb|hair\s*brush)\b",                      unsplash("photo-1619451683204-1d3f37b89baa")),  # comb
    (r"\b(diaper|pampers|huggies|baby\s*wipe)\b",     unsplash("photo-1607011830408-c5d4dc8d8c02")),  # baby
    # Household — cleaning
    (r"\b(detergent|ariel|tide|persil|surf|laundry)\b", unsplash("photo-1610557892470-55d9e80c0bce")),  # detergent
    (r"\b(dishwash|fairy|vim|finish|dawn)\b",         unsplash("photo-1583947581924-860bda6a26df")),  # dish soap
    (r"\b(toilet\s*cleaner|harpic|domex|bleach)\b",   unsplash("photo-1607082348824-0a96f2a4b9da")),  # toilet cleaner
    (r"\b(floor\s*clean|surface\s*clean|disinfectant|dettol|savlon|sanitiser|sanitizer)\b", unsplash("photo-1584305574647-0cc949a2bb9f")),  # cleaner
    (r"\b(tissue|paper|toilet\s*roll|napkin|kitchen\s*roll)\b", unsplash("photo-1583947582886-f40ec95dd752")),  # tissue
    (r"\b(spray|freshener|air\s*freshener|insecticide|repellent|mosquito|baygon|mortein)\b", unsplash("photo-1604335078894-69ee9c5cb02f")),  # spray bottle
    (r"\b(foil|aluminium|aluminum|cling|wrap|bag|polythene|plastic\s*bag)\b", unsplash("photo-1583947582976-1a0f53f72eef")),  # foil
    (r"\b(matchbox|match|candle|lighter)\b",          unsplash("photo-1602874801006-09d5e25b3bf8")),  # candle
    (r"\b(battery|cell|duracell|energizer)\b",        unsplash("photo-1606206522398-de2d9436c1a0")),  # battery
    (r"\b(broom|mop|bucket|brush)\b",                 unsplash("photo-1581578731548-c64695cc6952")),  # cleaning supplies
    (r"\b(plate|cup|fork|spoon|knife|cutlery|container|disposable)\b", unsplash("photo-1567521464027-f127ff144326")),  # tableware
    (r"\b(rope|string|cord|tape|adhesive|glue)\b",    unsplash("photo-1622383564018-d4cd2db4f24c")),  # rope/utility
    (r"\b(bulb|tube\s*light|led|lamp)\b",             unsplash("photo-1543198126-a8d50ca58c9e")),  # bulb
]

# Per-category fallback if no sub-type match
CATEGORY_FALLBACK = {
    "fruits_vegetables": unsplash("photo-1610348725531-843dff563e2c"),
    "dairy_eggs":        unsplash("photo-1559561853-08451507cbe7"),
    "meat_poultry":      unsplash("photo-1607623814075-e51df1bdc82f"),
    "rice_grains":       unsplash("photo-1586201375761-83865001e31c"),
    "spices_masala":     unsplash("photo-1596040033229-a9821ebd058d"),
    "beverages":         unsplash("photo-1551024709-8f23befc6f87"),
    "snacks":            unsplash("photo-1599490659213-e2b9527bd087"),
    "household":         unsplash("photo-1583947581924-860bda6a26df"),
    "frozen":            unsplash("photo-1488900128323-21503983a07e"),
    "bakery":            unsplash("photo-1509440159596-0249088772ff"),
}

def image_for(name: str, category: str) -> str:
    n = name.lower()
    for pattern, url in IMAGE_RULES:
        if re.search(pattern, n):
            return url
    return CATEGORY_FALLBACK.get(category, CATEGORY_FALLBACK["household"])

# ─── MAIN ─────────────────────────────────────────────────────────────────
def main():
    products = json.loads(PRODUCTS_JSON.read_text())
    print(f"Loaded {len(products)} products")

    name_changes = 0
    cat_changes = 0
    desc_added = 0
    img_added = 0

    for p in products:
        # 1. Clean name
        old_name = p.get("name", "") or ""
        new_name = clean_name(old_name)
        if new_name != old_name:
            p["name"] = new_name
            name_changes += 1

        # 2. Re-classify category with stronger regex
        old_cat = p.get("category", "household")
        new_cat = reclassify(p["name"], old_cat)
        if new_cat != old_cat:
            p["category"] = new_cat
            cat_changes += 1

        # 3. Always (re)generate description from cleaned name + new category
        desc = description_for(p["name"], p["category"])
        if p.get("description") != desc:
            p["description"] = desc
            desc_added += 1

        # 4. Always assign image (overwrites null and previous category-defaults)
        img = image_for(p["name"], p["category"])
        if p.get("image_url") != img:
            p["image_url"] = img
            img_added += 1

    PRODUCTS_JSON.write_text(json.dumps(products, indent=2, ensure_ascii=False))
    print(f"\nName updates:           {name_changes}")
    print(f"Category re-classified: {cat_changes}")
    print(f"Descriptions added:     {desc_added}")
    print(f"Image URLs assigned:    {img_added}")
    print(f"\nWrote {len(products)} products → {PRODUCTS_JSON}")
    print("\nFinal category distribution:")
    from collections import Counter
    cnt = Counter(p["category"] for p in products)
    for cat, n in cnt.most_common():
        print(f"  {cat:<22} {n}")

if __name__ == "__main__":
    main()
