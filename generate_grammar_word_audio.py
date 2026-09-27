import asyncio
import re
from pathlib import Path

import edge_tts


PROJECT_DIR = Path(__file__).resolve().parent

JS_FILE = (
    PROJECT_DIR
    / "src"
    / "components"
    / "GrammarEnhancer.js"
)

OUTPUT_DIR = (
    PROJECT_DIR
    / "public"
    / "audio"
    / "grammar"
    / "hsk1"
    / "words"
)

VOICE = "zh-CN-XiaoxiaoNeural"


def read_words():
    content = JS_FILE.read_text(
        encoding="utf-8"
    )

    match = re.search(
        r"const\s+pinyinMap\s*=\s*\{(.*?)\};",
        content,
        re.S,
    )

    if not match:
        raise RuntimeError(
            "Không tìm thấy pinyinMap trong GrammarEnhancer.js"
        )

    block = match.group(1)

    words = []

    for line in block.splitlines():
        line = line.strip()

        if not line:
            continue

        if line.startswith("//"):
            continue

        match_word = re.match(
            r"^([^:]+):\s*[\"']([^\"']*)[\"'],?$",
            line,
        )

        if not match_word:
            continue

        word = match_word.group(1).strip()

        if word and word not in words:
            words.append(word)

    return words


async def generate_word(word):
    output_file = (
        OUTPUT_DIR
        / f"{word}.mp3"
    )

    if output_file.exists():
        print(
            f"SKIP  {word}  -> đã tồn tại"
        )
        return

    print(
        f"TẠO   {word}"
    )

    communicate = edge_tts.Communicate(
        text=word,
        voice=VOICE,
        rate="-10%",
        volume="+0%",
        pitch="+0Hz",
    )

    await communicate.save(
        str(output_file)
    )


async def main():
    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    words = read_words()

    print()
    print(
        f"Tìm thấy {len(words)} từ/cụm từ."
    )
    print(
        f"Voice: {VOICE}"
    )
    print(
        f"Thư mục: {OUTPUT_DIR}"
    )
    print()

    for word in words:
        try:
            await generate_word(word)
        except Exception as error:
            print(
                f"LỖI   {word}: {error}"
            )

    print()
    print(
        "Hoàn tất tạo audio."
    )
    print()


if __name__ == "__main__":
    asyncio.run(main())