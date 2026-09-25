"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const words = [
  {
    id: "jia",
    chinese: "家",
    pinyin: "jiā",
    meaning: "Nhà, gia đình",
    hanviet: "Gia",
    example: "我家有五个人。",
    examplePinyin: "Wǒ jiā yǒu wǔ ge rén.",
    translation: "Nhà tôi có 5 người.",
    usage: "家 có thể chỉ ngôi nhà hoặc gia đình.",
    tip: "家 = nhà, gia đình.",
    audio: "/audio/hsk1/gia-dinh/jia.mp3",
    exampleAudio: "/audio/hsk1/gia-dinh/jia-example.mp3",
  },
  {
    id: "jiaren",
    chinese: "家人",
    pinyin: "jiā rén",
    meaning: "Người nhà, gia đình",
    hanviet: "Gia nhân",
    example: "我的家人都很好。",
    examplePinyin: "Wǒ de jiārén dōu hěn hǎo.",
    translation: "Gia đình của tôi đều rất tốt.",
    usage: "Dùng để nói về những người trong gia đình.",
    tip: "家 = nhà, 人 = người → 家人 = người trong gia đình.",
    audio: "/audio/hsk1/gia-dinh/jiaren.mp3",
    exampleAudio: "/audio/hsk1/gia-dinh/jiaren-example.mp3",
  },
  {
    id: "baba",
    chinese: "爸爸",
    pinyin: "bàba",
    meaning: "Bố, ba",
    hanviet: "",
    example: "我爸爸是老师。",
    examplePinyin: "Wǒ bàba shì lǎoshī.",
    translation: "Bố tôi là giáo viên.",
    usage: "Cách gọi bố/ba thân mật, thường dùng trong giao tiếp hằng ngày.",
    tip: "爸爸 = bố, ba.",
    audio: "/audio/hsk1/gia-dinh/baba.mp3",
    exampleAudio: "/audio/hsk1/gia-dinh/baba-example.mp3",
  },
  {
    id: "mama",
    chinese: "妈妈",
    pinyin: "māma",
    meaning: "Mẹ",
    hanviet: "",
    example: "我妈妈在家。",
    examplePinyin: "Wǒ māma zài jiā.",
    translation: "Mẹ tôi ở nhà.",
    usage: "Cách gọi mẹ thân mật trong giao tiếp hằng ngày.",
    tip: "妈妈 = mẹ.",
    audio: "/audio/hsk1/gia-dinh/mama.mp3",
    exampleAudio: "/audio/hsk1/gia-dinh/mama-example.mp3",
  },
  {
    id: "gege",
    chinese: "哥哥",
    pinyin: "gēge",
    meaning: "Anh trai",
    hanviet: "",
    example: "我哥哥是学生。",
    examplePinyin: "Wǒ gēge shì xuésheng.",
    translation: "Anh trai tôi là học sinh/sinh viên.",
    usage: "Dùng để gọi hoặc nói về anh trai.",
    tip: "哥哥 = anh trai.",
    audio: "/audio/hsk1/gia-dinh/gege.mp3",
    exampleAudio: "/audio/hsk1/gia-dinh/gege-example.mp3",
  },
  {
    id: "jiejie",
    chinese: "姐姐",
    pinyin: "jiějie",
    meaning: "Chị gái",
    hanviet: "",
    example: "我姐姐很漂亮。",
    examplePinyin: "Wǒ jiějie hěn piàoliang.",
    translation: "Chị gái tôi rất xinh.",
    usage: "Dùng để gọi hoặc nói về chị gái.",
    tip: "姐姐 = chị gái.",
    audio: "/audio/hsk1/gia-dinh/jiejie.mp3",
    exampleAudio: "/audio/hsk1/gia-dinh/jiejie-example.mp3",
  },
  {
    id: "didi",
    chinese: "弟弟",
    pinyin: "dìdi",
    meaning: "Em trai",
    hanviet: "",
    example: "我弟弟喜欢吃饭。",
    examplePinyin: "Wǒ dìdi xǐhuan chīfàn.",
    translation: "Em trai tôi thích ăn cơm.",
    usage: "Dùng để gọi hoặc nói về em trai.",
    tip: "弟弟 = em trai.",
    audio: "/audio/hsk1/gia-dinh/didi.mp3",
    exampleAudio: "/audio/hsk1/gia-dinh/didi-example.mp3",
  },
  {
    id: "meimei",
    chinese: "妹妹",
    pinyin: "mèimei",
    meaning: "Em gái",
    hanviet: "",
    example: "我妹妹今年十岁。",
    examplePinyin: "Wǒ mèimei jīnnián shí suì.",
    translation: "Em gái tôi năm nay 10 tuổi.",
    usage: "Dùng để gọi hoặc nói về em gái.",
    tip: "妹妹 = em gái.",
    audio: "/audio/hsk1/gia-dinh/meimei.mp3",
    exampleAudio: "/audio/hsk1/gia-dinh/meimei-example.mp3",
  },
  {
    id: "erzi",
    chinese: "儿子",
    pinyin: "érzi",
    meaning: "Con trai",
    hanviet: "",
    example: "他有一个儿子。",
    examplePinyin: "Tā yǒu yí ge érzi.",
    translation: "Anh ấy có một người con trai.",
    usage: "Dùng để nói về con trai của một người.",
    tip: "儿子 = con trai.",
    audio: "/audio/hsk1/gia-dinh/erzi.mp3",
    exampleAudio: "/audio/hsk1/gia-dinh/erzi-example.mp3",
  },
  {
    id: "nver",
    chinese: "女儿",
    pinyin: "nǚ'ér",
    meaning: "Con gái",
    hanviet: "",
    example: "她有一个女儿。",
    examplePinyin: "Tā yǒu yí ge nǚ'ér.",
    translation: "Cô ấy có một người con gái.",
    usage: "Dùng để nói về con gái của một người.",
    tip: "女儿 = con gái.",
    audio: "/audio/hsk1/gia-dinh/nver.mp3",
    exampleAudio: "/audio/hsk1/gia-dinh/nver-example.mp3",
  },
];

