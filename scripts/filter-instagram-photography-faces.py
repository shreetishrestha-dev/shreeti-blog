from __future__ import annotations

import json
from pathlib import Path

import cv2


ROOT = Path(__file__).resolve().parents[1]
PHOTOS_FILE = ROOT / "content" / "instagram-photography.generated.json"
EXCLUDED_FILE = ROOT / "content" / "instagram-photography.faces-excluded.json"
PUBLIC_DIR = ROOT / "public"


def load_cascades() -> list[cv2.CascadeClassifier]:
    data_dir = Path(cv2.data.haarcascades)
    cascade_names = [
        "haarcascade_frontalface_default.xml",
        "haarcascade_frontalface_alt2.xml",
        "haarcascade_profileface.xml",
    ]

    cascades: list[cv2.CascadeClassifier] = []

    for name in cascade_names:
        classifier = cv2.CascadeClassifier(str(data_dir / name))
        if not classifier.empty():
            cascades.append(classifier)

    if not cascades:
        raise RuntimeError("No Haar cascade classifiers were loaded.")

    return cascades


def load_image(image_path: Path):
    image = cv2.imread(str(image_path))
    if image is None:
        return None

    height, width = image.shape[:2]
    longest_edge = max(height, width)

    if longest_edge > 1600:
        scale = 1600 / longest_edge
        image = cv2.resize(image, (int(width * scale), int(height * scale)))

    grayscale = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    grayscale = cv2.equalizeHist(grayscale)
    return grayscale


def detect_faces(grayscale, cascades: list[cv2.CascadeClassifier]) -> bool:
    height, width = grayscale.shape[:2]
    min_side = max(40, int(min(height, width) * 0.06))

    for classifier in cascades:
        faces = classifier.detectMultiScale(
            grayscale,
            scaleFactor=1.08,
            minNeighbors=5,
            minSize=(min_side, min_side),
        )
        if len(faces) > 0:
            return True

        mirrored = cv2.flip(grayscale, 1)
        faces = classifier.detectMultiScale(
            mirrored,
            scaleFactor=1.08,
            minNeighbors=5,
            minSize=(min_side, min_side),
        )
        if len(faces) > 0:
            return True

    return False


def main() -> None:
    entries = json.loads(PHOTOS_FILE.read_text())
    cascades = load_cascades()

    kept = []
    excluded = []

    for entry in entries:
        image_path = PUBLIC_DIR / entry["imageUrl"].lstrip("/")
        grayscale = load_image(image_path)

        if grayscale is None:
            kept.append(entry)
            continue

        if detect_faces(grayscale, cascades):
            excluded.append(
                {
                    "id": entry["id"],
                    "title": entry["title"],
                    "imageUrl": entry["imageUrl"],
                }
            )
        else:
            kept.append(entry)

    PHOTOS_FILE.write_text(f"{json.dumps(kept, indent=2)}\n")
    EXCLUDED_FILE.write_text(f"{json.dumps(excluded, indent=2)}\n")

    print(f"Kept {len(kept)} photo(s)")
    print(f"Excluded {len(excluded)} photo(s) with detected faces")


if __name__ == "__main__":
    main()
