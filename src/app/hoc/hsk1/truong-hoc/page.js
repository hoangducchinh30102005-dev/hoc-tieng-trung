"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const words = [
  {
    chinese: "学校",
    pinyin: "xuéxiào",
    meaning: "Trường học",
    hanviet: "Học hiệu",
    usage: "Dùng để nói về trường học.",
    example: "我去学校。",
    examplePinyin: "Wǒ qù xuéxiào.",
    translation: "Tôi đi đến trường.",
    tip: "学 = học, 校 = trường.",
    audio: "/audio/hsk1/truong-hoc/xue-xiao.mp3",
    exampleAudio: "/audio/hsk1/truong-hoc/xue-xiao-example.mp3",
  },
  {
    chinese: "学生",
    pinyin: "xuésheng",
    meaning: "Học sinh; sinh viên",
    hanviet: "Học sinh",
    usage: "Dùng để chỉ người đang học tại trường.",
    example: "我是学生。",
    examplePinyin: "Wǒ shì xuésheng.",
    translation: "Tôi là học sinh/sinh viên.",
    tip: "学 = học, 生 = người/sinh → 学生.",
    audio: "/audio/hsk1/truong-hoc/xue-sheng.mp3",
    exampleAudio: "/audio/hsk1/truong-hoc/xue-sheng-example.mp3",
  },
  {
    chinese: "老师",
    pinyin: "lǎoshī",
    meaning: "Giáo viên",
    hanviet: "Lão sư",
    usage: "Dùng để gọi hoặc nói về giáo viên.",
    example: "她是老师。",
    examplePinyin: "Tā shì lǎoshī.",
    translation: "Cô ấy là giáo viên.",
    tip: "老师 là cách gọi giáo viên rất thông dụng.",
    audio: "/audio/hsk1/truong-hoc/lao-shi.mp3",
    exampleAudio: "/audio/hsk1/truong-hoc/lao-shi-example.mp3",
  },
  {
    chinese: "同学",
    pinyin: "tóngxué",
    meaning: "Bạn học",
    hanviet: "Đồng học",
    usage: "Dùng để nói về người học cùng trường hoặc cùng lớp.",
    example: "他是我的同学。",
    examplePinyin: "Tā shì wǒ de tóngxué.",
    translation: "Cậu ấy là bạn học của tôi.",
    tip: "同 = cùng, 学 = học → người cùng học.",
    audio: "/audio/hsk1/truong-hoc/tong-xue.mp3",
    exampleAudio: "/audio/hsk1/truong-hoc/tong-xue-example.mp3",
  },
  {
    chinese: "书",
    pinyin: "shū",
    meaning: "Sách",
    hanviet: "Thư",
    usage: "Dùng để nói về sách.",
    example: "这是我的书。",
    examplePinyin: "Zhè shì wǒ de shū.",
    translation: "Đây là sách của tôi.",
    tip: "书 = sách; Hán-Việt: Thư.",
    audio: "/audio/hsk1/truong-hoc/shu.mp3",
    exampleAudio: "/audio/hsk1/truong-hoc/shu-example.mp3",
  },
  {
    chinese: "字典",
    pinyin: "zìdiǎn",
    meaning: "Từ điển",
    hanviet: "Tự điển",
    usage: "Dùng để nói về từ điển.",
    example: "这是一本字典。",
    examplePinyin: "Zhè shì yì běn zìdiǎn.",
    translation: "Đây là một quyển từ điển.",
    tip: "字 = chữ, 典 = điển → 字典.",
    audio: "/audio/hsk1/truong-hoc/zi-dian.mp3",
    exampleAudio: "/audio/hsk1/truong-hoc/zi-dian-example.mp3",
  },
  {
    chinese: "本",
    pinyin: "běn",
    meaning: "Quyển, cuốn",
    hanviet: "Bản",
    usage: "Lượng từ dùng cho sách và một số vật dạng quyển.",
    example: "我有三本书。",
    examplePinyin: "Wǒ yǒu sān běn shū.",
    translation: "Tôi có ba quyển sách.",
    tip: "Số + 本 + sách.",
    audio: "/audio/hsk1/truong-hoc/ben.mp3",
    exampleAudio: "/audio/hsk1/truong-hoc/ben-example.mp3",
  },
  {
    chinese: "字",
    pinyin: "zì",
    meaning: "Chữ",
    hanviet: "Tự",
    usage: "Dùng để nói về chữ viết hoặc ký tự.",
    example: "这个字很难。",
    examplePinyin: "Zhège zì hěn nán.",
    translation: "Chữ này rất khó.",
    tip: "字 = chữ; Hán-Việt: Tự.",
    audio: "/audio/hsk1/truong-hoc/zi.mp3",
    exampleAudio: "/audio/hsk1/truong-hoc/zi-example.mp3",
  },
  {
    chinese: "写",
    pinyin: "xiě",
    meaning: "Viết",
    hanviet: "Tả",
    usage: "Động từ chỉ hành động viết.",
    example: "我写汉字。",
    examplePinyin: "Wǒ xiě Hànzì.",
    translation: "Tôi viết chữ Hán.",
    tip: "写 = viết.",
    audio: "/audio/hsk1/truong-hoc/xie.mp3",
    exampleAudio: "/audio/hsk1/truong-hoc/xie-example.mp3",
  },
  {
    chinese: "读",
    pinyin: "dú",
    meaning: "Đọc",
    hanviet: "Độc",
    usage: "Động từ chỉ hành động đọc.",
    example: "我读书。",
    examplePinyin: "Wǒ dú shū.",
    translation: "Tôi đọc sách.",
    tip: "读书 = đọc sách.",
    audio: "/audio/hsk1/truong-hoc/du.mp3",
    exampleAudio: "/audio/hsk1/truong-hoc/du-example.mp3",
  },
  {
    chinese: "学",
    pinyin: "xué",
    meaning: "Học",
    hanviet: "Học",
    usage: "Dùng để nói về việc học.",
    example: "我学习中文。",
    examplePinyin: "Wǒ xuéxí Zhōngwén.",
    translation: "Tôi học tiếng Trung.",
    tip: "学 = học.",
    audio: "/audio/hsk1/truong-hoc/xue.mp3",
    exampleAudio: "/audio/hsk1/truong-hoc/xue-example.mp3",
  },
  {
    chinese: "汉字",
    pinyin: "Hànzì",
    meaning: "Chữ Hán",
    hanviet: "Hán tự",
    usage: "Dùng để chỉ chữ viết tiếng Trung.",
    example: "我喜欢汉字。",
    examplePinyin: "Wǒ xǐhuan Hànzì.",
    translation: "Tôi thích chữ Hán.",
    tip: "汉 = Hán, 字 = chữ → Hán tự.",
    audio: "/audio/hsk1/truong-hoc/han-zi.mp3",
    exampleAudio: "/audio/hsk1/truong-hoc/han-zi-example.mp3",
  },
];

export default function TruongHocPage() {
  const [learned, setLearned] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("hsk1-truong-hoc-learned") || "[]"
    );
    setLearned(saved);
  }, []);

  const markLearned = (index) => {
    if (learned.includes(index)) return;

    const updated = [...learned, index];
    setLearned(updated);

    localStorage.setItem(
      "hsk1-truong-hoc-learned",
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

            <h1>Trường học</h1>

            <p>
              Học các từ vựng cơ bản về trường học và việc học.
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

                    <div className="hanviet">
                      <strong>Hán-Việt:</strong>{" "}
                      {word.hanviet}
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
                Bạn đã học xong toàn bộ 12 từ vựng về trường học.
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