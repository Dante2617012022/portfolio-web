"""Verify the compiled site at desktop/mobile widths; save UAT screenshots."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

OUT = Path("test-results")
OUT.mkdir(exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch()
    results = []
    for width in (1440, 390, 320):
        page = browser.new_page(viewport={"width": width, "height": 900}, reduced_motion="reduce")
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.goto("http://127.0.0.1:4173/portfolio-web/", wait_until="networkidle")
        expect(page.get_by_role("heading", name="ERP Camdis — producción e inventario", exact=True)).to_be_visible()
        expect(page.locator("#about")).to_contain_text("Graduado en septiembre de 2026")
        page.locator("#home").get_by_role("link", name="Solicitar CV", exact=True).click()
        expect(page.get_by_role("heading", name="Conversemos sobre tu oportunidad")).to_be_in_viewport()
        expect(page.locator("#cv").get_by_role("link", name="Solicitar CV por LinkedIn")).to_have_attribute("href", "https://www.linkedin.com/in/dante-gabriel-balbuena-179963235/")
        assert page.locator('a[download], a[href*="/cv/"], a[href$=".pdf"]').count() == 0
        assert not list(Path("dist").rglob("CV_*.pdf")), "Public CV found in build"
        expect(page.locator("#contact").get_by_role("link", name="LinkedIn", exact=True)).to_have_attribute("href", "https://www.linkedin.com/in/dante-gabriel-balbuena-179963235/")
        invalid = page.evaluate("""() => [...document.querySelectorAll('a')].filter(a => {
            const h = a.getAttribute('href') || '';
            return h.includes('tu-perfil') || (h.startsWith('#') && h.length > 1 && !document.getElementById(h.slice(1)));
        }).map(a => a.getAttribute('href'))""")
        assert not invalid, invalid
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), f"Horizontal overflow at {width}"
        assert not errors, errors
        page.locator("#projects").screenshot(path=str(OUT / f"projects-{width}.png"))
        page.locator("#cv").screenshot(path=str(OUT / f"cv-{width}.png"))
        page.screenshot(path=str(OUT / f"portfolio-{width}.png"), full_page=True)
        results.append({"width": width, "cv_privacy": "PASS", "links": "PASS", "overflow": False, "page_errors": errors})
        page.close()
    browser.close()
    (OUT / "summary.json").write_text(json.dumps(results, indent=2))
    print(json.dumps(results, indent=2))
