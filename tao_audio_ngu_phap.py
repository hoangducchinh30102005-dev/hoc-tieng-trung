import asyncio
import os
import edge_tts

VOICE = "zh-CN-XiaoxiaoNeural"

GRAMMAR = {
    1: [
        "我是学生。",
        "他是老师。",
        "她是中国人。",
        "我是学生，他是老师。",
    ],

    2: [
        "我叫小明。",
        "你叫什么名字？",
        "他叫王老师。",
        "我叫李明。",
    ],

    3: [
        "你是学生吗？",
        "你好吗？",
        "他是老师吗？",
        "你喜欢喝茶吗？",
    ],

    4: [
        "你呢？",
        "他呢？",
        "你叫什么名字呢？",
        "你的朋友呢？",
    ],

    5: [
        "这是我的书。",
        "那是你的杯子。",
        "他是我的朋友。",
        "中国的学生。",
        "我的朋友。",
        "我的家。",
    ],

    6: [
        "我不吃饭。",
        "我不喝茶。",
        "他不去学校。",
        "我不好。",
        "今天不冷。",
        "他不是学生。",
    ],

    7: [
        "我没有钱。",
        "我没有书。",
        "他没有朋友。",
        "我家没有电视。",
        "我没有吃饭。",
        "他没有去学校。",
    ],

    8: [
        "我有一本书。",
        "我有一个朋友。",
        "她有一个哥哥。",
        "我有一部手机。",
        "他有一辆车。",
        "学校有很多学生。",
        "家里有三个人。",
        "我没有车。",
    ],

    9: [
        "我在学校。",
        "他在家。",
        "老师在学校。",
        "妈妈在家。",
        "书在桌子上。",
        "我在学校学习。",
        "他在家吃饭。",
    ],

    10: [
        "这是我的书。",
        "这个人是老师。",
        "那是我的朋友。",
        "那个人是老师。",
        "哪个人是你的朋友？",
        "哪本书是你的？",
    ],

    11: [
        "你是谁？",
        "他是谁？",
        "你叫什么名字？",
        "你吃什么？",
        "这是什么？",
        "你在哪里？",
        "学校在哪里？",
    ],

    12: [
        "我很好。",
        "她很漂亮。",
        "今天很热。",
        "中国很大。",
        "这个房间很小。",
    ],

    13: [
        "我是学生，他也是学生。",
        "我喜欢喝茶，她也喜欢喝茶。",
        "我也学习汉语。",
        "我也很好。",
        "我们都是学生。",
        "他们都喜欢中国。",
        "我们都学习汉语。",
    ],

    14: [
        "三个人。",
        "一本书。",
        "一个人。",
        "三个学生。",
        "两本字典。",
        "一杯茶。",
        "两杯咖啡。",
        "这个人。",
        "那个学生。",
    ],

    15: [
        "我吃饭。",
        "我喝茶。",
        "我很好。",
        "今天很热。",
        "我今天学习汉语。",
        "我明天去学校。",
        "我在学校学习。",
        "他在家吃饭。",
        "我今天在学校学习。",
        "妈妈晚上在家吃饭。",
    ],

    16: [
        "我们走吧。",
        "我们吃饭吧。",
        "我们学习吧。",
        "我们喝茶吧。",
        "坐吧。",
        "请进吧。",
        "你是学生吧？",
        "他是老师吧？",
    ],
}


async def create_audio(lesson, index, text):
    folder = f"public/audio/grammar/hsk1/bai-{lesson}"
    os.makedirs(folder, exist_ok=True)

    filename = f"example-{index}.mp3"
    output = os.path.join(folder, filename)

    communicate = edge_tts.Communicate(
        text=text,
        voice=VOICE,
        rate="-10%"
    )

    await communicate.save(output)

    print(f"OK: Bai {lesson} - {filename}")


async def main():
    tasks = []

    for lesson, sentences in GRAMMAR.items():
        for index, sentence in enumerate(sentences, start=1):
            tasks.append(
                create_audio(
                    lesson,
                    index,
                    sentence
                )
            )

    await asyncio.gather(*tasks)

    print()
    print("======================================")
    print("DA TAO XONG AUDIO NGU PHAP HSK1")
    print("======================================")


if __name__ == "__main__":
    asyncio.run(main())