"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function GrammarLesson3() {
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("grammar-hsk1-3");

    if (saved === "completed") {
      setCompleted(true);
    }
  }, []);

  const checkAnswer = (value) => {
    if (answer) return;
    setAnswer(value);
  };

  const handleComplete = () => {
    localStorage.setItem("grammar-hsk1-3", "completed");
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
              NGỮ PHÁP HSK1 • BÀI 3
            </div>

            <h1>Trợ từ 吗</h1>

            <p className="grammar-intro">
              Học cách dùng 吗 để tạo câu hỏi Có/Không trong tiếng Trung.
            </p>

            <section className="grammar-section">
              <h2>1. Cấu trúc</h2>

              <div className="formula-box">
                Câu khẳng định + 吗？
              </div>

              <p>
                吗 được đặt ở <strong>cuối câu</strong> để biến câu
                khẳng định thành câu hỏi Có/Không.
              </p>
            </section>

            <section className="grammar-section">
              <h2>2. Ví dụ cơ bản</h2>

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
                  你好吗？
                </div>

                <div className="example-pinyin">
                  Nǐ hǎo ma?
                </div>

                <div className="example-vietnamese">
                  Bạn khỏe không?
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  你是中国人吗？
                </div>

                <div className="example-pinyin">
                  Nǐ shì Zhōngguó rén ma?
                </div>

                <div className="example-vietnamese">
                  Bạn là người Trung Quốc phải không?
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>3. Cách trả lời</h2>

              <div className="formula-box">
                是 / 不是
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  A: 你是学生吗？
                </div>

                <div className="example-pinyin">
                  A: Nǐ shì xuésheng ma?
                </div>

                <div className="example-vietnamese">
                  A: Bạn là học sinh / sinh viên phải không?
                </div>

                <br />

                <div className="example-chinese">
                  B: 是，我是学生。
                </div>

                <div className="example-pinyin">
                  B: Shì, wǒ shì xuésheng.
                </div>

                <div className="example-vietnamese">
                  B: Đúng, tôi là học sinh / sinh viên.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  A: 你是老师吗？
                </div>

                <div className="example-pinyin">
                  A: Nǐ shì lǎoshī ma?
                </div>

                <div className="example-vietnamese">
                  A: Bạn là giáo viên phải không?
                </div>

                <br />

                <div className="example-chinese">
                  B: 不是，我是学生。
                </div>

                <div className="example-pinyin">
                  B: Bú shì, wǒ shì xuésheng.
                </div>

                <div className="example-vietnamese">
                  B: Không, tôi là học sinh / sinh viên.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>4. Với 有</h2>

              <p>
                Khi câu hỏi dùng 有, có thể trả lời bằng 有 hoặc 没有.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  你有哥哥吗？
                </div>

                <div className="example-pinyin">
                  Nǐ yǒu gēge ma?
                </div>

                <div className="example-vietnamese">
                  Bạn có anh trai không?
                </div>

                <br />

                <div className="example-chinese">
                  有，我有一个哥哥。
                </div>

                <div className="example-pinyin">
                  Yǒu, wǒ yǒu yí ge gēge.
                </div>

                <div className="example-vietnamese">
                  Có, tôi có một anh trai.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>5. Lỗi thường gặp</h2>

              <div className="mistake-box">
                <p>
                  ❌ 你是学生不？
                </p>

                <p>
                  ✅ 你是学生吗？
                </p>

                <p>
                  Ở dạng câu hỏi cơ bản, 吗 đặt ở cuối câu.
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
                  你是学生 ___？
                </p>

                <div className="exercise-options">
                  {["吗", "呢", "的"].map((option) => (
                    <button
                      key={option}
                      onClick={() => checkAnswer(option)}
                      className={
                        answer === option
                          ? option === "吗"
                            ? "answer-correct"
                            : "answer-wrong"
                          : answer && option === "吗"
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
                      answer === "吗"
                        ? "exercise-result correct"
                        : "exercise-result wrong"
                    }
                  >
                    {answer === "吗" ? (
                      <>
                        ✓ Chính xác! <strong>你是学生吗？</strong>
                      </>
                    ) : (
                      <>
                        ✗ Chưa đúng. Đáp án đúng là{" "}
                        <strong>吗</strong>.
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
                href="/ngu-phap/hsk1/2"
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
                href="/ngu-phap/hsk1/4"
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