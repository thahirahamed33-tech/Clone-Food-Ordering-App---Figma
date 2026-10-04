import React, { useState } from 'react';
import { ArrowLeft, Trash2, Plus, Minus, CreditCard, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export default function CartScreen({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onBack, 
  onCheckoutSuccess 
}) {
  const [selectedPayment, setSelectedPayment] = useState('visa');
  const [saveCard, setSaveCard] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate Subtotals
  const orderSubtotal = cartItems.reduce((sum, item) => {
    return sum + (item.unitPrice || item.price) * item.quantity;
  }, 0);

  const addOnsTotal = cartItems.reduce((sum, item) => {
    if (!item.selectedAddOns) return sum;
    const addOnSum = item.selectedAddOns.reduce((s, ao) => s + (ao.price * ao.quantity), 0);
    return sum + (addOnSum * item.quantity);
  }, 0);

  const deliveryFee = cartItems.length > 0 ? 17 : 0;
  const grandTotal = orderSubtotal + addOnsTotal + deliveryFee;

  const handlePayNow = () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onCheckoutSuccess(grandTotal);
    }, 1200);
  };

  return (
    <div className="cart-screen">
      {/* Top Bar matching Figma */}
      <div className="cart-header">
        <button className="cart-back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
        </button>
        <h2 className="cart-header-title">Order Summary</h2>
        <div style={{ width: 34 }}></div>
      </div>

      {cartItems.length > 0 ? (
        <div className="cart-content">
          {/* Cart Items List */}
          <div className="cart-items-section">
            {cartItems.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="cart-item-card">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  {item.portion && <span className="cart-item-portion">Size: {item.portion}</span>}
                  
                  {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                    <div className="cart-item-addons">
                      {item.selectedAddOns.map(ao => (
                        <span key={ao.id} className="addon-tag">+ {ao.name} ({ao.quantity}x)</span>
                      ))}
                    </div>
                  )}
                  
                  <span className="cart-item-price">₹{(item.unitPrice || item.price) * item.quantity}</span>
                </div>

                <div className="cart-item-controls">
                  <button 
                    className="trash-btn" 
                    onClick={() => onRemoveItem(item.id)}
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="cart-stepper">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={12} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Breakdown Card matching Figma */}
          <div className="summary-breakdown-card">
            <div className="summary-row">
              <span className="summary-label">Order</span>
              <span className="summary-val">₹{orderSubtotal}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Add-ons / Puddings</span>
              <span className="summary-val">₹{addOnsTotal}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Delivery Fees</span>
              <span className="summary-val">₹{deliveryFee}</span>
            </div>

            <div className="divider"></div>

            <div className="summary-row total-row">
              <span className="total-label">Total:</span>
              <span className="total-val">₹{grandTotal}</span>
            </div>

            <div className="delivery-time-pill">
              <Clock size={14} />
              <span>Estimated Delivery Time: <b>15 - 30Mins</b></span>
            </div>
          </div>

          {/* Payment Methods Section matching Figma */}
          <div className="payment-methods-section">
            <h4 className="section-title">Payment Methods</h4>

            {/* VISA Option */}
            <div 
              className={`payment-card ${selectedPayment === 'visa' ? 'selected' : ''}`}
              onClick={() => setSelectedPayment('visa')}
            >
              <div className="card-left">
                <div className="visa-badge">VISA</div>
                <div>
                  <div className="card-type">Debit card</div>
                  <div className="card-num">3566 **** **** 0157</div>
                </div>
              </div>
              <div className="radio-circle">
                {selectedPayment === 'visa' && <div className="radio-dot"></div>}
              </div>
            </div>

            {/* GPay Option */}
            <div 
              className={`payment-card ${selectedPayment === 'gpay' ? 'selected' : ''}`}
              onClick={() => setSelectedPayment('gpay')}
            >
              <div className="card-left">
                <div className="gpay-badge">G Pay</div>
                <div>
                  <div className="card-type">Debit card</div>
                  <div className="card-num">1426 **** **** 0157</div>
                </div>
              </div>
              <div className="radio-circle">
                {selectedPayment === 'gpay' && <div className="radio-dot"></div>}
              </div>
            </div>

            {/* Save details checkbox */}
            <label className="save-card-checkbox">
              <input 
                type="checkbox" 
                checked={saveCard} 
                onChange={(e) => setSaveCard(e.target.checked)} 
              />
              <span className="checkmark"></span>
              <span>Save card details for future payments</span>
            </label>
          </div>
        </div>
      ) : (
        <div className="empty-cart-state">
          <div className="empty-icon-circle">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some delicious meals from the menu to place an order!</p>
          <button className="btn-primary" onClick={onBack}>Browse Menu</button>
        </div>
      )}

      {/* Bottom Fixed Checkout Bar matching Figma */}
      {cartItems.length > 0 && (
        <div className="cart-footer">
          <div className="total-display">
            <span className="total-text">Total:</span>
            <span className="total-price">₹{grandTotal}</span>
          </div>

          <button 
            className="pay-now-btn" 
            onClick={handlePayNow}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      )}

      <style>{`
        .cart-screen {
          padding: 12px 18px 90px 18px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 8px;
        }

        .cart-back-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          color: var(--text-heading);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .cart-header-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-heading);
        }

        .cart-content {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .cart-items-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cart-item-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: var(--shadow-sm);
        }

        .cart-item-img {
          width: 65px;
          height: 65px;
          border-radius: 14px;
          object-fit: cover;
        }

        .cart-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .cart-item-name {
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--text-heading);
        }

        .cart-item-portion {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .cart-item-addons {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 2px;
        }

        .addon-tag {
          font-size: 0.68rem;
          background: var(--primary-light);
          color: var(--primary);
          padding: 1px 6px;
          border-radius: 8px;
          font-weight: 600;
        }

        .cart-item-price {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--primary);
          margin-top: 2px;
        }

        .cart-item-controls {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .trash-btn {
          background: none;
          border: none;
          color: #EF4444;
          cursor: pointer;
          padding: 2px;
        }

        .cart-stepper {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-input);
          padding: 2px 6px;
          border-radius: 14px;
          border: 1px solid var(--border-color);
        }

        .cart-stepper button {
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

        .cart-stepper span {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--text-heading);
          min-width: 14px;
          text-align: center;
        }

        .summary-breakdown-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: var(--shadow-sm);
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          color: var(--text-body);
        }

        .summary-val {
          font-weight: 700;
          color: var(--text-heading);
        }

        .divider {
          height: 1px;
          background: var(--border-color);
          margin: 4px 0;
        }

        .total-row {
          font-size: 1rem;
          font-weight: 800;
        }

        .total-label {
          color: var(--text-heading);
        }

        .total-val {
          color: var(--primary);
          font-size: 1.15rem;
        }

        .delivery-time-pill {
          background: var(--primary-light);
          color: var(--primary);
          padding: 8px 12px;
          border-radius: 12px;
          font-size: 0.76rem;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 4px;
        }

        .payment-methods-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .payment-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .payment-card.selected {
          border-color: var(--primary);
          background: var(--primary-light);
        }

        .card-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .visa-badge {
          background: #1E3A8A;
          color: #FFFFFF;
          font-weight: 900;
          font-size: 0.75rem;
          padding: 6px 10px;
          border-radius: 8px;
          letter-spacing: 1px;
        }

        .gpay-badge {
          background: #059669;
          color: #FFFFFF;
          font-weight: 900;
          font-size: 0.75rem;
          padding: 6px 10px;
          border-radius: 8px;
        }

        .card-type {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .card-num {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-heading);
        }

        .radio-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .payment-card.selected .radio-circle {
          border-color: var(--primary);
        }

        .radio-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--primary);
        }

        .save-card-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--text-muted);
          cursor: pointer;
          margin-top: 4px;
        }

        .empty-cart-state {
          text-align: center;
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }

        .empty-icon-circle {
          font-size: 3rem;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-footer {
          position: sticky;
          bottom: 0;
          background: var(--bg-surface);
          border-top: 1px solid var(--border-color);
          padding: 12px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 20px;
          box-shadow: var(--shadow-lg);
          margin-top: 10px;
        }

        .total-display {
          display: flex;
          flex-direction: column;
        }

        .total-text {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .total-price {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--primary);
        }

        .pay-now-btn {
          background: var(--primary-gradient);
          color: #FFFFFF;
          border: none;
          padding: 12px 28px;
          border-radius: var(--radius-full);
          font-size: 0.95rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: var(--shadow-md);
          transition: var(--transition-fast);
        }

        .pay-now-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
      `}</style>
    </div>
  );
}
