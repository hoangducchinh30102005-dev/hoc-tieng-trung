"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    }

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link href="/" className="navbar-logo">
          <div className="logo-title">CN Học Tiếng Trung</div>
          <div className="logo-subtitle">HSK1 → HSK5</div>
        </Link>

        <nav className="navbar-menu">
          <Link href="/">Trang chủ</Link>
          <Link href="/hoc">Bài học</Link>
          <Link href="/tu-vung">Từ vựng</Link>
          <Link href="/ngu-phap">Ngữ pháp</Link>
          <Link href="/luyen-nghe">Luyện nghe</Link>
          <Link href="/on-tap">Ôn tập</Link>
          <Link href="/video">Video</Link>
          <Link href="/tien-do">Tiến độ</Link>
        </nav>

        {!loading && (
          user ? (
            <Link
              href="/trang-ca-nhan"
              className="login-button"
            >
              👤 Trang cá nhân
            </Link>
          ) : (
            <Link
              href="/dang-nhap"
              className="login-button"
            >
              Đăng nhập
            </Link>
          )
        )}

      </div>
    </header>
  );
}