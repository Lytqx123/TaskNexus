"""Generate the original TaskNexus artwork used by the web application.

Requires Pillow. Generated assets are committed, so application builds do
not need Python, Pillow or system fonts to display the brand.
"""

from __future__ import annotations

from io import BytesIO
from pathlib import Path
from shutil import copyfile

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "webapp" / "public"
INK = "#18223b"
ACCENT = "#635bff"


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        Path("C:/Windows/Fonts") / ("segoeuib.ttf" if bold else "segoeui.ttf"),
        Path("/usr/share/fonts/truetype/dejavu")
        / ("DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"),
        Path("/Library/Fonts") / "Arial.ttf",
    ]
    for candidate in candidates:
        if candidate.is_file():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default(size=size)


def draw_mark(draw: ImageDraw.ImageDraw, x: int, y: int, size: int, color: str) -> None:
    """A connected T/N monogram: three task nodes linked by a shared stem."""
    def point(px: float, py: float) -> tuple[int, int]:
        return round(x + px * size), round(y + py * size)

    width = max(2, round(size * 0.09))
    draw.line([point(0.2, 0.2), point(0.8, 0.2)], fill=color, width=width)
    draw.line([point(0.5, 0.2), point(0.5, 0.8)], fill=color, width=width)
    draw.line([point(0.2, 0.8), point(0.8, 0.2)], fill=color, width=width)
    radius = size * 0.105
    for px, py in [(0.2, 0.2), (0.8, 0.2), (0.2, 0.8), (0.5, 0.8)]:
        cx, cy = point(px, py)
        draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=color)


def mark_svg(color: str) -> str:
    return (
        f'<g stroke="{color}" stroke-width="9" stroke-linecap="round">'
        '<path d="M20 20H80M50 20V80M20 80L80 20"/></g>'
        f'<g fill="{color}"><circle cx="20" cy="20" r="10.5"/>'
        '<circle cx="80" cy="20" r="10.5"/><circle cx="20" cy="80" r="10.5"/>'
        '<circle cx="50" cy="80" r="10.5"/></g>'
    )


