"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/*
  GrammarEnhancer dùng chung cho 16 bài HSK1.

  Quan trọng:
  - Audio câu được đánh số theo TỪNG .example-chinese, không theo .example-card.
    Điều này xử lý đúng Bài 3 vì một card có thể chứa 2 câu A/B.
  - Không sửa Pinyin gốc trong page.js.
  - "Từ trong câu" dùng bộ từ ghép ưu tiên từ dài đến ngắn.
  - Một số âm biến điệu được xử lý đúng cho Bài 3, 6, 8, 14:
      不 + thanh 4 -> bú
      一 + thanh 4 -> yí
      一 + thanh 1/2/3 -> yì
*/

const pinyinMap = {
  // Đại từ
  我: "wǒ",
  你: "nǐ",
  他: "tā",
  她: "tā",
  我们: "wǒmen",
  他们: "tāmen",

  // 是 / 不 / 没有 / 有
  是: "shì",
  不是: "bú shì",
  不: "bù",
  没有: "méiyǒu",
  没: "méi",
  有: "yǒu",

  // Người / giới thiệu
  学生: "xuésheng",
  老师: "lǎoshī",
  越南人: "Yuènán rén",
  中国人: "Zhōngguó rén",
  中国: "Zhōngguó",
  人: "rén",

  // Từ hỏi / chỉ định
  叫: "jiào",
  什么: "shénme",
  名字: "míngzi",
  谁: "shéi",
  哪里: "nǎlǐ",
  哪: "nǎ",
  这: "zhè",
  那: "nà",

  // Trợ từ
  的: "de",
  吗: "ma",
  呢: "ne",
  很: "hěn",
  也: "yě",
  都: "dōu",
  在: "zài",
  吧: "ba",

  // Tính từ / trạng thái
  好: "hǎo",
  漂亮: "piàoliang",
  大: "dà",
  小: "xiǎo",
  热: "rè",
  冷: "lěng",

  // Nhà cửa / người
  书: "shū",
  朋友: "péngyou",
  家: "jiā",
  妈妈: "māma",
  哥哥: "gēge",
  杯子: "bēizi",
  房间: "fángjiān",
  桌子: "zhuōzi",
  上: "shàng",

  // Ăn uống / học tập
  吃饭: "chīfàn",
  吃: "chī",
  喝: "hē",
  茶: "chá",
  咖啡: "kāfēi",
  喜欢: "xǐhuan",
  学习: "xuéxí",
  汉语: "Hànyǔ",

  // Trường học / thời gian
  去: "qù",
  学校: "xuéxiào",
  今天: "jīntiān",
  明天: "míngtiān",
  现在: "xiànzài",
  时间: "shíjiān",

  // Đồ vật
  钱: "qián",
  电视: "diànshì",
  手机: "shǒujī",
  车: "chē",

  // Giao tiếp
  请: "qǐng",
  进: "jìn",
  走: "zǒu",
  坐: "zuò",

  // Lượng từ
  本: "běn",
  个: "ge",
  部: "bù",
  辆: "liàng",
  杯: "bēi",
  字典: "zìdiǎn",

  // Số
  三: "sān",
  两: "liǎng",

  // Cụm có 一 + biến điệu
  一个: "yí ge",
  一本: "yì běn",
  一杯: "yì bēi",
  一部: "yí bù",
  一辆: "yí liàng",
};

const wordKeys = Object.keys(pinyinMap).sort(
  (a, b) => b.length - a.length
);

function normalizeChinese(text) {
  return text
    .replace(/^[AB]:\s*/i, "")
    .replace(/[，。！？；：、,.!?;:]/g, "")
    .trim();
}

function findWords(sentence) {
  const text = normalizeChinese(sentence);

  const result = [];

  let index = 0;

  while (index < text.length) {
    let matched = null;

    for (const word of wordKeys) {
      if (text.startsWith(word, index)) {
        matched = word;
        break;
      }
    }

    if (matched) {
      result.push(matched);
      index += matched.length;
    } else {
      index += 1;
    }
  }

  return result;
}

function getWordPinyin(word, sentence) {
  const text = normalizeChinese(sentence);

  /*
    Biến điệu 不:
    不是 -> bú shì
  */
  if (word === "不是" || text.includes("不是")) {
    if (word === "不是") {
      return "bú shì";
    }
  }

  /*
    Biến điệu 一
  */
  if (word === "一个") return "yí ge";
  if (word === "一本") return "yì běn";
  if (word === "一杯") return "yì bēi";
  if (word === "一部") return "yí bù";
  if (word === "一辆") return "yí liàng";

  return pinyinMap[word] || "";
}

