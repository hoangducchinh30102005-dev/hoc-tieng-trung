"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function GrammarLesson6() {
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("grammar-hsk1-6");

    if (saved === "completed") {
      setCompleted(true);
    }
  }, []);

  const checkAnswer = (value) => {
    if (answer) return;
    setAnswer(value);
  };

  const handleComplete = () => {
    localStorage.setItem("grammar-hsk1-6", "completed");
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
              NGỮ PHÁP HSK1 • BÀI 6
            </div>

            <h1>Phủ định với 不</h1>

            <p className="grammar-intro">
              Học cách dùng 不 để phủ định hành động, trạng thái hoặc đặc điểm
              trong tiếng Trung.
            </p>

            <section className="grammar-section">
              <h2>1. Cấu trúc</h2>

              <div className="formula-box">
                Chủ ngữ + 不 + Động từ
                <br />
                Chủ ngữ + 不 + Tính từ
              </div>

              <p>
                不 mang nghĩa <strong>“không”</strong> và thường đứng trước
                động từ hoặc tính từ.
              </p>
            </section>

            <section className="grammar-section">
              <h2>2. Phủ định hành động</h2>

              <div className="example-card">
                <div className="example-chinese">
                  我不吃饭。
                </div>

                <div className="example-pinyin">
                  Wǒ bù chī fàn.
                </div>

                <div className="example-vietnamese">
                  Tôi không ăn cơm.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  我不喝茶。
                </div>

                <div className="example-pinyin">
                  Wǒ bù hē chá.
                </div>

                <div className="example-vietnamese">
                  Tôi không uống trà.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  他不去学校。
                </div>

                <div className="example-pinyin">
                  Tā bù qù xuéxiào.
                </div>

                <div className="example-vietnamese">
                  Anh ấy không đi đến trường.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>3. Phủ định với tính từ</h2>

              <div className="example-card">
                <div className="example-chinese">
                  我不好。
                </div>

                <div className="example-pinyin">
                  Wǒ bù hǎo.
                </div>

                <div className="example-vietnamese">
                  Tôi không khỏe / không tốt.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  今天不冷。
                </div>

                <div className="example-pinyin">
                  Jīntiān bù lěng.
                </div>

                <div className="example-vietnamese">
                  Hôm nay không lạnh.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>4. Phủ định với 是</h2>

              <div className="formula-box">
                是 → 不是
              </div>

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

              <p>
                Khi phủ định 是, dùng <strong>不是</strong>, không nói
                “不是” tách rời về mặt cấu trúc.
              </p>
            </section>

            <section className="grammar-section">
              <h2>5. Lưu ý về cách đọc 不</h2>

              <p>
                不 thường được đọc là <strong>bù</strong>. Tuy nhiên, khi
                đứng trước một âm tiết có thanh 4, 不 thường biến điệu thành
                thanh 2.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  不是
                </div>

                <div className="example-pinyin">
                  bú shì
                </div>

                <div className="example-vietnamese">
                  Không phải là.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>6. Lỗi thường gặp</h2>

              <div className="mistake-box">
                <p>
                  ❌ 我没是学生。
                </p>

                <p>
                  ✅ 我不是学生。
                </p>

                <p>
                  Với 是, dùng 不是 để phủ định.
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
                  我 ___ 喝咖啡。
                </p>

                <div className="exercise-options">
                  {["不", "没", "的"].map((option) => (
                    <button
                      key={option}
                      onClick={() => checkAnswer(option)}
                      className={
                        answer === option
                          ? option === "不"
                            ? "answer-correct"
                            : "answer-wrong"
                          : answer && option === "不"
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
                      answer === "不"
                        ? "exercise-result correct"
                        : "exercise-result wrong"
                    }
                  >
                    {answer === "不" ? (
                      <>
                        ✓ Chính xác! <strong>我不喝咖啡。</strong>
                      </>
                    ) : (
                      <>
                        ✗ Chưa đúng. Đáp án đúng là{" "}
                        <strong>不</strong>.
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
                href="/ngu-phap/hsk1/5"
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
                href="/ngu-phap/hsk1/7"
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