def generate_logos() -> None:
    variants = [
        ("white-bg-trans", "#ffffff", None),
        ("black-bg-trans", INK, None),
        ("white-bg-black", "#ffffff", INK),
        ("black-bg-white", INK, "#ffffff"),
    ]
    for kind in ("full", "mark"):
        for suffix, foreground, background in variants:
            width, height = (760, 180) if kind == "full" else (256, 256)
            image = Image.new("RGBA", (width, height), background or (0, 0, 0, 0))
            draw = ImageDraw.Draw(image)
            if kind == "full":
                draw_mark(draw, 14, 14, 152, foreground)
                draw.text((190, 28), "TaskNexus", font=font(94, True), fill=foreground)
            else:
                draw_mark(draw, 16, 16, 224, foreground)
            name = f"tasknexus-{kind}-{suffix}"
            image.save(PUBLIC / f"{name}.png")
            copyfile(PUBLIC / f"{name}.png", PUBLIC / "images" / f"{name}.png")

            view = "0 0 440 100" if kind == "full" else "0 0 100 100"
            rect = f'<rect width="100%" height="100%" fill="{background}"/>' if background else ""
            label = (
                f'<text x="116" y="69" fill="{foreground}" font-family="Segoe UI,Arial,sans-serif" '
                'font-size="56" font-weight="700" letter-spacing="-2">TaskNexus</text>'
                if kind == "full" else ""
            )
            svg = (
                f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" role="img" '
                f'aria-label="TaskNexus"><title>TaskNexus</title>{rect}{mark_svg(foreground)}{label}</svg>\n'
            )
            (PUBLIC / "images" / f"{name}.svg").write_text(svg, encoding="utf-8")

    base = Image.open(PUBLIC / "tasknexus-mark-white-bg-black.png").convert("RGBA")
    for plan in ("Free", "Pro", "Teams", "Enterprise"):
        image = Image.new("RGBA", (256, 300), INK)
        image.alpha_composite(base)
        draw = ImageDraw.Draw(image)
        draw.text((128, 258), plan, font=font(24, True), fill="#ffffff", anchor="mt")
        name = f"tasknexus-mark-white-bg-black-{plan}.png"
        image.save(PUBLIC / name)
        copyfile(PUBLIC / name, PUBLIC / "images" / name)

    copyfile(PUBLIC / "tasknexus-full-black-bg-trans.png", PUBLIC / "images/email/logo-light.png")
    placeholder = Image.new("RGB", (256, 256), "#f4f5fc")
    camera = ImageDraw.Draw(placeholder)
    camera.rounded_rectangle((48, 78, 208, 190), radius=20, outline="#65708a", width=10)
    camera.rounded_rectangle((84, 54, 142, 92), radius=8, fill="#65708a")
    camera.ellipse((96, 104, 160, 168), outline=ACCENT, width=10)
    placeholder.save(PUBLIC / "apps/camera-placeholder.png")
    icon = Image.new("RGBA", (256, 256), ACCENT)
    draw_mark(ImageDraw.Draw(icon), 16, 16, 224, "#ffffff")
    buffer = BytesIO()
    icon.save(buffer, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
    for path in (PUBLIC / "favicon.ico", PUBLIC / "images/favicon.ico", ROOT / "webapp/favicon.ico", ROOT / "webapp/src/pages/favicon.ico"):
        path.write_bytes(buffer.getvalue())


def illustration_svg(kind: str, dark: bool = False) -> str:
    background, panel, text, muted = (
        ("#151c30", "#222d46", "#ffffff", "#b8c0d5")
        if dark else ("#f4f5fc", "#ffffff", INK, "#65708a")
    )
    top = (
        '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="600" viewBox="0 0 960 600" '
        f'role="img" aria-label="TaskNexus {kind} app"><title>TaskNexus {kind} app</title>'
        f'<rect width="960" height="600" rx="28" fill="{background}"/>'
        f'<rect x="32" y="32" width="896" height="536" rx="20" fill="{panel}"/>'
        f'<text x="64" y="86" font-family="Arial,sans-serif" font-size="28" font-weight="700" fill="{text}">TaskNexus</text>'
        f'<text x="64" y="132" font-family="Arial,sans-serif" font-size="16" fill="{muted}">Private AI. Connected work.</text>'
    )
    if kind == "Chat":
        body = (
            f'<rect x="264" y="184" width="596" height="72" rx="16" fill="{ACCENT}"/>'
            '<text x="292" y="228" font-family="Arial,sans-serif" font-size="20" fill="white">What can we learn from our data?</text>'
            f'<rect x="64" y="294" width="676" height="164" rx="16" fill="{background}"/>'
            f'<text x="92" y="338" font-family="Arial,sans-serif" font-size="20" font-weight="700" fill="{text}">Your TaskNexus assistant</text>'
            f'<text x="92" y="376" font-family="Arial,sans-serif" font-size="18" fill="{muted}">Find answers, explore ideas and use your connected tools.</text>'
            f'<path d="M92 410H650M92 430H490" stroke="{muted}" stroke-width="8" stroke-linecap="round" opacity=".25"/>'
            f'<rect x="64" y="500" width="832" height="36" rx="12" fill="{background}"/>'
        )
    else:
        body = '<path d="M212 302H746" stroke="#8c85ff" stroke-width="6"/>'
        for x, title, detail in [(80, "Retrieve", "Connect your data"), (368, "Reason", "Coordinate agents"), (656, "Deliver", "Complete the task")]:
            body += (
                f'<rect x="{x}" y="228" width="224" height="148" rx="20" fill="{background}" stroke="#8c85ff" stroke-width="2"/>'
                f'<circle cx="{x + 112}" cy="264" r="12" fill="{ACCENT}"/>'
                f'<text x="{x + 112}" y="314" text-anchor="middle" font-family="Arial,sans-serif" font-size="23" font-weight="700" fill="{text}">{title}</text>'
                f'<text x="{x + 112}" y="346" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" fill="{muted}">{detail}</text>'
            )
        body += f'<text x="480" y="466" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="{text}">Build repeatable workflows with TaskNexus.</text>'
    return top + body + "</svg>\n"


def illustration_bitmap(kind: str, dark: bool = False) -> Image.Image:
    background, panel, text, muted = (
        ("#151c30", "#222d46", "#ffffff", "#b8c0d5")
        if dark else ("#f4f5fc", "#ffffff", INK, "#65708a")
    )
    image = Image.new("RGB", (960, 600), background)
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((32, 32, 928, 568), radius=20, fill=panel)
    draw.text((64, 48), "TaskNexus", font=font(32, True), fill=text)
    draw.text((64, 108), "Private AI. Connected work.", font=font(18), fill=muted)
    if kind == "Chat":
        draw.rounded_rectangle((264, 184, 860, 256), radius=16, fill=ACCENT)
        draw.text((292, 205), "What can we learn from our data?", font=font(24), fill="white")
        draw.rounded_rectangle((64, 294, 740, 458), radius=16, fill=background)
        draw.text((92, 318), "Your TaskNexus assistant", font=font(24, True), fill=text)
        draw.text((92, 364), "Find answers and use your connected tools.", font=font(20), fill=muted)
        draw.line((92, 418, 650, 418), fill=muted, width=4)
        draw.line((92, 438, 490, 438), fill=muted, width=4)
        draw.rounded_rectangle((64, 500, 896, 536), radius=12, fill=background)
    else:
        draw.line((212, 302, 746, 302), fill="#8c85ff", width=6)
        for x, title, detail in [(80, "Retrieve", "Connect your data"), (368, "Reason", "Coordinate agents"), (656, "Deliver", "Complete the task")]:
            draw.rounded_rectangle((x, 228, x + 224, 376), radius=20, fill=background, outline="#8c85ff", width=2)
            draw.ellipse((x + 100, 252, x + 124, 276), fill=ACCENT)
            draw.text((x + 112, 291), title, font=font(25, True), fill=text, anchor="mt")
            draw.text((x + 112, 333), detail, font=font(18), fill=muted, anchor="mt")
        draw.text((480, 442), "Build repeatable workflows with TaskNexus.", font=font(24), fill=text, anchor="mt")
    return image


def generate_illustrations() -> None:
    folder = PUBLIC / "images/get-started"
    for filename, kind in [("create-chat-app", "Chat"), ("create-process-app", "Workflow")]:
        for dark in (False, True):
            suffix = "-dark" if dark else ""
            (folder / f"{filename}{suffix}.svg").write_text(illustration_svg(kind, dark), encoding="utf-8")
            illustration_bitmap(kind, dark).save(folder / f"{filename}{suffix}{'.jpg' if dark else '.png'}", quality=94)
        square = Image.new("RGB", (256, 256), "#f4f5fc")
        draw_mark(ImageDraw.Draw(square), 24, 24, 208, ACCENT)
        square.save(folder / f"{'chat' if kind == 'Chat' else 'process'}-app-square.png")
    copyfile(folder / "create-process-app.png", folder / "DemoProcessApp.png")
    (PUBLIC / "process.svg").write_text(illustration_svg("Workflow"), encoding="utf-8")


if __name__ == "__main__":
    generate_logos()
    generate_illustrations()
    print("Generated TaskNexus wordmarks, icons, favicon variants and onboarding illustrations.")
