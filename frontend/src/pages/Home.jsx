import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <section className="card" style={{ padding: 24, textAlign: "center" }}>
        <h1 style={{ color: "var(--blue)" }}>Mua sắm hiện đại, trải nghiệm mượt mà</h1>
        <p>Khám phá sản phẩm mới nhất với giao diện đơn giản, trực quan.</p>
        <Link to="/products" className="btn">Xem sản phẩm</Link>
      </section>
    </div>
  );
}
