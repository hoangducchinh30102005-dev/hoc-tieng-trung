"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase";

const LESSON_KEY = "chao-hoi";

const words = [
  {
    id: 1,
    chinese: "你好",
    pinyin: "nǐ hǎo",
    meaning: "Xin chào",
    hanviet: "",
    example: "你好！很高兴认识你。",
    translation: "Xin chào! Rất vui được làm quen với bạn.",
    usage: "Dùng để chào hỏi trong giao tiếp hằng ngày.",
    tip: "你好 là cách chào phổ biến nhất.",
    audio: "/audio/hsk1/chao-hoi/ni-hao.mp3",
    exampleAudio: "/audio/hsk1/chao-hoi/ni-hao-example.mp3",
  },
  {
    id: 2,
    chinese: "您好",
    pinyin: "nín hǎo",
    meaning: "Xin chào (lịch sự)",
    hanviet: "",
    example: "老师，您好！",
    translation: "Thưa cô/thầy, em chào cô/thầy!",
    usage:
      "Dùng khi chào người lớn tuổi, giáo viên hoặc trong hoàn cảnh lịch sự.",
    tip: "您 là cách nói lịch sự của 你.",
    audio: "/audio/hsk1/chao-hoi/nin-hao.mp3",
    exampleAudio: "/audio/hsk1/chao-hoi/nin-hao-example.mp3",
  },
  {
    id: 3,
    chinese: "谢谢",
    pinyin: "xiè xie",
    meaning: "Cảm ơn",
    hanviet: "",
    example: "谢谢你！",
    translation: "Cảm ơn bạn!",
    usage: "Dùng để cảm ơn người khác.",
    tip: "Đây là từ rất thường gặp trong giao tiếp.",
    audio: "/audio/hsk1/chao-hoi/xie-xie.mp3",
    exampleAudio: "/audio/hsk1/chao-hoi/xie-xie-example.mp3",
  },
  {
    id: 4,
    chinese: "不客气",
    pinyin: "bú kè qi",
    meaning: "Không có gì",
    hanviet: "",
    example: "谢谢你。不客气！",
    translation: "Cảm ơn bạn. Không có gì!",
    usage: "Dùng để đáp lại lời cảm ơn.",
    tip: "Thường đi cùng với 谢谢.",
    audio: "/audio/hsk1/chao-hoi/bu-ke-qi.mp3",
    exampleAudio: "/audio/hsk1/chao-hoi/bu-ke-qi-example.mp3",
  },
  {
    id: 5,
    chinese: "再见",
    pinyin: "zài jiàn",
    meaning: "Tạm biệt",
    hanviet: "",
    example: "明天再见！",
    translation: "Hẹn gặp lại ngày mai!",
    usage: "Dùng khi kết thúc cuộc trò chuyện hoặc chia tay.",
    tip: "再 có nghĩa là lại, vì vậy 再见 có thể hiểu là gặp lại.",
    audio: "/audio/hsk1/chao-hoi/zai-jian.mp3",
    exampleAudio: "/audio/hsk1/chao-hoi/zai-jian-example.mp3",
  },
  {
    id: 6,
    chinese: "早上好",
    pinyin: "zǎo shang hǎo",
    meaning: "Chào buổi sáng",
    hanviet: "",
    example: "老师，早上好！",
    translation: "Thưa thầy/cô, em chào buổi sáng!",
    usage: "Dùng để chào hỏi vào buổi sáng.",
    tip: "早上 nghĩa là buổi sáng.",
    audio: "/audio/hsk1/chao-hoi/zao-shang-hao.mp3",
    exampleAudio: "/audio/hsk1/chao-hoi/zao-shang-hao-example.mp3",
  },
];

export default function ChaoHoiPage() {
  const [learned, setLearned] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProgress() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      let localIds = [];

      const saved = localStorage.getItem(
        "hsk1-chao-hoi-learned"
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
            "hsk1-chao-hoi-learned"
          );
        }
      }

      const { data: vocabularyData } = await supabase
        .from("learned_vocabulary")
        .select("word_key")
        .eq("user_id", user.id)
        .eq("hsk_level", 1)
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
        "hsk1-chao-hoi-learned",
        JSON.stringify(mergedIds)
      );

      for (const id of localIds) {
        if (databaseIds.includes(id)) {
          continue;
        }

        await supabase
          .from("learned_vocabulary")
          .upsert(
            {
              user_id: user.id,
              hsk_level: 1,
              topic_key: LESSON_KEY,
              word_key: `${LESSON_KEY}-${id}`,
            },
            {
              onConflict: "user_id,word_key",
            }
          );
      }

      if (mergedIds.length === words.length) {
        await supabase
          .from("lesson_progress")
          .upsert(
            {
              user_id: user.id,
              hsk_level: 1,
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
    if (learned.includes(id) || saving) {
      return;
    }

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
          hsk_level: 1,
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
      "hsk1-chao-hoi-learned",
      JSON.stringify(newLearned)
    );

    if (newLearned.length === words.length) {
      const { error: progressError } = await supabase
        .from("lesson_progress")
        .upsert(
          {
            user_id: user.id,
            hsk_level: 1,
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
        setMessage("Đã hoàn thành bài Chào hỏi!");
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

          <Link href="/hoc/hsk1" className="back-link">
            ← Quay lại HSK1
          </Link>

          <div className="lesson-header">
            <div>
              <div className="lesson-label">
                HSK 1 · Chủ đề 1
              </div>

              <h1>Chào hỏi</h1>

              <p>
                Học những từ vựng cơ bản dùng trong giao tiếp
                và chào hỏi.
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

              <h2>
                Hoàn thành chủ đề!
              </h2>

              <p>
                Bạn đã học xong toàn bộ từ vựng của chủ đề
                Chào hỏi.
              </p>

              <Link
                href="/hoc/hsk1"
                className="back-topic-button"
              >
                ← Về danh sách chủ đề
              </Link>

            </div>
          )}

        </div>
      </main>
    </>
  );
}