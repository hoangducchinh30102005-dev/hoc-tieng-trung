"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase";
import hsk2 from "@/data/hsk2";

const LESSON_KEY = "hoc-tap-truong-hoc";
const STORAGE_KEY = "hsk2-hoc-tap-truong-hoc-learned";

export default function HocTapTruongHocPage() {
  const supabase = createClient();

  const words = hsk2[LESSON_KEY].words;

  const [learnedIds, setLearnedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
      try {
        const localData = localStorage.getItem(STORAGE_KEY);
        const localIds = localData ? JSON.parse(localData) : [];

        const {
          data: { user },
        } = await supabase.auth.getUser();

        let dbIds = [];

        if (user) {
          const { data, error } = await supabase
            .from("learned_vocabulary")
            .select("word_key")
            .eq("user_id", user.id)
            .eq("hsk_level", 2)
            .eq("topic_key", LESSON_KEY);

          if (!error && data) {
            dbIds = data
              .map((item) => Number(item.word_key))
              .filter((id) => !Number.isNaN(id));
          }
        }

        const mergedIds = [...new Set([...localIds, ...dbIds])];

        setLearnedIds(mergedIds);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedIds));

        if (user && mergedIds.length > 0) {
          const rows = mergedIds
            .filter((id) => words.some((word) => word.id === id))
            .map((id) => ({
              user_id: user.id,
              hsk_level: 2,
              topic_key: LESSON_KEY,
              word_key: String(id),
            }));

          if (rows.length > 0) {
            await supabase
              .from("learned_vocabulary")
              .upsert(rows, {
                onConflict: "user_id,hsk_level,topic_key,word_key",
              });
          }
        }

        if (mergedIds.length === words.length && words.length > 0) {
          if (user) {
            await supabase.from("lesson_progress").upsert(
              {
                user_id: user.id,
                hsk_level: 2,
                lesson_type: "vocabulary",
                lesson_key: LESSON_KEY,
                completed: true,
              },
              {
                onConflict: "user_id,hsk_level,lesson_type,lesson_key",
              }
            );
          }
        }
      } catch (error) {
        console.error("Lỗi tải tiến độ:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProgress();
  }, []);

  async function markAsLearned(id) {
    if (learnedIds.includes(id)) return;

    const newLearnedIds = [...learnedIds, id];

    setLearnedIds(newLearnedIds);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newLearnedIds));

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      await supabase.from("learned_vocabulary").upsert(
        {
          user_id: user.id,
          hsk_level: 2,
          topic_key: LESSON_KEY,
          word_key: String(id),
        },
        {
          onConflict: "user_id,hsk_level,topic_key,word_key",
        }
      );

      if (newLearnedIds.length === words.length) {
        await supabase.from("lesson_progress").upsert(
          {
            user_id: user.id,
            hsk_level: 2,
            lesson_type: "vocabulary",
            lesson_key: LESSON_KEY,
            completed: true,
          },
          {
            onConflict: "user_id,hsk_level,lesson_type,lesson_key",
          }
        );
      }
    } catch (error) {
      console.error("Lỗi lưu tiến độ:", error);
    }
  }

  const learnedCount = learnedIds.length;
  const progress =
    words.length > 0 ? Math.round((learnedCount / words.length) * 100) : 0;

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
          <Link href="/hoc/hsk2">← Quay lại HSK2</Link>
        </div>

        <h1>Học tập & trường học</h1>

        <p style={{ color: "#666", marginBottom: 24 }}>
          Từ vựng HSK2 về học tập và trường học.
        </p>

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

        <div style={{ display: "grid", gap: 20 }}>
          {words.map((word) => {
            const learned = learnedIds.includes(word.id);

            return (
              <div
                key={word.id}
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

                  <audio
                    controls
                    preload="none"
                    src={word.audio}
                    style={{ maxWidth: "100%" }}
                  />
                </div>

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

                  <audio
                    controls
                    preload="none"
                    src={word.exampleAudio}
                    style={{ maxWidth: "100%" }}
                  />
                </div>

                <div style={{ marginTop: 18 }}>
                  <div style={{ marginBottom: 8 }}>
                    <strong>Cách dùng:</strong> {word.usage}
                  </div>

                  <div>
                    <strong>Lưu ý:</strong> {word.tip}
                  </div>
                </div>

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
                      onClick={() => markAsLearned(word.id)}
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

        {learnedCount === words.length && (
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