import asyncio
import edge_tts
import os

OUT = "public/audio/hsk1/thoi-tiet"
VOICE = "zh-CN-XiaoxiaoNeural"

audio = {
    "tian-qi": "天气",
    "tian-qi-example": "今天天气很好。",
    "re": "热",
    "re-example": "今天很热。",
    "leng": "冷",
    "leng-example": "今天很冷。",
    "hao": "好",
    "hao-example": "今天天气很好。",
    "xia-yu": "下雨",
    "xia-yu-example": "今天下雨了。",
    "xue": "雪",
    "xue-example": "下雪了。",
    "feng": "风",
    "feng-example": "今天风很大。",
    "tai-yang": "太阳",
    "tai-yang-example": "太阳出来了。",
    "tian-qing": "天晴",
    "tian-qing-example": "今天天晴了。",
    "yin": "阴",
    "yin-example": "今天是阴天。",
    "du-wen": "度",
    "du-wen-example": "今天三十度。",
}

async def main():
    os.makedirs(OUT, exist_ok=True)

    for name, text in audio.items():
        path = f"{OUT}/{name}.mp3"
        print(f"Đang tạo: {name}.mp3")
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(path)

    print("\nĐã tạo xong toàn bộ audio Thời tiết!")

asyncio.run(main())