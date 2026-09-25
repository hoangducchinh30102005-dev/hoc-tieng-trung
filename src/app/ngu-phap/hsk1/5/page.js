"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function GrammarLesson5() {
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("grammar-hsk1-5");

    if (saved === "completed") {
      setCompleted(true);
    }
  }, []);

  const checkAnswer = (value) => {
    if (answer) return;
    setAnswer(value);
  };

  const handleComplete = () => {
    localStorage.setItem("grammar-hsk1-5", "completed");
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
              NGỮ PHÁP HSK1 • BÀI 5
            </div>

            <h1>Trợ từ 的</h1>

            <p className="grammar-intro">
              Học cách dùng 的 để biểu thị quan hệ sở hữu và bổ nghĩa cho
              danh từ.
            </p>

            <section className="grammar-section">
              <h2>1. Cấu trúc sở hữu</h2>

              <div className="formula-box">
                Người sở hữu + 的 + Danh từ
              </div>

              <p>
                的 thường được hiểu là <strong>“của”</strong> khi dùng để
                biểu thị quan hệ sở hữu.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我的书。
                </div>

                <div className="example-pinyin">
                  Wǒ de shū.
                </div>

                <div className="example-vietnamese">
                  Sách của tôi.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  你的老师。
                </div>

                <div className="example-pinyin">
                  Nǐ de lǎoshī.
                </div>

                <div className="example-vietnamese">
                  Giáo viên của bạn.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>2. Một số ví dụ</h2>

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
                  那是你的杯子。
                </div>

                <div className="example-pinyin">
                  Nà shì nǐ de bēizi.
                </div>

                <div className="example-vietnamese">
                  Kia là cốc của bạn.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  他是我的朋友。
                </div>

                <div className="example-pinyin">
                  Tā shì wǒ de péngyou.
                </div>

                <div className="example-vietnamese">
                  Anh ấy là bạn của tôi.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>3. 的 dùng để bổ nghĩa</h2>

              <div className="formula-box">
                Người / Vật + 的 + Danh từ
              </div>

              <p>
                Thành phần đứng trước 的 có thể dùng để bổ nghĩa cho danh
                từ đứng sau.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  中国的学生。
                </div>

                <div className="example-pinyin">
                  Zhōngguó de xuésheng.
                </div>

                <div className="example-vietnamese">
                  Học sinh / sinh viên Trung Quốc.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我的朋友。
                </div>

                <div className="example-pinyin">
                  Wǒ de péngyou.
                </div>

                <div className="example-vietnamese">
                  Bạn của tôi.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>4. Đại từ + 的</h2>

              <div className="formula-box">
                我 + 的 → 我的
                <br />
                你 + 的 → 你的
                <br />
                他 + 的 → 他的
              </div>

              <p>
                Đây là những cách kết hợp rất thường gặp trong tiếng Trung
                cơ bản.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我的家。
                </div>

                <div className="example-pinyin">
                  Wǒ de jiā.
                </div>

                <div className="example-vietnamese">
                  Nhà của tôi.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>5. Lỗi thường gặp</h2>

              <div className="mistake-box">
                <p>
                  ❌ 我书
                </p>

                <p>
                  ✅ 我的书
                </p>

                <p>
                  Khi muốn nói “sách của tôi”, cần dùng 的 giữa người sở hữu
                  và danh từ.
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
                  这是我 ___ 书。
                </p>

                <div className="exercise-options">
                  {["的", "是", "吗"].map((option) => (
                    <button
                      key={option}
                      onClick={() => checkAnswer(option)}
                      className={
                        answer === option
                          ? option === "的"
                            ? "answer-correct"
                            : "answer-wrong"
                          : answer && option === "的"
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
                      answer === "的"
                        ? "exercise-result correct"
                        : "exercise-result wrong"
                    }
                  >
                    {answer === "的" ? (
                      <>
                        ✓ Chính xác! <strong>这是我的书。</strong>
                      </>
                    ) : (
                      <>
                        ✗ Chưa đúng. Đáp án đúng là{" "}
                        <strong>的</strong>.
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
                href="/ngu-phap/hsk1/4"
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
                href="/ngu-phap/hsk1/6"
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