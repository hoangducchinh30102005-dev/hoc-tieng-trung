import asyncio
import os
import edge_tts

VOICE = "zh-CN-XiaoxiaoNeural"

WORDS = [
    "我", "你", "他", "她", "我们", "他们",
    "是", "叫", "什么", "名字", "学生", "老师",
    "中国", "中国人", "朋友", "人",
    "吗", "呢", "的", "不", "没有", "有", "在",
    "这", "那", "哪", "谁", "哪里",
    "很", "好", "漂亮", "热", "冷", "大", "小",
    "也", "都",
    "个", "本", "杯",
    "书", "杯子", "这个", "那个",
    "这个人", "那个人", "哪个", "哪本",
    "吃", "喝", "茶", "饭", "咖啡",
    "去", "学校", "学习", "汉语",
    "家", "家里", "电视", "桌子", "上",
    "手机", "车", "很多",
    "字典",
    "三", "一", "两", "二",
    "走", "坐", "请", "进", "吧",
    "今天", "明天", "晚上"
]


async def create_audio(word):
    folder = "public/audio/grammar/hsk1/words"
    os.makedirs(folder, exist_ok=True)

    output = os.path.join(folder, f"{word}.mp3")

    communicate = edge_tts.Communicate(
        word,
        VOICE,
        rate="-10%"
    )

    await communicate.save(output)

    print(f"OK: {word}.mp3")


async def main():
    tasks = [
        create_audio(word)
        for word in WORDS
    ]

    await asyncio.gather(*tasks)

    print()
    print("==============================")
    print("DA TAO XONG AUDIO TU")
    print("==============================")


if __name__ == "__main__":
    asyncio.run(main())