import React, { useEffect, useState } from "react";
import client from "../../api/client";

export default function Users() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [role, setRole] = useState("");

  const load = async () => {
    const res = await client.get("/admin/users", { params: { q, role } });
    setRows(res.data || []);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2>Quản lý người dùng</h2>
      <div className="card" style={{ padding: 12, marginBottom: 12 }}>
        <input placeholder="Tìm kiếm..." value={q} onChange={(e)=>setQ(e.target.value)} />
        <select value={role} onChange={(e)=>setRole(e.target.value)}>
          <option value="">Tất cả vai trò</option>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button className="btn" onClick={load}>Lọc</button>
      </div>
      <div className="card" style={{ padding: 12 }}>
        <table width="100%">
          <thead>
            <tr><th>ID</th><th>Tên</th><th>Email</th><th>Vai trò</th><th>Trạng thái</th><th>Hành động</th></tr>
          </thead>
          <tbody>
            {rows.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.status}</td>
                <td><button className="btn">Sửa</button> <button className="btn">Xóa</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <div>Không có dữ liệu</div>}
      </div>
    </div>
  );
}
