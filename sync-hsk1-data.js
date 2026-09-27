const fs = require("fs");
const path = require("path");
const vm = require("vm");

const topics = [
  ["chao-hoi", "Chào hỏi"],
  ["do-an", "Đồ ăn"],
  ["gia-dinh", "Gia đình"],
  ["giao-tiep", "Giao tiếp"],
  ["gioi-thieu-ban-than", "Giới thiệu bản thân"],
  ["mua-sam", "Mua sắm"],
  ["nha-cua", "Nhà cửa"],
  ["so-dem", "Số đếm"],
  ["thoi-gian", "Thời gian"],
  ["thoi-tiet", "Thời tiết"],
  ["truong-hoc", "Trường học"],
];

function extractWords(source, fileName) {
  const marker = "const words = [";
  const start = source.indexOf(marker);

  if (start === -1) {
    throw new Error(
      `Không tìm thấy "const words = [" trong ${fileName}`
    );
  }

  const arrayStart = source.indexOf("[", start);

  let depth = 0;
  let quote = null;
  let escaped = false;
  let end = -1;

  for (let i = arrayStart; i < source.length; i++) {
    const char = source[i];

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === quote) {
        quote = null;
      }

      continue;
    }

    if (
      char === '"' ||
      char === "'" ||
      char === "`"
    ) {
      quote = char;
      continue;
    }

    if (char === "[") {
      depth++;
    }

    if (char === "]") {
      depth--;

      if (depth === 0) {
        end = i;
        break;
      }
    }
  }

  if (end === -1) {
    throw new Error(
      `Không tìm thấy dấu ] kết thúc words trong ${fileName}`
    );
  }

  const arrayText = source.slice(
    arrayStart,
    end + 1
  );

  try {
    return vm.runInNewContext(
      `(${arrayText})`
    );
  } catch (error) {
    throw new Error(
      `Không thể đọc mảng words trong ${fileName}: ${error.message}`
    );
  }
}

function normalizeWord(word) {
  return {
    id: word.id,
    chinese: word.chinese || "",
    pinyin: word.pinyin || "",
    meaning: word.meaning || "",
    hanviet: word.hanviet || "",
    example: word.example || "",
    examplePinyin: word.examplePinyin || "",
    translation: word.translation || "",
    usage: word.usage || "",
    tip: word.tip || "",
    audio: word.audio || "",
    exampleAudio: word.exampleAudio || "",
  };
}

const result = {};
let totalWords = 0;

for (const [topicKey, title] of topics) {
  const filePath = path.join(
    __dirname,
    "src",
    "app",
    "hoc",
    "hsk1",
    topicKey,
    "page.js"
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Không tìm thấy file: ${filePath}`
    );
  }

  const source = fs.readFileSync(
    filePath,
    "utf8"
  );

  const words = extractWords(
    source,
    `${topicKey}/page.js`
  );

  const normalizedWords = words.map(
    normalizeWord
  );

  result[topicKey] = {
    title,
    words: normalizedWords,
  };

  totalWords += normalizedWords.length;

  console.log(
    `${topicKey.padEnd(24)} : ${normalizedWords.length} từ`
  );
}

console.log(
  "--------------------------------------------"
);

console.log(
  `TỔNG CỘNG: ${totalWords} từ`
);

if (totalWords !== 118) {
  throw new Error(
    `Số lượng từ không đúng: ${totalWords}. Mong đợi 118 từ.`
  );
}

const output = `const hsk1 = ${JSON.stringify(
  result,
  null,
  2
)};

export default hsk1;
`;

const outputPath = path.join(
  __dirname,
  "src",
  "data",
  "hsk1.js"
);

fs.writeFileSync(
  outputPath,
  output,
  "utf8"
);

console.log("");
console.log(
  "Đã cập nhật thành công:"
);
console.log(
  "src/data/hsk1.js"
);
console.log("");
console.log(
  "ID từ vựng được giữ nguyên từ các bài học gốc."
);
console.log(
  "Bản sao lưu vẫn còn:"
);
console.log(
  "src/data/hsk1.backup.js"
);