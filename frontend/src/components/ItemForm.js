import React, { useState } from 'react';
import './ItemForm.css';

function ItemForm({ type, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    contact: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      description: '',
      date: '',
      location: '',
      contact: ''
    });
  };

  return (
    <div className="item-form">
      <h2>Report {type === 'lost' ? 'Lost' : 'Found'} Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Item Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., iPhone, Wallet, Keys"
            required
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide details like color, brand, distinctive features..."
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label>Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Library, Cafeteria, Parking Lot"
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Information *</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Email or Phone Number"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ItemForm;
