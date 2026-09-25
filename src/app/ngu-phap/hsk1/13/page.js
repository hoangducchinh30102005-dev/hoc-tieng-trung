"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function GrammarLesson13() {
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("grammar-hsk1-13");

    if (saved === "completed") {
      setCompleted(true);
    }
  }, []);

  const checkAnswer = (value) => {
    if (answer) return;
    setAnswer(value);
  };

  const handleComplete = () => {
    localStorage.setItem("grammar-hsk1-13", "completed");
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
              NGỮ PHÁP HSK1 • BÀI 13
            </div>

            <h1>也 và 都</h1>

            <p className="grammar-intro">
              Học cách dùng 也 để nói “cũng” và 都 để nói “đều”.
            </p>

            <section className="grammar-section">
              <h2>1. 也 – cũng</h2>

              <div className="formula-box">
                Chủ ngữ + 也 + Động từ / Tính từ
              </div>

              <p>
                也 dùng khi một người hoặc một sự việc có đặc điểm,
                hành động tương tự với người hoặc sự việc đã được nói trước.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我是学生，他也是学生。
                </div>

                <div className="example-pinyin">
                  Wǒ shì xuésheng, tā yě shì xuésheng.
                </div>

                <div className="example-vietnamese">
                  Tôi là học sinh, anh ấy cũng là học sinh.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我喜欢喝茶，她也喜欢喝茶。
                </div>

                <div className="example-pinyin">
                  Wǒ xǐhuan hē chá, tā yě xǐhuan hē chá.
                </div>

                <div className="example-vietnamese">
                  Tôi thích uống trà, cô ấy cũng thích uống trà.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>2. Vị trí của 也</h2>

              <div className="formula-box">
                Chủ ngữ + 也 + Động từ
              </div>

              <p>
                也 thường đứng sau chủ ngữ và trước động từ hoặc tính từ.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我也学习汉语。
                </div>

                <div className="example-pinyin">
                  Wǒ yě xuéxí Hànyǔ.
                </div>

                <div className="example-vietnamese">
                  Tôi cũng học tiếng Trung.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我也很好。
                </div>

                <div className="example-pinyin">
                  Wǒ yě hěn hǎo.
                </div>

                <div className="example-vietnamese">
                  Tôi cũng khỏe.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>3. 都 – đều</h2>

              <div className="formula-box">
                Chủ ngữ + 都 + Động từ / Tính từ
              </div>

              <p>
                都 dùng để nói tất cả các đối tượng trong phạm vi được
                nhắc đến đều có cùng đặc điểm hoặc cùng thực hiện hành động.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我们都是学生。
                </div>

                <div className="example-pinyin">
                  Wǒmen dōu shì xuésheng.
                </div>

                <div className="example-vietnamese">
                  Chúng tôi đều là học sinh.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  他们都喜欢中国。
                </div>

                <div className="example-pinyin">
                  Tāmen dōu xǐhuan Zhōngguó.
                </div>

                <div className="example-vietnamese">
                  Họ đều thích Trung Quốc.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>4. Vị trí của 都</h2>

              <div className="formula-box">
                Chủ ngữ + 都 + Động từ / Tính từ
              </div>

              <p>
                都 thường đứng sau chủ ngữ và trước động từ hoặc tính từ.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我们都学习汉语。
                </div>

                <div className="example-pinyin">
                  Wǒmen dōu xuéxí Hànyǔ.
                </div>

                <div className="example-vietnamese">
                  Chúng tôi đều học tiếng Trung.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>5. Phân biệt 也 và 都</h2>

              <div className="example-card">
                <div className="example-chinese">
                  我也喜欢茶。
                </div>

                <div className="example-pinyin">
                  Wǒ yě xǐhuan chá.
                </div>

                <div className="example-vietnamese">
                  Tôi cũng thích trà.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我们都喜欢茶。
                </div>

                <div className="example-pinyin">
                  Wǒmen dōu xǐhuan chá.
                </div>

                <div className="example-vietnamese">
                  Chúng tôi đều thích trà.
                </div>
              </div>

              <p>
                <strong>也</strong> = cũng, thường thể hiện sự tương đồng
                giữa các đối tượng.
                <br />
                <strong>都</strong> = đều, nhấn mạnh tất cả các đối tượng
                trong nhóm.
              </p>
            </section>

            <section className="grammar-section">
              <h2>6. Lỗi thường gặp</h2>

              <div className="mistake-box">
                <p>
                  ❌ 我喜欢也茶。
                </p>

                <p>
                  ✅ 我也喜欢茶。
                </p>

                <p>
                  也 đứng trước động từ hoặc tính từ trong cấu trúc cơ bản.
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
                  我们 ___ 是学生。
                </p>

                <div className="exercise-options">
                  {["都", "也", "很"].map((option) => (
                    <button
                      key={option}
                      onClick={() => checkAnswer(option)}
                      className={
                        answer === option
                          ? option === "都"
                            ? "answer-correct"
                            : "answer-wrong"
                          : answer && option === "都"
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
                      answer === "都"
                        ? "exercise-result correct"
                        : "exercise-result wrong"
                    }
                  >
                    {answer === "都" ? (
                      <>
                        ✓ Chính xác! <strong>我们都是学生。</strong>
                      </>
                    ) : (
                      <>
                        ✗ Chưa đúng. Đáp án đúng là{" "}
                        <strong>都</strong>.
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
                href="/ngu-phap/hsk1/12"
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
                href="/ngu-phap/hsk1/14"
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