"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase";

export default function ProgressSync() {
  useEffect(function () {
    async function syncProgress() {
      var supabase = createClient();

      var result =
        await supabase.auth.getUser();

      var user = result.data.user;

      if (!user) {
        return;
      }

      /*
       * ==========================================
       * 1. ĐỒNG BỘ TIẾN ĐỘ TỪ VỰNG
       * ==========================================
       */

      var path = window.location.pathname;

      var vocabularyMatch = path.match(
        /^\/hoc\/hsk(\d+)\/([^/]+)\/?$/
      );

      if (vocabularyMatch) {
        var hskLevel =
          Number(vocabularyMatch[1]);

        var topicKey =
          vocabularyMatch[2];

        var storageKey =
          "hsk" +
          hskLevel +
          "-" +
          topicKey +
          "-learned";

        var saved =
          localStorage.getItem(storageKey);

        if (saved) {
          var learnedIds;

          try {
            learnedIds = JSON.parse(saved);
          } catch {
            learnedIds = null;
          }

          if (
            Array.isArray(learnedIds) &&
            learnedIds.length > 0
          ) {
            var vocabularyRows =
              learnedIds.map(function (id) {
                return {
                  user_id: user.id,
                  hsk_level: hskLevel,
                  topic_key: topicKey,
                  word_key:
                    topicKey + "-" + id,
                };
              });

            var vocabularyResult =
              await supabase
                .from("learned_vocabulary")
                .upsert(
                  vocabularyRows,
                  {
                    onConflict:
                      "user_id,word_key",
                  }
                );

            if (vocabularyResult.error) {
              console.error(
                "Lỗi lưu từ vựng:",
                vocabularyResult.error
              );
            }

            /*
             * Kiểm tra bài đã hoàn thành hay chưa.
             */

            var progressElement =
              document.querySelector(
                ".progress-top strong"
              );

            var progressText =
              progressElement
                ? progressElement.textContent || ""
                : "";

            var totalMatch =
              progressText.match(
                /(\d+)\s*\/\s*(\d+)/
              );

            var totalWords =
              totalMatch
                ? Number(totalMatch[2])
                : null;

            var progressFill =
              document.querySelector(
                ".progress-fill"
              );

            var progressWidth = "";

            if (progressFill) {
              progressWidth =
                progressFill.style.width || "";
            }

            var isCompletedByCount =
              totalWords !== null &&
              learnedIds.length >= totalWords;

            var isCompletedByBar =
              progressWidth === "100%";

            if (
              isCompletedByCount ||
              isCompletedByBar
            ) {
              var now =
                new Date().toISOString();

              var lessonResult =
                await supabase
                  .from("lesson_progress")
                  .upsert(
                    {
                      user_id: user.id,
                      hsk_level: hskLevel,
                      lesson_type:
                        "vocabulary",
                      lesson_key:
                        topicKey,
                      completed: true,
                      completed_at: now,
                      updated_at: now,
                    },
                    {
                      onConflict:
                        "user_id,lesson_type,lesson_key",
                    }
                  );

              if (lessonResult.error) {
                console.error(
                  "Lỗi lưu hoàn thành bài:",
                  lessonResult.error
                );
              }
            }
          }
        }
      }

      /*
       * ==========================================
       * 2. ĐỒNG BỘ 16 BÀI NGỮ PHÁP HSK1
       * ==========================================
       */

      if (
        window.location.pathname.startsWith(
          "/ngu-phap/hsk1/"
        )
      ) {
        for (var lessonNumber = 1; lessonNumber <= 16; lessonNumber++) {
          var grammarStorageKey =
            "grammar-hsk1-" +
            lessonNumber;

          var grammarCompleted =
            localStorage.getItem(
              grammarStorageKey
            );

          if (
            grammarCompleted !==
            "completed"
          ) {
            continue;
          }

          var now =
            new Date().toISOString();

          var grammarResult =
            await supabase
              .from("lesson_progress")
              .upsert(
                {
                  user_id: user.id,
                  hsk_level: 1,
                  lesson_type: "grammar",
                  lesson_key:
                    String(lessonNumber),
                  completed: true,
                  completed_at: now,
                  updated_at: now,
                },
                {
                  onConflict:
                    "user_id,lesson_type,lesson_key",
                }
              );

          if (grammarResult.error) {
            console.error(
              "Lỗi đồng bộ ngữ pháp Bài " +
                lessonNumber +
                ":",
              grammarResult.error
            );
          }
        }
      }
    }

    syncProgress();

    var intervalId =
      setInterval(
        syncProgress,
        2000
      );

    return function () {
      clearInterval(intervalId);
    };
  }, []);

  return null;
}