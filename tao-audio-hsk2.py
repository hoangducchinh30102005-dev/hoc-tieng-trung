import asyncio
import os
import edge_tts

OUTPUT_DIR = r"D:\web\hoc-tieng-trung\public\audio\hsk2\cuoc-song-gia-dinh"

VOICE = "zh-CN-XiaoxiaoNeural"

audio_data = [
    ("jiating.mp3", "家庭"),
    ("jiating-example.mp3", "我的家庭很幸福。"),

    ("fumu.mp3", "父母"),
    ("fumu-example.mp3", "我的父母住在北京。"),

    ("haizi.mp3", "孩子"),
    ("haizi-example.mp3", "他们有两个孩子。"),

    ("gege.mp3", "哥哥"),
    ("gege-example.mp3", "我哥哥是学生。"),

    ("jiejie.mp3", "姐姐"),
    ("jiejie-example.mp3", "我姐姐在学校工作。"),

    ("didi.mp3", "弟弟"),
    ("didi-example.mp3", "我弟弟今年十岁。"),

    ("meimei.mp3", "妹妹"),
    ("meimei-example.mp3", "我妹妹喜欢看书。"),

    ("yi-qi.mp3", "一起"),
    ("yi-qi-example.mp3", "我们一起吃饭吧。"),

    ("zhaogu.mp3", "照顾"),
    ("zhaogu-example.mp3", "我每天照顾孩子。"),

    ("bangzhu.mp3", "帮助"),
    ("bangzhu-example.mp3", "家人总是帮助我。"),

    ("jiaren.mp3", "家人"),
    ("jiaren-example.mp3", "我的家人都喜欢旅游。"),

    ("shenghuo.mp3", "生活"),
    ("shenghuo-example.mp3", "我的生活很简单。"),
]


async def create_audio(filename, text):
    path = os.path.join(OUTPUT_DIR, filename)

    print(f"Đang tạo: {filename} -> {text}")

    communicate = edge_tts.Communicate(
        text=text,
        voice=VOICE,
        rate="+0%",
        volume="+0%",
    )

    await communicate.save(path)

    print(f"Đã tạo: {path}")


async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for filename, text in audio_data:
        await create_audio(filename, text)

    print()
    print("=" * 60)
    print("ĐÃ TẠO XONG TOÀN BỘ AUDIO HSK2")
    print(f"Số file: {len(audio_data)}")
    print(f"Thư mục: {OUTPUT_DIR}")
    print("=" * 60)


asyncio.run(main())