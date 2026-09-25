import Link from "next/link";
import Navbar from "@/components/Navbar";

const topics = [
  {
    icon: "👋",
    title: "Chào hỏi",
    description: "Các cách chào hỏi cơ bản trong tiếng Trung.",
    words: "6 từ",
    link: "/hoc/hsk1/chao-hoi",
  },
  {
    icon: "👤",
    title: "Giới thiệu bản thân",
    description: "Tên, quốc tịch, nghề nghiệp và thông tin cá nhân.",
    words: "10 từ",
    link: "/hoc/hsk1/gioi-thieu-ban-than",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Gia đình",
    description: "Các thành viên trong gia đình.",
    words: "10 từ vựng",
    link: "/hoc/hsk1/gia-dinh",
  },
  {
  icon: "🔢",
  title: "Số đếm",
  description: "Các số từ 0 đến 10.",
  words: "11 từ vựng",
  link: "/hoc/hsk1/so-dem",
  },
  {
    icon: "⏰",
    title: "Thời gian",
    description: "Ngày, giờ và các khoảng thời gian.",
    words: "13 từ vựng",
    link: "/hoc/hsk1/thoi-gian",
  },
  {
    icon: "🍜",
    title: "Đồ ăn & thức uống",
    description: "Từ vựng về món ăn và đồ uống.",
    words: "13 từ vựng",
    link: "/hoc/hsk1/do-an",
  },
  {
    icon: "🏫",
    title: "Trường học",
    description: "Từ vựng cơ bản về trường lớp.",
    words: "12 từ vựng",
    link: "/hoc/hsk1/truong-hoc",
  },
  {
    icon: "🏠",
    title: "Nhà cửa",
    description: "Các từ vựng cơ bản về nhà và đồ vật trong nhà.",
    words: "11 từ vựng",
    link: "/hoc/hsk1/nha-cua",
  },
  {
  icon: "🛍️",
  title: "Mua sắm",
  description: "Từ vựng về mua hàng, giá cả và tiền.",
  words: "11 từ vựng",
  link: "/hoc/hsk1/mua-sam",
  },
  {
    icon: "🌤️",
    title: "Thời tiết",
    description: "Từ vựng cơ bản về thời tiết và nhiệt độ.",
    words: "11 từ vựng",
    link: "/hoc/hsk1/thoi-tiet",
  },
  {
  icon: "💬",
  title: "Giao tiếp hằng ngày",
  description: "Các mẫu câu và từ vựng giao tiếp cơ bản.",
  words: "12 từ vựng",
  link: "/hoc/hsk1/giao-tiep",
},
]

export default function HSK1Page() {
  return (
    <>
      <Navbar />

      <main className="page">
        <div className="container">

          <div className="page-header">
            <div className="lesson-label">
              HSK 1
            </div>

            <h1>Chủ đề HSK1</h1>

            <p>
              Chọn một chủ đề để bắt đầu học tiếng Trung.
            </p>
          </div>

          <div className="topic-grid">

            {topics.map((topic) => (
              <div
                className="topic-card"
                key={topic.title}
              >

                <div className="topic-icon">
                  {topic.icon}
                </div>

                <h2>{topic.title}</h2>

                <p>{topic.description}</p>

                <div className="topic-info">
                  📚 {topic.words}
                </div>

                {topic.link !== "#" ? (
                  <Link
                    href={topic.link}
                    className="level-button"
                  >
                    Học chủ đề →
                  </Link>
                ) : (
                  <span className="coming-soon">
                    Sắp có
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