"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase";
import hsk2 from "@/data/hsk2";

const LESSON_KEY = "cuoc-song-gia-dinh";
const words = hsk2[LESSON_KEY].words;

export default function CuocSongGiaDinhPage() {
  const [learned, setLearned] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProgress() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      let localIds = [];

      const saved = localStorage.getItem(
        "hsk2-cuoc-song-gia-dinh-learned"
      );

      if (saved) {
        try {
          const data = JSON.parse(saved);

          localIds = [
            ...new Set(
              data.filter((id) =>
                words.some((word) => word.id === id)
              )
            ),
          ];
        } catch {
          localStorage.removeItem(
            "hsk2-cuoc-song-gia-dinh-learned"
          );
        }
      }

      const { data: vocabularyData } = await supabase
        .from("learned_vocabulary")
        .select("word_key")
        .eq("user_id", user.id)
        .eq("hsk_level", 2)
        .eq("topic_key", LESSON_KEY);

      const databaseIds = (vocabularyData || [])
        .map((item) => {
          const parts = item.word_key.split("-");
          const id = Number(parts[parts.length - 1]);

          return Number.isInteger(id) ? id : null;
        })
        .filter((id) =>
          words.some((word) => word.id === id)
        );

      const mergedIds = [
        ...new Set([...localIds, ...databaseIds]),
      ];

      setLearned(mergedIds);

      localStorage.setItem(
        "hsk2-cuoc-song-gia-dinh-learned",
        JSON.stringify(mergedIds)
      );

      for (const id of localIds) {
        if (databaseIds.includes(id)) continue;

        await supabase.from("learned_vocabulary").upsert(
          {
            user_id: user.id,
            hsk_level: 2,
            topic_key: LESSON_KEY,
            word_key: `${LESSON_KEY}-${id}`,
          },
          {
            onConflict: "user_id,word_key",
          }
        );
      }

      if (mergedIds.length === words.length) {
        await supabase.from("lesson_progress").upsert(
          {
            user_id: user.id,
            hsk_level: 2,
            lesson_type: "vocabulary",
            lesson_key: LESSON_KEY,
            completed: true,
            completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id,lesson_type,lesson_key",
          }
        );
      }
    }

    loadProgress();
  }, []);

  async function markAsLearned(id) {
    if (learned.includes(id) || saving) return;

    setSaving(true);
    setMessage("");

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage(
        "Phiên đăng nhập đã hết. Vui lòng đăng nhập lại."
      );
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("learned_vocabulary")
      .upsert(
        {
          user_id: user.id,
          hsk_level: 2,
          topic_key: LESSON_KEY,
          word_key: `${LESSON_KEY}-${id}`,
        },
        {
          onConflict: "user_id,word_key",
        }
      );

    if (error) {
      console.error("Lỗi lưu từ vựng:", error);

      setMessage(
        "Không thể lưu tiến độ. Vui lòng thử lại."
      );

      setSaving(false);
      return;
    }

    const newLearned = [...learned, id];

    setLearned(newLearned);

    localStorage.setItem(
      "hsk2-cuoc-song-gia-dinh-learned",
      JSON.stringify(newLearned)
    );

    if (newLearned.length === words.length) {
      const { error: progressError } = await supabase
        .from("lesson_progress")
        .upsert(
          {
            user_id: user.id,
            hsk_level: 2,
            lesson_type: "vocabulary",
            lesson_key: LESSON_KEY,
            completed: true,
            completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id,lesson_type,lesson_key",
          }
        );

      if (progressError) {
        console.error(
          "Lỗi lưu hoàn thành bài học:",
          progressError
        );

        setMessage(
          "Đã lưu từ vựng nhưng chưa cập nhật trạng thái hoàn thành bài."
        );
      } else {
        setMessage("🎉 Đã hoàn thành chủ đề!");
      }
    }

    setSaving(false);
  }

  const progress = Math.min(
    100,
    Math.round((learned.length / words.length) * 100)
  );

  return (
    <>
      <Navbar />

      <main className="lesson-page">
        <div className="container">
          <Link href="/hoc/hsk2" className="back-link">
            ← Quay lại HSK2
          </Link>

          <div className="lesson-header">
            <div>
              <h1>Cuộc sống gia đình</h1>

              <p>
                Học những từ vựng cơ bản về gia đình và
                cuộc sống gia đình.
              </p>
            </div>
          </div>

          <div className="progress-box">
            <div className="progress-top">
              <strong>
                Tiến độ: {learned.length}/{words.length} từ
              </strong>

              <span>{progress}%</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              ></div>
            </div>
          </div>

          {message && (
            <div
              style={{
                marginTop: "16px",
                padding: "12px 16px",
                borderRadius: "10px",
                background: "#eff6ff",
                color: "#1d4ed8",
                fontWeight: 600,
              }}
            >
              {message}
            </div>
          )}

          <div className="vocabulary-list">
            {words.map((word) => {
              const isLearned = learned.includes(word.id);

              return (
                <div
                  className="vocabulary-card"
                  key={word.id}
                >
                  <div className="word-main">
                    <div className="word-number">
                      {word.id}
                    </div>

                    <div className="word-content">
                      <div className="word-title-row">
                        <h2>{word.chinese}</h2>

                        <span className="pinyin">
                          {word.pinyin}
                        </span>

                        <span className="meaning">
                          {word.meaning}
                        </span>
                      </div>

                      {word.hanviet && (
                        <div className="hanviet">
                          Hán-Việt: {word.hanviet}
                        </div>
                      )}

                      <div className="audio-section">
                        <audio
                          controls
                          preload="none"
                          className="audio-player"
                          src={word.audio}
                        />
                      </div>

                      <div className="word-details">
                        <div className="detail-box">
                          <strong>Ví dụ</strong>

                          <p>{word.example}</p>

                          <p className="pinyin">
                            {word.examplePinyin}
                          </p>

                          <p className="translation">
                            {word.translation}
                          </p>

                          <audio
                            controls
                            preload="none"
                            className="small-audio-player"
                            src={word.exampleAudio}
                          />
                        </div>

                        <div className="detail-box">
                          <strong>Cách dùng</strong>

                          <p>{word.usage}</p>
                        </div>

                        <div className="tip-box">
                          💡 <strong>Mẹo nhớ:</strong>{" "}
                          {word.tip}
                        </div>
                      </div>

                      <div className="learn-action">
                        {isLearned ? (
                          <div className="learned-status">
                            ✓ Đã học từ này
                          </div>
                        ) : (
                          <button
                            className="learn-button"
                            onClick={() =>
                              markAsLearned(word.id)
                            }
                            disabled={saving}
                          >
                            {saving
                              ? "Đang lưu..."
                              : "Đã học xong"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {learned.length === words.length && (
            <div className="completed-box">
              <div className="completed-icon">
                🎉
              </div>

              <h2>Hoàn thành chủ đề!</h2>

              <p>
                Bạn đã học xong toàn bộ từ vựng của chủ đề
                Cuộc sống gia đình.
              </p>

              <Link
                href="/hoc/hsk2"
                className="back-topic-button"
              >
                ← Quay lại danh sách chủ đề
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}