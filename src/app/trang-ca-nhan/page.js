"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function TrangCaNhanPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/dang-nhap");
        return;
      }

      setUser(user);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("username, full_name")
        .eq("id", user.id)
        .single();

      setProfile(profileData);
      setLoading(false);
    }

    loadUser();
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/dang-nhap");
    router.refresh();
  }

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

        <section className="personal-card">
          <div className="personal-card-title">
            <h2>Tiến độ học tập</h2>
            <span>HSK 1</span>
          </div>

          <div className="progress-box">
            <div className="progress-info">
              <span>Tiến độ HSK 1</span>
              <strong>0%</strong>
            </div>

            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
        </section>

        <div className="personal-grid">

          <Link href="/hoc/hsk1" className="personal-feature">
            <div className="feature-icon">📚</div>
            <h3>Tiếp tục học</h3>
            <p>
              Học từ vựng và các chủ đề HSK 1.
            </p>
          </Link>

          <Link href="/tu-vung" className="personal-feature">
            <div className="feature-icon">📝</div>
            <h3>Từ vựng đã học</h3>
            <p>
              Xem và ôn lại những từ vựng đã học.
            </p>
          </Link>

          <Link href="/ngu-phap" className="personal-feature">
            <div className="feature-icon">📖</div>
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

        <section className="personal-card account-card">
          <h2>Thông tin tài khoản</h2>

          <div className="account-row">
            <span>Tên học sinh</span>
            <strong>{profile?.full_name}</strong>
          </div>

          <div className="account-row">
            <span>Tên đăng nhập</span>
            <strong>{profile?.username}</strong>
          </div>

          <div className="account-row">
            <span>Email</span>
            <strong>{user?.email}</strong>
          </div>
        </section>

      </div>
    </main>
  );
}