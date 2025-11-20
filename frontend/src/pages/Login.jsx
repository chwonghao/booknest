import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/authApi";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email:"", password:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await loginApi(form);
      login(data);
      navigate("/");
    } catch {
      setError("Đăng nhập thất bại. Kiểm tra email/mật khẩu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 480, margin:"24px auto", padding: 24 }}>
      <h2>Đăng nhập</h2>
      {error && <div style={{ color:"crimson" }}>{error}</div>}
      <form onSubmit={submit}>
        <input placeholder="Email" value={form.email} onChange={(e)=>setForm({ ...form, email:e.target.value })} />
        <input type="password" placeholder="Mật khẩu" value={form.password} onChange={(e)=>setForm({ ...form, password:e.target.value })} />
        <button className="btn" type="submit" disabled={loading}>{loading ? "Đang xử lý..." : "Đăng nhập"}</button>
      </form>
    </div>
  );
}
