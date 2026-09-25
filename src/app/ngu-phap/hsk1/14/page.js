"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function GrammarLesson14() {
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("grammar-hsk1-14");

    if (saved === "completed") {
      setCompleted(true);
    }
  }, []);

  const checkAnswer = (value) => {
    if (answer) return;
    setAnswer(value);
  };

  const handleComplete = () => {
    localStorage.setItem("grammar-hsk1-14", "completed");
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
              NGỮ PHÁP HSK1 • BÀI 14
            </div>

            <h1>Lượng từ cơ bản</h1>

            <p className="grammar-intro">
              Học cách dùng lượng từ khi nói về số lượng người và đồ vật
              trong tiếng Trung.
            </p>

            <section className="grammar-section">
              <h2>1. Cấu trúc cơ bản</h2>

              <div className="formula-box">
                Số + Lượng từ + Danh từ
              </div>

              <p>
                Trong tiếng Trung, khi số lượng đứng trước danh từ,
                thường cần có lượng từ ở giữa.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  三个人
                </div>

                <div className="example-pinyin">
                  sān ge rén
                </div>

                <div className="example-vietnamese">
                  Ba người.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  一本书
                </div>

                <div className="example-pinyin">
                  yì běn shū
                </div>

                <div className="example-vietnamese">
                  Một quyển sách.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>2. Lượng từ 个</h2>

              <div className="formula-box">
                Số + 个 + Danh từ
              </div>

              <p>
                个 là lượng từ thông dụng nhất, đặc biệt thường dùng
                với người.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  一个人
                </div>

                <div className="example-pinyin">
                  yí ge rén
                </div>

                <div className="example-vietnamese">
                  Một người.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  三个学生
                </div>

                <div className="example-pinyin">
                  sān ge xuésheng
                </div>

                <div className="example-vietnamese">
                  Ba học sinh.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>3. Lượng từ 本</h2>

              <div className="formula-box">
                Số + 本 + Sách / tài liệu
              </div>

              <p>
                本 thường dùng với sách, từ điển và các ấn phẩm dạng quyển.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  一本书
                </div>

                <div className="example-pinyin">
                  yì běn shū
                </div>

                <div className="example-vietnamese">
                  Một quyển sách.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  两本字典
                </div>

                <div className="example-pinyin">
                  liǎng běn zìdiǎn
                </div>

                <div className="example-vietnamese">
                  Hai quyển từ điển.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>4. Lượng từ 杯</h2>

              <div className="formula-box">
                Số + 杯 + Đồ uống
              </div>

              <p>
                杯 dùng khi nói về một cốc hoặc ly đồ uống.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  一杯茶
                </div>

                <div className="example-pinyin">
                  yì bēi chá
                </div>

                <div className="example-vietnamese">
                  Một cốc trà.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  两杯咖啡
                </div>

                <div className="example-pinyin">
                  liǎng bēi kāfēi
                </div>

                <div className="example-vietnamese">
                  Hai cốc cà phê.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>5. Lượng từ 个 với 这 / 那</h2>

              <div className="formula-box">
                这 / 那 + Lượng từ + Danh từ
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  这个人
                </div>

                <div className="example-pinyin">
                  zhè ge rén
                </div>

                <div className="example-vietnamese">
                  Người này.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  那个学生
                </div>

                <div className="example-pinyin">
                  nà ge xuésheng
                </div>

                <div className="example-vietnamese">
                  Học sinh kia.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>6. Lưu ý</h2>

              <p>
                Khi nói số lượng cụ thể, không nên bỏ lượng từ.
              </p>

              <div className="mistake-box">
                <p>
                  ❌ 三人
                </p>

                <p>
                  ✅ 三个人
                </p>

                <p>
                  Ở trình độ cơ bản, hãy nhớ cấu trúc:
                  <strong> Số + Lượng từ + Danh từ.</strong>
                </p>
              </div>
            </section>

            <section className="grammar-section">
              <h2>7. Bài tập nhanh</h2>

              <div className="exercise-box">
                <p className="exercise-question">
                  Chọn lượng từ thích hợp:
                </p>

                <p className="exercise-sentence">
                  三 ___ 学生
                </p>

                <div className="exercise-options">
                  {["个", "本", "杯"].map((option) => (
                    <button
                      key={option}
                      onClick={() => checkAnswer(option)}
                      className={
                        answer === option
                          ? option === "个"
                            ? "answer-correct"
                            : "answer-wrong"
                          : answer && option === "个"
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
                      answer === "个"
                        ? "exercise-result correct"
                        : "exercise-result wrong"
                    }
                  >
                    {answer === "个" ? (
                      <>
                        ✓ Chính xác! <strong>三个学生。</strong>
                      </>
                    ) : (
                      <>
                        ✗ Chưa đúng. Đáp án đúng là{" "}
                        <strong>个</strong>.
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
                href="/ngu-phap/hsk1/13"
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
                href="/ngu-phap/hsk1/15"
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