import React, { useEffect, useState } from "react";
import client from "../../api/client";

export default function Orders() {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  const load = async () => {
    const res = await client.get("/admin/orders", { params: { status, date } });
    setRows(res.data || []);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2>Quản lý đơn hàng</h2>
      <div className="card" style={{ padding: 12, marginBottom: 12 }}>
        <select value={status} onChange={(e)=>setStatus(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option value="PENDING">Chờ xử lý</option>
          <option value="CONFIRMED">Đã xác nhận</option>
          <option value="SHIPPED">Đang giao</option>
          <option value="DELIVERED">Đã giao</option>
        </select>
        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
        <button className="btn" onClick={load}>Lọc</button>
      </div>
      <div className="card" style={{ padding: 12 }}>
        <table width="100%">
          <thead>
            <tr><th>ID</th><th>Khách hàng</th><th>Ngày</th><th>Tổng tiền</th><th>Trạng thái</th><th>Hành động</th></tr>
          </thead>
          <tbody>
            {rows.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td><td>{o.customerName}</td><td>{o.createdAt}</td><td>{o.total}</td><td>{o.status}</td>
                <td><button className="btn">Xem</button> <button className="btn">Cập nhật trạng thái</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <div>Không có dữ liệu</div>}
      </div>
    </div>
  );
}
