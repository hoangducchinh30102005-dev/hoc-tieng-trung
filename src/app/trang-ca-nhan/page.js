"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

const TOTAL_HSK1_LESSONS = 27;

export default function TrangCaNhanPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const [completedLessons, setCompletedLessons] = useState(0);
  const [learnedWords, setLearnedWords] = useState(0);
  const [reviewWords, setReviewWords] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/dang-nhap");
        return;
      }

      setUser(user);

      // ================================
      // LẤY THÔNG TIN PROFILE
      // ================================

      const { data: profileData } = await supabase
        .from("profiles")
        .select("username, full_name")
        .eq("id", user.id)
        .maybeSingle();

      setProfile(profileData);

      // ================================
      // LẤY TIẾN ĐỘ HSK1
      // ================================

      const { data: progressData, error: progressError } = await supabase
        .from("lesson_progress")
        .select("id, completed")
        .eq("user_id", user.id)
        .eq("hsk_level", 1)
        .eq("completed", true);

      if (!progressError && progressData) {
        setCompletedLessons(progressData.length);
      }

      // ================================
      // LẤY SỐ TỪ VỰNG ĐÃ HỌC
      // ================================

      const { data: vocabularyData, error: vocabularyError } =
        await supabase
          .from("learned_vocabulary")
          .select("id")
          .eq("user_id", user.id);

      if (!vocabularyError && vocabularyData) {
        setLearnedWords(vocabularyData.length);
      }

      // ================================
      // LẤY SỐ TỪ ĐANG CẦN ÔN
      // ================================

      const now = new Date().toISOString();

      const { data: reviewData, error: reviewError } = await supabase
        .from("learned_vocabulary")
        .select("id")
        .eq("user_id", user.id)
        .not("next_review_at", "is", null)
        .lte("next_review_at", now);

      if (!reviewError && reviewData) {
        setReviewWords(reviewData.length);
      }

      setLoading(false);
    }

    loadUserData();
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/dang-nhap");
    router.refresh();
  }

  const progressPercent = Math.min(
    100,
    Math.round((completedLessons / TOTAL_HSK1_LESSONS) * 100)
  );

  if (loading) {
    return (
      <main className="personal-page">
        <div className="personal-container">
          <p>Đang tải trang cá nhân...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="personal-page">
      <div className="personal-container">

        {/* ================================
            HEADER
        ================================= */}

        <div className="personal-header">
          <div>
            <p className="personal-label">TRANG CHỦ CÁ NHÂN</p>

            <h1>
              Xin chào,{" "}
              {profile?.full_name || user?.email}
              {" "}👋
            </h1>

            <p>
              Chào mừng bạn quay lại với hành trình học tiếng Trung.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Đăng xuất
          </button>
        </div>

        {/* ================================
            TIẾN ĐỘ HSK1
        ================================= */}

        <section className="personal-card">
          <div className="personal-card-title">
            <h2>Tiến độ học tập</h2>
            <span>HSK 1</span>
          </div>

          <div className="progress-box">
            <div className="progress-info">
              <span>Tiến độ HSK 1</span>
              <strong>{progressPercent}%</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${progressPercent}%`,
                }}
              ></div>
            </div>

            <p style={{ marginTop: "10px", color: "#64748b" }}>
              Đã hoàn thành {completedLessons}/{TOTAL_HSK1_LESSONS} bài học
            </p>
          </div>
        </section>

        {/* ================================
            THỐNG KÊ
        ================================= */}

        <section
          className="personal-card"
          style={{ marginTop: "20px" }}
        >
          <h2>Thống kê học tập</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "16px",
              marginTop: "18px",
            }}
          >
            <div
              style={{
                padding: "20px",
                borderRadius: "14px",
                background: "#eff6ff",
                border: "1px solid #dbeafe",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#2563eb",
                }}
              >
                {completedLessons}
              </div>

              <div
                style={{
                  marginTop: "5px",
                  color: "#475569",
                }}
              >
                Bài đã hoàn thành
              </div>
            </div>

            <div
              style={{
                padding: "20px",
                borderRadius: "14px",
                background: "#f0fdf4",
                border: "1px solid #dcfce7",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#16a34a",
                }}
              >
                {learnedWords}
              </div>

              <div
                style={{
                  marginTop: "5px",
                  color: "#475569",
                }}
              >
                Từ vựng đã học
              </div>
            </div>

            <div
              style={{
                padding: "20px",
                borderRadius: "14px",
                background: "#fff7ed",
                border: "1px solid #fed7aa",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#ea580c",
                }}
              >
                {reviewWords}
              </div>

              <div
                style={{
                  marginTop: "5px",
                  color: "#475569",
                }}
              >
                Từ cần ôn
              </div>
            </div>
          </div>
        </section>

        {/* ================================
            CÁC CHỨC NĂNG HỌC
        ================================= */}

        <div className="personal-grid">

          <Link href="/hoc/hsk1" className="personal-feature">
            <div className="feature-icon">📚</div>

            <h3>Tiếp tục học</h3>

            <p>
              Học từ vựng và các chủ đề HSK 1.
            </p>
          </Link>

          <Link href="/tu-vung" className="personal-feature">
            <div className="feature-icon">📖</div>

            <h3>Từ vựng đã học</h3>

            <p>
              Xem và ôn lại những từ vựng đã học.
            </p>
          </Link>

          <Link href="/ngu-phap" className="personal-feature">
            <div className="feature-icon">📘</div>

            <h3>Ngữ pháp</h3>

            <p>
              Học và luyện tập ngữ pháp tiếng Trung.
            </p>
          </Link>

          <Link href="/luyen-nghe" className="personal-feature">
            <div className="feature-icon">🎧</div>

            <h3>Luyện nghe</h3>

            <p>
              Luyện nghe và kiểm tra khả năng nghe hiểu.
            </p>
          </Link>

        </div>

        {/* ================================
            THÔNG TIN TÀI KHOẢN
        ================================= */}

        <section className="personal-card account-card">
          <h2>Thông tin tài khoản</h2>

          <div className="account-row">
            <span>Tên học sinh</span>
            <strong>
              {profile?.full_name || "Chưa cập nhật"}
            </strong>
          </div>

          <div className="account-row">
            <span>Tên đăng nhập</span>
            <strong>
              {profile?.username || "Chưa cập nhật"}
            </strong>
          </div>

          <div className="account-row">
            <span>Email</span>
            <strong>
              {user?.email || "Không có email"}
            </strong>
          </div>
        </section>

      </div>
    </main>
  );
}