"""Generate a QR code image for a URL.

Usage:
  python QRcode.py
  python QRcode.py --url "https://example.com" --out qrcode.png
"""

from __future__ import annotations

import argparse
import sys


DEFAULT_URL = "https://erfanshokrollahzadeh.github.io/Resume/ltr/dark/about.html"


def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Generate a QR code PNG for a URL")
    parser.add_argument("--url", default=DEFAULT_URL, help="URL to encode")
    parser.add_argument(
        "--out",
        default="qrcode.png",
        help="Output PNG path (default: qrcode.png)",
    )
    return parser


def main(argv: list[str]) -> int:
    args = build_arg_parser().parse_args(argv)

    try:
        import qrcode  # type: ignore[import-not-found]
    except ModuleNotFoundError:
        print(
            "Missing dependency: qrcode\n"
            "Install it with: pip install qrcode[pil]\n",
            file=sys.stderr,
        )
        return 2

    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4,
    )
    qr.add_data(args.url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(args.out)

    print(f"QR code saved to: {args.out}")
    print(f"Encoded URL: {args.url}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
