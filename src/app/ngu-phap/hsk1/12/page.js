"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function GrammarLesson12() {
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("grammar-hsk1-12");

    if (saved === "completed") {
      setCompleted(true);
    }
  }, []);

  const checkAnswer = (value) => {
    if (answer) return;
    setAnswer(value);
  };

  const handleComplete = () => {
    localStorage.setItem("grammar-hsk1-12", "completed");
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
              NGỮ PHÁP HSK1 • BÀI 12
            </div>

            <h1>Câu với 很</h1>

            <p className="grammar-intro">
              Học cách dùng 很 khi kết hợp chủ ngữ với tính từ để
              diễn tả đặc điểm hoặc trạng thái.
            </p>

            <section className="grammar-section">
              <h2>1. Cấu trúc cơ bản</h2>

              <div className="formula-box">
                Chủ ngữ + 很 + Tính từ
              </div>

              <p>
                Trong tiếng Trung, khi dùng tính từ làm vị ngữ,
                很 thường được đặt trước tính từ.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我很好。
                </div>

                <div className="example-pinyin">
                  Wǒ hěn hǎo.
                </div>

                <div className="example-vietnamese">
                  Tôi khỏe / Tôi rất tốt.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  她很漂亮。
                </div>

                <div className="example-pinyin">
                  Tā hěn piàoliang.
                </div>

                <div className="example-vietnamese">
                  Cô ấy rất xinh.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>2. Một số ví dụ</h2>

              <div className="example-card">
                <div className="example-chinese">
                  今天很热。
                </div>

                <div className="example-pinyin">
                  Jīntiān hěn rè.
                </div>

                <div className="example-vietnamese">
                  Hôm nay rất nóng.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  中国很大。
                </div>

                <div className="example-pinyin">
                  Zhōngguó hěn dà.
                </div>

                <div className="example-vietnamese">
                  Trung Quốc rất lớn.
                </div>
              </div>

              <div className="example-card">
                <div className="example-chinese">
                  这个房间很小。
                </div>

                <div className="example-pinyin">
                  Zhè ge fángjiān hěn xiǎo.
                </div>

                <div className="example-vietnamese">
                  Căn phòng này rất nhỏ.
                </div>
              </div>
            </section>

            <section className="grammar-section">
              <h2>3. 很 có phải luôn là “rất”?</h2>

              <p>
                Không phải lúc nào 很 cũng cần dịch thành “rất”.
                Trong nhiều câu cơ bản, 很 chủ yếu giúp kết nối
                chủ ngữ với tính từ một cách tự nhiên.
              </p>

              <div className="example-card">
                <div className="example-chinese">
                  我很好。
                </div>

                <div className="example-pinyin">
                  Wǒ hěn hǎo.
                </div>

                <div className="example-vietnamese">
                  Tôi khỏe / Tôi ổn.
                </div>
              </div>

              <p>
                Vì vậy, không nên máy móc dịch mọi câu có 很 thành
                “rất”.
              </p>
            </section>

            <section className="grammar-section">
              <h2>4. Phủ định với 不</h2>

              <div className="formula-box">
                Chủ ngữ + 不 + Tính từ
              </div>

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
              <h2>5. Lỗi thường gặp</h2>

              <div className="mistake-box">
                <p>
                  ❌ 我是很忙。
                </p>

                <p>
                  ✅ 我很忙。
                </p>

                <p>
                  Khi tính từ làm vị ngữ, không dùng 是 trước tính từ
                  trong cấu trúc cơ bản này.
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
                  我 ___ 好。
                </p>

                <div className="exercise-options">
                  {["很", "是", "有"].map((option) => (
                    <button
                      key={option}
                      onClick={() => checkAnswer(option)}
                      className={
                        answer === option
                          ? option === "很"
                            ? "answer-correct"
                            : "answer-wrong"
                          : answer && option === "很"
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
                      answer === "很"
                        ? "exercise-result correct"
                        : "exercise-result wrong"
                    }
                  >
                    {answer === "很" ? (
                      <>
                        ✓ Chính xác! <strong>我很好。</strong>
                      </>
                    ) : (
                      <>
                        ✗ Chưa đúng. Đáp án đúng là{" "}
                        <strong>很</strong>.
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
                href="/ngu-phap/hsk1/11"
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
                href="/ngu-phap/hsk1/13"
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