
"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

const topics = [
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Cuộc sống gia đình",
    description: "Các thành viên trong gia đình và sinh hoạt hằng ngày.",
    words: "12 từ vựng",
    link: "/hoc/hsk2/cuoc-song-gia-dinh",
    active: true,
  },
  {
    icon: "🏫",
    title: "Học tập & trường học",
    description: "Trường học, học tập, môn học và các hoạt động.",
    words: "12 từ vựng",
    link: "/hoc/hsk2/hoc-tap-truong-hoc",
    active: true,
  },
  {
    icon: "⏰",
    title: "Thời gian & lịch trình",
    description: "Thời gian, các buổi trong ngày và lịch trình sinh hoạt.",
    words: "12 từ vựng",
    link: "/hoc/hsk2/thoi-gian-lich-trinh",
    active: true,
  },
  {
    icon: "🏠",
    title: "Nhà ở & sinh hoạt",
    description: "Nhà cửa, đồ dùng và các hoạt động trong nhà.",
    words: "Sắp có",
    active: false,
  },
  {
    icon: "🍜",
    title: "Ăn uống & nhà hàng",
    description: "Món ăn, đồ uống và giao tiếp khi đi ăn.",
    words: "Sắp có",
    active: false,
  },
  {
    icon: "🛍️",
    title: "Mua sắm & quần áo",
    description: "Mua sắm, giá cả và các loại trang phục.",
    words: "Sắp có",
    active: false,
  },
  {
    icon: "🚌",
    title: "Đi lại & giao thông",
    description: "Phương tiện và cách di chuyển.",
    words: "Sắp có",
    active: false,
  },
  {
    icon: "❤️",
    title: "Sức khỏe & cơ thể",
    description: "Bộ phận cơ thể và tình trạng sức khỏe.",
    words: "Sắp có",
    active: false,
  },
  {
    icon: "🌤️",
    title: "Thời tiết & hoạt động",
    description: "Thời tiết, mùa và hoạt động ngoài trời.",
    words: "Sắp có",
    active: false,
  },
  {
    icon: "💼",
    title: "Công việc & sinh hoạt hằng ngày",
    description: "Công việc và những hoạt động thường ngày.",
    words: "Sắp có",
    active: false,
  },
  {
    icon: "🎵",
    title: "Sở thích & giải trí",
    description: "Sở thích cá nhân và hoạt động giải trí.",
    words: "Sắp có",
    active: false,
  },
  {
    icon: "✈️",
    title: "Du lịch & địa điểm",
    description: "Du lịch, địa điểm và những chuyến đi.",
    words: "Sắp có",
    active: false,
  },
  {
    icon: "🤝",
    title: "Bạn bè & giao tiếp",
    description: "Bạn bè, các mối quan hệ và giao tiếp.",
    words: "Sắp có",
    active: false,
  },
  {
    icon: "📱",
    title: "Điện thoại & giao tiếp hiện đại",
    description: "Điện thoại và các hình thức liên lạc.",
    words: "Sắp có",
    active: false,
  },
  {
    icon: "🎯",
    title: "Kế hoạch & trải nghiệm",
    description: "Dự định, kế hoạch và những trải nghiệm.",
    words: "Sắp có",
    active: false,
  },
];

export default function HSK2Page() {
  const completedTopics = topics.filter(
    (topic) => topic.active
  ).length;

  return (
    <>
      <Navbar />

      <main className="page">
        <div className="container">
          <div className="page-header">
            <div className="lesson-label">HSK 2</div>

            <h1>Tiếng Trung HSK 2</h1>

            <p>
              Tiếp tục hành trình học tiếng Trung với 15 chủ đề
              từ vựng và ngữ pháp theo cấp độ HSK 2.
            </p>
          </div>

          <div className="topic-grid">
            {topics.map((topic, index) => {
              const cardContent = (
                <>
                  <div className="topic-icon">
                    {topic.icon}
                  </div>

                  <div className="topic-info">
                    <div className="lesson-label">
                      CHỦ ĐỀ {String(index + 1).padStart(2, "0")}
                    </div>

                    <h3>{topic.title}</h3>

                    <p>{topic.description}</p>

                    <span className="topic-words">
                      {topic.words}
                    </span>
                  </div>

                  <div className="level-button">
                    {topic.active ? "Bắt đầu học →" : "Sắp có"}
                  </div>
                </>
              );

              return topic.active ? (
                <Link
                  href={topic.link}
                  className="topic-card"
                  key={topic.title}
                >
                  {cardContent}
                </Link>
              ) : (
                <div
                  className="topic-card"
                  key={topic.title}
                  aria-disabled="true"
                >
                  {cardContent}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 30, textAlign: "center" }}>
            <p>
              Đã mở {completedTopics}/15 chủ đề HSK2
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