function speakChinese(text) {
  if (
    typeof window === "undefined" ||
    !window.speechSynthesis
  ) {
    return;
  }

  window.speechSynthesis.cancel();

  const cleanText = text
    .replace(/^A:\s*/i, "")
    .replace(/^B:\s*/i, "")
    .trim();

  const utterance =
    new SpeechSynthesisUtterance(cleanText);

  utterance.lang = "zh-CN";
  utterance.rate = 0.85;

  window.speechSynthesis.speak(utterance);
}

function addSentenceAudio(
  chineseElement,
  lessonNumber,
  sentenceIndex
) {
  const card =
    chineseElement.closest(".example-card");

  if (!card) return;

  if (
    chineseElement.parentElement.querySelector(
      `.grammar-sentence-audio-${sentenceIndex}`
    )
  ) {
    return;
  }

  const audio = document.createElement("audio");

  audio.src =
    `/audio/grammar/hsk1/bai-${lessonNumber}/example-${sentenceIndex}.mp3`;

  audio.preload = "none";

  const box = document.createElement("div");

  box.className =
    `grammar-audio-box grammar-enhanced grammar-sentence-audio-${sentenceIndex}`;

  const button = document.createElement("button");

  button.className = "grammar-audio-button";
  button.type = "button";
  button.textContent = "🔊 Nghe câu";

  button.onclick = () => {
    audio.currentTime = 0;

    audio.play().catch(() => {
      const text =
        chineseElement.textContent.trim();

      if (text) {
        speakChinese(text);
      }
    });
  };

  box.appendChild(button);
  box.appendChild(audio);

  chineseElement.insertAdjacentElement(
    "afterend",
    box
  );
}

function addWordDetails(
  chineseElement,
  chinese,
  sentenceIndex
) {
  const card =
    chineseElement.closest(".example-card");

  if (!card) return;

  if (
    card.querySelector(
      `.grammar-word-details-${sentenceIndex}`
    )
  ) {
    return;
  }

  const words = findWords(chinese);

  if (!words.length) return;

  const wrapper = document.createElement("div");

  wrapper.className =
    `grammar-word-details grammar-enhanced grammar-word-details-${sentenceIndex}`;

  const title = document.createElement("div");

  title.className = "grammar-words-title";
  title.textContent = "Từ trong câu";

  wrapper.appendChild(title);

  const list = document.createElement("div");

  list.className = "grammar-word-list";

  words.forEach((word) => {
    const item = document.createElement("div");

    item.className = "grammar-word-item";

    const wordChinese =
      document.createElement("div");

    wordChinese.className =
      "grammar-word-chinese";

    wordChinese.textContent = word;

    const wordPinyin =
      document.createElement("div");

    wordPinyin.className =
      "grammar-word-pinyin";

    wordPinyin.textContent =
      getWordPinyin(word, chinese);

    const wordAudio =
      document.createElement("audio");

    wordAudio.src =
      `/audio/grammar/hsk1/words/${encodeURIComponent(
        word
      )}.mp3`;

    wordAudio.preload = "none";

    const button =
      document.createElement("button");

    button.className =
      "grammar-word-audio";

    button.type = "button";
    button.textContent = "🔊";
    button.title =
      `Nghe phát âm ${word}`;

    button.onclick = () => {
      wordAudio.currentTime = 0;

      wordAudio.play().catch(() => {
        speakChinese(word);
      });
    };

    item.appendChild(wordChinese);
    item.appendChild(wordPinyin);
    item.appendChild(button);
    item.appendChild(wordAudio);

    list.appendChild(item);
  });

  wrapper.appendChild(list);

  const sentenceAudio =
    card.querySelector(
      `.grammar-sentence-audio-${sentenceIndex}`
    );

  if (sentenceAudio) {
    sentenceAudio.insertAdjacentElement(
      "afterend",
      wrapper
    );
  } else {
    chineseElement.insertAdjacentElement(
      "afterend",
      wrapper
    );
  }
}

export default function GrammarEnhancer() {
  const pathname = usePathname();

  useEffect(() => {
    const match = pathname.match(
      /\/ngu-phap\/hsk1\/(\d+)/
    );

    if (!match) return;

    const lessonNumber = match[1];

    /*
      Dùng .example-chinese thay vì .example-card.

      Bài 3 có:
      - 6 example-card
      - 9 example-chinese

      Vì vậy audio phải đánh số theo 9 câu,
      không phải 6 card.
    */

    const sentences =
      document.querySelectorAll(
        ".example-chinese"
      );

    sentences.forEach(
      (chineseElement, index) => {
        if (
          chineseElement.dataset.enhanced ===
          "true"
        ) {
          return;
        }

        chineseElement.dataset.enhanced =
          "true";

        const chinese =
          chineseElement.textContent.trim();

        const sentenceIndex = index + 1;

        addSentenceAudio(
          chineseElement,
          lessonNumber,
          sentenceIndex
        );

        addWordDetails(
          chineseElement,
          chinese,
          sentenceIndex
        );
      }
    );
  }, [pathname]);

  return null;
}