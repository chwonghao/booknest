import React from "react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card" style={{ padding: 12 }}>
      <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: 180, objectFit: "cover" }} />
      <div style={{ padding: 8 }}>
        <h4>{product.name}</h4>
        <p style={{ color: "var(--muted)" }}>{product.price} VND</p>
        <button className="btn" onClick={() => onAdd(product)}>Thêm vào giỏ</button>
      </div>
    </div>
  );
}
