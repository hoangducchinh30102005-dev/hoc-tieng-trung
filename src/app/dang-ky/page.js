"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function DangKyPage() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (
      !form.fullName ||
      !form.username ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setMessage("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (form.password.length < 6) {
      setMessage("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Mật khẩu nhập lại không khớp.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: {
        data: {
          username: form.username.trim(),
          full_name: form.fullName.trim(),
        },
      },
    });

    if (error) {
      if (error.message.toLowerCase().includes("username")) {
        setMessage("Tên đăng nhập đã được sử dụng.");
      } else if (error.message.toLowerCase().includes("email")) {
        setMessage("Email này đã được sử dụng hoặc không hợp lệ.");
      } else {
        setMessage(error.message);
      }

      setLoading(false);
      return;
    }

    if (!data.user) {
      setMessage("Không thể tạo tài khoản.");
      setLoading(false);
      return;
    }

    setMessage(
      "Đăng ký thành công! Hãy kiểm tra email để xác nhận tài khoản."
    );

    setLoading(false);
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
          maxWidth: "460px",
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
          Tạo tài khoản
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "26px",
          }}
        >
          Bắt đầu hành trình học tiếng Trung
        </p>

        <form onSubmit={handleSubmit}>
          <label>Tên học sinh</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Nhập tên của bạn"
            style={inputStyle}
          />

          <label>Tên đăng nhập</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Ví dụ: chinh123"
            style={inputStyle}
          />

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
            placeholder="Ít nhất 6 ký tự"
            style={inputStyle}
          />

          <label>Nhập lại mật khẩu</label>
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu"
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
            {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "18px",
              textAlign: "center",
              color: message.includes("thành công")
                ? "#16a34a"
                : "#dc2626",
              fontWeight: 600,
              lineHeight: 1.5,
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
          Đã có tài khoản?{" "}
          <Link
            href="/dang-nhap"
            style={{
              color: "#2563eb",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Đăng nhập
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