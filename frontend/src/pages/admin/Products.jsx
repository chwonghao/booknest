import React, { useEffect, useState } from "react";
import client from "../../api/client";

export default function Products() {
  const [rows, setRows] = useState([]);
  const [cat, setCat] = useState("");
  const [q, setQ] = useState("");

  const load = async () => {
    const res = await client.get("/admin/products", { params: { q, category: cat } });
    setRows(res.data || []);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2>Quản lý sản phẩm</h2>
      <div className="card" style={{ padding: 12, marginBottom: 12 }}>
        <input placeholder="Tìm kiếm..." value={q} onChange={(e)=>setQ(e.target.value)} />
        <input placeholder="Danh mục" value={cat} onChange={(e)=>setCat(e.target.value)} />
        <button className="btn" onClick={load}>Lọc</button>
        <button className="btn">Thêm sản phẩm</button>
      </div>
      <div className="card" style={{ padding: 12 }}>
        <table width="100%">
          <thead>
            <tr><th>ID</th><th>Tên</th><th>Giá</th><th>Tồn kho</th><th>Danh mục</th><th>Hành động</th></tr>
          </thead>
          <tbody>
            {rows.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td><td>{p.name}</td><td>{p.price}</td><td>{p.stock}</td><td>{p.category}</td>
                <td><button className="btn">Sửa</button> <button className="btn">Ẩn/Hiện</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <div>Không có dữ liệu</div>}
      </div>
    </div>
  );
}
