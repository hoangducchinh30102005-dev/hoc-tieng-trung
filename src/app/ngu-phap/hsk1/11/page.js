"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function GrammarLesson11() {
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("grammar-hsk1-11");

    if (saved === "completed") {
      setCompleted(true);
    }
  }, []);

  const checkAnswer = (value) => {
    if (answer) return;
    setAnswer(value);
  };

  const handleComplete = () => {
    localStorage.setItem("grammar-hsk1-11", "completed");
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
              NGỮ PHÁP HSK1 • BÀI 11
            </div>

            <h1>谁 / 什么 / 哪里</h1>

            <p className="grammar-intro">
              Học cách đặt câu hỏi với 谁 (ai), 什么 (cái gì) và
              哪里 (ở đâu).
            </p>

            <section className="grammar-section">
              <h2>1. 谁 – ai</h2>

              <div className="formula-box">
                Chủ ngữ + 是 + 谁？
              </div>

              <p>
                谁 dùng để hỏi về <strong>người</strong>.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  你是谁？
                </div>

                <div className="example-pinyin">
                  Nǐ shì shéi?
                </div>

                <div className="example-vietnamese">
                  Bạn là ai?
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  他是谁？
                </div>

                <div className="example-pinyin">
                  Tā shì shéi?
                </div>

                <div className="example-vietnamese">
                  Anh ấy là ai?
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>2. 什么 – cái gì</h2>

              <div className="formula-box">
                Chủ ngữ + Động từ + 什么？
              </div>

              <p>
                什么 dùng để hỏi về <strong>sự vật, đồ vật hoặc nội dung</strong>.
              </p>

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

              <div className="example-card">
                <div className="example-chinese">
                  你吃什么？
                </div>

                <div className="example-pinyin">
                  Nǐ chī shénme?
                </div>

                <div className="example-vietnamese">
                  Bạn ăn gì?
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  这是什么？
                </div>

                <div className="example-pinyin">
                  Zhè shì shénme?
                </div>

                <div className="example-vietnamese">
                  Đây là cái gì?
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>3. 哪里 – ở đâu</h2>

              <div className="formula-box">
                Chủ ngữ + 在 + 哪里？
              </div>

              <p>
                哪里 dùng để hỏi về <strong>địa điểm</strong>.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  你在哪里？
                </div>

                <div className="example-pinyin">
                  Nǐ zài nǎlǐ?
                </div>

                <div className="example-vietnamese">
                  Bạn ở đâu?
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  学校在哪里？
                </div>

                <div className="example-pinyin">
                  Xuéxiào zài nǎlǐ?
                </div>

                <div className="example-vietnamese">
                  Trường học ở đâu?
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>4. Ba từ hỏi cơ bản</h2>

              <div className="example-card">
                <div className="example-chinese">
                  谁
                </div>

                <div className="example-pinyin">
                  Shéi
                </div>

                <div className="example-vietnamese">
                  Ai – hỏi về người
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  什么
                </div>

                <div className="example-pinyin">
                  Shénme
                </div>

                <div className="example-vietnamese">
                  Cái gì / gì – hỏi về sự vật, nội dung
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  哪里
                </div>

                <div className="example-pinyin">
                  Nǎlǐ
                </div>

                <div className="example-vietnamese">
                  Ở đâu – hỏi về địa điểm
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>5. Lưu ý quan trọng</h2>

              <p>
                Trong câu hỏi có từ hỏi như 谁, 什么, 哪里, không cần
                thêm <strong>吗</strong> ở cuối câu.
              </p>

              <div className="mistake-box">
                <p>
                  ❌ 你是谁吗？
                </p>

                <p>
                  ✅ 你是谁？
                </p>

                <p>
                  Từ hỏi đã trực tiếp tạo thành câu hỏi.
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
                  你 ___ ？
                </p>

                <div className="exercise-options">
                  {["是谁", "什么", "哪里"].map((option) => (
                    <button
                      key={option}
                      onClick={() => checkAnswer(option)}
                      className={
                        answer === option
                          ? option === "是谁"
                            ? "answer-correct"
                            : "answer-wrong"
                          : answer && option === "是谁"
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
                      answer === "是谁"
                        ? "exercise-result correct"
                        : "exercise-result wrong"
                    }
                  >
                    {answer === "是谁" ? (
                      <>
                        ✓ Chính xác! <strong>你是谁？</strong>
                      </>
                    ) : (
                      <>
                        ✗ Chưa đúng. Đáp án đúng là{" "}
                        <strong>是谁</strong>.
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
                href="/ngu-phap/hsk1/10"
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
                href="/ngu-phap/hsk1/12"
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