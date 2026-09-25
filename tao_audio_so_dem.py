import asyncio
import edge_tts
import os

OUT = "public/audio/hsk1/so-dem"
VOICE = "zh-CN-XiaoxiaoNeural"

audio = {
    "ling": "零",
    "ling-example": "零是数字零。",
    "yi": "一",
    "yi-example": "我有一本书。",
    "er": "二",
    "er-example": "我有两个朋友。",
    "san": "三",
    "san-example": "我有三个苹果。",
    "si": "四",
    "si-example": "今天是四号。",
    "wu": "五",
    "wu-example": "我有五本书。",
    "liu": "六",
    "liu-example": "现在六点。",
    "qi": "七",
    "qi-example": "我七点起床。",
    "ba": "八",
    "ba-example": "现在八点。",
    "jiu": "九",
    "jiu-example": "我九点上课。",
    "shi": "十",
    "shi-example": "我有十个学生。",
}

async def main():
    os.makedirs(OUT, exist_ok=True)

    for name, text in audio.items():
        path = f"{OUT}/{name}.mp3"
        print(f"Đang tạo: {name}.mp3")
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(path)

    print("\nĐã tạo xong toàn bộ audio Số đếm!")

asyncio.run(main())