"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase";

export default function ProgressSync() {
  useEffect(function () {
    async function syncProgress() {
      var path = window.location.pathname;

      var grammarMatch = path.match(
        /^\/ngu-phap\/hsk1\/(\d+)\/?$/
      );

      var vocabularyMatch = path.match(
        /^\/hoc\/hsk(\d+)\/([^/]+)\/?$/
      );

      var supabase = createClient();

      var result =
        await supabase.auth.getUser();

      var user = result.data.user;

      if (!user) {
        return;
      }

      /*
        ==================================================
        1. ĐỒNG BỘ 16 BÀI NGỮ PHÁP HSK1
        ==================================================
      */

      if (grammarMatch) {
        var grammarLessonNumber =
          Number(grammarMatch[1]);

        if (
          grammarLessonNumber < 1 ||
          grammarLessonNumber > 16
        ) {
          return;
        }

        var grammarStorageKey =
          "grammar-hsk1-" +
          grammarLessonNumber;

        var grammarCompleted =
          localStorage.getItem(
            grammarStorageKey
          );

        if (
          grammarCompleted !== "completed"
        ) {
          return;
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
                  String(grammarLessonNumber),
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
            "Lỗi lưu tiến trình ngữ pháp:",
            grammarResult.error
          );
        } else {
          console.log(
            "Đã lưu hoàn thành ngữ pháp HSK1 bài:",
            grammarLessonNumber
          );
        }

        return;
      }

      /*
        ==================================================
        2. ĐỒNG BỘ TỪ VỰNG
        ==================================================
      */

      if (!vocabularyMatch) {
        return;
      }

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

      if (!saved) {
        return;
      }

      var learnedIds;

      try {
        learnedIds = JSON.parse(saved);
      } catch {
        return;
      }

      if (!Array.isArray(learnedIds)) {
        return;
      }

      if (learnedIds.length === 0) {
        return;
      }

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

        return;
      }

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
                lesson_key: topicKey,
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
        } else {
          console.log(
            "Đã lưu hoàn thành bài:",
            topicKey
          );
        }
      }
    }

    syncProgress();

    var intervalId = setInterval(
      syncProgress,
      2000
    );

    return function () {
      clearInterval(intervalId);
    };
  }, []);

  return null;
}