"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const words = [
  {
    chinese: "请",
    pinyin: "qǐng",
    meaning: "Mời; xin; hãy",
    hanviet: "Thỉnh",
    usage: "Dùng để yêu cầu hoặc mời ai đó làm gì.",
    example: "请坐。",
    examplePinyin: "Qǐng zuò.",
    translation: "Mời ngồi.",
    tip: "请 thường đứng trước động từ.",
    audio: "/audio/hsk1/giao-tiep/qing.mp3",
    exampleAudio: "/audio/hsk1/giao-tiep/qing-example.mp3",
  },
  {
    chinese: "对不起",
    pinyin: "duìbuqǐ",
    meaning: "Xin lỗi",
    hanviet: "Đối bất khởi",
    usage: "Dùng để xin lỗi khi làm điều gì không đúng.",
    example: "对不起，我迟到了。",
    examplePinyin: "Duìbuqǐ, wǒ chídào le.",
    translation: "Xin lỗi, tôi đến muộn.",
    tip: "对不起 là cách xin lỗi rất thông dụng.",
    audio: "/audio/hsk1/giao-tiep/dui-bu-qi.mp3",
    exampleAudio: "/audio/hsk1/giao-tiep/dui-bu-qi-example.mp3",
  },
  {
    chinese: "没关系",
    pinyin: "méi guānxi",
    meaning: "Không sao; không có gì",
    hanviet: "Một quan hệ",
    usage: "Thường dùng để đáp lại lời xin lỗi.",
    example: "没关系。",
    examplePinyin: "Méi guānxi.",
    translation: "Không sao.",
    tip: "对不起 → 没关系 là cặp câu giao tiếp thường gặp.",
    audio: "/audio/hsk1/giao-tiep/mei-guan-xi.mp3",
    exampleAudio: "/audio/hsk1/giao-tiep/mei-guan-xi-example.mp3",
  },
  {
    chinese: "好吗",
    pinyin: "hǎo ma",
    meaning: "Được không? Có được không?",
    hanviet: "Hảo ma",
    usage: "Dùng để hỏi ý kiến hoặc xác nhận.",
    example: "我们一起去，好吗？",
    examplePinyin: "Wǒmen yìqǐ qù, hǎo ma?",
    translation: "Chúng ta cùng đi nhé?",
    tip: "好吗 đặt cuối câu để hỏi ý kiến.",
    audio: "/audio/hsk1/giao-tiep/hao-ma.mp3",
    exampleAudio: "/audio/hsk1/giao-tiep/hao-ma-example.mp3",
  },
  {
    chinese: "好",
    pinyin: "hǎo",
    meaning: "Tốt; được; đồng ý",
    hanviet: "Hảo",
    usage: "Có thể dùng để đồng ý hoặc nói điều gì đó tốt.",
    example: "好，我知道了。",
    examplePinyin: "Hǎo, wǒ zhīdào le.",
    translation: "Được, tôi biết rồi.",
    tip: "好 cũng thường được dùng như 'được'.",
    audio: "/audio/hsk1/giao-tiep/hao.mp3",
    exampleAudio: "/audio/hsk1/giao-tiep/hao-example.mp3",
  },
  {
    chinese: "不",
    pinyin: "bù",
    meaning: "Không",
    hanviet: "Bất",
    usage: "Dùng để phủ định động từ hoặc tính từ.",
    example: "我不去。",
    examplePinyin: "Wǒ bú qù.",
    translation: "Tôi không đi.",
    tip: "不 thường đứng trước động từ hoặc tính từ.",
    audio: "/audio/hsk1/giao-tiep/bu.mp3",
    exampleAudio: "/audio/hsk1/giao-tiep/bu-example.mp3",
  },
  {
    chinese: "是",
    pinyin: "shì",
    meaning: "Là",
    hanviet: "Thị",
    usage: "Dùng để nối chủ ngữ với danh từ hoặc cụm danh từ.",
    example: "我是学生。",
    examplePinyin: "Wǒ shì xuésheng.",
    translation: "Tôi là học sinh/sinh viên.",
    tip: "A 是 B = A là B.",
    audio: "/audio/hsk1/giao-tiep/shi.mp3",
    exampleAudio: "/audio/hsk1/giao-tiep/shi-example.mp3",
  },
  {
    chinese: "不是",
    pinyin: "bú shì",
    meaning: "Không phải",
    hanviet: "Bất thị",
    usage: "Dùng để phủ định 是.",
    example: "我不是老师。",
    examplePinyin: "Wǒ bú shì lǎoshī.",
    translation: "Tôi không phải giáo viên.",
    tip: "是 → 不是.",
    audio: "/audio/hsk1/giao-tiep/bu-shi.mp3",
    exampleAudio: "/audio/hsk1/giao-tiep/bu-shi-example.mp3",
  },
  {
    chinese: "有",
    pinyin: "yǒu",
    meaning: "Có",
    hanviet: "Hữu",
    usage: "Dùng để nói có hoặc sở hữu.",
    example: "我有一个朋友。",
    examplePinyin: "Wǒ yǒu yí ge péngyou.",
    translation: "Tôi có một người bạn.",
    tip: "有 = có.",
    audio: "/audio/hsk1/giao-tiep/you.mp3",
    exampleAudio: "/audio/hsk1/giao-tiep/you-example.mp3",
  },
  {
    chinese: "没有",
    pinyin: "méiyǒu",
    meaning: "Không có",
    hanviet: "Một hữu",
    usage: "Dùng để phủ định 有.",
    example: "我没有钱。",
    examplePinyin: "Wǒ méiyǒu qián.",
    translation: "Tôi không có tiền.",
    tip: "有 → 没有.",
    audio: "/audio/hsk1/giao-tiep/mei-you.mp3",
    exampleAudio: "/audio/hsk1/giao-tiep/mei-you-example.mp3",
  },
  {
    chinese: "在",
    pinyin: "zài",
    meaning: "Ở; tại",
    hanviet: "Tại",
    usage: "Dùng để nói vị trí hoặc nơi đang ở.",
    example: "我在家。",
    examplePinyin: "Wǒ zài jiā.",
    translation: "Tôi ở nhà.",
    tip: "在 + địa điểm.",
    audio: "/audio/hsk1/giao-tiep/zai.mp3",
    exampleAudio: "/audio/hsk1/giao-tiep/zai-example.mp3",
  },
  {
    chinese: "去",
    pinyin: "qù",
    meaning: "Đi",
    hanviet: "Khứ",
    usage: "Dùng để nói đi đến một nơi.",
    example: "我去学校。",
    examplePinyin: "Wǒ qù xuéxiào.",
    translation: "Tôi đi đến trường.",
    tip: "去 + địa điểm = đi đến đâu.",
    audio: "/audio/hsk1/giao-tiep/qu.mp3",
    exampleAudio: "/audio/hsk1/giao-tiep/qu-example.mp3",
  },
];

export default function GiaoTiepPage() {
  const [learned, setLearned] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("hsk1-giao-tiep-learned") || "[]"
    );
    setLearned(saved);
  }, []);

  const markLearned = (index) => {
    if (learned.includes(index)) return;

    const updated = [...learned, index];
    setLearned(updated);

    localStorage.setItem(
      "hsk1-giao-tiep-learned",
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

            <h1>Giao tiếp hằng ngày</h1>

            <p>
              Học những từ và mẫu câu cơ bản thường gặp trong giao tiếp.
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
                            new Audio(word.exampleAudio).play()
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

              <h2>Hoàn thành HSK1!</h2>

              <p>
                Bạn đã học xong toàn bộ 12 từ vựng của chủ đề giao tiếp.
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