export default function GiaDinhPage() {
  const [learned, setLearned] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("hsk1-gia-dinh-learned") || "[]"
    );

    const valid = [...new Set(saved)].filter((id) =>
      words.some((word) => word.id === id)
    );

    setLearned(valid);

    localStorage.setItem(
      "hsk1-gia-dinh-learned",
      JSON.stringify(valid)
    );
  }, []);

  const markLearned = (id) => {
    setLearned((current) => {
      if (current.includes(id)) return current;

      const updated = [...current, id];

      localStorage.setItem(
        "hsk1-gia-dinh-learned",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const progress = Math.round((learned.length / words.length) * 100);

  return (
    <>
      <Navbar />

      <main className="lesson-page">
        <div className="container">

          <Link href="/hoc/hsk1" className="back-link">
            ← Quay lại HSK1
          </Link>

          <div className="lesson-header">
            <div className="lesson-label">HSK 1 • Chủ đề 3</div>

            <h1>Gia đình</h1>

            <p>
              Học những từ vựng cơ bản về gia đình và các thành viên
              trong gia đình.
            </p>
          </div>

          <div className="progress-box">
            <div className="progress-top">
              <strong>Tiến độ học</strong>

              <span>
                {learned.length}/{words.length} từ • {progress}%
              </span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="vocabulary-list">

            {words.map((word, index) => {
              const isLearned = learned.includes(word.id);

              return (
                <article className="vocabulary-card" key={word.id}>

                  <div className="word-main">

                    <div className="word-number">
                      {index + 1}
                    </div>

                    <div className="word-content">

                      <div className="word-title-row">

                        <h2>{word.chinese}</h2>

                        <button
                          className="audio-button"
                          onClick={() =>
                            document
                              .getElementById(`audio-${word.id}`)
                              ?.play()
                          }
                        >
                          🔊 Nghe
                        </button>

                        <audio
                          id={`audio-${word.id}`}
                          src={word.audio}
                          preload="none"
                        />

                      </div>

                      <div className="pinyin">
                        {word.pinyin}
                      </div>

                      <div className="meaning">
                        {word.meaning}
                      </div>

                      {word.hanviet && (
                        <div className="hanviet">
                          Hán-Việt: {word.hanviet}
                        </div>
                      )}

                    </div>
                  </div>

                  <div className="word-details">

                    <div className="detail-box">

                      <strong>💬 Ví dụ</strong>

                      <div className="example-row">

                        <span className="example-chinese">
                          {word.example}
                        </span>

                        <button
                          className="small-audio"
                          onClick={() =>
                            document
                              .getElementById(`example-${word.id}`)
                              ?.play()
                          }
                        >
                          🔊
                        </button>

                        <audio
                          id={`example-${word.id}`}
                          src={word.exampleAudio}
                          preload="none"
                        />

                      </div>

                      <div className="example-pinyin">
                        {word.examplePinyin}
                      </div>

                      <div className="translation">
                        {word.translation}
                      </div>

                    </div>

                    <div className="detail-box">

                      <strong>📝 Cách dùng</strong>

                      <p>{word.usage}</p>

                    </div>

                    <div className="tip-box">

                      <strong>💡 Mẹo ghi nhớ</strong>

                      <p>{word.tip}</p>

                    </div>

                  </div>

                  <div className="learn-action">

                    {isLearned ? (
                      <div className="learned-status">
                        ✓ Đã học từ này
                      </div>
                    ) : (
                      <button
                        className="learn-button"
                        onClick={() => markLearned(word.id)}
                      >
                        Đã học xong
                      </button>
                    )}

                  </div>

                </article>
              );
            })}

          </div>

          {learned.length === words.length && (
            <div className="completed-box">

              <div className="completed-icon">
                🎉
              </div>

              <h2>Hoàn thành chủ đề!</h2>

              <p>
                Bạn đã học xong toàn bộ 10 từ vựng của chủ đề
                “Gia đình”.
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