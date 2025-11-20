import React, { useEffect, useState } from "react";
import { getPaymentsAdminApi } from "../../api/paymentApi";

export default function Payments() {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("");
  const [method, setMethod] = useState("");

  const load = async () => {
    const data = await getPaymentsAdminApi({ status, method });
    setRows(data || []);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2>Quản lý thanh toán</h2>
      <div className="card" style={{ padding: 12, marginBottom: 12 }}>
        <select value={status} onChange={(e)=>setStatus(e.target.value)}>
          <option value="">Tất cả</option>
          <option value="SUCCESS">Thành công</option>
          <option value="FAILED">Thất bại</option>
          <option value="PENDING">Chờ xử lý</option>
        </select>
        <select value={method} onChange={(e)=>setMethod(e.target.value)}>
          <option value="">Mọi phương thức</option>
          <option value="CARD">Thẻ</option>
          <option value="WALLET">Ví điện tử</option>
          <option value="COD">COD</option>
        </select>
        <button className="btn" onClick={load}>Lọc</button>
      </div>
      <div className="card" style={{ padding: 12 }}>
        <table width="100%">
          <thead>
            <tr><th>ID</th><th>Đơn hàng</th><th>Phương thức</th><th>Số tiền</th><th>Trạng thái</th><th>Thời gian</th></tr>
          </thead>
          <tbody>
            {rows.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td><td>{p.orderId}</td><td>{p.method}</td><td>{p.amount}</td><td>{p.status}</td><td>{p.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <div>Không có dữ liệu</div>}
      </div>
    </div>
  );
}
