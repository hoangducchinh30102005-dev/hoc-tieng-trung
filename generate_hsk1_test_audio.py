import asyncio
import os
import re
import edge_tts

SOURCE_FILE = r"src\data\hsk1-test.js"
OUTPUT_DIR = r"public\audio\test\hsk1"

VOICE = "zh-CN-XiaoxiaoNeural"


def extract_audio_questions():
    with open(
        SOURCE_FILE,
        "r",
        encoding="utf-8"
    ) as file:
        text = file.read()

    pattern = re.compile(
        r"id:\s*(\d+).*?"
        r"audioText:\s*['\"]([^'\"]+)['\"]",
        re.S
    )

    results = []

    for match in pattern.finditer(text):
        question_id = int(match.group(1))
        audio_text = match.group(2)

        results.append(
            (
                question_id,
                audio_text
            )
        )

    return results


async def generate_audio(
    question_id,
    text
):
    os.makedirs(
        OUTPUT_DIR,
        exist_ok=True
    )

    output_file = os.path.join(
        OUTPUT_DIR,
        f"q-{question_id}.mp3"
    )

    if os.path.exists(
        output_file
    ):
        print(
            f"SKIP q-{question_id}.mp3"
        )
        return

    print(
        f"Tạo q-{question_id}.mp3: "
        f"{text}"
    )

    communicate = edge_tts.Communicate(
        text,
        VOICE
    )

    await communicate.save(
        output_file
    )


async def main():
    questions = (
        extract_audio_questions()
    )

    print(
        f"Tìm thấy {len(questions)} "
        f"audioText."
    )

    print(
        f"Voice: {VOICE}"
    )

    print(
        f"Folder: {os.path.abspath(OUTPUT_DIR)}"
    )

    for question_id, text in questions:
        await generate_audio(
            question_id,
            text
        )

    print(
        "Hoàn tất tạo audio Test HSK1."
    )


if __name__ == "__main__":
    asyncio.run(main())