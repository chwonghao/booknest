import React, { useState } from "react";
import { registerApi, loginApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Register() {
  const [form, setForm] = useState({ name:"", email:"", password:"", confirm:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setError("Mật khẩu không khớp");
    setLoading(true);
    try {
      await registerApi({ name: form.name, email: form.email, password: form.password });
      const data = await loginApi({ email: form.email, password: form.password });
      login(data);
      navigate("/");
    } catch (err) {
      setError("Đăng ký thất bại, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 520, margin: "24px auto", padding: 24 }}>
      <h2>Đăng ký</h2>
      {error && <div style={{ color: "crimson" }}>{error}</div>}
      <form onSubmit={submit}>
        <input placeholder="Họ tên" value={form.name} onChange={(e)=>setForm({ ...form, name:e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e)=>setForm({ ...form, email:e.target.value })} />
        <input type="password" placeholder="Mật khẩu" value={form.password} onChange={(e)=>setForm({ ...form, password:e.target.value })} />
        <input type="password" placeholder="Xác nhận mật khẩu" value={form.confirm} onChange={(e)=>setForm({ ...form, confirm:e.target.value })} />
        <button className="btn" type="submit" disabled={loading}>{loading ? "Đang xử lý..." : "Đăng ký"}</button>
      </form>
    </div>
  );
}
