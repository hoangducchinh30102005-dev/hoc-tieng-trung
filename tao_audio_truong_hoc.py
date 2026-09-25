import asyncio
import edge_tts
import os

OUT = "public/audio/hsk1/truong-hoc"
VOICE = "zh-CN-XiaoxiaoNeural"

audio = {
    "xue-xiao": "学校",
    "xue-xiao-example": "我去学校。",
    "xue-sheng": "学生",
    "xue-sheng-example": "我是学生。",
    "lao-shi": "老师",
    "lao-shi-example": "她是老师。",
    "tong-xue": "同学",
    "tong-xue-example": "他是我的同学。",
    "shu": "书",
    "shu-example": "这是我的书。",
    "zi-dian": "字典",
    "zi-dian-example": "这是一本字典。",
    "ben": "本",
    "ben-example": "我有三本书。",
    "zi": "字",
    "zi-example": "这个字很难。",
    "xie": "写",
    "xie-example": "我写汉字。",
    "du": "读",
    "du-example": "我读书。",
    "xue": "学",
    "xue-example": "我学习中文。",
    "han-zi": "汉字",
    "han-zi-example": "我喜欢汉字。",
}

async def main():
    os.makedirs(OUT, exist_ok=True)

    for name, text in audio.items():
        path = f"{OUT}/{name}.mp3"
        print(f"Đang tạo: {name}.mp3")
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(path)

    print("\nĐã tạo xong toàn bộ audio Trường học!")

asyncio.run(main())