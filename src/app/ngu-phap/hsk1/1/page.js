"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function GrammarLesson1() {
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("grammar-hsk1-1");

    if (saved === "completed") {
      setCompleted(true);
    }
  }, []);

  const checkAnswer = (value) => {
    if (answer) return;
    setAnswer(value);
  };

  const handleComplete = () => {
    localStorage.setItem("grammar-hsk1-1", "completed");
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
              NGỮ PHÁP HSK1 • BÀI 1
            </div>

            <h1>Câu với 是</h1>

            <p className="grammar-intro">
              Học cách dùng 是 để giới thiệu, xác định hoặc nói một
              người hoặc vật là gì.
            </p>

            <section className="grammar-section">
              <h2>1. Cấu trúc</h2>

              <div className="formula-box">
                Chủ ngữ + 是 + Danh từ
              </div>

              <p>
                是 có nghĩa gần với <strong>“là”</strong> trong tiếng
                Việt.
              </p>
            </section>

            <section className="grammar-section">
              <h2>2. Cách dùng</h2>

              <p>
                Dùng 是 khi muốn xác định hoặc giới thiệu một người,
                nghề nghiệp, quốc tịch hoặc thân phận.
              </p>

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

              <div className="example-card">
                <div className="example-chinese">
                  她是老师。
                </div>

                <div className="example-pinyin">
                  Tā shì lǎoshī.
                </div>

                <div className="example-vietnamese">
                  Cô ấy là giáo viên.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我是越南人。
                </div>

                <div className="example-pinyin">
                  Wǒ shì Yuènán rén.
                </div>

                <div className="example-vietnamese">
                  Tôi là người Việt Nam.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>3. Phủ định với 不是</h2>

              <div className="formula-box">
                Chủ ngữ + 不是 + Danh từ
              </div>

              <p>
                Khi muốn nói <strong>“không phải là”</strong>, dùng
                不是.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我不是老师。
                </div>

                <div className="example-pinyin">
                  Wǒ bú shì lǎoshī.
                </div>

                <div className="example-vietnamese">
                  Tôi không phải là giáo viên.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>4. Câu hỏi với 是</h2>

              <div className="formula-box">
                Chủ ngữ + 是 + Danh từ + 吗？
              </div>

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
            </section>

            <section className="grammar-section">
              <h2>5. Lỗi thường gặp</h2>

              <div className="mistake-box">
                <p>❌ 我很是学生。</p>
                <p>✅ 我是学生。</p>
                <p>
                  Với câu “Tôi là học sinh”, không dùng 很 trước 是.
                </p>
              </div>
            </section>

            <section className="grammar-section">
              <h2>6. Bài tập nhanh</h2>

              <div className="exercise-box">
                <p className="exercise-question">
                  Chọn từ thích hợp để hoàn thành câu:
                </p>

                <p className="exercise-sentence">
                  我 ___ 学生。
                </p>

                <div className="exercise-options">
                  {["是", "不", "有"].map((option) => (
                    <button
                      key={option}
                      onClick={() => checkAnswer(option)}
                      className={
                        answer === option
                          ? option === "是"
                            ? "answer-correct"
                            : "answer-wrong"
                          : answer && option === "是"
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
                      answer === "是"
                        ? "exercise-result correct"
                        : "exercise-result wrong"
                    }
                  >
                    {answer === "是" ? (
                      <>
                        ✓ Chính xác! <strong>我是学生。</strong>
                      </>
                    ) : (
                      <>
                        ✗ Chưa đúng. Đáp án đúng là{" "}
                        <strong>是</strong>.
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
                href="/ngu-phap/hsk1"
                className="back-topic-button"
              >
                ← Danh sách ngữ pháp
              </Link>

              <Link
                href="/ngu-phap/hsk1/2"
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