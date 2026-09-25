import asyncio
import edge_tts
import os

OUT = "public/audio/hsk1/giao-tiep"
VOICE = "zh-CN-XiaoxiaoNeural"

audio = {
    "qing": "请",
    "qing-example": "请坐。",
    "dui-bu-qi": "对不起",
    "dui-bu-qi-example": "对不起，我迟到了。",
    "mei-guan-xi": "没关系",
    "mei-guan-xi-example": "没关系。",
    "hao-ma": "好吗",
    "hao-ma-example": "我们一起去，好吗？",
    "hao": "好",
    "hao-example": "好，我知道了。",
    "bu": "不",
    "bu-example": "我不去。",
    "shi": "是",
    "shi-example": "我是学生。",
    "bu-shi": "不是",
    "bu-shi-example": "我不是老师。",
    "you": "有",
    "you-example": "我有一个朋友。",
    "mei-you": "没有",
    "mei-you-example": "我没有钱。",
    "zai": "在",
    "zai-example": "我在家。",
    "qu": "去",
    "qu-example": "我去学校。",
}

async def main():
    os.makedirs(OUT, exist_ok=True)

    for name, text in audio.items():
        path = f"{OUT}/{name}.mp3"
        print(f"Đang tạo: {name}.mp3")
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(path)

    print("\nĐã tạo xong toàn bộ audio Giao tiếp!")

asyncio.run(main())