"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HSK1TestExplanation from "@/components/HSK1TestExplanation";
import {
  HSK1_TEST_QUESTIONS,
  HSK1_TEST_TOTAL,
} from "@/data/hsk1-test";
import styles from "./page.module.css";

function playSpeech(text) {
  if (
    typeof window === "undefined" ||
    !window.speechSynthesis ||
    !text
  ) {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(text);

  utterance.lang = "zh-CN";
  utterance.rate = 0.85;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
}

function playQuestionAudio(question) {
  if (
    typeof window === "undefined" ||
    !question
  ) {
    return;
  }

  const text =
    question.audioText ||
    question.explanation?.audioText ||
    question.question;

  const audioSrc =
    `/audio/test/hsk1/q-${question.id}.mp3`;

  const audio = new Audio(audioSrc);

  audio.preload = "auto";

  let fallbackUsed = false;

  const fallback = () => {
    if (fallbackUsed) {
      return;
    }

    fallbackUsed = true;
    playSpeech(text);
  };

  audio.addEventListener(
    "error",
    fallback,
    { once: true }
  );

  audio.addEventListener(
    "ended",
    () => {
      audio.remove();
    },
    { once: true }
  );

  audio
    .play()
    .catch(() => {
      fallback();
    });
}

export default function HSK1TestPage() {
  const [started, setStarted] =
    useState(false);

  const [finished, setFinished] =
    useState(false);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  const [showExplanation, setShowExplanation] =
    useState(false);

  const questions = useMemo(() => {
    return HSK1_TEST_QUESTIONS;
  }, []);

  const currentQuestion =
    questions[currentIndex];

  const currentAnswer =
    answers[currentQuestion?.id];

  const score = useMemo(() => {
    return questions.reduce(
      (total, question) => {
        return (
          total +
          (answers[question.id] ===
          question.answer
            ? 1
            : 0)
        );
      },
      0
    );
  }, [answers, questions]);

  const percentage = Math.round(
    (score / HSK1_TEST_TOTAL) * 100
  );

  const startTest = () => {
    setStarted(true);
    setFinished(false);
    setCurrentIndex(0);
    setAnswers({});
    setShowExplanation(false);
  };

  const selectAnswer = (option) => {
    if (currentAnswer) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: option,
    }));

    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);

    if (
      currentIndex >=
      questions.length - 1
    ) {
      setFinished(true);
      return;
    }

    setCurrentIndex(
      (value) => value + 1
    );
  };

  const restartTest = () => {
    setStarted(false);
    setFinished(false);
    setCurrentIndex(0);
    setAnswers({});
    setShowExplanation(false);
  };

  if (!started) {
    return (
      <>
        <Navbar />

        <main className={styles.page}>
          <div className={styles.container}>
            <Link
              href="/on-tap"
              className={styles.backLink}
            >
              ← Quay lại ôn tập
            </Link>

            <section className={styles.hero}>
              <div className={styles.badge}>
                TEST HSK1
              </div>

              <h1>
                Kiểm tra tổng hợp HSK1
              </h1>

              <p>
                Kiểm tra tổng hợp từ vựng,
                ngữ pháp, câu vận dụng,
                nghe và đọc hiểu HSK1.
              </p>

              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <strong>
                    {HSK1_TEST_TOTAL}
                  </strong>

                  <span>
                    Câu hỏi
                  </span>
                </div>

                <div className={styles.infoCard}>
                  <strong>
                    4
                  </strong>

                  <span>
                    Nhóm kiến thức
                  </span>
                </div>

                <div className={styles.infoCard}>
                  <strong>
                    HSK1
                  </strong>

                  <span>
                    Tổng hợp
                  </span>
                </div>
              </div>

              <div className={styles.rules}>
                <h2>
                  Nội dung bài test
                </h2>

                <ul>
                  <li>
                    Từ vựng HSK1
                  </li>

                  <li>
                    16 chủ điểm ngữ pháp
                  </li>

                  <li>
                    Câu vận dụng
                  </li>

                  <li>
                    Nghe hiểu
                  </li>
                </ul>
              </div>

              <button
                type="button"
                className={styles.startButton}
                onClick={startTest}
              >
                Bắt đầu Test HSK1 →
              </button>
            </section>
          </div>
        </main>
      </>
    );
  }

  if (finished) {
    return (
      <>
        <Navbar />

        <main className={styles.page}>
          <div className={styles.container}>
            <section
              className={styles.resultCard}
            >
              <div
                className={styles.resultIcon}
              >
                {percentage >= 80
                  ? "🎉"
                  : percentage >= 60
                  ? "👍"
                  : "📚"}
              </div>

              <h1>
                Hoàn thành Test HSK1
              </h1>

              <div
                className={styles.score}
              >
                {score}/{HSK1_TEST_TOTAL}
              </div>

              <div
                className={
                  styles.percentage
                }
              >
                {percentage}%
              </div>

              <p>
                Bạn đã hoàn thành bài
                kiểm tra HSK1 tổng hợp.
              </p>

              <div
                className={
                  styles.resultActions
                }
              >
                <button
                  type="button"
                  className={
                    styles.startButton
                  }
                  onClick={restartTest}
                >
                  Làm lại
                </button>

                <Link
                  href="/on-tap"
                  className={
                    styles.secondaryButton
                  }
                >
                  Quay lại ôn tập
                </Link>
              </div>
            </section>

            <section
              className={styles.reviewCard}
            >
              <h2>
                Xem lại câu trả lời
              </h2>

              <div
                className={styles.reviewList}
              >
                {questions.map(
                  (question, index) => {
                    const answer =
                      answers[question.id];

                    const correct =
                      answer ===
                      question.answer;

                    return (
                      <div
                        key={question.id}
                        className={
                          styles.reviewItem
                        }
                      >
                        <div>
                          <strong>
                            Câu {index + 1}
                          </strong>

                          <span>
                            {question.question}
                          </span>
                        </div>

                        <div
                          className={
                            correct
                              ? styles.correct
                              : styles.wrong
                          }
                        >
                          {correct
                            ? "✓ Đúng"
                            : "✗ Sai"}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </section>
          </div>
        </main>
      </>
    );
  }

  /*
   * Chỉ câu 29 và 30 có audio ở phần đề.
   * Câu 1–28 không có nút audio ở đề.
   */
  const isListeningQuestion =
    currentQuestion?.id === 29 ||
    currentQuestion?.id === 30;

  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <div className={styles.container}>
          <div
            className={styles.testHeader}
          >
            <div>
              <Link
                href="/on-tap"
                className={styles.backLink}
              >
                ← Quay lại ôn tập
              </Link>

              <div
                className={styles.testTitle}
              >
                Test HSK1
              </div>
            </div>

            <div
              className={styles.progressText}
            >
              Câu {currentIndex + 1}/
              {questions.length}
            </div>
          </div>

          <div
            className={styles.progressBar}
          >
            <div
              className={styles.progressFill}
              style={{
                width: `${
                  ((currentIndex + 1) /
                    questions.length) *
                  100
                }%`,
              }}
            />
          </div>

          <section
            className={styles.questionCard}
          >
            <h1
              className={styles.question}
            >
              {currentQuestion.question}
            </h1>

            {/*
             * AUDIO Ở ĐỀ:
             * CHỈ CÂU 29 VÀ 30.
             *
             * Ưu tiên file MP3.
             * Nếu MP3 lỗi thì tự chuyển
             * sang SpeechSynthesis.
             */}
            {isListeningQuestion && (
              <button
                type="button"
                className={
                  styles.questionAudio
                }
                onClick={() =>
                  playQuestionAudio(
                    currentQuestion
                  )
                }
              >
                🔊 Nghe câu
              </button>
            )}

            <div
              className={styles.options}
            >
              {currentQuestion.options.map(
                (option, optionIndex) => {
                  const selected =
                    currentAnswer ===
                    option;

                  const correct =
                    option ===
                    currentQuestion.answer;

                  let className =
                    styles.option;

                  if (currentAnswer) {
                    if (correct) {
                      className +=
                        " " +
                        styles.optionCorrect;
                    } else if (
                      selected
                    ) {
                      className +=
                        " " +
                        styles.optionWrong;
                    }
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      className={
                        className
                      }
                      onClick={() =>
                        selectAnswer(
                          option
                        )
                      }
                      disabled={Boolean(
                        currentAnswer
                      )}
                    >
                      <span
                        className={
                          styles.optionLetter
                        }
                      >
                        {String.fromCharCode(
                          65 + optionIndex
                        )}
                      </span>

                      <span>
                        {option}
                      </span>

                      {currentAnswer &&
                        correct && (
                          <span>
                            ✓
                          </span>
                        )}

                      {currentAnswer &&
                        selected &&
                        !correct && (
                          <span>
                            ✗
                          </span>
                        )}
                    </button>
                  );
                }
              )}
            </div>

            {showExplanation && (
              <>
                <div
                  className={
                    currentAnswer ===
                    currentQuestion.answer
                      ? styles.correctMessage
                      : styles.wrongMessage
                  }
                >
                  {currentAnswer ===
                  currentQuestion.answer
                    ? "✓ Chính xác!"
                    : "✗ Chưa đúng."}
                </div>

                <HSK1TestExplanation
                  explanation={{
                    ...currentQuestion.explanation,
                    questionId:
                      currentQuestion.id,
                  }}
                />

                <button
                  type="button"
                  className={
                    styles.nextButton
                  }
                  onClick={
                    nextQuestion
                  }
                >
                  {currentIndex ===
                  questions.length - 1
                    ? "Xem kết quả"
                    : "Câu tiếp theo →"}
                </button>
              </>
            )}
          </section>
        </div>
      </main>
    </>
  );
}