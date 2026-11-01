import asyncio
import os
import edge_tts

OUTPUT_DIR = r"D:\web\hoc-tieng-trung\public\audio\hsk2\hoc-tap-truong-hoc"
VOICE = "zh-CN-XiaoxiaoNeural"

audio_data = [
    ("xuexi.mp3", "学习"),
    ("xuexi-example.mp3", "我每天学习汉语。"),

    ("xuexiao.mp3", "学校"),
    ("xuexiao-example.mp3", "我的学校很大。"),

    ("laoshi.mp3", "老师"),
    ("laoshi-example.mp3", "我们的老师很有意思。"),

    ("xuesheng.mp3", "学生"),
    ("xuesheng-example.mp3", "我是学生。"),

    ("tongxue.mp3", "同学"),
    ("tongxue-example.mp3", "他是我的同学。"),

    ("jiaoshi.mp3", "教室"),
    ("jiaoshi-example.mp3", "学生们在教室里学习。"),

    ("kaoshi.mp3", "考试"),
    ("kaoshi-example.mp3", "明天我们要考试。"),

    ("zuoye.mp3", "作业"),
    ("zuoye-example.mp3", "我晚上做作业。"),

    ("wenti.mp3", "问题"),
    ("wenti-example.mp3", "我有一个问题。"),

    ("huida.mp3", "回答"),
    ("huida-example.mp3", "请回答我的问题。"),

    ("zhunbei.mp3", "准备"),
    ("zhunbei-example.mp3", "我正在准备考试。"),

    ("chengji.mp3", "成绩"),
    ("chengji-example.mp3", "他的汉语成绩很好。"),
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

    print("=" * 60)
    print("ĐÃ TẠO XONG AUDIO HSK2 - HỌC TẬP & TRƯỜNG HỌC")
    print(f"Số file: {len(audio_data)}")
    print(f"Thư mục: {OUTPUT_DIR}")
    print("=" * 60)


asyncio.run(main())