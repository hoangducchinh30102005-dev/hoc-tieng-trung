"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const words = [
  {
    chinese: "饭",
    pinyin: "fàn",
    meaning: "Cơm; bữa ăn",
    hanviet: "Phạn",
    usage: "Dùng để nói về cơm hoặc bữa ăn.",
    example: "我喜欢吃饭。",
    examplePinyin: "Wǒ xǐhuan chī fàn.",
    translation: "Tôi thích ăn cơm.",
    tip: "饭 thường gặp trong các cụm như 吃饭 (ăn cơm).",
    audio: "/audio/hsk1/do-an/fan.mp3",
    exampleAudio: "/audio/hsk1/do-an/fan-example.mp3",
  },
  {
    chinese: "面包",
    pinyin: "miànbāo",
    meaning: "Bánh mì",
    hanviet: "Diện bao",
    usage: "Dùng để nói về bánh mì.",
    example: "我早上吃面包。",
    examplePinyin: "Wǒ zǎoshang chī miànbāo.",
    translation: "Buổi sáng tôi ăn bánh mì.",
    tip: "面 = bột/mì, 包 = bánh/gói.",
    audio: "/audio/hsk1/do-an/mian-bao.mp3",
    exampleAudio: "/audio/hsk1/do-an/mian-bao-example.mp3",
  },
  {
    chinese: "米饭",
    pinyin: "mǐfàn",
    meaning: "Cơm",
    hanviet: "Mễ phạn",
    usage: "Dùng để chỉ cơm đã nấu.",
    example: "我喜欢吃米饭。",
    examplePinyin: "Wǒ xǐhuan chī mǐfàn.",
    translation: "Tôi thích ăn cơm.",
    tip: "米 = gạo, 饭 = cơm.",
    audio: "/audio/hsk1/do-an/mi-fan.mp3",
    exampleAudio: "/audio/hsk1/do-an/mi-fan-example.mp3",
  },
  {
    chinese: "面条",
    pinyin: "miàntiáo",
    meaning: "Mì, mì sợi",
    hanviet: "Diện điều",
    usage: "Dùng để nói về các món mì sợi.",
    example: "我喜欢吃面条。",
    examplePinyin: "Wǒ xǐhuan chī miàntiáo.",
    translation: "Tôi thích ăn mì.",
    tip: "面条 là mì sợi.",
    audio: "/audio/hsk1/do-an/mian-tiao.mp3",
    exampleAudio: "/audio/hsk1/do-an/mian-tiao-example.mp3",
  },
  {
    chinese: "饺子",
    pinyin: "jiǎozi",
    meaning: "Bánh chẻo",
    hanviet: "Giảo tử",
    usage: "Dùng để nói về món bánh chẻo Trung Quốc.",
    example: "我喜欢吃饺子。",
    examplePinyin: "Wǒ xǐhuan chī jiǎozi.",
    translation: "Tôi thích ăn bánh chẻo.",
    tip: "饺子 là món ăn rất phổ biến ở Trung Quốc.",
    audio: "/audio/hsk1/do-an/jiao-zi.mp3",
    exampleAudio: "/audio/hsk1/do-an/jiao-zi-example.mp3",
  },
  {
    chinese: "苹果",
    pinyin: "píngguǒ",
    meaning: "Quả táo",
    hanviet: "Bình quả",
    usage: "Dùng để nói về quả táo.",
    example: "我吃一个苹果。",
    examplePinyin: "Wǒ chī yí ge píngguǒ.",
    translation: "Tôi ăn một quả táo.",
    tip: "苹果 = quả táo.",
    audio: "/audio/hsk1/do-an/ping-guo.mp3",
    exampleAudio: "/audio/hsk1/do-an/ping-guo-example.mp3",
  },
  {
    chinese: "水",
    pinyin: "shuǐ",
    meaning: "Nước",
    hanviet: "Thủy",
    usage: "Dùng để nói về nước.",
    example: "我喝水。",
    examplePinyin: "Wǒ hē shuǐ.",
    translation: "Tôi uống nước.",
    tip: "水 = nước; Hán-Việt: Thủy.",
    audio: "/audio/hsk1/do-an/shui.mp3",
    exampleAudio: "/audio/hsk1/do-an/shui-example.mp3",
  },
  {
    chinese: "茶",
    pinyin: "chá",
    meaning: "Trà",
    hanviet: "Trà",
    usage: "Dùng để nói về trà.",
    example: "我喜欢喝茶。",
    examplePinyin: "Wǒ xǐhuan hē chá.",
    translation: "Tôi thích uống trà.",
    tip: "茶 = trà.",
    audio: "/audio/hsk1/do-an/cha.mp3",
    exampleAudio: "/audio/hsk1/do-an/cha-example.mp3",
  },
  {
    chinese: "咖啡",
    pinyin: "kāfēi",
    meaning: "Cà phê",
    hanviet: "",
    usage: "Dùng để nói về cà phê.",
    example: "我喝咖啡。",
    examplePinyin: "Wǒ hē kāfēi.",
    translation: "Tôi uống cà phê.",
    tip: "咖啡 là từ phiên âm, không cần học Hán-Việt.",
    audio: "/audio/hsk1/do-an/ka-fei.mp3",
    exampleAudio: "/audio/hsk1/do-an/ka-fei-example.mp3",
  },
  {
    chinese: "奶",
    pinyin: "nǎi",
    meaning: "Sữa",
    hanviet: "Nãi",
    usage: "Dùng để nói về sữa.",
    example: "我喜欢喝牛奶。",
    examplePinyin: "Wǒ xǐhuan hē niúnǎi.",
    translation: "Tôi thích uống sữa.",
    tip: "牛奶 = sữa bò.",
    audio: "/audio/hsk1/do-an/nai.mp3",
    exampleAudio: "/audio/hsk1/do-an/nai-example.mp3",
  },
  {
    chinese: "喝",
    pinyin: "hē",
    meaning: "Uống",
    hanviet: "Hát",
    usage: "Động từ chỉ hành động uống.",
    example: "我喝水。",
    examplePinyin: "Wǒ hē shuǐ.",
    translation: "Tôi uống nước.",
    tip: "喝 + đồ uống = uống cái gì.",
    audio: "/audio/hsk1/do-an/he.mp3",
    exampleAudio: "/audio/hsk1/do-an/he-example.mp3",
  },
  {
    chinese: "吃",
    pinyin: "chī",
    meaning: "Ăn",
    hanviet: "Ngật",
    usage: "Động từ chỉ hành động ăn.",
    example: "我吃米饭。",
    examplePinyin: "Wǒ chī mǐfàn.",
    translation: "Tôi ăn cơm.",
    tip: "吃 + món ăn = ăn món gì.",
    audio: "/audio/hsk1/do-an/chi.mp3",
    exampleAudio: "/audio/hsk1/do-an/chi-example.mp3",
  },
];

export default function DoAnPage() {
  const [learned, setLearned] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("hsk1-do-an-learned") || "[]"
    );
    setLearned(saved);
  }, []);

  const markLearned = (index) => {
    if (learned.includes(index)) return;

    const updated = [...learned, index];
    setLearned(updated);

    localStorage.setItem(
      "hsk1-do-an-learned",
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

            <h1>Đồ ăn & thức uống</h1>

            <p>
              Học các từ vựng cơ bản về đồ ăn và thức uống.
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
                      <strong>Nghĩa:</strong>{" "}
                      {word.meaning}
                    </div>

                    {word.hanviet && (
                      <div className="hanviet">
                        <strong>Hán-Việt:</strong>{" "}
                        {word.hanviet}
                      </div>
                    )}

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
                          onClick={() =>
                            markLearned(index)
                          }
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
                Bạn đã học xong toàn bộ 13 từ vựng
                về đồ ăn và thức uống.
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