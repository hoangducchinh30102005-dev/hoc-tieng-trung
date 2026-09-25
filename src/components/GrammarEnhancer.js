"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import grammarEnhancer from "@/data/GrammarEnhancer";

function findWords(sentence) {
  const result = [];
  let text = sentence.replace(/[？。！？，、]/g, "");

  const keys = Object.keys(grammarEnhancer).sort(
    (a, b) => b.length - a.length
  );

  while (text.length > 0) {
    let found = false;

    for (const word of keys) {
      if (text.startsWith(word)) {
        result.push(word);
        text = text.slice(word.length);
        found = true;
        break;
      }
    }

    if (!found) {
      text = text.slice(1);
    }
  }

  return [...new Set(result)];
}

function getPinyin(sentence) {
  return findWords(sentence)
    .map((word) => grammarEnhancer[word]?.pinyin)
    .filter(Boolean)
    .join(" ");
}

function addSentenceAudio(card, lessonNumber, index) {
  const box = document.createElement("div");
  box.className = "grammar-audio-box";

  const audio = document.createElement("audio");

  audio.src =
    `/audio/grammar/hsk1/bai-${lessonNumber}/example-${index}.mp3`;

  audio.preload = "none";

  const button = document.createElement("button");

  button.type = "button";
  button.className = "grammar-audio-button";
  button.textContent = "🔊 Nghe câu";

  button.addEventListener("click", () => {
    audio.currentTime = 0;

    audio.play().catch(() => {
      alert("Không thể phát audio.");
    });
  });

  box.appendChild(button);
  box.appendChild(audio);

  card.appendChild(box);
}

function addWordDetails(card, chinese) {
  const words = findWords(chinese);

  if (!words.length) return;

  const title = document.createElement("h3");

  title.className = "grammar-words-title";
  title.textContent = "Từ / cụm từ trong câu";

  card.appendChild(title);

  const list = document.createElement("div");

  list.className = "grammar-word-list";

  words.forEach((word) => {
    const data = grammarEnhancer[word];

    if (!data) return;

    const item = document.createElement("div");
    item.className = "grammar-word-item";

    const info = document.createElement("div");

    info.innerHTML = `
      <div class="grammar-word-chinese">
        ${word}
      </div>

      <div class="grammar-word-pinyin">
        ${data.pinyin}
      </div>

      <div class="grammar-word-meaning">
        ${data.meaning}
      </div>
    `;

    const audio = document.createElement("audio");

    audio.src =
      `/audio/grammar/hsk1/words/${encodeURIComponent(word)}.mp3`;

    audio.preload = "none";

    const button = document.createElement("button");

    button.type = "button";
    button.className = "grammar-word-audio";
    button.textContent = "🔊";

    button.addEventListener("click", () => {
      audio.currentTime = 0;

      audio.play().catch(() => {
        alert(`Không thể phát audio của "${word}".`);
      });
    });

    audio.addEventListener("error", () => {
      button.textContent = "⚠️";
      button.title = `Chưa tìm thấy ${word}.mp3`;
    });

    item.appendChild(info);
    item.appendChild(button);
    item.appendChild(audio);

    list.appendChild(item);
  });

  card.appendChild(list);
}

export default function GrammarEnhancer() {
  const pathname = usePathname();

  useEffect(() => {
    const match = pathname.match(
      /\/ngu-phap\/hsk1\/(\d+)/
    );

    if (!match) return;

    const lessonNumber = match[1];

    const cards =
      document.querySelectorAll(".example-card");

    cards.forEach((card, index) => {
      if (card.querySelector(".grammar-enhanced")) {
        return;
      }

      const chineseElement =
        card.querySelector(".example-chinese");

      const vietnameseElement =
        card.querySelector(".example-vietnamese");

      if (!chineseElement) return;

      const chinese =
        chineseElement.textContent.trim();

      const vietnamese =
        vietnameseElement
          ? vietnameseElement.textContent.trim()
          : "";

      let pinyinElement =
        card.querySelector(".example-pinyin");

      if (!pinyinElement) {
        pinyinElement =
          document.createElement("div");

        pinyinElement.className =
          "example-pinyin";

        chineseElement.insertAdjacentElement(
          "afterend",
          pinyinElement
        );
      }

      pinyinElement.textContent =
        getPinyin(chinese);

      if (
        vietnamese &&
        !card.querySelector(".grammar-meaning")
      ) {
        const meaning =
          document.createElement("div");

        meaning.className =
          "grammar-meaning";

        meaning.innerHTML = `
          <strong>🇻🇳 Nghĩa:</strong>
          <span>${vietnamese}</span>
        `;

        card.appendChild(meaning);
      }

      addSentenceAudio(
        card,
        lessonNumber,
        index + 1
      );

      addWordDetails(
        card,
        chinese
      );

      const marker =
        document.createElement("span");

      marker.className =
        "grammar-enhanced";

      marker.style.display = "none";

      card.appendChild(marker);
    });
  }, [pathname]);

  return null;
}