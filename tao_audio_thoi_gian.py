import asyncio
import edge_tts
import os

OUT = "public/audio/hsk1/thoi-gian"
VOICE = "zh-CN-XiaoxiaoNeural"

audio = {
    "jin-tian": "今天",
    "jin-tian-example": "今天星期一。",
    "ming-tian": "明天",
    "ming-tian-example": "明天我去学校。",
    "zuo-tian": "昨天",
    "zuo-tian-example": "昨天我很忙。",
    "xian-zai": "现在",
    "xian-zai-example": "现在几点？",
    "dian": "点",
    "dian-example": "现在三点。",
    "fen": "分",
    "fen-example": "现在三点十分。",
    "nian": "年",
    "nian-example": "今年是二零二六年。",
    "yue": "月",
    "yue-example": "现在是九月。",
    "hao": "号",
    "hao-example": "今天是二十五号。",
    "xing-qi": "星期",
    "xing-qi-example": "今天星期五。",
    "zao-shang": "早上",
    "zao-shang-example": "我早上七点起床。",
    "wan-shang": "晚上",
    "wan-shang-example": "我晚上十点睡觉。",
}

async def main():
    os.makedirs(OUT, exist_ok=True)

    for name, text in audio.items():
        path = f"{OUT}/{name}.mp3"
        print(f"Đang tạo: {name}.mp3")
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(path)

    print("\nĐã tạo xong toàn bộ audio Thời gian!")

asyncio.run(main())