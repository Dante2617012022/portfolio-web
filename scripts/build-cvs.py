"""Build the public, selectable one-page CVs from versioned content."""
import json
from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from pypdf import PdfReader
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "cv"
OUT.mkdir(parents=True, exist_ok=True)
styles = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=21, leading=25, spaceAfter=5, textColor=HexColor("#132d40")),
    "role": ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=11, leading=15, spaceAfter=7, textColor=HexColor("#176478")),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=9, leading=12, spaceAfter=4),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=10, leading=14, spaceAfter=5),
    "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=10, leading=14, spaceBefore=12, spaceAfter=5, textColor=HexColor("#176478"), keepWithNext=True),
    "item": ParagraphStyle("item", fontName="Helvetica-Bold", fontSize=10, leading=14, spaceAfter=4, keepWithNext=True),
    "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=10, leading=14, leftIndent=10, firstLineIndent=-8, spaceAfter=4),
}
for key, data in json.loads((ROOT / "content/resumes.json").read_text()).items():
    story = []
    def add(text, style="body"):
        story.append(Paragraph(text, styles[style]))
    add("Dante Gabriel Balbuena Atar", "name")
    add(escape(data["role"]), "role")
    add("Tafí Viejo, Tucumán, Argentina | +54 381 665-4021 | dantebalbuenaatar@gmail.com", "contact")
    add('<link href="https://dante2617012022.github.io/portfolio-web/" color="#176478">Portfolio</link> · <link href="https://github.com/Dante2617012022" color="#176478">GitHub: Dante2617012022</link> · <link href="https://www.linkedin.com/in/dante-gabriel-balbuena-179963235/" color="#176478">LinkedIn</link>', "contact")
    story.append(Spacer(1, 5))
    story.append(HRFlowable(width="100%", thickness=1, color=HexColor("#b5c9d1")))
    add("PERFIL PROFESIONAL", "section")
    add(escape(data["profile"]))
    for title, items in data["sections"]:
        add(title, "section")
        for item in items:
            add(escape(item[0]), "item")
            for text in item[1:]:
                add("• " + escape(text), "bullet")
    add("EDUCACIÓN Y FORMACIÓN COMPLEMENTARIA", "section")
    add("Técnico Universitario en Ciberseguridad | Universidad del Gran Rosario", "item")
    add("2024 - 2026 | Graduado en septiembre de 2026.")
    add('Newbie Security Auditor | Dios de la Red | <link href="https://cert.ddlr.org/cert.php?id=55" color="#176478">Ver credencial</link>')
    add("IDIOMAS", "section")
    add("Español nativo | Inglés básico-intermedio, orientado a lectura técnica.")
    path = OUT / ("CV_Dante_Balbuena_" + key + ".pdf")
    SimpleDocTemplate(str(path), pagesize=(595.2756, 841.8898), leftMargin=40, rightMargin=40, topMargin=32, bottomMargin=30, title="Dante Balbuena - " + data["role"], author="Dante Gabriel Balbuena Atar").build(story)
    doc = PdfReader(path)
    assert len(doc.pages) == 1, f"{path.name}: expected one page"
    assert "Graduado en septiembre de 2026" in doc.pages[0].extract_text()
    assert len(doc.pages[0].extract_text()) > 1500
    print(path.name + ": one page, selectable text, graduation verified")
