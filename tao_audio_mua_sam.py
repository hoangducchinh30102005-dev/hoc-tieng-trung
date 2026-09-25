import asyncio
import edge_tts
import os

OUT = "public/audio/hsk1/mua-sam"
VOICE = "zh-CN-XiaoxiaoNeural"

audio = {
    "mai": "买",
    "mai-example": "我要买东西。",
    "mai-dong-xi": "买东西",
    "mai-dong-xi-example": "我去买东西。",
    "dong-xi": "东西",
    "dong-xi-example": "这个东西很好。",
    "qian": "钱",
    "qian-example": "我没有钱。",
    "duo-shao": "多少",
    "duo-shao-example": "多少钱？",
    "kuai": "块",
    "kuai-example": "这个十块钱。",
    "yuan": "元",
    "yuan-example": "一元钱。",
    "gui": "贵",
    "gui-example": "这个太贵了。",
    "pian-yi": "便宜",
    "pian-yi-example": "这个很便宜。",
    "gei": "给",
    "gei-example": "给你钱。",
    "yao": "要",
    "yao-example": "我要这个。",
}

async def main():
    os.makedirs(OUT, exist_ok=True)

    for name, text in audio.items():
        path = f"{OUT}/{name}.mp3"
        print(f"Đang tạo: {name}.mp3")
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(path)

    print("\nĐã tạo xong toàn bộ audio Mua sắm!")

asyncio.run(main())