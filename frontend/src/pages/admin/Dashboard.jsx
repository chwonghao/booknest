import React from "react";
export default function Dashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
        <div className="card" style={{ padding:16 }}>Người dùng: 120</div>
        <div className="card" style={{ padding:16 }}>Sản phẩm: 540</div>
        <div className="card" style={{ padding:16 }}>Đơn hàng: 1,240</div>
        <div className="card" style={{ padding:16 }}>Doanh thu: 2.4 tỷ</div>
      </div>
    </div>
  );
}
