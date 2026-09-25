"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function GrammarLesson10() {
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("grammar-hsk1-10");

    if (saved === "completed") {
      setCompleted(true);
    }
  }, []);

  const checkAnswer = (value) => {
    if (answer) return;
    setAnswer(value);
  };

  const handleComplete = () => {
    localStorage.setItem("grammar-hsk1-10", "completed");
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
              NGỮ PHÁP HSK1 • BÀI 10
            </div>

            <h1>这 / 那 / 哪</h1>

            <p className="grammar-intro">
              Học cách dùng 这, 那 và 哪 để chỉ người, vật ở gần,
              ở xa hoặc hỏi “nào”.
            </p>

            <section className="grammar-section">
              <h2>1. 这 – này, đây</h2>

              <div className="formula-box">
                这 + Danh từ
              </div>

              <p>
                这 dùng để chỉ người hoặc vật ở gần người nói.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  这是我的书。
                </div>

                <div className="example-pinyin">
                  Zhè shì wǒ de shū.
                </div>

                <div className="example-vietnamese">
                  Đây là sách của tôi.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  这个人是老师。
                </div>

                <div className="example-pinyin">
                  Zhè ge rén shì lǎoshī.
                </div>

                <div className="example-vietnamese">
                  Người này là giáo viên.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>2. 那 – kia, đó</h2>

              <div className="formula-box">
                那 + Danh từ
              </div>

              <p>
                那 dùng để chỉ người hoặc vật ở xa người nói hơn.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  那是我的朋友。
                </div>

                <div className="example-pinyin">
                  Nà shì wǒ de péngyou.
                </div>

                <div className="example-vietnamese">
                  Kia là bạn của tôi.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  那个人是老师。
                </div>

                <div className="example-pinyin">
                  Nà ge rén shì lǎoshī.
                </div>

                <div className="example-vietnamese">
                  Người kia là giáo viên.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>3. 哪 – nào</h2>

              <div className="formula-box">
                哪 + Danh từ
              </div>

              <p>
                哪 dùng để hỏi lựa chọn hoặc xác định một người,
                vật nào đó.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  哪个人是你的朋友？
                </div>

                <div className="example-pinyin">
                  Nǎ ge rén shì nǐ de péngyou?
                </div>

                <div className="example-vietnamese">
                  Người nào là bạn của bạn?
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  哪本书是你的？
                </div>

                <div className="example-pinyin">
                  Nǎ běn shū shì nǐ de?
                </div>

                <div className="example-vietnamese">
                  Quyển sách nào là của bạn?
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>4. So sánh 这 / 那 / 哪</h2>

              <div className="example-card">
                <div className="example-chinese">
                  这本书
                </div>

                <div className="example-pinyin">
                  Zhè běn shū
                </div>

                <div className="example-vietnamese">
                  Quyển sách này
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  那本书
                </div>

                <div className="example-pinyin">
                  Nà běn shū
                </div>

                <div className="example-vietnamese">
                  Quyển sách kia
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  哪本书
                </div>

                <div className="example-pinyin">
                  Nǎ běn shū
                </div>

                <div className="example-vietnamese">
                  Quyển sách nào
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>5. Cách dùng với 是</h2>

              <p>
                这 và 那 thường kết hợp với 是 để giới thiệu hoặc
                xác định người, vật.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  这是我的老师。
                </div>

                <div className="example-pinyin">
                  Zhè shì wǒ de lǎoshī.
                </div>

                <div className="example-vietnamese">
                  Đây là giáo viên của tôi.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  那是我的家。
                </div>

                <div className="example-pinyin">
                  Nà shì wǒ de jiā.
                </div>

                <div className="example-vietnamese">
                  Kia là nhà của tôi.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>6. Lỗi thường gặp</h2>

              <div className="mistake-box">
                <p>
                  ❌ 这书是我的。
                </p>

                <p>
                  ✅ 这本书是我的。
                </p>

                <p>
                  Khi dùng với danh từ cần lượng từ, phải dùng lượng từ
                  phù hợp như 本 trong 这本书.
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
                  ___ 是我的书。
                </p>

                <div className="exercise-options">
                  {["这", "哪", "谁"].map((option) => (
                    <button
                      key={option}
                      onClick={() => checkAnswer(option)}
                      className={
                        answer === option
                          ? option === "这"
                            ? "answer-correct"
                            : "answer-wrong"
                          : answer && option === "这"
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
                      answer === "这"
                        ? "exercise-result correct"
                        : "exercise-result wrong"
                    }
                  >
                    {answer === "这" ? (
                      <>
                        ✓ Chính xác! <strong>这是我的书。</strong>
                      </>
                    ) : (
                      <>
                        ✗ Chưa đúng. Đáp án đúng là{" "}
                        <strong>这</strong>.
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
                href="/ngu-phap/hsk1/9"
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
                href="/ngu-phap/hsk1/11"
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