import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { fetchProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    fetchProducts(Object.fromEntries(params)).then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, [params]);

  return (
    <div>
      <h2>Sản phẩm</h2>
      {loading ? <div>Đang tải...</div> : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:16 }}>
          {products.map(p => (
            <Link key={p.id} to={`/products/${p.id}`} style={{ textDecoration: "none" }}>
              <ProductCard product={p} onAdd={addItem} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
