import asyncio
import edge_tts
import os

OUT = "public/audio/hsk1/gia-dinh"
VOICE = "zh-CN-XiaoxiaoNeural"

audio = {
    "jia": "家",
    "jia-example": "我家有五个人。",
    
    "jiaren": "家人",
    "jiaren-example": "我的家人都很好。",
    
    "baba": "爸爸",
    "baba-example": "我爸爸是老师。",
    
    "mama": "妈妈",
    "mama-example": "我妈妈在家。",
    
    "gege": "哥哥",
    "gege-example": "我哥哥是学生。",
    
    "jiejie": "姐姐",
    "jiejie-example": "我姐姐很漂亮。",
    
    "didi": "弟弟",
    "didi-example": "我弟弟喜欢吃饭。",
    
    "meimei": "妹妹",
    "meimei-example": "我妹妹今年十岁。",
    
    "erzi": "儿子",
    "erzi-example": "他有一个儿子。",
    
    "nver": "女儿",
    "nver-example": "她有一个女儿。",
}

async def main():
    os.makedirs(OUT, exist_ok=True)

    for name, text in audio.items():
        path = f"{OUT}/{name}.mp3"
        print(f"Đang tạo: {name}.mp3")
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(path)

    print("\nĐã tạo xong toàn bộ audio Gia đình!")

asyncio.run(main())