"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function GrammarLesson8() {
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("grammar-hsk1-8");

    if (saved === "completed") {
      setCompleted(true);
    }
  }, []);

  const checkAnswer = (value) => {
    if (answer) return;
    setAnswer(value);
  };

  const handleComplete = () => {
    localStorage.setItem("grammar-hsk1-8", "completed");
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
              NGỮ PHÁP HSK1 • BÀI 8
            </div>

            <h1>Câu với 有</h1>

            <p className="grammar-intro">
              Học cách dùng 有 để diễn đạt “có”, nói về người, đồ vật
              hoặc những thứ tồn tại trong một nơi nào đó.
            </p>

            <section className="grammar-section">
              <h2>1. Cấu trúc cơ bản</h2>

              <div className="formula-box">
                Chủ ngữ + 有 + Danh từ
              </div>

              <p>
                有 có nghĩa là <strong>“có”</strong>, dùng để nói một
                người hoặc một nơi sở hữu hay có một đối tượng nào đó.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我有一本书。
                </div>

                <div className="example-pinyin">
                  Wǒ yǒu yì běn shū.
                </div>

                <div className="example-vietnamese">
                  Tôi có một quyển sách.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>2. Nói về người</h2>

              <div className="example-card">
                <div className="example-chinese">
                  我有一个朋友。
                </div>

                <div className="example-pinyin">
                  Wǒ yǒu yí ge péngyou.
                </div>

                <div className="example-vietnamese">
                  Tôi có một người bạn.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  她有一个哥哥。
                </div>

                <div className="example-pinyin">
                  Tā yǒu yí ge gēge.
                </div>

                <div className="example-vietnamese">
                  Cô ấy có một anh trai.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>3. Nói về đồ vật</h2>

              <div className="example-card">
                <div className="example-chinese">
                  我有一部手机。
                </div>

                <div className="example-pinyin">
                  Wǒ yǒu yí bù shǒujī.
                </div>

                <div className="example-vietnamese">
                  Tôi có một chiếc điện thoại.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  他有一辆车。
                </div>

                <div className="example-pinyin">
                  Tā yǒu yí liàng chē.
                </div>

                <div className="example-vietnamese">
                  Anh ấy có một chiếc xe.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>4. Nói về sự tồn tại ở một nơi</h2>

              <div className="formula-box">
                Địa điểm + 有 + Danh từ
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  学校有很多学生。
                </div>

                <div className="example-pinyin">
                  Xuéxiào yǒu hěn duō xuésheng.
                </div>

                <div className="example-vietnamese">
                  Trường học có rất nhiều học sinh.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  家里有三个人。
                </div>

                <div className="example-pinyin">
                  Jiā li yǒu sān ge rén.
                </div>

                <div className="example-vietnamese">
                  Trong nhà có ba người.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>5. Phủ định với 有</h2>

              <div className="formula-box">
                有 → 没有
              </div>

              <p>
                Khi phủ định 有, dùng <strong>没有</strong>, không dùng
                不有.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我没有车。
                </div>

                <div className="example-pinyin">
                  Wǒ méiyǒu chē.
                </div>

                <div className="example-vietnamese">
                  Tôi không có xe.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>6. Lỗi thường gặp</h2>

              <div className="mistake-box">
                <p>
                  ❌ 我不有钱。
                </p>

                <p>
                  ✅ 我没有钱。
                </p>

                <p>
                  有 được phủ định bằng 没有.
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
                  我 ___ 一个朋友。
                </p>

                <div className="exercise-options">
                  {["有", "是", "在"].map((option) => (
                    <button
                      key={option}
                      onClick={() => checkAnswer(option)}
                      className={
                        answer === option
                          ? option === "有"
                            ? "answer-correct"
                            : "answer-wrong"
                          : answer && option === "有"
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
                      answer === "有"
                        ? "exercise-result correct"
                        : "exercise-result wrong"
                    }
                  >
                    {answer === "有" ? (
                      <>
                        ✓ Chính xác! <strong>我有一个朋友。</strong>
                      </>
                    ) : (
                      <>
                        ✗ Chưa đúng. Đáp án đúng là{" "}
                        <strong>有</strong>.
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
                href="/ngu-phap/hsk1/7"
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
                href="/ngu-phap/hsk1/9"
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