import asyncio
import edge_tts
import os

OUT = "public/audio/hsk1/do-an"
VOICE = "zh-CN-XiaoxiaoNeural"

audio = {
    "fan": "饭",
    "fan-example": "我喜欢吃饭。",
    "mian-bao": "面包",
    "mian-bao-example": "我早上吃面包。",
    "mi-fan": "米饭",
    "mi-fan-example": "我喜欢吃米饭。",
    "mian-tiao": "面条",
    "mian-tiao-example": "我喜欢吃面条。",
    "jiao-zi": "饺子",
    "jiao-zi-example": "我喜欢吃饺子。",
    "ping-guo": "苹果",
    "ping-guo-example": "我吃一个苹果。",
    "shui": "水",
    "shui-example": "我喝水。",
    "cha": "茶",
    "cha-example": "我喜欢喝茶。",
    "ka-fei": "咖啡",
    "ka-fei-example": "我喝咖啡。",
    "nai": "奶",
    "nai-example": "我喜欢喝牛奶。",
    "he": "喝",
    "he-example": "我喝水。",
    "chi": "吃",
    "chi-example": "我吃米饭。",
}

async def main():
    os.makedirs(OUT, exist_ok=True)

    for name, text in audio.items():
        path = f"{OUT}/{name}.mp3"
        print(f"Đang tạo: {name}.mp3")
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(path)

    print("\nĐã tạo xong toàn bộ audio Đồ ăn & thức uống!")

asyncio.run(main())