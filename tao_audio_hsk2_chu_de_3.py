import asyncio
from pathlib import Path
import edge_tts

# Tao 24 file audio tieng Trung cho HSK2 - Chu de 3
# Chay script nay tai thu muc goc project: D:\web\hoc-tieng-trung

OUTPUT_DIR = Path("public/audio/hsk2/thoi-gian-lich-trinh")
VOICE = "zh-CN-XiaoxiaoNeural"
RATE = "-5%"

items = [
    ("shijian", "时间", "我没有时间。"),
    ("shihou", "时候", "你什么时候回家？"),
    ("yiqian", "以前", "我以前住在河内。"),
    ("yihou", "以后", "下课以后我去吃饭。"),
    ("zaoshang", "早上", "我早上六点起床。"),
    ("shangwu", "上午", "我上午有课。"),
    ("zhongwu", "中午", "我们中午一起吃饭。"),
    ("xiawu", "下午", "下午我去图书馆。"),
    ("wanshang", "晚上", "我晚上学习汉语。"),
    ("meitian", "每天", "我每天学习两个小时。"),
    ("kaishi", "开始", "电影八点开始。"),
    ("jieshu", "结束", "课程下午五点结束。"),
]

async def save_audio(text: str, output_file: Path):
    communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
    await communicate.save(str(output_file))
    print(f"Da tao: {output_file}")

async def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for key, word, example in items:
        await save_audio(word, OUTPUT_DIR / f"{key}.mp3")
        await save_audio(example, OUTPUT_DIR / f"{key}-example.mp3")

    print(f"\nHoan tat: {len(items) * 2} file MP3")
    print(f"Thu muc: {OUTPUT_DIR.resolve()}")

if __name__ == "__main__":
    asyncio.run(main())
