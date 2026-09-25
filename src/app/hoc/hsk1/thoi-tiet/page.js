"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const words = [
  {
    chinese: "天气",
    pinyin: "tiānqì",
    meaning: "Thời tiết",
    hanviet: "Thiên khí",
    usage: "Dùng để nói chung về thời tiết.",
    example: "今天天气很好。",
    examplePinyin: "Jīntiān tiānqì hěn hǎo.",
    translation: "Hôm nay thời tiết rất đẹp.",
    tip: "天 = trời, 气 = khí → thời tiết.",
    audio: "/audio/hsk1/thoi-tiet/tian-qi.mp3",
    exampleAudio: "/audio/hsk1/thoi-tiet/tian-qi-example.mp3",
  },
  {
    chinese: "热",
    pinyin: "rè",
    meaning: "Nóng",
    hanviet: "Nhiệt",
    usage: "Dùng để nói thời tiết hoặc vật có nhiệt độ cao.",
    example: "今天很热。",
    examplePinyin: "Jīntiān hěn rè.",
    translation: "Hôm nay rất nóng.",
    tip: "热 = nóng; trái nghĩa với 冷.",
    audio: "/audio/hsk1/thoi-tiet/re.mp3",
    exampleAudio: "/audio/hsk1/thoi-tiet/re-example.mp3",
  },
  {
    chinese: "冷",
    pinyin: "lěng",
    meaning: "Lạnh",
    hanviet: "Lãnh",
    usage: "Dùng để nói thời tiết hoặc nhiệt độ thấp.",
    example: "今天很冷。",
    examplePinyin: "Jīntiān hěn lěng.",
    translation: "Hôm nay rất lạnh.",
    tip: "冷 = lạnh; trái nghĩa với 热.",
    audio: "/audio/hsk1/thoi-tiet/leng.mp3",
    exampleAudio: "/audio/hsk1/thoi-tiet/leng-example.mp3",
  },
  {
    chinese: "好",
    pinyin: "hǎo",
    meaning: "Tốt; đẹp",
    hanviet: "Hảo",
    usage: "Dùng để mô tả điều gì đó tốt hoặc đẹp.",
    example: "今天天气很好。",
    examplePinyin: "Jīntiān tiānqì hěn hǎo.",
    translation: "Hôm nay thời tiết rất đẹp.",
    tip: "天气很好 = thời tiết rất đẹp.",
    audio: "/audio/hsk1/thoi-tiet/hao.mp3",
    exampleAudio: "/audio/hsk1/thoi-tiet/hao-example.mp3",
  },
  {
    chinese: "下雨",
    pinyin: "xià yǔ",
    meaning: "Mưa; trời mưa",
    hanviet: "Hạ vũ",
    usage: "Dùng khi nói trời đang hoặc sẽ mưa.",
    example: "今天下雨了。",
    examplePinyin: "Jīntiān xià yǔ le.",
    translation: "Hôm nay trời mưa rồi.",
    tip: "下雨 = mưa.",
    audio: "/audio/hsk1/thoi-tiet/xia-yu.mp3",
    exampleAudio: "/audio/hsk1/thoi-tiet/xia-yu-example.mp3",
  },
  {
    chinese: "雪",
    pinyin: "xuě",
    meaning: "Tuyết",
    hanviet: "Tuyết",
    usage: "Dùng để nói về tuyết.",
    example: "下雪了。",
    examplePinyin: "Xià xuě le.",
    translation: "Tuyết rơi rồi.",
    tip: "下雪 = tuyết rơi.",
    audio: "/audio/hsk1/thoi-tiet/xue.mp3",
    exampleAudio: "/audio/hsk1/thoi-tiet/xue-example.mp3",
  },
  {
    chinese: "风",
    pinyin: "fēng",
    meaning: "Gió",
    hanviet: "Phong",
    usage: "Dùng để nói về gió.",
    example: "今天风很大。",
    examplePinyin: "Jīntiān fēng hěn dà.",
    translation: "Hôm nay gió rất lớn.",
    tip: "风 = gió; Hán-Việt: Phong.",
    audio: "/audio/hsk1/thoi-tiet/feng.mp3",
    exampleAudio: "/audio/hsk1/thoi-tiet/feng-example.mp3",
  },
  {
    chinese: "太阳",
    pinyin: "tàiyáng",
    meaning: "Mặt trời",
    hanviet: "Thái dương",
    usage: "Dùng để nói về mặt trời.",
    example: "太阳出来了。",
    examplePinyin: "Tàiyáng chūlái le.",
    translation: "Mặt trời đã xuất hiện.",
    tip: "太阳 = mặt trời.",
    audio: "/audio/hsk1/thoi-tiet/tai-yang.mp3",
    exampleAudio: "/audio/hsk1/thoi-tiet/tai-yang-example.mp3",
  },
  {
    chinese: "天晴",
    pinyin: "tiān qíng",
    meaning: "Trời quang; trời tạnh",
    hanviet: "Thiên tình",
    usage: "Dùng khi trời hết mưa và trở nên quang đãng.",
    example: "今天天晴了。",
    examplePinyin: "Jīntiān tiān qíng le.",
    translation: "Hôm nay trời đã tạnh.",
    tip: "晴 = quang, trong, không mưa.",
    audio: "/audio/hsk1/thoi-tiet/tian-qing.mp3",
    exampleAudio: "/audio/hsk1/thoi-tiet/tian-qing-example.mp3",
  },
  {
    chinese: "阴",
    pinyin: "yīn",
    meaning: "Âm u; nhiều mây",
    hanviet: "Âm",
    usage: "Dùng để mô tả thời tiết nhiều mây, ít nắng.",
    example: "今天是阴天。",
    examplePinyin: "Jīntiān shì yīntiān.",
    translation: "Hôm nay là ngày âm u.",
    tip: "阴天 = trời âm u, nhiều mây.",
    audio: "/audio/hsk1/thoi-tiet/yin.mp3",
    exampleAudio: "/audio/hsk1/thoi-tiet/yin-example.mp3",
  },
  {
    chinese: "度",
    pinyin: "dù",
    meaning: "Độ",
    hanviet: "Độ",
    usage: "Dùng để nói đơn vị nhiệt độ.",
    example: "今天三十度。",
    examplePinyin: "Jīntiān sānshí dù.",
    translation: "Hôm nay 30 độ.",
    tip: "Số + 度 dùng để nói nhiệt độ.",
    audio: "/audio/hsk1/thoi-tiet/du-wen.mp3",
    exampleAudio: "/audio/hsk1/thoi-tiet/du-wen-example.mp3",
  },
];

export default function ThoiTietPage() {
  const [learned, setLearned] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("hsk1-thoi-tiet-learned") || "[]"
    );
    setLearned(saved);
  }, []);

  const markLearned = (index) => {
    if (learned.includes(index)) return;

    const updated = [...learned, index];
    setLearned(updated);

    localStorage.setItem(
      "hsk1-thoi-tiet-learned",
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

            <h1>Thời tiết</h1>

            <p>
              Học các từ vựng cơ bản để nói về thời tiết.
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
                Bạn đã học xong toàn bộ 11 từ vựng về thời tiết.
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