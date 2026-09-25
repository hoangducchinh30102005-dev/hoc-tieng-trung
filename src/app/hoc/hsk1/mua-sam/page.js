"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const words = [
  {
    chinese: "买",
    pinyin: "mǎi",
    meaning: "Mua",
    hanviet: "Mãi",
    usage: "Động từ chỉ hành động mua.",
    example: "我要买东西。",
    examplePinyin: "Wǒ yào mǎi dōngxi.",
    translation: "Tôi muốn mua đồ.",
    tip: "买 = mua; trái nghĩa với 卖 = bán.",
    audio: "/audio/hsk1/mua-sam/mai.mp3",
    exampleAudio: "/audio/hsk1/mua-sam/mai-example.mp3",
  },
  {
    chinese: "买东西",
    pinyin: "mǎi dōngxi",
    meaning: "Mua đồ; mua sắm",
    hanviet: "Mãi đông tây",
    usage: "Cụm từ thường dùng khi nói về việc mua sắm.",
    example: "我去买东西。",
    examplePinyin: "Wǒ qù mǎi dōngxi.",
    translation: "Tôi đi mua đồ.",
    tip: "买东西 = mua đồ.",
    audio: "/audio/hsk1/mua-sam/mai-dong-xi.mp3",
    exampleAudio: "/audio/hsk1/mua-sam/mai-dong-xi-example.mp3",
  },
  {
    chinese: "东西",
    pinyin: "dōngxi",
    meaning: "Đồ; vật",
    hanviet: "Đông tây",
    usage: "Dùng để nói chung về đồ vật hoặc thứ gì đó.",
    example: "这个东西很好。",
    examplePinyin: "Zhège dōngxi hěn hǎo.",
    translation: "Món đồ này rất tốt.",
    tip: "东西 có nghĩa là đồ vật, không phải chỉ hướng Đông Tây trong trường hợp này.",
    audio: "/audio/hsk1/mua-sam/dong-xi.mp3",
    exampleAudio: "/audio/hsk1/mua-sam/dong-xi-example.mp3",
  },
  {
    chinese: "钱",
    pinyin: "qián",
    meaning: "Tiền",
    hanviet: "Tiền",
    usage: "Dùng để nói về tiền.",
    example: "我没有钱。",
    examplePinyin: "Wǒ méiyǒu qián.",
    translation: "Tôi không có tiền.",
    tip: "钱 = tiền.",
    audio: "/audio/hsk1/mua-sam/qian.mp3",
    exampleAudio: "/audio/hsk1/mua-sam/qian-example.mp3",
  },
  {
    chinese: "多少",
    pinyin: "duōshao",
    meaning: "Bao nhiêu",
    hanviet: "Đa thiểu",
    usage: "Dùng để hỏi số lượng hoặc giá tiền.",
    example: "多少钱？",
    examplePinyin: "Duōshao qián?",
    translation: "Bao nhiêu tiền?",
    tip: "多少 = bao nhiêu.",
    audio: "/audio/hsk1/mua-sam/duo-shao.mp3",
    exampleAudio: "/audio/hsk1/mua-sam/duo-shao-example.mp3",
  },
  {
    chinese: "块",
    pinyin: "kuài",
    meaning: "Đồng; tệ",
    hanviet: "Khối",
    usage: "Cách nói thông dụng trong giao tiếp để chỉ đơn vị tiền.",
    example: "这个十块钱。",
    examplePinyin: "Zhège shí kuài qián.",
    translation: "Cái này 10 đồng.",
    tip: "块 thường được dùng thay cho 元 trong giao tiếp.",
    audio: "/audio/hsk1/mua-sam/kuai.mp3",
    exampleAudio: "/audio/hsk1/mua-sam/kuai-example.mp3",
  },
  {
    chinese: "元",
    pinyin: "yuán",
    meaning: "Nhân dân tệ; đồng",
    hanviet: "Nguyên",
    usage: "Đơn vị tiền tệ chính thức của Trung Quốc.",
    example: "一元钱。",
    examplePinyin: "Yì yuán qián.",
    translation: "Một đồng.",
    tip: "元 là cách nói chính thức hơn 块.",
    audio: "/audio/hsk1/mua-sam/yuan.mp3",
    exampleAudio: "/audio/hsk1/mua-sam/yuan-example.mp3",
  },
  {
    chinese: "贵",
    pinyin: "guì",
    meaning: "Đắt",
    hanviet: "Quý",
    usage: "Dùng để nói giá của một món đồ cao.",
    example: "这个太贵了。",
    examplePinyin: "Zhège tài guì le.",
    translation: "Cái này đắt quá.",
    tip: "贵 = đắt; 便宜 = rẻ.",
    audio: "/audio/hsk1/mua-sam/gui.mp3",
    exampleAudio: "/audio/hsk1/mua-sam/gui-example.mp3",
  },
  {
    chinese: "便宜",
    pinyin: "piányi",
    meaning: "Rẻ",
    hanviet: "Tiện nghi",
    usage: "Dùng để nói giá của một món đồ thấp.",
    example: "这个很便宜。",
    examplePinyin: "Zhège hěn piányi.",
    translation: "Cái này rất rẻ.",
    tip: "便宜 = rẻ.",
    audio: "/audio/hsk1/mua-sam/pian-yi.mp3",
    exampleAudio: "/audio/hsk1/mua-sam/pian-yi-example.mp3",
  },
  {
    chinese: "给",
    pinyin: "gěi",
    meaning: "Đưa; cho",
    hanviet: "Cấp",
    usage: "Dùng khi đưa hoặc cho ai đó một vật.",
    example: "给你钱。",
    examplePinyin: "Gěi nǐ qián.",
    translation: "Đưa tiền cho bạn.",
    tip: "给 + người + vật.",
    audio: "/audio/hsk1/mua-sam/gei.mp3",
    exampleAudio: "/audio/hsk1/mua-sam/gei-example.mp3",
  },
  {
    chinese: "要",
    pinyin: "yào",
    meaning: "Muốn; cần",
    hanviet: "Yếu",
    usage: "Dùng để nói về mong muốn hoặc nhu cầu.",
    example: "我要这个。",
    examplePinyin: "Wǒ yào zhège.",
    translation: "Tôi muốn cái này.",
    tip: "我要 = tôi muốn.",
    audio: "/audio/hsk1/mua-sam/yao.mp3",
    exampleAudio: "/audio/hsk1/mua-sam/yao-example.mp3",
  },
];

export default function MuaSamPage() {
  const [learned, setLearned] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("hsk1-mua-sam-learned") || "[]"
    );
    setLearned(saved);
  }, []);

  const markLearned = (index) => {
    if (learned.includes(index)) return;

    const updated = [...learned, index];
    setLearned(updated);

    localStorage.setItem(
      "hsk1-mua-sam-learned",
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

            <h1>Mua sắm</h1>

            <p>
              Học các từ vựng cơ bản khi mua hàng và hỏi giá.
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
                Bạn đã học xong toàn bộ 11 từ vựng về mua sắm.
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