import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../api/productApi";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    fetchProduct(id).then(data => { setP(data); setLoading(false); });
  }, [id]);

  if (loading) return <div>Đang tải...</div>;
  if (!p) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
        <img src={p.imageUrl} alt={p.name} style={{ width:"100%", borderRadius:12 }} />
        <div>
          <h2>{p.name}</h2>
          <p>{p.description}</p>
          <h3 style={{ color:"var(--blue)" }}>{p.price} VND</h3>
          <button className="btn" onClick={() => addItem(p)}>Thêm vào giỏ</button>
        </div>
      </div>
    </div>
  );
}
