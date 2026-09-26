import asyncio
import os
import re
import glob
import edge_tts


VOICE = "zh-CN-XiaoxiaoNeural"
RATE = "-10%"

BASE_DIR = "src/app/ngu-phap/hsk1"
AUDIO_DIR = "public/audio/grammar/hsk1"


def extract_examples(lesson):
    """
    Đọc trực tiếp page.js của từng bài
    và lấy toàn bộ nội dung trong:
    
    <div className="example-chinese">
        ...
    </div>
    """

    path = os.path.join(
        BASE_DIR,
        str(lesson),
        "page.js"
    )

    if not os.path.exists(path):
        print(f"LOI: Khong tim thay {path}")
        return []

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    pattern = (
        r'<div\s+className="example-chinese">\s*'
        r'(.*?)'
        r'\s*</div>'
    )

    matches = re.findall(
        pattern,
        content,
        flags=re.DOTALL
    )

    examples = []

    for text in matches:
        # Xóa khoảng trắng thừa
        text = text.strip()

        # Chuyển xuống dòng thành khoảng trắng
        text = re.sub(r"\s+", " ", text)

        # Nếu nội dung có JSX đơn giản thì bỏ phần JSX
        text = re.sub(r"<[^>]+>", "", text)

        # Bỏ khoảng trắng dư
        text = text.strip()

        if text:
            examples.append(text)

    return examples


def delete_old_audio(lesson):
    """
    Xóa các example-*.mp3 cũ để tránh
    còn file audio thừa khi số câu thay đổi.
    """

    folder = os.path.join(
        AUDIO_DIR,
        f"bai-{lesson}"
    )

    os.makedirs(folder, exist_ok=True)

    old_files = glob.glob(
        os.path.join(folder, "example-*.mp3")
    )

    for file in old_files:
        try:
            os.remove(file)
        except OSError:
            pass


async def create_audio(lesson, index, text):
    folder = os.path.join(
        AUDIO_DIR,
        f"bai-{lesson}"
    )

    os.makedirs(folder, exist_ok=True)

    filename = f"example-{index}.mp3"

    output = os.path.join(
        folder,
        filename
    )

    communicate = edge_tts.Communicate(
        text=text,
        voice=VOICE,
        rate=RATE
    )

    await communicate.save(output)

    print(
        f"OK: Bai {lesson} - "
        f"{filename} - {text}"
    )


async def main():

    all_tasks = []

    print()
    print("==========================================")
    print("KIEM TRA 16 BAI NGU PHAP HSK1")
    print("==========================================")

    for lesson in range(1, 17):

        examples = extract_examples(lesson)

        print()
        print(
            f"Bai {lesson}: "
            f"{len(examples)} cau"
        )

        if not examples:
            print("  -> Khong tim thay example.")
            continue

        # Xóa audio cũ của bài này
        delete_old_audio(lesson)

        # Hiển thị chính xác câu sẽ tạo
        for index, text in enumerate(
            examples,
            start=1
        ):
            print(
                f"  {index}. {text}"
            )

            all_tasks.append(
                create_audio(
                    lesson,
                    index,
                    text
                )
            )

    print()
    print("==========================================")
    print("BAT DAU TAO AUDIO")
    print("==========================================")
    print()

    await asyncio.gather(*all_tasks)

    print()
    print("==========================================")
    print("DA TAO XONG AUDIO NGU PHAP HSK1")
    print("==========================================")


if __name__ == "__main__":
    asyncio.run(main())