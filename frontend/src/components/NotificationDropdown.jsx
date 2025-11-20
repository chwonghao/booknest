import React, { useEffect, useState } from "react";
import { getNotificationsApi, markAllReadApi } from "../api/notificationApi";

export default function NotificationDropdown({ onClose }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getNotificationsApi();
      setItems(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="dropdown-menu" role="menu">
      <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 12px" }}>
        <strong>Thông báo</strong>
        <div style={{ display:"flex", gap:8 }}>
          <button className="btn" onClick={async ()=>{ await markAllReadApi(); load(); }}>Đánh dấu đã đọc</button>
          <button className="btn" onClick={onClose}>Đóng</button>
        </div>
      </div>
      {loading ? <div className="dropdown-item">Đang tải...</div> :
        items.length === 0 ? <div className="dropdown-item">Không có thông báo</div> :
        items.map(item => (
          <div key={item.id} className="dropdown-item">
            <div className="item-title">{item.title}</div>
            <div className="item-time">{item.time}</div>
          </div>
        ))
      }
    </div>
  );
}
