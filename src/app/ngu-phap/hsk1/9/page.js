"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function GrammarLesson9() {
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("grammar-hsk1-9");

    if (saved === "completed") {
      setCompleted(true);
    }
  }, []);

  const checkAnswer = (value) => {
    if (answer) return;
    setAnswer(value);
  };

  const handleComplete = () => {
    localStorage.setItem("grammar-hsk1-9", "completed");
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
              NGỮ PHÁP HSK1 • BÀI 9
            </div>

            <h1>Câu với 在</h1>

            <p className="grammar-intro">
              Học cách dùng 在 để nói một người hoặc vật đang ở đâu.
            </p>

            <section className="grammar-section">
              <h2>1. Cấu trúc cơ bản</h2>

              <div className="formula-box">
                Chủ ngữ + 在 + Địa điểm
              </div>

              <p>
                在 trong cấu trúc này mang nghĩa <strong>“ở, tại”</strong>.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我在学校。
                </div>

                <div className="example-pinyin">
                  Wǒ zài xuéxiào.
                </div>

                <div className="example-vietnamese">
                  Tôi ở trường.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  他在家。
                </div>

                <div className="example-pinyin">
                  Tā zài jiā.
                </div>

                <div className="example-vietnamese">
                  Anh ấy ở nhà.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>2. Một số ví dụ</h2>

              <div className="example-card">
                <div className="example-chinese">
                  老师在学校。
                </div>

                <div className="example-pinyin">
                  Lǎoshī zài xuéxiào.
                </div>

                <div className="example-vietnamese">
                  Giáo viên ở trường.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  妈妈在家。
                </div>

                <div className="example-pinyin">
                  Māma zài jiā.
                </div>

                <div className="example-vietnamese">
                  Mẹ ở nhà.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  书在桌子上。
                </div>

                <div className="example-pinyin">
                  Shū zài zhuōzi shàng.
                </div>

                <div className="example-vietnamese">
                  Quyển sách ở trên bàn.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>3. Hỏi vị trí với 在哪里</h2>

              <div className="formula-box">
                Chủ ngữ + 在哪里？
              </div>

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
                  我在学校。
                </div>

                <div className="example-pinyin">
                  Wǒ zài xuéxiào.
                </div>

                <div className="example-vietnamese">
                  Tôi ở trường.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>4. 在 + địa điểm + động từ</h2>

              <div className="formula-box">
                Chủ ngữ + 在 + Địa điểm + Động từ
              </div>

              <p>
                Khi 在 đứng trước địa điểm và sau đó có động từ,
                câu diễn tả hành động được thực hiện tại địa điểm đó.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我在学校学习。
                </div>

                <div className="example-pinyin">
                  Wǒ zài xuéxiào xuéxí.
                </div>

                <div className="example-vietnamese">
                  Tôi học ở trường.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  他在家吃饭。
                </div>

                <div className="example-pinyin">
                  Tā zài jiā chīfàn.
                </div>

                <div className="example-vietnamese">
                  Anh ấy ăn cơm ở nhà.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>5. Phân biệt 在 và 有</h2>

              <div className="example-card">
                <div className="example-chinese">
                  我在学校。
                </div>

                <div className="example-pinyin">
                  Wǒ zài xuéxiào.
                </div>

                <div className="example-vietnamese">
                  Tôi ở trường.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  学校有学生。
                </div>

                <div className="example-pinyin">
                  Xuéxiào yǒu xuésheng.
                </div>

                <div className="example-vietnamese">
                  Trường học có học sinh.
                </div>
              </div>

              <p>
                <strong>在</strong> tập trung vào vị trí của người hoặc vật.
                <br />
                <strong>有</strong> tập trung vào sự tồn tại hoặc sở hữu.
              </p>
            </section>

            <section className="grammar-section">
              <h2>6. Lỗi thường gặp</h2>

              <div className="mistake-box">
                <p>
                  ❌ 我学校在。
                </p>

                <p>
                  ✅ 我在学校。
                </p>

                <p>
                  Trong câu nói vị trí, 在 đứng trước địa điểm.
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
                  我 ___ 学校。
                </p>

                <div className="exercise-options">
                  {["在", "有", "是"].map((option) => (
                    <button
                      key={option}
                      onClick={() => checkAnswer(option)}
                      className={
                        answer === option
                          ? option === "在"
                            ? "answer-correct"
                            : "answer-wrong"
                          : answer && option === "在"
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
                      answer === "在"
                        ? "exercise-result correct"
                        : "exercise-result wrong"
                    }
                  >
                    {answer === "在" ? (
                      <>
                        ✓ Chính xác! <strong>我在学校。</strong>
                      </>
                    ) : (
                      <>
                        ✗ Chưa đúng. Đáp án đúng là{" "}
                        <strong>在</strong>.
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
                href="/ngu-phap/hsk1/8"
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
                href="/ngu-phap/hsk1/10"
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