"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function GrammarLesson2() {
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("grammar-hsk1-2");

    if (saved === "completed") {
      setCompleted(true);
    }
  }, []);

  const checkAnswer = (value) => {
    if (answer) return;
    setAnswer(value);
  };

  const handleComplete = () => {
    localStorage.setItem("grammar-hsk1-2", "completed");
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
              NGỮ PHÁP HSK1 • BÀI 2
            </div>

            <h1>Câu với 叫</h1>

            <p className="grammar-intro">
              Học cách sử dụng 叫 để giới thiệu tên hoặc nói tên của một người.
            </p>

            <section className="grammar-section">
              <h2>1. Cấu trúc</h2>

              <div className="formula-box">
                Chủ ngữ + 叫 + Tên
              </div>

              <p>
                叫 có nghĩa là <strong>“tên là / gọi là”</strong>.
                Đây là cách rất phổ biến để giới thiệu tên trong tiếng Trung.
              </p>
            </section>

            <section className="grammar-section">
              <h2>2. Giới thiệu tên</h2>

              <div className="example-card">
                <div className="example-chinese">
                  我叫小明。
                </div>

                <div className="example-pinyin">
                  Wǒ jiào Xiǎo Míng.
                </div>

                <div className="example-vietnamese">
                  Tôi tên là Tiểu Minh.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我叫李明。
                </div>

                <div className="example-pinyin">
                  Wǒ jiào Lǐ Míng.
                </div>

                <div className="example-vietnamese">
                  Tôi tên là Lý Minh.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>3. Hỏi tên người khác</h2>

              <div className="formula-box">
                你叫什么名字？
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  你叫什么名字？
                </div>

                <div className="example-pinyin">
                  Nǐ jiào shénme míngzi?
                </div>

                <div className="example-vietnamese">
                  Bạn tên là gì?
                </div>
              </div>

              <p>
                <strong>什么</strong> nghĩa là “gì”, còn{" "}
                <strong>名字</strong> nghĩa là “tên”.
              </p>
            </section>

            <section className="grammar-section">
              <h2>4. Trả lời</h2>

              <div className="formula-box">
                我叫 + Tên
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我叫王芳。
                </div>

                <div className="example-pinyin">
                  Wǒ jiào Wáng Fāng.
                </div>

                <div className="example-vietnamese">
                  Tôi tên là Vương Phương.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>5. Phân biệt 叫 và 是</h2>

              <div className="example-card">
                <div className="example-chinese">
                  我叫小明。
                </div>

                <div className="example-pinyin">
                  Wǒ jiào Xiǎo Míng.
                </div>

                <div className="example-vietnamese">
                  Tôi tên là Tiểu Minh.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我是学生。
                </div>

                <div className="example-pinyin">
                  Wǒ shì xuésheng.
                </div>

                <div className="example-vietnamese">
                  Tôi là học sinh / sinh viên.
                </div>
              </div>

              <p>
                <strong>叫</strong> dùng để nói tên, còn{" "}
                <strong>是</strong> dùng để xác định “là” một người,
                nghề nghiệp hoặc thân phận.
              </p>
            </section>

            <section className="grammar-section">
              <h2>6. Lỗi thường gặp</h2>

              <div className="mistake-box">
                <p>❌ 我是小明。 — khi muốn nói “Tôi tên là Tiểu Minh”.</p>

                <p>✅ 我叫小明。</p>

                <p>
                  Trong cách giới thiệu tên cơ bản, dùng 叫 là cách tự nhiên
                  và thông dụng.
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
                  我 ___ 小明。
                </p>

                <div className="exercise-options">
                  {["叫", "是", "有"].map((option) => (
                    <button
                      key={option}
                      onClick={() => checkAnswer(option)}
                      className={
                        answer === option
                          ? option === "叫"
                            ? "answer-correct"
                            : "answer-wrong"
                          : answer && option === "叫"
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
                      answer === "叫"
                        ? "exercise-result correct"
                        : "exercise-result wrong"
                    }
                  >
                    {answer === "叫" ? (
                      <>
                        ✓ Chính xác! <strong>我叫小明。</strong>
                      </>
                    ) : (
                      <>
                        ✗ Chưa đúng. Đáp án đúng là{" "}
                        <strong>叫</strong>.
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
                href="/ngu-phap/hsk1/1"
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
                href="/ngu-phap/hsk1/3"
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