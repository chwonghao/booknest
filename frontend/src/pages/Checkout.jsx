import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { createOrderApi } from "../api/orderApi";
import { createPaymentApi } from "../api/paymentApi";

export default function Checkout() {
  const { items, total } = useContext(CartContext);
  const [address, setAddress] = useState({ name:"", phone:"", detail:"" });
  const [method, setMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const order = await createOrderApi({ items, address });
      const payment = await createPaymentApi({ orderId: order.id, method, amount: total });
      setResult({ order, payment });
    } catch (e) {
      setError("Có lỗi khi đặt hàng/thanh toán. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (result) return (
    <div className="card" style={{ padding: 16 }}>
      <h3 style={{ color:"var(--blue)" }}>Đặt hàng thành công!</h3>
      <p>Mã đơn: <strong>{result.order.id}</strong></p>
      <p>Trạng thái thanh toán: <strong>{result.payment.status}</strong></p>
    </div>
  );

  return (
    <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:16 }}>
      <div className="card" style={{ padding: 16 }}>
        <h3>Địa chỉ giao hàng</h3>
        <input placeholder="Họ tên" value={address.name} onChange={(e)=>setAddress({...address, name:e.target.value})} />
        <input placeholder="Số điện thoại" value={address.phone} onChange={(e)=>setAddress({...address, phone:e.target.value})} />
        <input placeholder="Địa chỉ" value={address.detail} onChange={(e)=>setAddress({...address, detail:e.target.value})} />
        <h3>Phương thức thanh toán</h3>
        <select value={method} onChange={(e)=>setMethod(e.target.value)}>
          <option value="CARD">Thẻ</option>
          <option value="WALLET">Ví điện tử</option>
          <option value="COD">COD</option>
        </select>
        {error && <div style={{ color:"crimson" }}>{error}</div>}
        <button className="btn" disabled={loading} onClick={submit}>
          {loading ? "Đang xử lý..." : "Xác nhận thanh toán"}
        </button>
      </div>
      <div className="card" style={{ padding: 16 }}>
        <h3>Tóm tắt đơn hàng</h3>
        <ul>
          {items.map(it => <li key={it.id}>{it.name} x {it.qty}</li>)}
        </ul>
        <p>Tổng: <strong>{total} VND</strong></p>
      </div>
    </div>
  );
}
