"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function DangNhapPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!form.email || !form.password) {
      setMessage("Vui lòng nhập email và mật khẩu.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email.trim(),
      password: form.password,
    });

    if (error) {
      setMessage("Email hoặc mật khẩu không chính xác.");
      setLoading(false);
      return;
    }
    router.push("/trang-ca-nhan");
    router.refresh();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "18px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "8px",
            fontSize: "28px",
          }}
        >
          Đăng nhập
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "26px",
          }}
        >
          Tiếp tục hành trình học tiếng Trung
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            style={inputStyle}
          />

          <label>Mật khẩu</label>

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...buttonStyle,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "18px",
              textAlign: "center",
              color: "#dc2626",
              fontWeight: 600,
            }}
          >
            {message}
          </p>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: "22px",
            color: "#64748b",
          }}
        >
          Chưa có tài khoản?{" "}
          <Link
            href="/dang-ky"
            style={{
              color: "#2563eb",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Đăng ký
          </Link>
        </p>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginTop: "7px",
  marginBottom: "16px",
  border: "1px solid #d1d5db",
  borderRadius: "9px",
  fontSize: "15px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "13px",
  marginTop: "5px",
  border: "none",
  borderRadius: "9px",
  background: "#2563eb",
  color: "#fff",
  fontSize: "16px",
  fontWeight: 600,
  cursor: "pointer",
};