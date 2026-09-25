"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const words = [
  {
    id: "wo",
    chinese: "我",
    pinyin: "wǒ",
    meaning: "Tôi",
    hanviet: "Ngã",
    example: "我叫小明。",
    examplePinyin: "Wǒ jiào Xiǎo Míng.",
    translation: "Tôi tên là Tiểu Minh.",
    usage: "Dùng để nói về bản thân người nói.",
    tip: "我 = tôi, bản thân mình.",
    audio: "/audio/hsk1/gioi-thieu-ban-than/wo.mp3",
    exampleAudio: "/audio/hsk1/gioi-thieu-ban-than/wo-example.mp3",
  },
  {
    id: "ni",
    chinese: "你",
    pinyin: "nǐ",
    meaning: "Bạn",
    hanviet: "Nhĩ",
    example: "你是学生吗？",
    examplePinyin: "Nǐ shì xuésheng ma?",
    translation: "Bạn là học sinh/sinh viên phải không?",
    usage: "Dùng để gọi hoặc nói về người đối diện.",
    tip: "你 = bạn, cậu, anh, chị...",
    audio: "/audio/hsk1/gioi-thieu-ban-than/ni.mp3",
    exampleAudio: "/audio/hsk1/gioi-thieu-ban-than/ni-example.mp3",
  },
  {
    id: "wo-jiao",
    chinese: "我叫",
    pinyin: "wǒ jiào",
    meaning: "Tôi tên là",
    hanviet: "",
    example: "我叫李明。",
    examplePinyin: "Wǒ jiào Lǐ Míng.",
    translation: "Tôi tên là Lý Minh.",
    usage: "Dùng để giới thiệu tên của mình.",
    tip: "我叫 + tên.",
    audio: "/audio/hsk1/gioi-thieu-ban-than/wo-jiao.mp3",
    exampleAudio: "/audio/hsk1/gioi-thieu-ban-than/wo-jiao-example.mp3",
  },
  {
    id: "jiao",
    chinese: "叫",
    pinyin: "jiào",
    meaning: "Tên là; gọi là",
    hanviet: "Khiếu",
    example: "我叫小王。",
    examplePinyin: "Wǒ jiào Xiǎo Wáng.",
    translation: "Tôi tên là Tiểu Vương.",
    usage: "Dùng để nói tên của một người.",
    tip: "Tên + 叫 có thể dùng để hỏi hoặc nói tên.",
    audio: "/audio/hsk1/gioi-thieu-ban-than/jiao.mp3",
    exampleAudio: "/audio/hsk1/gioi-thieu-ban-than/jiao-example.mp3",
  },
  {
    id: "mingzi",
    chinese: "名字",
    pinyin: "míng zi",
    meaning: "Tên",
    hanviet: "Danh tự",
    example: "我的名字叫小华。",
    examplePinyin: "Wǒ de míngzi jiào Xiǎo Huá.",
    translation: "Tên của tôi là Tiểu Hoa.",
    usage: "名字 nghĩa là tên của một người.",
    tip: "我的名字 = tên của tôi.",
    audio: "/audio/hsk1/gioi-thieu-ban-than/mingzi.mp3",
    exampleAudio: "/audio/hsk1/gioi-thieu-ban-than/mingzi-example.mp3",
  },
  {
    id: "xuesheng",
    chinese: "学生",
    pinyin: "xué sheng",
    meaning: "Học sinh; sinh viên",
    hanviet: "Học sinh",
    example: "我是学生。",
    examplePinyin: "Wǒ shì xuésheng.",
    translation: "Tôi là học sinh/sinh viên.",
    usage: "Dùng để nói về người đang học tập.",
    tip: "学 = học, 生 = người → 学生 = người học.",
    audio: "/audio/hsk1/gioi-thieu-ban-than/xuesheng.mp3",
    exampleAudio: "/audio/hsk1/gioi-thieu-ban-than/xuesheng-example.mp3",
  },
  {
    id: "laoshi",
    chinese: "老师",
    pinyin: "lǎo shī",
    meaning: "Giáo viên",
    hanviet: "Lão sư",
    example: "她是老师。",
    examplePinyin: "Tā shì lǎoshī.",
    translation: "Cô ấy là giáo viên.",
    usage: "老师 là cách gọi giáo viên hoặc thầy cô.",
    tip: "Có thể dùng 老师 để gọi trực tiếp thầy/cô.",
    audio: "/audio/hsk1/gioi-thieu-ban-than/laoshi.mp3",
    exampleAudio: "/audio/hsk1/gioi-thieu-ban-than/laoshi-example.mp3",
  },
  {
    id: "zhongguo",
    chinese: "中国",
    pinyin: "Zhōngguó",
    meaning: "Trung Quốc",
    hanviet: "Trung Quốc",
    example: "我是中国人。",
    examplePinyin: "Wǒ shì Zhōngguó rén.",
    translation: "Tôi là người Trung Quốc.",
    usage: "Tên quốc gia Trung Quốc.",
    tip: "中国人 = người Trung Quốc.",
    audio: "/audio/hsk1/gioi-thieu-ban-than/zhongguo.mp3",
    exampleAudio: "/audio/hsk1/gioi-thieu-ban-than/zhongguo-example.mp3",
  },
  {
    id: "ren",
    chinese: "人",
    pinyin: "rén",
    meaning: "Người",
    hanviet: "Nhân",
    example: "我是越南人。",
    examplePinyin: "Wǒ shì Yuènán rén.",
    translation: "Tôi là người Việt Nam.",
    usage: "Dùng để chỉ người hoặc kết hợp với tên quốc gia để nói quốc tịch.",
    tip: "越南人 = người Việt Nam.",
    audio: "/audio/hsk1/gioi-thieu-ban-than/ren.mp3",
    exampleAudio: "/audio/hsk1/gioi-thieu-ban-than/ren-example.mp3",
  },
  {
    id: "pengyou",
    chinese: "朋友",
    pinyin: "péng you",
    meaning: "Bạn bè",
    hanviet: "Bằng hữu",
    example: "他是我的朋友。",
    examplePinyin: "Tā shì wǒ de péngyou.",
    translation: "Anh ấy là bạn của tôi.",
    usage: "Dùng để nói về bạn bè hoặc một người bạn.",
    tip: "我的朋友 = bạn của tôi.",
    audio: "/audio/hsk1/gioi-thieu-ban-than/pengyou.mp3",
    exampleAudio: "/audio/hsk1/gioi-thieu-ban-than/pengyou-example.mp3",
  },
];

export default function GioiThieuBanThanPage() {
  const [learned, setLearned] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("hsk1-gioi-thieu-ban-than-learned") || "[]"
    );

    const valid = [...new Set(saved)].filter((id) =>
      words.some((word) => word.id === id)
    );

    setLearned(valid);
    localStorage.setItem(
      "hsk1-gioi-thieu-ban-than-learned",
      JSON.stringify(valid)
    );
  }, []);

  const markLearned = (id) => {
    setLearned((current) => {
      if (current.includes(id)) return current;

      const updated = [...current, id];

      localStorage.setItem(
        "hsk1-gioi-thieu-ban-than-learned",
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
            <div className="lesson-label">HSK 1 • Chủ đề 2</div>

            <h1>Giới thiệu bản thân</h1>

            <p>
              Học những từ vựng cơ bản để giới thiệu tên, bản thân,
              nghề nghiệp và bạn bè.
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
                            document.getElementById(`audio-${word.id}`)?.play()
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
              <div className="completed-icon">🎉</div>

              <h2>Hoàn thành chủ đề!</h2>

              <p>
                Bạn đã học xong toàn bộ 10 từ vựng của chủ đề
                “Giới thiệu bản thân”.
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