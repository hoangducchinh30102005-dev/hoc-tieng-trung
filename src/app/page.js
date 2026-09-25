import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  const levels = [
    {
      hsk: "HSK 1",
      title: "Cơ bản",
      description: "Làm quen với tiếng Trung",
      link: "/hoc/hsk1",
    },
    {
      hsk: "HSK 2",
      title: "Sơ cấp",
      description: "Giao tiếp hằng ngày",
      link: "/hoc/hsk2",
    },
    {
      hsk: "HSK 3",
      title: "Trung cấp",
      description: "Mở rộng giao tiếp",
      link: "/hoc/hsk3",
    },
    {
      hsk: "HSK 4",
      title: "Trung cấp cao",
      description: "Giao tiếp và luyện viết",
      link: "/hoc/hsk4",
    },
    {
      hsk: "HSK 5",
      title: "Nâng cao",
      description: "Giao tiếp và viết nâng cao",
      link: "/hoc/hsk5",
    },
  ];

  const features = [
    {
      icon: "📚",
      title: "Từ vựng",
      description: "Học từ mới kèm Pinyin, nghĩa tiếng Việt và ví dụ.",
    },
    {
      icon: "📝",
      title: "Ngữ pháp",
      description: "Giải thích ngữ pháp bằng tiếng Việt dễ hiểu.",
    },
    {
      icon: "🎧",
      title: "Luyện nghe",
      description: "Luyện nghe từ cơ bản đến nâng cao.",
    },
    {
      icon: "🔄",
      title: "Ôn tập",
      description: "Ôn lại những từ vựng đã học.",
    },
    {
      icon: "🎬",
      title: "Video ngắn",
      description: "Làm quen với tiếng Trung qua các tình huống thực tế.",
    },
    {
      icon: "✍️",
      title: "Luyện viết",
      description: "Luyện viết câu từ HSK4 đến HSK5.",
    },
  ];

  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="container">
            <h1>Học tiếng Trung dễ dàng</h1>

            <p>
              Học tiếng Trung từ HSK1 đến HSK5 với từ vựng,
              ngữ pháp, luyện nghe, ôn tập và luyện viết.
            </p>

            <Link href="/hoc" className="main-button">
              Xem bài học
            </Link>
          </div>
        </section>

        {/* HSK */}
        <section className="section">
          <div className="container">
            <h2>Chọn trình độ HSK</h2>

            <div className="card-grid">
              {levels.map((level) => (
                <div className="card" key={level.hsk}>
                  <h3>{level.hsk}</h3>

                  <p className="card-title">
                    {level.title}
                  </p>

                  <p>{level.description}</p>

                  <Link href={level.link} className="card-button">
                    Xem chủ đề
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="section light">
          <div className="container">
            <h2>Học tiếng Trung toàn diện</h2>

            <div className="card-grid">
              {features.map((feature) => (
                <div className="card" key={feature.title}>
                  <div className="feature-icon">
                    {feature.icon}
                  </div>

                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>© 2026 Học Tiếng Trung</p>
      </footer>
    </>
  );
}