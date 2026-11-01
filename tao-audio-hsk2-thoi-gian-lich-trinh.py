import asyncio
import os
import edge_tts

# HSK2 - Chu de 3: Thoi gian & lich trinh
# Tao 24 file MP3 theo dung cach da dung cho cac chu de truoc.

OUTPUT_DIR = r"D:\web\hoc-tieng-trung\public\audio\hsk2\thoi-gian-lich-trinh"
VOICE = "zh-CN-XiaoxiaoNeural"

audio_data = [
    ("shijian.mp3", "时间"),
    ("shijian-example.mp3", "我没有时间。"),

    ("shihou.mp3", "时候"),
    ("shihou-example.mp3", "你什么时候回家？"),

    ("yiqian.mp3", "以前"),
    ("yiqian-example.mp3", "我以前住在河内。"),

    ("yihou.mp3", "以后"),
    ("yihou-example.mp3", "下课以后我去吃饭。"),

    ("zaoshang.mp3", "早上"),
    ("zaoshang-example.mp3", "我早上六点起床。"),

    ("shangwu.mp3", "上午"),
    ("shangwu-example.mp3", "我上午有课。"),

    ("zhongwu.mp3", "中午"),
    ("zhongwu-example.mp3", "我们中午一起吃饭。"),

    ("xiawu.mp3", "下午"),
    ("xiawu-example.mp3", "下午我去图书馆。"),

    ("wanshang.mp3", "晚上"),
    ("wanshang-example.mp3", "我晚上学习汉语。"),

    ("meitian.mp3", "每天"),
    ("meitian-example.mp3", "我每天学习两个小时。"),

    ("kaishi.mp3", "开始"),
    ("kaishi-example.mp3", "电影八点开始。"),

    ("jieshu.mp3", "结束"),
    ("jieshu-example.mp3", "课程下午五点结束。"),
]

async def create_audio(filename, text):
    path = os.path.join(OUTPUT_DIR, filename)
    communicate = edge_tts.Communicate(
        text=text,
        voice=VOICE,
        rate="+0%",
        volume="+0%"
    )
    await communicate.save(path)
    print(f"Da tao: {filename}")

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for filename, text in audio_data:
        await create_audio(filename, text)

    print("\nDa tao xong 24 file audio.")
    print("Thu muc:", OUTPUT_DIR)

if __name__ == "__main__":
    asyncio.run(main())
