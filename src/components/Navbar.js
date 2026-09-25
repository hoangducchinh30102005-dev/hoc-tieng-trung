import Link from "next/link";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link href="/" className="navbar-logo">
          <div className="logo-title">
            CN Học Tiếng Trung
          </div>

          <div className="logo-subtitle">
            HSK1 → HSK5
          </div>
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

        <Link href="/dang-nhap" className="login-button">
          Đăng nhập
        </Link>

      </div>
    </header>
  );
}