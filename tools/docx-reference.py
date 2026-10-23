"""Creates tools/templates/reference.docx, the style sheet pandoc uses for the
Word report. Run once after changing a style: python3 tools/docx-reference.py
Needs python-docx and pandoc."""
import subprocess
from pathlib import Path

from docx import Document
from docx.enum.style import WD_STYLE_TYPE
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt, RGBColor, Mm

HERE = Path(__file__).resolve().parent
OUT = HERE / "templates" / "reference.docx"

SANS = "Be Vietnam Pro"
MONO = "JetBrains Mono"
INK = RGBColor(0x0F, 0x1A, 0x22)
BODY = RGBColor(0x2B, 0x3A, 0x45)
MUTED = RGBColor(0x4E, 0x60, 0x6C)
ACCENT = RGBColor(0xB3, 0x27, 0x2A)

PANELS = {
    "Confirmed": ("15803D", "F1F8F3"),
    "Analysis": ("EF5350", "FDF2F1"),
    "Unknown": ("B45309", "FCF6EC"),
    "Notice": ("EF5350", "F4F7F9"),
}


def font(style, name=SANS, size=None, bold=None, color=None):
    style.font.name = name
    rpr = style.element.get_or_add_rPr()
    fonts = rpr.find(qn("w:rFonts"))
    if fonts is None:
        fonts = OxmlElement("w:rFonts")
        rpr.append(fonts)
    for attr in ("w:ascii", "w:hAnsi", "w:cs", "w:eastAsia"):
        fonts.set(qn(attr), name)
    for attr in ("w:asciiTheme", "w:hAnsiTheme", "w:cstheme", "w:eastAsiaTheme"):
        if fonts.get(qn(attr)) is not None:
            del fonts.attrib[qn(attr)]
    if size:
        style.font.size = Pt(size)
    if bold is not None:
        style.font.bold = bold
    if color is not None:
        style.font.color.rgb = color


def shade_and_rule(style, rule, fill):
    ppr = style.element.get_or_add_pPr()
    borders = OxmlElement("w:pBdr")
    left = OxmlElement("w:left")
    left.set(qn("w:val"), "single")
    left.set(qn("w:sz"), "24")
    left.set(qn("w:space"), "8")
    left.set(qn("w:color"), rule)
    borders.append(left)
    ppr.append(borders)
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), fill)
    ppr.append(shd)


def get(doc, name, kind=WD_STYLE_TYPE.PARAGRAPH):
    try:
        return doc.styles[name]
    except KeyError:
        return doc.styles.add_style(name, kind)


def main():
    base = subprocess.run(["pandoc", "--print-default-data-file", "reference.docx"], check=True, capture_output=True).stdout
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_bytes(base)
    doc = Document(str(OUT))

    for section in doc.sections:
        section.page_height, section.page_width = Mm(297), Mm(210)
        section.left_margin = section.right_margin = Mm(20)
        section.top_margin, section.bottom_margin = Mm(20), Mm(20)

    for name in ("Normal", "Body Text", "First Paragraph", "Compact"):
        style = get(doc, name)
        font(style, size=10.5, color=BODY)
        style.paragraph_format.space_after = Pt(6)
        style.paragraph_format.line_spacing = 1.3

    font(get(doc, "Title"), size=28, bold=True, color=INK)
    font(get(doc, "Subtitle"), size=13, color=MUTED)
    font(get(doc, "Date"), name=MONO, size=9, color=MUTED)
    for level, size in ((1, 22), (2, 17), (3, 13), (4, 11)):
        style = get(doc, f"Heading {level}")
        font(style, size=size, bold=True, color=INK)
        style.paragraph_format.space_before = Pt(18 if level <= 2 else 12)
        style.paragraph_format.space_after = Pt(6)
        style.paragraph_format.keep_with_next = True

    font(get(doc, "Hyperlink", WD_STYLE_TYPE.CHARACTER), color=ACCENT)
    font(get(doc, "Verbatim Char", WD_STYLE_TYPE.CHARACTER), name=MONO, size=9, color=INK)
    font(get(doc, "Source Code"), name=MONO, size=9, color=INK)
    font(get(doc, "Image Caption"), size=9, color=MUTED)

    for name, (rule, fill) in PANELS.items():
        label = get(doc, f"Label {name}")
        label.base_style = doc.styles["Normal"]
        font(label, name=MONO, size=8, bold=True, color=RGBColor.from_string(rule))
        label.paragraph_format.space_before = Pt(10)
        label.paragraph_format.space_after = Pt(2)
        label.paragraph_format.keep_with_next = True
        panel = get(doc, f"Panel {name}")
        panel.base_style = doc.styles["Normal"]
        font(panel, size=10.5, color=BODY)
        panel.paragraph_format.left_indent = Mm(3)
        panel.paragraph_format.space_after = Pt(4)
        shade_and_rule(panel, rule, fill)

    doc.save(str(OUT))
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
