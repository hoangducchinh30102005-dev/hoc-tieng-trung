"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const words = [
  {
    chinese: "房间",
    pinyin: "fángjiān",
    meaning: "Phòng",
    hanviet: "Phòng gian",
    usage: "Dùng để nói về một căn phòng.",
    example: "这是我的房间。",
    examplePinyin: "Zhè shì wǒ de fángjiān.",
    translation: "Đây là phòng của tôi.",
    tip: "房 = phòng, 间 = gian.",
    audio: "/audio/hsk1/nha-cua/fang-jian.mp3",
    exampleAudio: "/audio/hsk1/nha-cua/fang-jian-example.mp3",
  },
  {
    chinese: "家",
    pinyin: "jiā",
    meaning: "Nhà; gia đình",
    hanviet: "Gia",
    usage: "Dùng để nói về nhà hoặc gia đình.",
    example: "我家很大。",
    examplePinyin: "Wǒ jiā hěn dà.",
    translation: "Nhà tôi rất lớn.",
    tip: "家 có thể mang nghĩa nhà hoặc gia đình.",
    audio: "/audio/hsk1/nha-cua/jia.mp3",
    exampleAudio: "/audio/hsk1/nha-cua/jia-example.mp3",
  },
  {
    chinese: "门",
    pinyin: "mén",
    meaning: "Cửa",
    hanviet: "Môn",
    usage: "Dùng để nói về cửa ra vào.",
    example: "请关门。",
    examplePinyin: "Qǐng guān mén.",
    translation: "Xin hãy đóng cửa.",
    tip: "门 = cửa; Hán-Việt: Môn.",
    audio: "/audio/hsk1/nha-cua/men.mp3",
    exampleAudio: "/audio/hsk1/nha-cua/men-example.mp3",
  },
  {
    chinese: "窗",
    pinyin: "chuāng",
    meaning: "Cửa sổ",
    hanviet: "Song",
    usage: "Dùng để nói về cửa sổ.",
    example: "窗户开着。",
    examplePinyin: "Chuānghu kāizhe.",
    translation: "Cửa sổ đang mở.",
    tip: "窗 = cửa sổ.",
    audio: "/audio/hsk1/nha-cua/chuang.mp3",
    exampleAudio: "/audio/hsk1/nha-cua/chuang-example.mp3",
  },
  {
    chinese: "桌子",
    pinyin: "zhuōzi",
    meaning: "Cái bàn",
    hanviet: "Trác tử",
    usage: "Dùng để nói về cái bàn.",
    example: "书在桌子上。",
    examplePinyin: "Shū zài zhuōzi shàng.",
    translation: "Sách ở trên bàn.",
    tip: "桌子 là cách nói thông dụng cho cái bàn.",
    audio: "/audio/hsk1/nha-cua/zhuo-zi.mp3",
    exampleAudio: "/audio/hsk1/nha-cua/zhuo-zi-example.mp3",
  },
  {
    chinese: "椅子",
    pinyin: "yǐzi",
    meaning: "Cái ghế",
    hanviet: "Ỷ tử",
    usage: "Dùng để nói về cái ghế.",
    example: "我坐在椅子上。",
    examplePinyin: "Wǒ zuò zài yǐzi shàng.",
    translation: "Tôi ngồi trên ghế.",
    tip: "椅子 = cái ghế.",
    audio: "/audio/hsk1/nha-cua/yi-zi.mp3",
    exampleAudio: "/audio/hsk1/nha-cua/yi-zi-example.mp3",
  },
  {
    chinese: "电视",
    pinyin: "diànshì",
    meaning: "Tivi; truyền hình",
    hanviet: "Điện thị",
    usage: "Dùng để nói về tivi hoặc truyền hình.",
    example: "我喜欢看电视。",
    examplePinyin: "Wǒ xǐhuan kàn diànshì.",
    translation: "Tôi thích xem tivi.",
    tip: "电 = điện, 视 = nhìn/xem.",
    audio: "/audio/hsk1/nha-cua/dian-shi.mp3",
    exampleAudio: "/audio/hsk1/nha-cua/dian-shi-example.mp3",
  },
  {
    chinese: "灯",
    pinyin: "dēng",
    meaning: "Đèn",
    hanviet: "Đăng",
    usage: "Dùng để nói về đèn.",
    example: "请开灯。",
    examplePinyin: "Qǐng kāi dēng.",
    translation: "Xin hãy bật đèn.",
    tip: "灯 = đèn.",
    audio: "/audio/hsk1/nha-cua/deng.mp3",
    exampleAudio: "/audio/hsk1/nha-cua/deng-example.mp3",
  },
  {
    chinese: "窗户",
    pinyin: "chuānghu",
    meaning: "Cửa sổ",
    hanviet: "Song hộ",
    usage: "Cách nói đầy đủ và rất thông dụng của cửa sổ.",
    example: "请打开窗户。",
    examplePinyin: "Qǐng dǎkāi chuānghu.",
    translation: "Xin hãy mở cửa sổ.",
    tip: "窗户 là từ thông dụng hơn 窗 trong giao tiếp.",
    audio: "/audio/hsk1/nha-cua/chuang-hu.mp3",
    exampleAudio: "/audio/hsk1/nha-cua/chuang-hu-example.mp3",
  },
  {
    chinese: "床铺",
    pinyin: "chuángpù",
    meaning: "Giường; chỗ ngủ",
    hanviet: "Sàng phô",
    usage: "Dùng để nói về giường hoặc chỗ ngủ.",
    example: "床铺很干净。",
    examplePinyin: "Chuángpù hěn gānjìng.",
    translation: "Giường rất sạch.",
    tip: "床 = giường.",
    audio: "/audio/hsk1/nha-cua/chuang-pu.mp3",
    exampleAudio: "/audio/hsk1/nha-cua/chuang-pu-example.mp3",
  },
  {
    chinese: "桌",
    pinyin: "zhuō",
    meaning: "Bàn",
    hanviet: "Trác",
    usage: "Dạng ngắn của 桌子, dùng để nói về cái bàn.",
    example: "桌上有一本书。",
    examplePinyin: "Zhuō shàng yǒu yì běn shū.",
    translation: "Trên bàn có một quyển sách.",
    tip: "桌子 là dạng đầy đủ và thông dụng hơn trong HSK1.",
    audio: "/audio/hsk1/nha-cua/zhuo.mp3",
    exampleAudio: "/audio/hsk1/nha-cua/zhuo-example.mp3",
  },
];

