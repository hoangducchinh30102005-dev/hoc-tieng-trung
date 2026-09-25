"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function GrammarLesson4() {
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("grammar-hsk1-4");

    if (saved === "completed") {
      setCompleted(true);
    }
  }, []);

  const checkAnswer = (value) => {
    if (answer) return;
    setAnswer(value);
  };

  const handleComplete = () => {
    localStorage.setItem("grammar-hsk1-4", "completed");
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
              NGỮ PHÁP HSK1 • BÀI 4
            </div>

            <h1>Trợ từ 呢</h1>

            <p className="grammar-intro">
              Học cách dùng 呢 để hỏi lại, hỏi về người khác hoặc tiếp tục
              một chủ đề đang được nói đến.
            </p>

            <section className="grammar-section">
              <h2>1. Cấu trúc cơ bản</h2>

              <div className="formula-box">
                Chủ ngữ + 呢？
              </div>

              <p>
                呢 thường được đặt ở cuối câu. Một cách dùng rất phổ biến
                là hỏi lại người khác sau khi mình đã trả lời.
              </p>
            </section>

            <section className="grammar-section">
              <h2>2. Hỏi lại người khác</h2>

              <div className="example-card">
                <div className="example-chinese">
                  我很好，你呢？
                </div>

                <div className="example-pinyin">
                  Wǒ hěn hǎo, nǐ ne?
                </div>

                <div className="example-vietnamese">
                  Tôi khỏe, còn bạn thì sao?
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我是学生，你呢？
                </div>

                <div className="example-pinyin">
                  Wǒ shì xuésheng, nǐ ne?
                </div>

                <div className="example-vietnamese">
                  Tôi là học sinh / sinh viên, còn bạn?
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>3. Hỏi về người hoặc vật khác</h2>

              <div className="example-card">
                <div className="example-chinese">
                  我很好，妈妈呢？
                </div>

                <div className="example-pinyin">
                  Wǒ hěn hǎo, māma ne?
                </div>

                <div className="example-vietnamese">
                  Tôi khỏe, còn mẹ thì sao?
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我的书呢？
                </div>

                <div className="example-pinyin">
                  Wǒ de shū ne?
                </div>

                <div className="example-vietnamese">
                  Sách của tôi đâu rồi?
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>4. Phân biệt 吗 và 呢</h2>

              <div className="example-card">
                <div className="example-chinese">
                  你是学生吗？
                </div>

                <div className="example-pinyin">
                  Nǐ shì xuésheng ma?
                </div>

                <div className="example-vietnamese">
                  Bạn là học sinh / sinh viên phải không?
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我是学生，你呢？
                </div>

                <div className="example-pinyin">
                  Wǒ shì xuésheng, nǐ ne?
                </div>

                <div className="example-vietnamese">
                  Tôi là học sinh / sinh viên, còn bạn?
                </div>
              </div>

              <p>
                <strong>吗</strong> thường dùng để tạo câu hỏi Có/Không.
                <br />
                <strong>呢</strong> thường dùng để hỏi lại hoặc hỏi tiếp
                về đối tượng đang được nói đến.
              </p>
            </section>

            <section className="grammar-section">
              <h2>5. Lỗi thường gặp</h2>

              <div className="mistake-box">
                <p>
                  ❌ 我很好，你吗？
                </p>

                <p>
                  ✅ 我很好，你呢？
                </p>

                <p>
                  Khi muốn hỏi lại “Còn bạn?”, dùng 呢.
                </p>
              </div>
            </section>

            <section className="grammar-section">
              <h2>6. Bài tập nhanh</h2>

              <div className="exercise-box">
                <p className="exercise-question">
                  Chọn từ thích hợp:
                </p>

                <p className="exercise-sentence">
                  我很好，你 ___？
                </p>

                <div className="exercise-options">
                  {["呢", "吗", "的"].map((option) => (
                    <button
                      key={option}
                      onClick={() => checkAnswer(option)}
                      className={
                        answer === option
                          ? option === "呢"
                            ? "answer-correct"
                            : "answer-wrong"
                          : answer && option === "呢"
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
                      answer === "呢"
                        ? "exercise-result correct"
                        : "exercise-result wrong"
                    }
                  >
                    {answer === "呢" ? (
                      <>
                        ✓ Chính xác! <strong>我很好，你呢？</strong>
                      </>
                    ) : (
                      <>
                        ✗ Chưa đúng. Đáp án đúng là{" "}
                        <strong>呢</strong>.
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
                href="/ngu-phap/hsk1/3"
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
                href="/ngu-phap/hsk1/5"
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