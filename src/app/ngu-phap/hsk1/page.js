import Link from "next/link";
import Navbar from "@/components/Navbar";

const grammarTopics = [
  {
    number: 1,
    title: "Câu với 是",
    structure: "A 是 B",
    description: "Dùng 是 để nói A là B.",
  },
  {
    number: 2,
    title: "Câu với 叫",
    structure: "A 叫 B",
    description: "Dùng 叫 để giới thiệu tên.",
  },
  {
    number: 3,
    title: "Câu hỏi với 吗",
    structure: "……吗？",
    description: "Dùng 吗 để tạo câu hỏi Có/Không.",
  },
  {
    number: 4,
    title: "Trợ từ 呢",
    structure: "……呢？",
    description: "Dùng 呢 để hỏi lại hoặc hỏi về đối tượng khác.",
  },
  {
    number: 5,
    title: "Trợ từ 的",
    structure: "A 的 B",
    description: "Dùng 的 để biểu thị quan hệ sở hữu hoặc bổ nghĩa.",
  },
  {
    number: 6,
    title: "Phủ định với 不",
    structure: "不 + Động từ / Tính từ",
    description: "Dùng 不 để phủ định.",
  },
  {
    number: 7,
    title: "Phủ định với 没有",
    structure: "没有 + Danh từ / Động từ",
    description: "Dùng 没有 để nói không có hoặc chưa làm.",
  },
  {
    number: 8,
    title: "Câu với 有",
    structure: "A 有 B",
    description: "Dùng 有 để nói có hoặc sở hữu.",
  },
  {
    number: 9,
    title: "Câu với 在",
    structure: "A 在 + Địa điểm",
    description: "Dùng 在 để nói vị trí.",
  },
  {
    number: 10,
    title: "这 / 那 / 哪",
    structure: "这 / 那 / 哪 + Danh từ",
    description: "Dùng để chỉ cái này, cái kia và hỏi cái nào.",
  },
  {
    number: 11,
    title: "Từ hỏi",
    structure: "谁 / 什么 / 哪里",
    description: "Cách sử dụng các từ hỏi cơ bản.",
  },
  {
    number: 12,
    title: "Câu với 很",
    structure: "Chủ ngữ + 很 + Tính từ",
    description: "Dùng 很 trong câu miêu tả tính chất.",
  },
  {
    number: 13,
    title: "也 và 都",
    structure: "也 / 都 + Động từ",
    description: "Diễn đạt 'cũng' và 'đều'.",
  },
  {
    number: 14,
    title: "Lượng từ cơ bản",
    structure: "Số + Lượng từ + Danh từ",
    description: "Cách sử dụng các lượng từ thông dụng.",
  },
  {
    number: 15,
    title: "Trật tự câu cơ bản",
    structure: "S + Thời gian + Địa điểm + V + O",
    description: "Cách sắp xếp thành phần trong câu tiếng Trung.",
  },
  {
    number: 16,
    title: "Trợ từ 吧",
    structure: "……吧。",
    description: "Dùng 吧 để đề nghị hoặc đưa ra lời gợi ý.",
  },
];

export default function HSK1NguPhapPage() {
  return (
    <>
      <Navbar />

      <main className="page">
        <div className="container">
          <Link href="/ngu-phap" className="back-link">
            ← Quay lại Ngữ pháp
          </Link>

          <div className="page-header">
            <div className="lesson-label">HSK 1</div>

            <h1>Ngữ pháp HSK1</h1>

            <p>
              Nắm vững những cấu trúc cơ bản để xây dựng câu tiếng Trung.
            </p>
          </div>

          <div className="grammar-grid">
            {grammarTopics.map((item) => (
              <Link
                href={`/ngu-phap/hsk1/${item.number}`}
                className="grammar-card"
                key={item.number}
              >
                <div className="grammar-number">
                  {item.number}
                </div>

                <div className="grammar-content">
                  <h2>{item.title}</h2>

                  <div className="grammar-structure">
                    {item.structure}
                  </div>

                  <p>{item.description}</p>

                  <span className="grammar-link">
                    Học bài →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}