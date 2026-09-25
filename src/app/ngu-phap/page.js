import Link from "next/link";
import Navbar from "@/components/Navbar";

const levels = [
  {
    hsk: "HSK 1",
    title: "Ngữ pháp cơ bản",
    description: "Các cấu trúc nền tảng để tạo câu tiếng Trung đơn giản.",
    topics: "16 chủ điểm",
    link: "/ngu-phap/hsk1",
  },
  {
    hsk: "HSK 2",
    title: "Ngữ pháp sơ cấp",
    description: "Mở rộng câu và diễn đạt các tình huống hằng ngày.",
    topics: "Đang xây dựng",
    link: "#",
  },
  {
    hsk: "HSK 3",
    title: "Ngữ pháp trung cấp",
    description: "Các cấu trúc giúp giao tiếp và diễn đạt tự nhiên hơn.",
    topics: "Đang xây dựng",
    link: "#",
  },
  {
    hsk: "HSK 4",
    title: "Ngữ pháp trung cấp cao",
    description: "Cấu trúc phức tạp và cách diễn đạt nâng cao.",
    topics: "Đang xây dựng",
    link: "#",
  },
  {
    hsk: "HSK 5",
    title: "Ngữ pháp nâng cao",
    description: "Ngữ pháp phục vụ giao tiếp và viết nâng cao.",
    topics: "Đang xây dựng",
    link: "#",
  },
];

export default function NguPhapPage() {
  return (
    <>
      <Navbar />

      <main className="page">
        <div className="container">
          <div className="page-header">
            <h1>Ngữ pháp tiếng Trung</h1>
            <p>
              Học ngữ pháp theo từng cấp độ HSK, từ cơ bản đến nâng cao.
            </p>
          </div>

          <div className="level-grid">
            {levels.map((level) => (
              <div className="level-card" key={level.hsk}>
                <div className="level-badge">{level.hsk}</div>

                <h2>{level.title}</h2>

                <p className="level-description">
                  {level.description}
                </p>

                <div className="level-info">
                  📖 {level.topics}
                </div>

                {level.hsk === "HSK 1" ? (
                  <Link
                    href={level.link}
                    className="level-button"
                  >
                    Xem ngữ pháp →
                  </Link>
                ) : (
                  <span className="coming-soon">
                    Đang xây dựng
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}