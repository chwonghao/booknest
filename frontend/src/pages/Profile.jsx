import React, { useEffect, useState } from "react";
import { profileApi, updateProfileApi } from "../api/authApi";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    profileApi().then(setProfile).catch(() => setProfile({ name:"", email:"", phone:"" }));
  }, []);

  const save = async () => {
    setSaving(true);
    setMsg("");
    try {
      await updateProfileApi(profile);
      setMsg("Lưu thành công");
    } catch {
      setMsg("Lưu thất bại");
    } finally {
      setSaving(false);
    }
  };

  if (!profile) return <div>Đang tải...</div>;

  return (
    <div className="card" style={{ maxWidth: 720, margin:"24px auto", padding: 24 }}>
      <h2>Hồ sơ cá nhân</h2>
      {msg && <div style={{ color: msg.includes("thất") ? "crimson" : "green" }}>{msg}</div>}
      <label>Họ tên</label>
      <input value={profile.name} onChange={(e)=>setProfile({ ...profile, name:e.target.value })} />
      <label>Email</label>
      <input value={profile.email} onChange={(e)=>setProfile({ ...profile, email:e.target.value })} />
      <label>Số điện thoại</label>
      <input value={profile.phone || ""} onChange={(e)=>setProfile({ ...profile, phone:e.target.value })} />
      <button className="btn" disabled={saving} onClick={save}>{saving ? "Đang lưu..." : "Lưu thay đổi"}</button>
    </div>
  );
}