export default function NhaCuaPage() {
  const [learned, setLearned] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("hsk1-nha-cua-learned") || "[]"
    );
    setLearned(saved);
  }, []);

  const markLearned = (index) => {
    if (learned.includes(index)) return;

    const updated = [...learned, index];
    setLearned(updated);

    localStorage.setItem(
      "hsk1-nha-cua-learned",
      JSON.stringify(updated)
    );
  };

  const progress = Math.round((learned.length / words.length) * 100);

  return (
    <>
      <Navbar />

      <main className="lesson-page">
        <div className="container">

          <div className="lesson-header">
            <Link href="/hoc/hsk1" className="back-link">
              ← Quay lại HSK1
            </Link>

            <div className="lesson-label">HSK1 • Từ vựng</div>

            <h1>Nhà cửa</h1>

            <p>
              Học các từ vựng cơ bản về nhà cửa và đồ vật trong nhà.
            </p>
          </div>

          <div className="progress-box">
            <div className="progress-top">
              <strong>
                Tiến độ: {learned.length}/{words.length} từ
              </strong>
              <span>{progress}%</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="vocabulary-list">
            {words.map((word, index) => (
              <div className="vocabulary-card" key={word.chinese}>
                <div className="word-main">

                  <div className="word-number">
                    {index + 1}
                  </div>

                  <div className="word-content">

                    <div className="word-title-row">
                      <h2>{word.chinese}</h2>

                      <span className="pinyin">
                        {word.pinyin}
                      </span>

                      <button
                        className="audio-button"
                        onClick={() =>
                          new Audio(word.audio).play()
                        }
                      >
                        🔊 Nghe
                      </button>
                    </div>

                    <div className="meaning">
                      <strong>Nghĩa:</strong> {word.meaning}
                    </div>

                    <div className="hanviet">
                      <strong>Hán-Việt:</strong> {word.hanviet}
                    </div>

                    <div className="word-details">

                      <div className="detail-box">
                        <strong>Cách dùng</strong>
                        <p>{word.usage}</p>
                      </div>

                      <div className="detail-box">
                        <strong>Ví dụ</strong>

                        <p className="example-chinese">
                          {word.example}
                        </p>

                        <p>{word.examplePinyin}</p>

                        <p>{word.translation}</p>

                        <button
                          className="audio-button small-audio"
                          onClick={() =>
                            new Audio(
                              word.exampleAudio
                            ).play()
                          }
                        >
                          🔊 Nghe câu ví dụ
                        </button>
                      </div>

                      <div className="tip-box">
                        <strong>💡 Mẹo nhớ</strong>
                        <p>{word.tip}</p>
                      </div>

                    </div>

                    <div className="learn-action">
                      {learned.includes(index) ? (
                        <div className="learned-status">
                          ✓ Đã học từ này
                        </div>
                      ) : (
                        <button
                          className="learn-button"
                          onClick={() => markLearned(index)}
                        >
                          Đã học xong
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {learned.length === words.length && (
            <div className="completed-box">
              <div className="completed-icon">🎉</div>

              <h2>Hoàn thành bài học!</h2>

              <p>
                Bạn đã học xong toàn bộ 11 từ vựng về nhà cửa.
              </p>

              <Link
                href="/hoc/hsk1"
                className="back-topic-button"
              >
                ← Quay lại danh sách chủ đề
              </Link>
            </div>
          )}

        </div>
      </main>
    </>
  );
}