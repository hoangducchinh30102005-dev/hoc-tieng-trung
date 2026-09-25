"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function GrammarLesson16() {
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("grammar-hsk1-16");

    if (saved === "completed") {
      setCompleted(true);
    }
  }, []);

  const checkAnswer = (value) => {
    if (answer) return;
    setAnswer(value);
  };

  const handleComplete = () => {
    localStorage.setItem("grammar-hsk1-16", "completed");
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
              NGỮ PHÁP HSK1 • BÀI 16
            </div>

            <h1>Trợ từ 吧</h1>

            <p className="grammar-intro">
              Học cách dùng 吧 để đưa ra lời đề nghị, gợi ý hoặc làm
              câu nói nhẹ nhàng hơn.
            </p>

            <section className="grammar-section">
              <h2>1. 吧 dùng để làm gì?</h2>

              <div className="formula-box">
                Câu + 吧
              </div>

              <p>
                吧 thường được đặt ở cuối câu. Trong giao tiếp,
                吧 có thể giúp câu nói mang sắc thái gợi ý,
                đề nghị hoặc nhẹ nhàng hơn.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我们走吧。
                </div>

                <div className="example-pinyin">
                  Wǒmen zǒu ba.
                </div>

                <div className="example-vietnamese">
                  Chúng ta đi thôi.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我们吃饭吧。
                </div>

                <div className="example-pinyin">
                  Wǒmen chīfàn ba.
                </div>

                <div className="example-vietnamese">
                  Chúng ta ăn cơm nhé.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>2. Dùng 吧 để đưa ra đề nghị</h2>

              <div className="formula-box">
                Động từ + 吧
              </div>

              <p>
                Khi muốn rủ hoặc đề nghị ai đó cùng làm một việc,
                có thể thêm 吧 ở cuối câu.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我们学习吧。
                </div>

                <div className="example-pinyin">
                  Wǒmen xuéxí ba.
                </div>

                <div className="example-vietnamese">
                  Chúng ta học nhé.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我们喝茶吧。
                </div>

                <div className="example-pinyin">
                  Wǒmen hē chá ba.
                </div>

                <div className="example-vietnamese">
                  Chúng ta uống trà nhé.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>3. Dùng 吧 để làm câu nhẹ nhàng hơn</h2>

              <p>
                吧 cũng có thể làm cho lời đề nghị hoặc yêu cầu
                nghe mềm mại, tự nhiên hơn trong giao tiếp.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  坐吧。
                </div>

                <div className="example-pinyin">
                  Zuò ba.
                </div>

                <div className="example-vietnamese">
                  Ngồi đi nhé.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  请进吧。
                </div>

                <div className="example-pinyin">
                  Qǐng jìn ba.
                </div>

                <div className="example-vietnamese">
                  Mời vào nhé.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>4. 吧 trong câu hỏi lựa chọn</h2>

              <div className="formula-box">
                A 还是 B？
              </div>

              <p>
                Trong một số câu hỏi mang tính phỏng đoán hoặc xác nhận,
                吧 có thể xuất hiện ở cuối câu.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  你是学生吧？
                </div>

                <div className="example-pinyin">
                  Nǐ shì xuésheng ba?
                </div>

                <div className="example-vietnamese">
                  Bạn là học sinh, phải không?
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  他是老师吧？
                </div>

                <div className="example-pinyin">
                  Tā shì lǎoshī ba?
                </div>

                <div className="example-vietnamese">
                  Anh ấy là giáo viên, phải không?
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>5. Phân biệt 吧 và 吗</h2>

              <div className="example-card">
                <div className="example-chinese">
                  你是学生吗？
                </div>

                <div className="example-pinyin">
                  Nǐ shì xuésheng ma?
                </div>

                <div className="example-vietnamese">
                  Bạn có phải là học sinh không?
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  你是学生吧？
                </div>

                <div className="example-pinyin">
                  Nǐ shì xuésheng ba?
                </div>

                <div className="example-vietnamese">
                  Bạn là học sinh, phải không?
                </div>
              </div>

              <p>
                <strong>吗</strong> thường dùng để tạo câu hỏi
                Yes/No trực tiếp.
                <br />
                <strong>吧</strong> thường mang sắc thái gợi ý,
                phỏng đoán hoặc xác nhận nhẹ nhàng.
              </p>
            </section>

            <section className="grammar-section">
              <h2>6. Lưu ý</h2>

              <div className="mistake-box">
                <p>❌ 我们吧吃饭。</p>
                <p>✅ 我们吃饭吧。</p>
                <p>
                  吧 thường đứng ở cuối câu khi dùng với ý nghĩa
                  đề nghị hoặc gợi ý.
                </p>
              </div>
            </section>

            <section className="grammar-section">
              <h2>7. Bài tập nhanh</h2>

              <div className="exercise-box">
                <p className="exercise-question">
                  Chọn từ thích hợp:
                </p>

                <p className="exercise-sentence">
                  我们吃饭 ___ 。
                </p>

                <div className="exercise-options">
                  {["吧", "吗", "的"].map((option) => (
                    <button
                      key={option}
                      onClick={() => checkAnswer(option)}
                      className={
                        answer === option
                          ? option === "吧"
                            ? "answer-correct"
                            : "answer-wrong"
                          : answer && option === "吧"
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
                      answer === "吧"
                        ? "exercise-result correct"
                        : "exercise-result wrong"
                    }
                  >
                    {answer === "吧" ? (
                      <>
                        ✓ Chính xác! <strong>我们吃饭吧。</strong>
                      </>
                    ) : (
                      <>
                        ✗ Chưa đúng. Đáp án đúng là{" "}
                        <strong>吧</strong>.
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
                href="/ngu-phap/hsk1/15"
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
                href="/ngu-phap"
                className="level-button"
              >
                Hoàn thành HSK1 →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}