
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase";
import hsk2 from "@/data/hsk2";

const LESSON_KEY = "thoi-gian-lich-trinh";
const STORAGE_KEY = "hsk2-thoi-gian-lich-trinh-learned";
const WORD_KEY_PREFIX = "thoi-gian-lich-trinh-";

export default function ThoiGianLichTrinhPage() {
  const supabase = createClient();
  const words = hsk2[LESSON_KEY]?.words || [];

  const [learnedIds, setLearnedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  function getWordId(word) {
    return String(word.id ?? word.pinyin);
  }

  function getDatabaseWordKey(id) {
    return `${WORD_KEY_PREFIX}${id}`;
  }

  useEffect(() => {
    let mounted = true;

    async function loadProgress() {
      try {
        const localData = localStorage.getItem(STORAGE_KEY);
        const localIds = localData ? JSON.parse(localData) : [];

        const normalizedLocalIds = Array.isArray(localIds)
          ? localIds.map(String)
          : [];

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          console.error("Lỗi lấy tài khoản:", authError.message);
        }

        let dbIds = [];

        if (user) {
          const { data, error } = await supabase
            .from("learned_vocabulary")
            .select("word_key")
            .eq("user_id", user.id)
            .eq("hsk_level", 2)
            .eq("topic_key", LESSON_KEY);

          if (error) {
            console.error("Lỗi tải từ đã học:", error.message);
          } else if (data) {
            dbIds = data.map((item) => {
              const key = String(item.word_key);

              return key.startsWith(WORD_KEY_PREFIX)
                ? key.slice(WORD_KEY_PREFIX.length)
                : key;
            });
          }
        }

        const validIds = new Set(words.map(getWordId));

        const mergedIds = [
          ...new Set([...normalizedLocalIds, ...dbIds]),
        ].filter((id) => validIds.has(id));

        if (!mounted) return;

        setLearnedIds(mergedIds);

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(mergedIds)
        );

      } catch (error) {
        console.error("Lỗi tải tiến độ:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadProgress();

    return () => {
      mounted = false;
    };
  }, []);

  async function markAsLearned(id) {
    const wordId = String(id);

    if (learnedIds.includes(wordId)) return;

    const newLearnedIds = [...learnedIds, wordId];

    setLearnedIds(newLearnedIds);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newLearnedIds)
    );

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Lỗi lấy tài khoản:", authError.message);
      }

      if (!user) return;

      const { error: vocabularyError } = await supabase
        .from("learned_vocabulary")
        .upsert(
          {
            user_id: user.id,
            hsk_level: 2,
            topic_key: LESSON_KEY,
            word_key: getDatabaseWordKey(wordId),
          },
          {
            onConflict: "user_id,word_key",
          }
        );

      if (vocabularyError) {
        console.error(
          "Lỗi lưu từ đã học:",
          vocabularyError.message
        );
      }

      if (newLearnedIds.length === words.length) {
        const { error: progressError } = await supabase
          .from("lesson_progress")
          .upsert(
            {
              user_id: user.id,
              hsk_level: 2,
              lesson_type: "vocabulary",
              lesson_key: LESSON_KEY,
              completed: true,
            },
            {
              onConflict: "user_id,lesson_type,lesson_key",
            }
          );

        if (progressError) {
          console.error(
            "Lỗi lưu tiến độ bài học:",
            progressError.message
          );
        }
      }
    } catch (error) {
      console.error("Lỗi lưu tiến độ:", error);
    }
  }

  const learnedCount = learnedIds.length;

  const progress =
    words.length > 0
      ? Math.round((learnedCount / words.length) * 100)
      : 0;

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="container">
          <p>Đang tải bài học...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="container">
        <div style={{ marginBottom: 20 }}>
          <Link href="/hoc/hsk2">
            ← Quay lại HSK2
          </Link>
        </div>

        <h1>Thời gian & lịch trình</h1>

        <p style={{ color: "#666", marginBottom: 24 }}>
          Từ vựng HSK2 về thời gian và lịch trình.
        </p>

        {/* Tiến độ học */}
        <div
          style={{
            marginBottom: 30,
            padding: 20,
            borderRadius: 12,
            background: "#f5f5f5",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
              fontWeight: 600,
            }}
          >
            <span>Tiến độ học</span>
            <span>
              {learnedCount}/{words.length}
            </span>
          </div>

          <div
            style={{
              height: 10,
              background: "#ddd",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "#111",
                transition: "width 0.3s",
              }}
            />
          </div>
        </div>

        {/* Danh sách từ vựng */}
        <div style={{ display: "grid", gap: 20 }}>
          {words.map((word) => {
            const wordId = getWordId(word);
            const learned = learnedIds.includes(wordId);

            return (
              <div
                key={wordId}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 14,
                  padding: 22,
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 20,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 32,
                        fontWeight: 700,
                        marginBottom: 6,
                      }}
                    >
                      {word.chinese}
                    </div>

                    <div
                      style={{
                        fontSize: 17,
                        color: "#555",
                        marginBottom: 8,
                      }}
                    >
                      {word.pinyin}
                    </div>

                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      {word.meaning}
                    </div>

                    {word.hanviet && (
                      <div
                        style={{
                          marginTop: 6,
                          color: "#777",
                        }}
                      >
                        Hán–Việt: {word.hanviet}
                      </div>
                    )}
                  </div>

                  {word.audio && (
                    <audio
                      controls
                      preload="none"
                      src={word.audio}
                      style={{ maxWidth: "100%" }}
                    />
                  )}
                </div>

                {/* Câu ví dụ */}
                <div
                  style={{
                    marginTop: 20,
                    padding: 16,
                    borderRadius: 10,
                    background: "#f8f8f8",
                  }}
                >
                  <div
                    style={{
                      fontSize: 23,
                      fontWeight: 600,
                      marginBottom: 6,
                    }}
                  >
                    {word.example}
                  </div>

                  <div
                    style={{
                      color: "#555",
                      marginBottom: 6,
                    }}
                  >
                    {word.examplePinyin}
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    {word.translation}
                  </div>

                  {word.exampleAudio && (
                    <audio
                      controls
                      preload="none"
                      src={word.exampleAudio}
                      style={{ maxWidth: "100%" }}
                    />
                  )}
                </div>

                {/* Cách dùng và lưu ý */}
                <div style={{ marginTop: 18 }}>
                  {word.usage && (
                    <div style={{ marginBottom: 8 }}>
                      <strong>Cách dùng:</strong> {word.usage}
                    </div>
                  )}

                  {word.tip && (
                    <div>
                      <strong>Lưu ý:</strong> {word.tip}
                    </div>
                  )}
                </div>

                {/* Đánh dấu đã học */}
                <div style={{ marginTop: 20 }}>
                  {learned ? (
                    <button
                      disabled
                      style={{
                        padding: "10px 18px",
                        borderRadius: 8,
                        border: "1px solid #ccc",
                        background: "#eee",
                        color: "#555",
                        cursor: "default",
                      }}
                    >
                      ✓ Đã học
                    </button>
                  ) : (
                    <button
                      onClick={() => markAsLearned(wordId)}
                      style={{
                        padding: "10px 18px",
                        borderRadius: 8,
                        border: "none",
                        background: "#111",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      Đánh dấu đã học
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Hoàn thành chủ đề */}
        {learnedCount === words.length && words.length > 0 && (
          <div
            style={{
              marginTop: 30,
              padding: 22,
              borderRadius: 12,
              background: "#f5f5f5",
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            🎉 Bạn đã hoàn thành chủ đề này!

            <div style={{ marginTop: 6 }}>
              Tiến độ: {learnedCount}/{words.length}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
