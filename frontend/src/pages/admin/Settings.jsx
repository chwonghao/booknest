import React, { useState, useEffect } from "react";
import client from "../../api/client";

export default function Settings() {
  const [tab, setTab] = useState("general");
  const [general, setGeneral] = useState({ name:"E-Shop", primary:"#2196F3" });
  const [smtp, setSmtp] = useState({ host:"", port:"", user:"", pass:"" });
  const [security, setSecurity] = useState({ jwtExpiry: "3600" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // load settings nếu có
  }, []);

  const save = async () => {
    setMsg("");
    try {
      await client.post("/admin/settings", { general, smtp, security });
      setMsg("Lưu cấu hình thành công");
    } catch {
      setMsg("Lưu thất bại");
    }
  };

  return (
    <div>
      <h2>Cấu hình hệ thống</h2>
      <div className="card" style={{ padding: 12, marginBottom: 12 }}>
        <button className="btn" onClick={()=>setTab("general")}>Chung</button>
        <button className="btn" onClick={()=>setTab("smtp")}>Email/Notification</button>
        <button className="btn" onClick={()=>setTab("security")}>Bảo mật</button>
      </div>
      <div className="card" style={{ padding: 16 }}>
        {msg && <div style={{ color: msg.includes("thất") ? "crimson" : "green" }}>{msg}</div>}
        {tab === "general" && (
          <>
            <label>Tên hệ thống</label>
            <input value={general.name} onChange={(e)=>setGeneral({ ...general, name:e.target.value })} />
            <label>Màu chủ đạo</label>
            <input type="color" value={general.primary} onChange={(e)=>setGeneral({ ...general, primary:e.target.value })} />
          </>
        )}
        {tab === "smtp" && (
          <>
            <label>Host</label><input value={smtp.host} onChange={(e)=>setSmtp({ ...smtp, host:e.target.value })} />
            <label>Port</label><input value={smtp.port} onChange={(e)=>setSmtp({ ...smtp, port:e.target.value })} />
            <label>User</label><input value={smtp.user} onChange={(e)=>setSmtp({ ...smtp, user:e.target.value })} />
            <label>Password</label><input type="password" value={smtp.pass} onChange={(e)=>setSmtp({ ...smtp, pass:e.target.value })} />
          </>
        )}
        {tab === "security" && (
          <>
            <label>Thời gian hết hạn JWT (giây)</label>
            <input value={security.jwtExpiry} onChange={(e)=>setSecurity({ ...security, jwtExpiry:e.target.value })} />
          </>
        )}
        <button className="btn" onClick={save}>Lưu cấu hình</button>
      </div>
    </div>
  );
}
