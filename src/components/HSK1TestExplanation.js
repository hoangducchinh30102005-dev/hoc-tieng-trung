"use client";

import { useRef, useState } from "react";
import styles from "@/app/test/hsk1/page.module.css";

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

export default function HSK1TestExplanation({
  explanation,
}) {
  const audioRef = useRef(null);

  const [playing, setPlaying] =
    useState(false);

  if (!explanation) {
    return null;
  }

  const {
    kind,
    chinese,
    pinyin,
    meaning,
    audioText,
    note,
    questionId,
  } = explanation;

  /*
   * QUY TẮC AUDIO
   *
   * 1. kind = "word"
   *    → KHÔNG có audio.
   *
   *    Ví dụ:
   *    你好
   *    妈妈
   *    学生
   *    老师
   *
   * 2. kind = "sentence"
   *    + có audioText
   *    → CÓ audio.
   *
   * 3. sentence nhưng không có audioText
   *    → KHÔNG hiện audio.
   */
  const hasAudio =
    kind === "sentence" &&
    Boolean(audioText);

  /*
   * Ưu tiên file MP3 của câu.
   *
   * Ví dụ:
   * /audio/test/hsk1/q-9.mp3
   * /audio/test/hsk1/q-26.mp3
   */
  const audioSrc =
    hasAudio && questionId
      ? `/audio/test/hsk1/q-${questionId}.mp3`
      : null;

  const playAudio = () => {
    if (!hasAudio) {
      return;
    }

    /*
     * Dừng audio cũ nếu đang phát.
     */
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch {
        // Không làm gì.
      }
    }

    setPlaying(true);

    /*
     * Nếu không có questionId hoặc
     * không có đường dẫn MP3 thì dùng
     * SpeechSynthesis.
     */
    if (!audioSrc) {
      playSpeech(audioText);
      setPlaying(false);
      return;
    }

    const audio =
      new Audio(audioSrc);

    audio.preload = "auto";

    audioRef.current = audio;

    let fallbackUsed = false;

    const fallback = () => {
      if (fallbackUsed) {
        return;
      }

      fallbackUsed = true;

      setPlaying(false);

      /*
       * Nếu MP3 không phát được,
       * đọc chính audioText của câu.
       */
      playSpeech(audioText);
    };

    audio.onended = () => {
      setPlaying(false);
      audioRef.current = null;
    };

    audio.onerror = () => {
      fallback();
    };

    audio.oncanplaythrough = () => {
      audio
        .play()
        .catch(() => {
          fallback();
        });
    };

    audio.load();
  };

  return (
    <div
      className={
        styles["test-explanation"]
      }
    >
      <div
        className={
          styles["test-explanation-title"]
        }
      >
        Giải thích đáp án
      </div>

      {chinese && (
        <div
          className={
            styles["test-explanation-chinese"]
          }
        >
          {chinese}
        </div>
      )}

      {pinyin && (
        <div
          className={
            styles["test-explanation-pinyin"]
          }
        >
          {pinyin}
        </div>
      )}

      {meaning && (
        <div
          className={
            styles["test-explanation-meaning"]
          }
        >
          {meaning}
        </div>
      )}

      {/*
       * CHỈ CÂU CÓ kind="sentence"
       * VÀ audioText mới hiện nút audio.
       *
       * Từ vựng như 你好 sẽ KHÔNG có nút.
       */}
      {hasAudio && (
        <button
          type="button"
          className={
            styles["test-audio-button"]
          }
          onClick={playAudio}
        >
          {playing
            ? "🔊 Đang phát..."
            : "🔊 Nghe phát âm"}
        </button>
      )}

      {note && (
        <div
          className={
            styles["test-explanation-note"]
          }
        >
          <strong>
            Giải thích:
          </strong>{" "}
          {note}
        </div>
      )}
    </div>
  );
}