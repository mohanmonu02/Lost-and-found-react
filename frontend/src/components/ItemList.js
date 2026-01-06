import React from 'react';
import './ItemList.css';

function ItemList({ items, type, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 No {type} items reported yet</p>
        <p className="empty-subtitle">Be the first to report an item!</p>
      </div>
    );
  }

  return (
    <div className="item-list">
      {items.map((item) => (
        <div key={item.id} className="item-card">
          <div className="item-header">
            <h3>{item.name}</h3>
            <span className={`status-badge ${item.status}`}>
              {item.status === 'lost' ? '❌ Lost' : '✅ Found'}
            </span>
          </div>
          
          <p className="item-description">{item.description}</p>
          
          <div className="item-details">
            <div className="detail-row">
              <span className="detail-label">📅 Date:</span>
              <span>{item.date}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">📍 Location:</span>
              <span>{item.location}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">📞 Contact:</span>
              <span>{item.contact}</span>
            </div>
          </div>

          <button
            className="delete-btn"
            onClick={() => onDelete(item.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
