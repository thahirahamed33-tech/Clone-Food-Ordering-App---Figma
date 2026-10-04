import React, { useState } from 'react';
import { ArrowLeft, Star, Plus, Minus, Check } from 'lucide-react';
import { ADD_ONS } from '../data/foodData';

export default function ProductDetailModal({ item, onClose, onAddToCart }) {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [portion, setPortion] = useState('Medium');
  const [selectedAddOns, setSelectedAddOns] = useState({});

  // Calculate portion price modifier
  const portionMultiplier = portion === 'Large' ? 1.25 : portion === 'Small' ? 0.85 : 1.0;

  // Calculate add-on cost
  const addOnsTotal = Object.entries(selectedAddOns).reduce((sum, [addOnId, qty]) => {
    const addOn = ADD_ONS.find(a => a.id === addOnId);
    return sum + (addOn ? addOn.price * qty : 0);
  }, 0);

  const unitPrice = Math.round(item.price * portionMultiplier);
  const totalPrice = (unitPrice + addOnsTotal) * quantity;

  const handleAddOnQuantity = (addOnId, delta) => {
    setSelectedAddOns(prev => {
      const current = prev[addOnId] || 0;
      const updated = Math.max(0, current + delta);
      if (updated === 0) {
        const copy = { ...prev };
        delete copy[addOnId];
        return copy;
      }
      return { ...prev, [addOnId]: updated };
    });
  };

  const handleAddToCartClick = () => {
    const addOnsList = Object.entries(selectedAddOns).map(([id, qty]) => {
      const addOn = ADD_ONS.find(a => a.id === id);
      return { ...addOn, quantity: qty };
    });

    onAddToCart({
      ...item,
      portion,
      unitPrice,
      selectedAddOns: addOnsList,
      quantity,
      totalPrice
    });
    onClose();
  };

  return (
    <div className="detail-modal-overlay animate-fade-in" onClick={onClose}>
      <div className="detail-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Top Hero Section */}
        <div className="detail-hero-header">
          <button className="back-btn" onClick={onClose}>
            <ArrowLeft size={20} />
          </button>
          
          <div className="hero-img-container">
            <img src={item.image} alt={item.name} className="hero-product-img" />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="detail-body">
          <div className="detail-title-row">
            <div>
              <h2 className="detail-name">{item.name}</h2>
              <div className="detail-meta">
                <span className="rating-pill">
                  <Star size={12} fill="#F59E0B" color="#F59E0B" /> {item.rating}
                </span>
                <span className="prep-time">• {item.prepTime || '15 min'}</span>
                <span className="calories">• {item.calories || '450 kcal'}</span>
              </div>
            </div>
            <div className="detail-price-tag">₹{unitPrice}</div>
          </div>

          <p className="detail-desc">{item.description}</p>

          {/* Portion Size Selector */}
          <div className="section-block">
            <h4 className="block-title">Portion Size</h4>
            <div className="portion-selector">
              {['Small', 'Medium', 'Large'].map(p => (
                <button
                  key={p}
                  className={`portion-btn ${portion === p ? 'active' : ''}`}
                  onClick={() => setPortion(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Add Ons Section matching Figma */}
          <div className="section-block">
            <h4 className="block-title">Add Ons / Toppings</h4>
            <div className="add-ons-grid">
              {ADD_ONS.map(addOn => {
                const qty = selectedAddOns[addOn.id] || 0;
                return (
                  <div key={addOn.id} className={`add-on-card ${qty > 0 ? 'selected' : ''}`}>
                    <div className="add-on-info">
                      <span className="add-on-icon">{addOn.icon}</span>
                      <span className="add-on-name">{addOn.name}</span>
                      <span className="add-on-price">+₹{addOn.price}</span>
                    </div>

                    <div className="add-on-controls">
                      {qty > 0 ? (
                        <div className="add-on-stepper">
                          <button onClick={() => handleAddOnQuantity(addOn.id, -1)}><Minus size={10} /></button>
                          <span>{qty}</span>
                          <button onClick={() => handleAddOnQuantity(addOn.id, 1)}><Plus size={10} /></button>
                        </div>
                      ) : (
                        <button className="add-on-btn" onClick={() => handleAddOnQuantity(addOn.id, 1)}>
                          <Plus size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Fixed Bottom Action Bar matching Figma */}
        <div className="detail-footer">
          <div className="quantity-stepper-large">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              <Minus size={16} />
            </button>
            <span className="qty-val">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>
              <Plus size={16} />
            </button>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCartClick}>
            <span>Add to Card</span>
            <span className="btn-total">₹{totalPrice}</span>
          </button>
        </div>
      </div>

      <style>{`
        .detail-modal-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(8px);
          z-index: 200;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .detail-modal-content {
          width: 100%;
          max-height: 92%;
          background: var(--bg-surface);
          border-top-left-radius: 32px;
          border-top-right-radius: 32px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          position: relative;
        }

        .detail-hero-header {
          height: 220px;
          background: linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          border-bottom-left-radius: 36px;
          border-bottom-right-radius: 36px;
        }

        .back-btn {
          position: absolute;
          top: 16px;
          left: 16px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .hero-img-container {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
          transform: translateY(20px);
        }

        .hero-product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .detail-body {
          flex: 1;
          overflow-y: auto;
          padding: 36px 20px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .detail-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .detail-name {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-heading);
        }

        .detail-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 4px;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .rating-pill {
          background: #FEF3C7;
          color: #D97706;
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .detail-price-tag {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--primary);
        }

        .detail-desc {
          font-size: 0.88rem;
          color: var(--text-body);
          line-height: 1.5;
        }

        .section-block {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .block-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--text-heading);
        }

        .portion-selector {
          display: flex;
          gap: 10px;
        }

        .portion-btn {
          flex: 1;
          padding: 10px;
          border-radius: 14px;
          background: var(--bg-input);
          border: 1px solid var(--border-color);
          color: var(--text-body);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .portion-btn.active {
          background: var(--primary);
          color: #FFFFFF;
          border-color: var(--primary);
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
        }

        .add-ons-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .add-on-card {
          background: var(--bg-input);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 10px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: var(--transition-fast);
        }

        .add-on-card.selected {
          border-color: var(--primary);
          background: var(--primary-light);
        }

        .add-on-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .add-on-icon {
          font-size: 1rem;
        }

        .add-on-name {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-heading);
        }

        .add-on-price {
          font-size: 0.7rem;
          color: var(--primary);
          font-weight: 700;
        }

        .add-on-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--primary);
          color: #FFFFFF;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .add-on-stepper {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--bg-surface);
          padding: 2px 6px;
          border-radius: 14px;
          border: 1px solid var(--primary);
        }

        .add-on-stepper button {
          background: var(--primary);
          color: #fff;
          border: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .add-on-stepper span {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
          min-width: 12px;
          text-align: center;
        }

        .detail-footer {
          padding: 16px 20px;
          background: var(--bg-surface);
          border-top: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .quantity-stepper-large {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-input);
          padding: 8px 16px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
        }

        .quantity-stepper-large button {
          background: none;
          border: none;
          color: var(--text-heading);
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .qty-val {
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-heading);
          min-width: 20px;
          text-align: center;
        }

        .add-to-cart-btn {
          flex: 1;
          background: var(--primary-gradient);
          color: #FFFFFF;
          border: none;
          padding: 14px 20px;
          border-radius: var(--radius-full);
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: var(--shadow-md);
          transition: var(--transition-fast);
        }

        .add-to-cart-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .btn-total {
          background: rgba(255, 255, 255, 0.25);
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
