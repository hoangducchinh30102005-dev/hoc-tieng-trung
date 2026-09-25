import asyncio
import edge_tts
import os

OUT = "public/audio/hsk1/gioi-thieu-ban-than"
VOICE = "zh-CN-XiaoxiaoNeural"

audio = {
    "wo": "我",
    "wo-example": "我叫小明。",
    "ni": "你",
    "ni-example": "你是学生吗？",
    "wo-jiao": "我叫",
    "wo-jiao-example": "我叫李明。",
    "jiao": "叫",
    "jiao-example": "我叫小王。",
    "mingzi": "名字",
    "mingzi-example": "我的名字叫小华。",
    "xuesheng": "学生",
    "xuesheng-example": "我是学生。",
    "laoshi-example": "她是老师。",
    "zhongguo": "中国",
    "zhongguo-example": "我是中国人。",
    "ren": "人",
    "ren-example": "我是越南人。",
    "pengyou": "朋友",
    "pengyou-example": "他是我的朋友。",
}

async def main():
    os.makedirs(OUT, exist_ok=True)

    for name, text in audio.items():
        path = f"{OUT}/{name}.mp3"
        print(f"Đang tạo: {name}.mp3")
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(path)

    print("\nĐã tạo xong toàn bộ audio!")

asyncio.run(main())