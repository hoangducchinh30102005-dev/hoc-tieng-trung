"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const words = [
  {
    chinese: "今天",
    pinyin: "jīntiān",
    meaning: "Hôm nay",
    hanviet: "Kim thiên",
    usage: "Dùng để nói về ngày hiện tại.",
    example: "今天星期一。",
    examplePinyin: "Jīntiān xīngqī yī.",
    translation: "Hôm nay là thứ Hai.",
    tip: "今 = nay, 天 = ngày → hôm nay.",
    audio: "/audio/hsk1/thoi-gian/jin-tian.mp3",
    exampleAudio: "/audio/hsk1/thoi-gian/jin-tian-example.mp3",
  },
  {
    chinese: "明天",
    pinyin: "míngtiān",
    meaning: "Ngày mai",
    hanviet: "Minh thiên",
    usage: "Dùng để nói về ngày sau hôm nay.",
    example: "明天我去学校。",
    examplePinyin: "Míngtiān wǒ qù xuéxiào.",
    translation: "Ngày mai tôi đi học.",
    tip: "明 = sáng, 天 = ngày → ngày mai.",
    audio: "/audio/hsk1/thoi-gian/ming-tian.mp3",
    exampleAudio: "/audio/hsk1/thoi-gian/ming-tian-example.mp3",
  },
  {
    chinese: "昨天",
    pinyin: "zuótiān",
    meaning: "Hôm qua",
    hanviet: "Tạc thiên",
    usage: "Dùng để nói về ngày trước hôm nay.",
    example: "昨天我很忙。",
    examplePinyin: "Zuótiān wǒ hěn máng.",
    translation: "Hôm qua tôi rất bận.",
    tip: "昨天 = hôm qua.",
    audio: "/audio/hsk1/thoi-gian/zuo-tian.mp3",
    exampleAudio: "/audio/hsk1/thoi-gian/zuo-tian-example.mp3",
  },
  {
    chinese: "现在",
    pinyin: "xiànzài",
    meaning: "Bây giờ, hiện tại",
    hanviet: "Hiện tại",
    usage: "Dùng để nói về thời điểm hiện tại.",
    example: "现在几点？",
    examplePinyin: "Xiànzài jǐ diǎn?",
    translation: "Bây giờ là mấy giờ?",
    tip: "现 = hiện, 在 = ở/tại → hiện tại.",
    audio: "/audio/hsk1/thoi-gian/xian-zai.mp3",
    exampleAudio: "/audio/hsk1/thoi-gian/xian-zai-example.mp3",
  },
  {
    chinese: "点",
    pinyin: "diǎn",
    meaning: "Giờ",
    hanviet: "Điểm",
    usage: "Dùng sau số để nói giờ.",
    example: "现在三点。",
    examplePinyin: "Xiànzài sān diǎn.",
    translation: "Bây giờ là 3 giờ.",
    tip: "Số + 点 = ... giờ.",
    audio: "/audio/hsk1/thoi-gian/dian.mp3",
    exampleAudio: "/audio/hsk1/thoi-gian/dian-example.mp3",
  },
  {
    chinese: "分",
    pinyin: "fēn",
    meaning: "Phút",
    hanviet: "Phân",
    usage: "Dùng để nói số phút.",
    example: "现在三点十分。",
    examplePinyin: "Xiànzài sān diǎn shí fēn.",
    translation: "Bây giờ là 3 giờ 10 phút.",
    tip: "Số + 分 = ... phút.",
    audio: "/audio/hsk1/thoi-gian/fen.mp3",
    exampleAudio: "/audio/hsk1/thoi-gian/fen-example.mp3",
  },
  {
    chinese: "年",
    pinyin: "nián",
    meaning: "Năm",
    hanviet: "Niên",
    usage: "Dùng để nói về năm.",
    example: "今年是二零二六年。",
    examplePinyin: "Jīnnián shì èr líng èr liù nián.",
    translation: "Năm nay là năm 2026.",
    tip: "年 có nghĩa là năm.",
    audio: "/audio/hsk1/thoi-gian/nian.mp3",
    exampleAudio: "/audio/hsk1/thoi-gian/nian-example.mp3",
  },
  {
    chinese: "月",
    pinyin: "yuè",
    meaning: "Tháng",
    hanviet: "Nguyệt",
    usage: "Dùng để nói về tháng.",
    example: "现在是九月。",
    examplePinyin: "Xiànzài shì jiǔ yuè.",
    translation: "Bây giờ là tháng 9.",
    tip: "Số + 月 = tháng ...",
    audio: "/audio/hsk1/thoi-gian/yue.mp3",
    exampleAudio: "/audio/hsk1/thoi-gian/yue-example.mp3",
  },
  {
    chinese: "号",
    pinyin: "hào",
    meaning: "Ngày (trong tháng)",
    hanviet: "Hiệu",
    usage: "Dùng để nói ngày cụ thể trong tháng.",
    example: "今天是二十五号。",
    examplePinyin: "Jīntiān shì èrshíwǔ hào.",
    translation: "Hôm nay là ngày 25.",
    tip: "Số + 号 = ngày ...",
    audio: "/audio/hsk1/thoi-gian/hao.mp3",
    exampleAudio: "/audio/hsk1/thoi-gian/hao-example.mp3",
  },
  {
    chinese: "星期",
    pinyin: "xīngqī",
    meaning: "Tuần; thứ",
    hanviet: "Tinh kỳ",
    usage: "Dùng để nói các ngày trong tuần.",
    example: "今天星期五。",
    examplePinyin: "Jīntiān xīngqī wǔ.",
    translation: "Hôm nay là thứ Sáu.",
    tip: "星期 + số = thứ ...",
    audio: "/audio/hsk1/thoi-gian/xing-qi.mp3",
    exampleAudio: "/audio/hsk1/thoi-gian/xing-qi-example.mp3",
  },
  {
    chinese: "早上",
    pinyin: "zǎoshang",
    meaning: "Buổi sáng",
    hanviet: "Tảo thượng",
    usage: "Dùng để nói về khoảng thời gian buổi sáng.",
    example: "我早上七点起床。",
    examplePinyin: "Wǒ zǎoshang qī diǎn qǐchuáng.",
    translation: "Tôi thức dậy lúc 7 giờ sáng.",
    tip: "早 = sớm, 上 = trên → buổi sáng.",
    audio: "/audio/hsk1/thoi-gian/zao-shang.mp3",
    exampleAudio: "/audio/hsk1/thoi-gian/zao-shang-example.mp3",
  },
  {
    chinese: "晚上",
    pinyin: "wǎnshang",
    meaning: "Buổi tối",
    hanviet: "Vãn thượng",
    usage: "Dùng để nói về khoảng thời gian buổi tối.",
    example: "我晚上十点睡觉。",
    examplePinyin: "Wǒ wǎnshang shí diǎn shuìjiào.",
    translation: "Tôi đi ngủ lúc 10 giờ tối.",
    tip: "晚上 = buổi tối.",
    audio: "/audio/hsk1/thoi-gian/wan-shang.mp3",
    exampleAudio: "/audio/hsk1/thoi-gian/wan-shang-example.mp3",
  },
];

export default function ThoiGianPage() {
  const [learned, setLearned] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("hsk1-thoi-gian-learned") || "[]"
    );
    setLearned(saved);
  }, []);

  const markLearned = (index) => {
    if (learned.includes(index)) return;

    const updated = [...learned, index];
    setLearned(updated);

    localStorage.setItem(
      "hsk1-thoi-gian-learned",
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

            <h1>Thời gian</h1>

            <p>
              Học các từ vựng cơ bản về ngày, tháng, giờ và thời gian.
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
                Bạn đã học xong toàn bộ 13 từ vựng về thời gian.
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