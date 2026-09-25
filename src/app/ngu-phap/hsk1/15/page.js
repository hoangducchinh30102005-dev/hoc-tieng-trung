"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function GrammarLesson15() {
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("grammar-hsk1-15");

    if (saved === "completed") {
      setCompleted(true);
    }
  }, []);

  const checkAnswer = (value) => {
    if (answer) return;
    setAnswer(value);
  };

  const handleComplete = () => {
    localStorage.setItem("grammar-hsk1-15", "completed");
    setCompleted(true);
  };

  return (
    <>
      <Navbar />

      <main className="lesson-page">
        <div className="container">
          <Link href="/ngu-phap/hsk1" className="back-link">
            ← Quay lại Ngữ pháp HSK1
          </Link>

          <div className="grammar-lesson">
            <div className="lesson-label">
              NGỮ PHÁP HSK1 • BÀI 15
            </div>

            <h1>Trật tự câu cơ bản</h1>

            <p className="grammar-intro">
              Nắm được trật tự từ là bước quan trọng để tạo câu
              tiếng Trung đúng và tự nhiên.
            </p>

            <section className="grammar-section">
              <h2>1. Câu cơ bản: Chủ ngữ + Động từ + Tân ngữ</h2>

              <div className="formula-box">
                Chủ ngữ + Động từ + Tân ngữ
              </div>

              <p>
                Đây là trật tự câu cơ bản và rất phổ biến trong
                tiếng Trung.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我吃饭。
                </div>

                <div className="example-pinyin">
                  Wǒ chī fàn.
                </div>

                <div className="example-vietnamese">
                  Tôi ăn cơm.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我喝茶。
                </div>

                <div className="example-pinyin">
                  Wǒ hē chá.
                </div>

                <div className="example-vietnamese">
                  Tôi uống trà.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>2. Câu có tính từ</h2>

              <div className="formula-box">
                Chủ ngữ + 很 + Tính từ
              </div>

              <p>
                Khi dùng tính từ để mô tả, tiếng Trung thường dùng
                很 trước tính từ.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我很好。
                </div>

                <div className="example-pinyin">
                  Wǒ hěn hǎo.
                </div>

                <div className="example-vietnamese">
                  Tôi khỏe / Tôi rất tốt.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  今天很热。
                </div>

                <div className="example-pinyin">
                  Jīntiān hěn rè.
                </div>

                <div className="example-vietnamese">
                  Hôm nay nóng.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>3. Thời gian trong câu</h2>

              <div className="formula-box">
                Chủ ngữ + Thời gian + Động từ + Tân ngữ
              </div>

              <p>
                Thời gian thường đứng trước động từ.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我今天学习汉语。
                </div>

                <div className="example-pinyin">
                  Wǒ jīntiān xuéxí Hànyǔ.
                </div>

                <div className="example-vietnamese">
                  Hôm nay tôi học tiếng Trung.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我明天去学校。
                </div>

                <div className="example-pinyin">
                  Wǒ míngtiān qù xuéxiào.
                </div>

                <div className="example-vietnamese">
                  Ngày mai tôi đi đến trường.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>4. Địa điểm trong câu</h2>

              <div className="formula-box">
                Chủ ngữ + 在 + Địa điểm + Động từ
              </div>

              <p>
                Khi nói một người làm gì ở đâu, 在 thường đứng trước
                địa điểm.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我在学校学习。
                </div>

                <div className="example-pinyin">
                  Wǒ zài xuéxiào xuéxí.
                </div>

                <div className="example-vietnamese">
                  Tôi học ở trường.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  他在家吃饭。
                </div>

                <div className="example-pinyin">
                  Tā zài jiā chīfàn.
                </div>

                <div className="example-vietnamese">
                  Anh ấy ăn cơm ở nhà.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>5. Câu có thời gian và địa điểm</h2>

              <div className="formula-box">
                Chủ ngữ + Thời gian + 在 + Địa điểm + Động từ
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我今天在学校学习。
                </div>

                <div className="example-pinyin">
                  Wǒ jīntiān zài xuéxiào xuéxí.
                </div>

                <div className="example-vietnamese">
                  Hôm nay tôi học ở trường.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  妈妈晚上在家吃饭。
                </div>

                <div className="example-pinyin">
                  Māma wǎnshang zài jiā chīfàn.
                </div>

                <div className="example-vietnamese">
                  Buổi tối mẹ ăn cơm ở nhà.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>6. So sánh trật tự</h2>

              <div className="example-card">
                <div className="example-chinese">
                  我今天学习汉语。
                </div>

                <div className="example-pinyin">
                  Wǒ jīntiān xuéxí Hànyǔ.
                </div>

                <div className="example-vietnamese">
                  Đúng: Tôi hôm nay học tiếng Trung.
                </div>
              </div>

              <div className="mistake-box">
                <p>❌ 我学习今天汉语。</p>
                <p>✅ 我今天学习汉语。</p>
                <p>
                  Thời gian thường đặt trước động từ trong kiểu câu
                  cơ bản này.
                </p>
              </div>
            </section>

            <section className="grammar-section">
              <h2>7. Lưu ý quan trọng</h2>

              <p>
                Khi mới học, hãy nhớ thứ tự đơn giản:
              </p>

              <div className="formula-box">
                Ai + Khi nào + Ở đâu + Làm gì + Cái gì
              </div>

              <p>
                Không phải mọi câu tiếng Trung đều bắt buộc có đầy đủ
                các thành phần trên, nhưng đây là khung rất hữu ích
                để tạo câu cơ bản.
              </p>
            </section>

            <section className="grammar-section">
              <h2>8. Bài tập nhanh</h2>

              <div className="exercise-box">
                <p className="exercise-question">
                  Chọn câu có trật tự đúng:
                </p>

                <p className="exercise-sentence">
                  “Hôm nay tôi học tiếng Trung.”
                </p>

                <div className="exercise-options">
                  {[
                    "我今天学习汉语。",
                    "我学习今天汉语。",
                    "今天我汉语学习。",
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => checkAnswer(option)}
                      className={
                        answer === option
                          ? option === "我今天学习汉语。"
                            ? "answer-correct"
                            : "answer-wrong"
                          : answer &&
                            option === "我今天学习汉语。"
                          ? "answer-correct"
                          : ""
                      }
                      disabled={answer !== null}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {answer && (
                  <div
                    className={
                      answer === "我今天学习汉语。"
                        ? "exercise-result correct"
                        : "exercise-result wrong"
                    }
                  >
                    {answer === "我今天学习汉语。" ? (
                      <>
                        ✓ Chính xác!
                      </>
                    ) : (
                      <>
                        ✗ Chưa đúng. Đáp án đúng là{" "}
                        <strong>我今天学习汉语。</strong>
                      </>
                    )}
                  </div>
                )}
              </div>
            </section>

            <div className="grammar-complete">
              {!completed ? (
                <button
                  className="learn-button"
                  onClick={handleComplete}
                >
                  ✓ Đã học xong bài này
                </button>
              ) : (
                <div className="learned-status">
                  ✓ Bạn đã hoàn thành bài ngữ pháp này
                </div>
              )}
            </div>

            <div className="grammar-navigation">
              <Link
                href="/ngu-phap/hsk1/14"
                className="back-topic-button"
              >
                ← Bài trước
              </Link>

              <Link
                href="/ngu-phap/hsk1"
                className="back-topic-button"
              >
                Danh sách ngữ pháp
              </Link>

              <Link
                href="/ngu-phap/hsk1/16"
                className="level-button"
              >
                Bài tiếp theo →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}