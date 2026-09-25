"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const words = [
  {
    chinese: "零",
    pinyin: "líng",
    meaning: "Số 0",
    hanviet: "Linh",
    usage: "Dùng để biểu thị số không.",
    example: "零是数字零。",
    examplePinyin: "Líng shì shùzì líng.",
    translation: "Số 0 là chữ số không.",
    tip: "零 có nghĩa là số không.",
    audio: "/audio/hsk1/so-dem/ling.mp3",
    exampleAudio: "/audio/hsk1/so-dem/ling-example.mp3",
  },
  {
    chinese: "一",
    pinyin: "yī",
    meaning: "Số 1; một",
    hanviet: "Nhất",
    usage: "Dùng để biểu thị số một.",
    example: "我有一本书。",
    examplePinyin: "Wǒ yǒu yì běn shū.",
    translation: "Tôi có một quyển sách.",
    tip: "一 là số một.",
    audio: "/audio/hsk1/so-dem/yi.mp3",
    exampleAudio: "/audio/hsk1/so-dem/yi-example.mp3",
  },
  {
    chinese: "二",
    pinyin: "èr",
    meaning: "Số 2; hai",
    hanviet: "Nhị",
    usage: "Dùng để biểu thị số hai.",
    example: "我有两个朋友。",
    examplePinyin: "Wǒ yǒu liǎng ge péngyou.",
    translation: "Tôi có hai người bạn.",
    tip: "二 là số hai.",
    audio: "/audio/hsk1/so-dem/er.mp3",
    exampleAudio: "/audio/hsk1/so-dem/er-example.mp3",
  },
  {
    chinese: "三",
    pinyin: "sān",
    meaning: "Số 3; ba",
    hanviet: "Tam",
    usage: "Dùng để biểu thị số ba.",
    example: "我有三个苹果。",
    examplePinyin: "Wǒ yǒu sān ge píngguǒ.",
    translation: "Tôi có ba quả táo.",
    tip: "三 là số ba.",
    audio: "/audio/hsk1/so-dem/san.mp3",
    exampleAudio: "/audio/hsk1/so-dem/san-example.mp3",
  },
  {
    chinese: "四",
    pinyin: "sì",
    meaning: "Số 4; bốn",
    hanviet: "Tứ",
    usage: "Dùng để biểu thị số bốn.",
    example: "今天是四号。",
    examplePinyin: "Jīntiān shì sì hào.",
    translation: "Hôm nay là ngày 4.",
    tip: "四 là số bốn.",
    audio: "/audio/hsk1/so-dem/si.mp3",
    exampleAudio: "/audio/hsk1/so-dem/si-example.mp3",
  },
  {
    chinese: "五",
    pinyin: "wǔ",
    meaning: "Số 5; năm",
    hanviet: "Ngũ",
    usage: "Dùng để biểu thị số năm.",
    example: "我有五本书。",
    examplePinyin: "Wǒ yǒu wǔ běn shū.",
    translation: "Tôi có năm quyển sách.",
    tip: "五 là số năm.",
    audio: "/audio/hsk1/so-dem/wu.mp3",
    exampleAudio: "/audio/hsk1/so-dem/wu-example.mp3",
  },
  {
    chinese: "六",
    pinyin: "liù",
    meaning: "Số 6; sáu",
    hanviet: "Lục",
    usage: "Dùng để biểu thị số sáu.",
    example: "现在六点。",
    examplePinyin: "Xiànzài liù diǎn.",
    translation: "Bây giờ là 6 giờ.",
    tip: "六 là số sáu.",
    audio: "/audio/hsk1/so-dem/liu.mp3",
    exampleAudio: "/audio/hsk1/so-dem/liu-example.mp3",
  },
  {
    chinese: "七",
    pinyin: "qī",
    meaning: "Số 7; bảy",
    hanviet: "Thất",
    usage: "Dùng để biểu thị số bảy.",
    example: "我七点起床。",
    examplePinyin: "Wǒ qī diǎn qǐchuáng.",
    translation: "Tôi thức dậy lúc 7 giờ.",
    tip: "七 là số bảy.",
    audio: "/audio/hsk1/so-dem/qi.mp3",
    exampleAudio: "/audio/hsk1/so-dem/qi-example.mp3",
  },
  {
    chinese: "八",
    pinyin: "bā",
    meaning: "Số 8; tám",
    hanviet: "Bát",
    usage: "Dùng để biểu thị số tám.",
    example: "现在八点。",
    examplePinyin: "Xiànzài bā diǎn.",
    translation: "Bây giờ là 8 giờ.",
    tip: "八 là số tám.",
    audio: "/audio/hsk1/so-dem/ba.mp3",
    exampleAudio: "/audio/hsk1/so-dem/ba-example.mp3",
  },
  {
    chinese: "九",
    pinyin: "jiǔ",
    meaning: "Số 9; chín",
    hanviet: "Cửu",
    usage: "Dùng để biểu thị số chín.",
    example: "我九点上课。",
    examplePinyin: "Wǒ jiǔ diǎn shàngkè.",
    translation: "Tôi học lúc 9 giờ.",
    tip: "九 là số chín.",
    audio: "/audio/hsk1/so-dem/jiu.mp3",
    exampleAudio: "/audio/hsk1/so-dem/jiu-example.mp3",
  },
  {
    chinese: "十",
    pinyin: "shí",
    meaning: "Số 10; mười",
    hanviet: "Thập",
    usage: "Dùng để biểu thị số mười.",
    example: "我有十个学生。",
    examplePinyin: "Wǒ yǒu shí ge xuésheng.",
    translation: "Tôi có mười học sinh.",
    tip: "十 là số mười.",
    audio: "/audio/hsk1/so-dem/shi.mp3",
    exampleAudio: "/audio/hsk1/so-dem/shi-example.mp3",
  },
];

export default function SoDemPage() {
  const [learned, setLearned] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("hsk1-so-dem-learned") || "[]"
    );
    setLearned(saved);
  }, []);

  const markLearned = (index) => {
    if (learned.includes(index)) return;

    const updated = [...learned, index];
    setLearned(updated);
    localStorage.setItem(
      "hsk1-so-dem-learned",
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

            <h1>Số đếm</h1>

            <p>
              Học các số từ 0 đến 10 trong tiếng Trung.
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

                        <p>
                          {word.examplePinyin}
                        </p>

                        <p>
                          {word.translation}
                        </p>

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
                Bạn đã học xong toàn bộ 11 từ vựng
                về số đếm.
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