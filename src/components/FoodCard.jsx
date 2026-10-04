import React from 'react';
import { Star, Plus, Minus } from 'lucide-react';

export default function FoodCard({ item, cartItem, onSelect, onAddToCart, onUpdateQuantity }) {
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="food-card animate-fade-in" onClick={() => onSelect(item)}>
      <div className="card-image-wrapper">
        <img src={item.image} alt={item.name} className="food-img" loading="lazy" />
        <div className="card-rating-badge">
          <Star size={12} fill="#F59E0B" color="#F59E0B" />
          <span>{item.rating}</span>
        </div>
      </div>

      <div className="card-details">
        <h3 className="food-name">{item.name}</h3>
        
        <div className="card-footer">
          <span className="food-price">₹{item.price}</span>

          <div className="card-actions" onClick={(e) => e.stopPropagation()}>
            {quantity > 0 ? (
              <div className="quantity-stepper-mini">
                <button className="stepper-btn" onClick={() => onUpdateQuantity(item.id, quantity - 1)}>
                  <Minus size={12} />
                </button>
                <span className="stepper-val">{quantity}</span>
                <button className="stepper-btn" onClick={() => onUpdateQuantity(item.id, quantity + 1)}>
                  <Plus size={12} />
                </button>
              </div>
            ) : (
              <button className="add-btn-mini" onClick={() => onAddToCart(item)} title="Add to cart">
                <Plus size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .food-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          box-shadow: var(--shadow-sm);
        }

        .food-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--primary);
        }

        .card-image-wrapper {
          width: 100%;
          height: 125px;
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          background: #f1f5f9;
        }

        .food-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .food-card:hover .food-img {
          transform: scale(1.05);
        }

        .card-rating-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 700;
          color: #1E293B;
          display: flex;
          align-items: center;
          gap: 3px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .card-details {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .food-name {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-heading);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 2px;
        }

        .food-price {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--primary);
        }

        .add-btn-mini {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--primary);
          color: #fff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
          box-shadow: 0 4px 10px rgba(124, 58, 237, 0.3);
        }

        .add-btn-mini:hover {
          background: var(--primary-hover);
          transform: scale(1.1);
        }

        .quantity-stepper-mini {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--primary-light);
          padding: 3px 6px;
          border-radius: 20px;
          border: 1px solid var(--primary);
        }

        .stepper-btn {
          background: var(--primary);
          color: #fff;
          border: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .stepper-val {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary);
          min-width: 14px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
