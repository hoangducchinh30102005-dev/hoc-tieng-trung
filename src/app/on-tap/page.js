"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import hsk1 from "@/data/hsk1";

const REVIEW_DAYS = [1, 3, 7, 14];
const TOTAL_HSK1_LESSONS = 27;

export default function OnTapPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [completedVocabularyTopics, setCompletedVocabularyTopics] =
    useState([]);

  const [completedGrammarLessons, setCompletedGrammarLessons] =
    useState([]);

  const [completedLessonsTotal, setCompletedLessonsTotal] =
    useState(0);

  const [selectedTopic, setSelectedTopic] = useState(null);

  const [reviewWords, setReviewWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewFinished, setReviewFinished] = useState(false);

  /*
   * ==========================================
   * LẤY TIẾN ĐỘ TỪ SUPABASE
   * ==========================================
   */

  const loadCurrentProgress = useCallback(
    async function () {
      setLoading(true);

      const supabase = createClient();

      const authResult =
        await supabase.auth.getUser();

      const currentUser =
        authResult.data.user;

      if (!currentUser) {
        setUser(null);
        setCompletedVocabularyTopics([]);
        setCompletedGrammarLessons([]);
        setCompletedLessonsTotal(0);
        setLoading(false);
        return;
      }

      setUser(currentUser);

      const progressResult =
        await supabase
          .from("lesson_progress")
          .select(
            "lesson_type, lesson_key, completed, completed_at, updated_at"
          )
          .eq("user_id", currentUser.id)
          .eq("hsk_level", 1)
          .eq("completed", true)
          .order("lesson_type", {
            ascending: true,
          })
          .order("lesson_key", {
            ascending: true,
          });

      if (progressResult.error) {
        console.error(
          "Lỗi lấy lesson_progress:",
          progressResult.error
        );

        setCompletedVocabularyTopics([]);
        setCompletedGrammarLessons([]);
        setCompletedLessonsTotal(0);
        setLoading(false);
        return;
      }

      const rows =
        progressResult.data || [];

      /*
       * QUAN TRỌNG:
       * SỐ BÀI HOÀN THÀNH ĐƯỢC LẤY TRỰC TIẾP
       * TỪ lesson_progress.
       *
       * Không lọc bằng hsk1 ở bước này.
       */

      setCompletedLessonsTotal(
        rows.length
      );

      /*
       * LẤY TOÀN BỘ CHỦ ĐỀ TỪ VỰNG ĐÃ HOÀN THÀNH.
       *
       * Không dùng:
       * hsk1[item.lesson_key]
       *
       * để loại bài.
       */

      const vocabularyTopics =
        rows
          .filter(function (item) {
            return (
              item.lesson_type ===
              "vocabulary"
            );
          })
          .sort(function (a, b) {
            return String(
              a.lesson_key
            ).localeCompare(
              String(b.lesson_key)
            );
          });

      /*
       * LẤY TOÀN BỘ BÀI NGỮ PHÁP ĐÃ HOÀN THÀNH.
       */

      const grammarLessons =
        rows
          .filter(function (item) {
            return (
              item.lesson_type ===
              "grammar"
            );
          })
          .sort(function (a, b) {
            return (
              Number(a.lesson_key) -
              Number(b.lesson_key)
            );
          });

      setCompletedVocabularyTopics(
        vocabularyTopics
      );

      setCompletedGrammarLessons(
        grammarLessons
      );

      setLoading(false);
    },
    []
  );

  /*
   * ==========================================
   * TẢI TIẾN ĐỘ KHI MỞ TRANG
   * ==========================================
   */

  useEffect(
    function () {
      loadCurrentProgress();
    },
    [loadCurrentProgress]
  );

  /*
   * ==========================================
   * TỰ CẬP NHẬT KHI QUAY LẠI TAB
   * ==========================================
   */

  useEffect(
    function () {
      function handleVisibilityChange() {
        if (
          document.visibilityState ===
          "visible"
        ) {
          loadCurrentProgress();
        }
      }

      function handleFocus() {
        loadCurrentProgress();
      }

      document.addEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.addEventListener(
        "focus",
        handleFocus
      );

      return function () {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );

        window.removeEventListener(
          "focus",
          handleFocus
        );
      };
    },
    [loadCurrentProgress]
  );

  /*
   * ==========================================
   * LẤY TÊN CHỦ ĐỀ
   * ==========================================
   */

  function getTopicName(topicKey) {
    const topic =
      hsk1[topicKey];

    if (!topic) {
      return topicKey;
    }

    return (
      topic.title ||
      topic.name ||
      topicKey
    );
  }

  /*
   * ==========================================
   * MỞ ÔN TẬP CHỦ ĐỀ
   * ==========================================
   */

  async function openTopicReview(topicKey) {
    const isCompleted =
      completedVocabularyTopics.some(
        function (item) {
          return (
            item.lesson_key ===
            topicKey
          );
        }
      );

    if (!isCompleted) {
      return;
    }

    const topic =
      hsk1[topicKey];

    /*
     * Bài đã hoàn thành nhưng không có
     * dữ liệu trong hsk1.js.
     */

    if (!topic) {
      alert(
        "Chủ đề này đã được ghi nhận hoàn thành nhưng chưa có dữ liệu từ vựng để ôn tập."
      );
      return;
    }

    setSelectedTopic(topicKey);
    setReviewLoading(true);
    setReviewFinished(false);
    setReviewWords([]);
    setCurrentIndex(0);
    setShowAnswer(false);

    const supabase =
      createClient();

    const authResult =
      await supabase.auth.getUser();

    const currentUser =
      authResult.data.user;

    if (!currentUser) {
      setReviewLoading(false);
      return;
    }

    /*
     * ==========================================
     * LẤY DỮ LIỆU TỪ VỰNG TỪ SUPABASE
     * ==========================================
     */

    const vocabularyResult =
      await supabase
        .from("learned_vocabulary")
        .select(
          "id, user_id, hsk_level, topic_key, word_key, learned_at, review_count, last_reviewed_at, next_review_at"
        )
        .eq(
          "user_id",
          currentUser.id
        )
        .eq(
          "hsk_level",
          1
        )
        .eq(
          "topic_key",
          topicKey
        )
        .order(
          "learned_at",
          {
            ascending: true,
          }
        );

    if (vocabularyResult.error) {
      console.error(
        "Lỗi lấy learned_vocabulary:",
        vocabularyResult.error
      );

      setReviewLoading(false);
      return;
    }

    const words = [];

    (
      vocabularyResult.data ||
      []
    ).forEach(function (row) {
      const word =
        topic.words.find(
          function (item) {
            return (
              row.word_key ===
              topicKey +
                "-" +
                item.id
            );
          }
        );

      if (!word) {
        return;
      }

      words.push({
        ...word,

        databaseId:
          row.id,

        topicKey:
          row.topic_key,

        reviewCount:
          row.review_count || 0,

        learnedAt:
          row.learned_at ||
          null,

        lastReviewedAt:
          row.last_reviewed_at ||
          null,

        nextReviewAt:
          row.next_review_at ||
          null,
      });
    });

    /*
     * ==========================================
     * CHỈ HIỂN THỊ TỪ ĐẾN HẠN ÔN
     * ==========================================
     *
     * next_review_at = null
     * => chưa từng ôn => đưa vào ôn.
     */

    const now =
      new Date();

    const dueWords =
      words.filter(
        function (word) {
          if (
            !word.nextReviewAt
          ) {
            return true;
          }

          return (
            new Date(
              word.nextReviewAt
            ) <= now
          );
        }
      );

    setReviewWords(
      dueWords
    );

    setCurrentIndex(0);
    setShowAnswer(false);

    if (
      dueWords.length ===
      0
    ) {
      setReviewFinished(true);
    }

    setReviewLoading(false);
  }

  /*
   * ==========================================
   * PHÁT AUDIO
   * ==========================================
   */

  function playAudio(url) {
    if (!url) {
      return;
    }

    const audio =
      new Audio();

    audio.preload =
      "auto";

    audio.src = url;

    audio.addEventListener(
      "canplaythrough",
      function () {
        audio
          .play()
          .catch(function (error) {
            console.error(
              "Không thể phát audio:",
              error
            );
          });
      },
      {
        once: true,
      }
    );

    audio.load();
  }

  function playWordAudio() {
    const word =
      reviewWords[
        currentIndex
      ];

    if (!word) {
      return;
    }

    if (word.audio) {
      playAudio(
        word.audio
      );
      return;
    }

    const fallback =
      "/audio/hsk1/" +
      encodeURIComponent(
        word.chinese
      ) +
      ".mp3";

    playAudio(
      fallback
    );
  }

  function playExampleAudio() {
    const word =
      reviewWords[
        currentIndex
      ];

    if (
      !word ||
      !word.exampleAudio
    ) {
      return;
    }

    playAudio(
      word.exampleAudio
    );
  }

  /*
   * ==========================================
   * XỬ LÝ ÔN TẬP
   * ==========================================
   */

  async function handleReview(result) {
    const word =
      reviewWords[
        currentIndex
      ];

    if (!word) {
      return;
    }

    if (!user) {
      return;
    }

    const now =
      new Date();

    let nextReviewAt =
      null;

    let newReviewCount =
      word.reviewCount || 0;

    if (
      result ===
      "remembered"
    ) {
      const scheduleIndex =
        Math.min(
          newReviewCount,
          REVIEW_DAYS.length - 1
        );

      const nextDate =
        new Date(now);

      nextDate.setDate(
        nextDate.getDate() +
          REVIEW_DAYS[
            scheduleIndex
          ]
      );

      nextReviewAt =
        nextDate.toISOString();

      newReviewCount += 1;
    } else {
      /*
       * CHƯA NHỚ:
       * ĐẶT LẠI NGAY ĐỂ ÔN LẠI.
       */

      nextReviewAt =
        now.toISOString();
    }

    const supabase =
      createClient();

    const updateResult =
      await supabase
        .from(
          "learned_vocabulary"
        )
        .update({
          review_count:
            newReviewCount,

          last_reviewed_at:
            now.toISOString(),

          next_review_at:
            nextReviewAt,
        })
        .eq(
          "id",
          word.databaseId
        )
        .eq(
          "user_id",
          user.id
        );

    if (updateResult.error) {
      console.error(
        "Lỗi cập nhật dữ liệu ôn tập:",
        updateResult.error
      );

      return;
    }

    let remaining =
      reviewWords.filter(
        function (_, index) {
          return (
            index !==
            currentIndex
          );
        }
      );

    /*
     * NẾU CHƯA NHỚ:
     * ĐƯA TỪ ĐÓ XUỐNG CUỐI DANH SÁCH.
     */

    if (
      result ===
      "not_remembered"
    ) {
      remaining.push({
        ...word,

        reviewCount:
          newReviewCount,

        lastReviewedAt:
          now.toISOString(),

        nextReviewAt:
          now.toISOString(),
      });
    }

    setReviewWords(
      remaining
    );

    if (
      remaining.length ===
      0
    ) {
      setReviewFinished(
        true
      );

      await loadCurrentProgress();

      return;
    }

    setCurrentIndex(
      Math.min(
        currentIndex,
        remaining.length - 1
      )
    );

    setShowAnswer(false);
  }

  /*
   * ==========================================
   * LOADING
   * ==========================================
   */

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <div className="text-4xl">
              ⏳
            </div>

            <h1 className="mt-4 text-2xl font-bold text-slate-800">
              Đang tải tiến độ mới nhất từ tài khoản của bạn...
            </h1>
          </div>
        </div>
      </main>
    );
  }

  /*
   * ==========================================
   * CHƯA ĐĂNG NHẬP
   * ==========================================
   */

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">
              🔐
            </div>

            <h1 className="mt-4 text-2xl font-bold text-slate-800">
              Bạn cần đăng nhập
            </h1>

            <p className="mt-2 text-slate-500">
              Hãy đăng nhập để xem danh sách
              bài đã hoàn thành và ôn tập.
            </p>

            <Link
              href="/dang-nhap"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /*
   * ==========================================
   * GIAO DIỆN ÔN MỘT CHỦ ĐỀ
   * ==========================================
   */

  if (selectedTopic) {
    const topicIsCompleted =
      completedVocabularyTopics.some(
        function (item) {
          return (
            item.lesson_key ===
            selectedTopic
          );
        }
      );

    if (!topicIsCompleted) {
      return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <div className="text-5xl">
                🔒
              </div>

              <h1 className="mt-4 text-2xl font-bold text-slate-800">
                Chủ đề chưa hoàn thành
              </h1>

              <p className="mt-2 text-slate-500">
                Bạn chỉ có thể ôn tập những
                chủ đề đã hoàn thành.
              </p>

              <Link
                href="/on-tap"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                ← Danh sách ôn tập
              </Link>
            </div>
          </div>
        </main>
      );
    }

    if (reviewLoading) {
      return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <div className="text-4xl">
                ⏳
              </div>

              <h1 className="mt-4 text-2xl font-bold text-slate-800">
                Đang tải dữ liệu ôn tập...
              </h1>
            </div>
          </div>
        </main>
      );
    }

    if (reviewFinished) {
      return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <div className="text-5xl">
                🎉
              </div>

              <h1 className="mt-4 text-2xl font-bold text-slate-800">
                Ôn tập xong!
              </h1>

              <p className="mt-3 text-slate-500">
                Hiện tại không có từ nào của
                chủ đề này đến hạn ôn.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  onClick={function () {
                    openTopicReview(
                      selectedTopic
                    );
                  }}
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  🔄 Kiểm tra lại
                </button>

                <Link
                  href="/on-tap"
                  className="rounded-xl bg-slate-100 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-200"
                >
                  📚 Danh sách ôn tập
                </Link>
              </div>
            </div>
          </div>
        </main>
      );
    }

    if (
      reviewWords.length ===
      0
    ) {
      return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <div className="text-5xl">
                📚
              </div>

              <h1 className="mt-4 text-2xl font-bold text-slate-800">
                Chưa có từ để ôn
              </h1>

              <p className="mt-3 text-slate-500">
                Bạn chưa có từ vựng đã học
                trong chủ đề này.
              </p>

              <Link
                href="/on-tap"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                ← Danh sách ôn tập
              </Link>
            </div>
          </div>
        </main>
      );
    }

    const currentWord =
      reviewWords[
        currentIndex
      ];

    const progress =
      Math.round(
        ((currentIndex + 1) /
          reviewWords.length) *
          100
      );

    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/on-tap"
            className="text-sm font-semibold text-blue-600 hover:underline"
            onClick={function () {
              setSelectedTopic(null);
            }}
          >
            ← Danh sách ôn tập
          </Link>

          <div className="mt-5 rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">
                  Chủ đề
                </p>

                <p className="font-bold text-slate-800">
                  {getTopicName(
                    selectedTopic
                  )}
                </p>
              </div>

              <div className="text-sm font-semibold text-blue-600">
                {currentIndex + 1} /{" "}
                {reviewWords.length}
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{
                  width:
                    progress +
                    "%",
                }}
              />
            </div>
          </div>

          <section className="mt-5 rounded-3xl bg-white p-8 text-center shadow-sm md:p-12">
            <p className="text-sm text-slate-400">
              Từ vựng
            </p>

            <h1 className="mt-5 text-6xl font-bold text-slate-900">
              {currentWord.chinese}
            </h1>

            <button
              onClick={
                playWordAudio
              }
              className="mt-6 rounded-xl bg-blue-50 px-5 py-3 font-semibold text-blue-700 hover:bg-blue-100"
            >
              🔊 Nghe phát âm
            </button>

            {!showAnswer ? (
              <div className="mt-10">
                <button
                  onClick={function () {
                    setShowAnswer(
                      true
                    );
                  }}
                  className="rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white hover:bg-slate-800"
                >
                  👁️ Hiện đáp án
                </button>
              </div>
            ) : (
              <div className="mt-10 text-left">
                <div className="rounded-2xl bg-slate-50 p-6 text-center">
                  <p className="text-2xl font-semibold text-slate-800">
                    {
                      currentWord.pinyin
                    }
                  </p>

                  <p className="mt-3 text-lg text-slate-600">
                    {currentWord.meaning ||
                      currentWord.translation}
                  </p>
                </div>

                {currentWord.example && (
                  <div className="mt-5 rounded-2xl border border-slate-200 p-6">
                    <p className="text-sm font-semibold text-slate-500">
                      Ví dụ
                    </p>

                    <p className="mt-3 text-xl font-semibold text-slate-800">
                      {typeof currentWord.example ===
                      "string"
                        ? currentWord.example
                        : currentWord
                            .example
                            .chinese}
                    </p>

                    {typeof currentWord.example !==
                      "string" &&
                      currentWord.example
                        .pinyin && (
                        <p className="mt-2 text-slate-500">
                          {
                            currentWord
                              .example
                              .pinyin
                          }
                        </p>
                      )}

                    {typeof currentWord.example !==
                      "string" &&
                      currentWord.example
                        .translation && (
                        <p className="mt-2 text-slate-600">
                          {
                            currentWord
                              .example
                              .translation
                          }
                        </p>
                      )}

                    {currentWord.exampleAudio && (
                      <button
                        onClick={
                          playExampleAudio
                        }
                        className="mt-4 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                      >
                        🔊 Nghe ví dụ
                      </button>
                    )}
                  </div>
                )}

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={function () {
                      handleReview(
                        "not_remembered"
                      );
                    }}
                    className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 font-semibold text-red-700 hover:bg-red-100"
                  >
                    😕 Chưa nhớ
                  </button>

                  <button
                    onClick={function () {
                      handleReview(
                        "remembered"
                      );
                    }}
                    className="rounded-xl bg-green-600 px-5 py-4 font-semibold text-white hover:bg-green-700"
                  >
                    😊 Đã nhớ
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    );
  }

  /*
   * ==========================================
   * TRANG DANH SÁCH ÔN TẬP
   * ==========================================
   */

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <Link
            href="/trang-ca-nhan"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            ← Trang cá nhân
          </Link>

          <div className="mt-5 rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  ÔN TẬP
                </p>

                <h1 className="mt-1 text-3xl font-bold text-slate-800">
                  PHẦN ĐÃ HOÀN THÀNH
                </h1>

                <p className="mt-2 text-slate-500">
                  Chỉ những bài đã hoàn thành
                  mới xuất hiện trong danh sách
                  ôn tập.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl bg-blue-50 px-6 py-4 text-center">
                <p className="text-sm font-semibold text-blue-600">
                  TIẾN ĐỘ HSK1
                </p>

                <p className="mt-1 text-3xl font-bold text-blue-700">
                  {completedLessonsTotal}
                  /
                  {TOTAL_HSK1_LESSONS}
                </p>

                <p className="text-xs text-blue-600">
                  bài đã hoàn thành
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          {/* =================================
              CHỦ ĐỀ
          ================================= */}

          <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                📚
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  CHỦ ĐỀ
                </h2>

                <p className="text-sm text-slate-500">
                  Chỉ hiển thị chủ đề đã hoàn thành
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {completedVocabularyTopics.length ===
              0 ? (
                <div className="rounded-2xl bg-slate-50 p-6 text-center">
                  <p className="font-semibold text-slate-700">
                    Chưa có chủ đề nào hoàn thành.
                  </p>

                  <Link
                    href="/hoc/hsk1"
                    className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:underline"
                  >
                    Học HSK1 →
                  </Link>
                </div>
              ) : (
                completedVocabularyTopics.map(
                  function (
                    lesson,
                    index
                  ) {
                    const hasTopicData =
                      Boolean(
                        hsk1[
                          lesson.lesson_key
                        ]
                      );

                    return (
                      <div
                        key={
                          lesson.lesson_type +
                          "-" +
                          lesson.lesson_key
                        }
                        className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                          {index + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-slate-800">
                            {getTopicName(
                              lesson.lesson_key
                            )}
                          </p>

                          <p className="mt-1 text-xs text-green-600">
                            ✓ Đã hoàn thành
                          </p>
                        </div>

                        {hasTopicData ? (
                          <button
                            onClick={function () {
                              openTopicReview(
                                lesson.lesson_key
                              );
                            }}
                            className="shrink-0 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            🔄 Ôn tập
                          </button>
                        ) : (
                          <span className="shrink-0 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500">
                            Chưa có dữ liệu
                          </span>
                        )}
                      </div>
                    );
                  }
                )
              )}
            </div>
          </div>

          {/* =================================
              NGỮ PHÁP
          ================================= */}

          <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-xl">
                📖
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  NGỮ PHÁP
                </h2>

                <p className="text-sm text-slate-500">
                  Chỉ hiển thị bài đã hoàn thành
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {completedGrammarLessons.length ===
              0 ? (
                <div className="rounded-2xl bg-slate-50 p-6 text-center">
                  <p className="font-semibold text-slate-700">
                    Chưa có bài ngữ pháp nào
                    hoàn thành.
                  </p>

                  <Link
                    href="/ngu-phap/hsk1"
                    className="mt-3 inline-block text-sm font-semibold text-purple-600 hover:underline"
                  >
                    Học ngữ pháp HSK1 →
                  </Link>
                </div>
              ) : (
                completedGrammarLessons.map(
                  function (
                    lesson,
                    index
                  ) {
                    return (
                      <div
                        key={
                          lesson.lesson_type +
                          "-" +
                          lesson.lesson_key
                        }
                        className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-purple-300 hover:bg-purple-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 font-bold text-purple-700">
                          {index + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-slate-800">
                            Bài{" "}
                            {
                              lesson.lesson_key
                            }
                          </p>

                          <p className="mt-1 text-xs text-green-600">
                            ✓ Đã hoàn thành
                          </p>
                        </div>

                        <Link
                          href={
                            "/ngu-phap/hsk1/" +
                            lesson.lesson_key
                          }
                          className="shrink-0 rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
                        >
                          🔄 Ôn tập
                        </Link>
                      </div>
                    );
                  }
                )
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}