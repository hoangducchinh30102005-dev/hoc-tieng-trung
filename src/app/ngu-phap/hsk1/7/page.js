"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function GrammarLesson7() {
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("grammar-hsk1-7");

    if (saved === "completed") {
      setCompleted(true);
    }
  }, []);

  const checkAnswer = (value) => {
    if (answer) return;
    setAnswer(value);
  };

  const handleComplete = () => {
    localStorage.setItem("grammar-hsk1-7", "completed");
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
              NGỮ PHÁP HSK1 • BÀI 7
            </div>

            <h1>Phủ định với 没有</h1>

            <p className="grammar-intro">
              Học cách dùng 没有 để diễn đạt “không có” hoặc phủ định
              một hành động đã xảy ra.
            </p>

            <section className="grammar-section">
              <h2>1. 没有 nghĩa là gì?</h2>

              <p>
                没有 thường mang nghĩa <strong>“không có”</strong>.
                Ngoài ra, 没有 có thể dùng để phủ định một hành động
                đã xảy ra hoặc chưa xảy ra.
              </p>

              <div className="formula-box">
                Chủ ngữ + 没有 + Danh từ
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我没有钱。
                </div>

                <div className="example-pinyin">
                  Wǒ méiyǒu qián.
                </div>

                <div className="example-vietnamese">
                  Tôi không có tiền.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>2. 没有 + Danh từ</h2>

              <div className="example-card">
                <div className="example-chinese">
                  我没有书。
                </div>

                <div className="example-pinyin">
                  Wǒ méiyǒu shū.
                </div>

                <div className="example-vietnamese">
                  Tôi không có sách.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  他没有朋友。
                </div>

                <div className="example-pinyin">
                  Tā méiyǒu péngyou.
                </div>

                <div className="example-vietnamese">
                  Anh ấy không có bạn.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我家没有电视。
                </div>

                <div className="example-pinyin">
                  Wǒ jiā méiyǒu diànshì.
                </div>

                <div className="example-vietnamese">
                  Nhà tôi không có tivi.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>3. 没有 + Động từ</h2>

              <div className="formula-box">
                Chủ ngữ + 没有 + Động từ
              </div>

              <p>
                Cách dùng này thường diễn tả một hành động chưa xảy ra
                hoặc không xảy ra trong một khoảng thời gian đã nói đến.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我没有吃饭。
                </div>

                <div className="example-pinyin">
                  Wǒ méiyǒu chīfàn.
                </div>

                <div className="example-vietnamese">
                  Tôi chưa ăn cơm.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  他没有去学校。
                </div>

                <div className="example-pinyin">
                  Tā méiyǒu qù xuéxiào.
                </div>

                <div className="example-vietnamese">
                  Anh ấy chưa đi đến trường.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>4. Phân biệt 不 và 没有</h2>

              <div className="example-card">
                <div className="example-chinese">
                  我不喝咖啡。
                </div>

                <div className="example-pinyin">
                  Wǒ bù hē kāfēi.
                </div>

                <div className="example-vietnamese">
                  Tôi không uống cà phê.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我没有喝咖啡。
                </div>

                <div className="example-pinyin">
                  Wǒ méiyǒu hē kāfēi.
                </div>

                <div className="example-vietnamese">
                  Tôi chưa uống cà phê.
                </div>
              </div>

              <p>
                <strong>不</strong>: thường nói về thói quen, ý định hoặc
                sự phủ định chung.
                <br />
                <strong>没有</strong>: thường nói về việc chưa có hoặc
                hành động chưa xảy ra.
              </p>
            </section>

            <section className="grammar-section">
              <h2>5. Lỗi thường gặp</h2>

              <div className="mistake-box">
                <p>
                  ❌ 我不有钱。
                </p>

                <p>
                  ✅ 我没有钱。
                </p>

                <p>
                  Với “có / không có”, dùng 有 / 没有.
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
                  我 ___ 钱。
                </p>

                <div className="exercise-options">
                  {["没有", "不", "是"].map((option) => (
                    <button
                      key={option}
                      onClick={() => checkAnswer(option)}
                      className={
                        answer === option
                          ? option === "没有"
                            ? "answer-correct"
                            : "answer-wrong"
                          : answer && option === "没有"
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
                      answer === "没有"
                        ? "exercise-result correct"
                        : "exercise-result wrong"
                    }
                  >
                    {answer === "没有" ? (
                      <>
                        ✓ Chính xác! <strong>我没有钱。</strong>
                      </>
                    ) : (
                      <>
                        ✗ Chưa đúng. Đáp án đúng là{" "}
                        <strong>没有</strong>.
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
                href="/ngu-phap/hsk1/6"
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
                href="/ngu-phap/hsk1/8"
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