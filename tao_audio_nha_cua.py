import asyncio
import edge_tts
import os

OUT = "public/audio/hsk1/nha-cua"
VOICE = "zh-CN-XiaoxiaoNeural"

audio = {
    "fang-jian": "房间",
    "fang-jian-example": "这是我的房间。",
    "jia": "家",
    "jia-example": "我家很大。",
    "men": "门",
    "men-example": "请关门。",
    "chuang": "窗",
    "chuang-example": "窗户开着。",
    "zhuo-zi": "桌子",
    "zhuo-zi-example": "书在桌子上。",
    "yi-zi": "椅子",
    "yi-zi-example": "我坐在椅子上。",
    "dian-shi": "电视",
    "dian-shi-example": "我喜欢看电视。",
    "deng": "灯",
    "deng-example": "请开灯。",
    "chuang-hu": "窗户",
    "chuang-hu-example": "请打开窗户。",
    "chuang-pu": "床铺",
    "chuang-pu-example": "床铺很干净。",
    "zhuo": "桌",
    "zhuo-example": "桌上有一本书。",
}

async def main():
    os.makedirs(OUT, exist_ok=True)

    for name, text in audio.items():
        path = f"{OUT}/{name}.mp3"
        print(f"Đang tạo: {name}.mp3")
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(path)

    print("\nĐã tạo xong toàn bộ audio Nhà cửa!")

asyncio.run(main())