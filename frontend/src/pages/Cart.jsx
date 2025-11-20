import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, updateQty, removeItem, total } = useContext(CartContext);

  return (
    <div>
      <h2>Giỏ hàng</h2>
      {items.length === 0 ? (
        <div className="card" style={{ padding: 16 }}>
          Giỏ hàng trống. <Link to="/products">Tiếp tục mua sắm</Link>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:16 }}>
          <div className="card" style={{ padding: 16 }}>
            {items.map(it => (
              <div key={it.id} style={{ display:"grid", gridTemplateColumns:"80px 1fr 120px 120px", alignItems:"center", gap:12, borderBottom:"1px solid #eee", padding:"12px 0" }}>
                <img src={it.imageUrl} alt={it.name} style={{ width:80, height:80, objectFit:"cover", borderRadius:8 }} />
                <div>
                  <div>{it.name}</div>
                  <div style={{ color:"var(--muted)" }}>{it.price} VND</div>
                </div>
                <input type="number" min="1" value={it.qty} onChange={(e) => updateQty(it.id, parseInt(e.target.value || "1", 10))} />
                <div style={{ display:"flex", gap:8 }}>
                  <button className="btn" onClick={() => removeItem(it.id)}>Xóa</button>
                </div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 16 }}>
            <h3>Tóm tắt</h3>
            <p>Tổng cộng: <strong>{total} VND</strong></p>
            <Link to="/checkout" className="btn">Tiếp tục thanh toán</Link>
          </div>
        </div>
      )}
    </div>
  );
}
