import Link from "next/link";
import Navbar from "@/components/Navbar";

const levels = [
  {
    hsk: "HSK 1",
    title: "Cơ bản",
    description: "Làm quen với tiếng Trung",
    topics: "11 chủ đề",
    link: "/hoc/hsk1",
  },
  {
    hsk: "HSK 2",
    title: "Sơ cấp",
    description: "Giao tiếp trong cuộc sống hằng ngày",
    topics: "12 chủ đề",
    link: "/hoc/hsk2",
  },
  {
    hsk: "HSK 3",
    title: "Trung cấp",
    description: "Mở rộng khả năng giao tiếp",
    topics: "12 chủ đề",
    link: "/hoc/hsk3",
  },
  {
    hsk: "HSK 4",
    title: "Trung cấp cao",
    description: "Giao tiếp, ngữ pháp và luyện viết",
    topics: "10 chủ đề",
    link: "/hoc/hsk4",
  },
  {
    hsk: "HSK 5",
    title: "Nâng cao",
    description: "Giao tiếp và viết nâng cao",
    topics: "10 chủ đề",
    link: "/hoc/hsk5",
  },
];

export default function HocPage() {
  return (
    <>
      <Navbar />

      <main className="page">
        <div className="container">
          <div className="page-header">
            <h1>Bài học</h1>
            <p>
              Chọn trình độ HSK để bắt đầu học tiếng Trung.
            </p>
          </div>

          <div className="level-grid">
            {levels.map((level) => (
              <div className="level-card" key={level.hsk}>
                <div className="level-badge">
                  {level.hsk}
                </div>

                <h2>{level.title}</h2>

                <p className="level-description">
                  {level.description}
                </p>

                <div className="level-info">
                  📚 {level.topics}
                </div>

                <Link
                  href={level.link}
                  className="level-button"
                >
                  Xem chủ đề →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}