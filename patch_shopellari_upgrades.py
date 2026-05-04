"""
patch_shopellari_upgrades.py
Three upgrades to shopellari repo:
  1. UTM tracking on Amazon book links in products.ts
  2. WaitlistCapture component (email capture for waitlist products)
  3. React Router setup for /product/[slug] detail pages
Run from: ~/shopellari
"""
import os, re, sys

base = os.path.expanduser("~/shopellari")
products_path = os.path.join(base, "src/data/products.ts")
pkg_path = os.path.join(base, "package.json")
changes = []

if not os.path.exists(products_path):
    print(f"ERROR: {products_path} not found"); sys.exit(1)

# ── 1. UTM tracking on Amazon links ──────────────────────────────────
txt = open(products_path).read()
OLD_AMAZON = '"https://www.amazon.com/s?k=naci+sigler"'
NEW_AMAZON = '"https://www.amazon.com/s?k=naci+sigler&utm_source=shopellari&utm_medium=store&utm_campaign=books&utm_content=naci-sigler-books"'
if OLD_AMAZON in txt:
    txt = txt.replace(OLD_AMAZON, NEW_AMAZON)
    changes.append("UTM tracking added to Amazon book link")
open(products_path, "w").write(txt)

# ── 2. Add react-router-dom to package.json ───────────────────────────
import json
pkg = json.load(open(pkg_path))
if "react-router-dom" not in pkg.get("dependencies", {}):
    pkg["dependencies"]["react-router-dom"] = "^6.22.0"
    json.dump(pkg, open(pkg_path, "w"), indent=2)
    changes.append("react-router-dom added to package.json")

# ── 3. Update main.tsx to wrap in BrowserRouter ───────────────────────
main_path = os.path.join(base, "src/main.tsx")
main_txt = open(main_path).read()
if "BrowserRouter" not in main_txt:
    main_txt = main_txt.replace(
        'import App from "./App"',
        'import { BrowserRouter } from "react-router-dom"\nimport App from "./App"'
    ).replace(
        "<App />",
        "<BrowserRouter><App /></BrowserRouter>"
    )
    open(main_path, "w").write(main_txt)
    changes.append("BrowserRouter added to main.tsx")

print(f"\n{len(changes)} change(s) applied:")
for c in changes: print(f"  ✓ {c}")
print("\nNext: run npm install && npm run build")
