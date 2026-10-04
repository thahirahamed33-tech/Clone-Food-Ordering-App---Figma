import React, { useEffect } from 'react';
import { Check, ArrowRight, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderSuccessModal({ totalAmount, onTrackOrder, onGoHome }) {
  useEffect(() => {
    // Fire celebratory confetti effect!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect');
    }
  }, []);

  return (
    <div className="success-modal-overlay animate-fade-in">
      <div className="success-modal-card">
        {/* Animated Green Circle matching Figma */}
        <div className="success-icon-wrapper pulse-animation">
          <div className="success-circle-inner">
            <Check size={44} strokeWidth={3} className="check-icon" />
          </div>
        </div>

        <h2 className="success-title">Success!</h2>
        <p className="success-message">
          Your payment was successful. A receipt for this purchase of <b>₹{totalAmount}</b> has been sent to your email.
        </p>

        <div className="order-id-badge">
          Order ID: #ORD-{Math.floor(100000 + Math.random() * 900000)}
        </div>

        <div className="success-actions">
          <button className="btn-primary track-btn" onClick={onTrackOrder}>
            <Truck size={18} />
            <span>Track Order</span>
          </button>
          
          <button className="go-back-btn" onClick={onGoHome}>
            <span>Go Back</span>
          </button>
        </div>
      </div>

      <style>{`
        .success-modal-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(10px);
          z-index: 300;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .success-modal-card {
          width: 100%;
          max-width: 360px;
          background: var(--bg-surface);
          border-radius: 32px;
          padding: 36px 24px 28px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-color);
        }

        .success-icon-wrapper {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: #10B981;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.35);
          margin-bottom: 8px;
        }

        .success-circle-inner {
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text-heading);
          letter-spacing: -0.5px;
        }

        .success-message {
          font-size: 0.86rem;
          color: var(--text-body);
          line-height: 1.5;
        }

        .order-id-badge {
          background: var(--bg-input);
          border: 1px solid var(--border-color);
          padding: 6px 14px;
          border-radius: 12px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .success-actions {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 10px;
        }

        .track-btn {
          width: 100%;
          padding: 14px;
          border-radius: 20px;
        }

        .go-back-btn {
          width: 100%;
          background: #10B981;
          color: #FFFFFF;
          border: none;
          padding: 14px;
          border-radius: 20px;
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
          transition: var(--transition-fast);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }

        .go-back-btn:hover {
          background: #059669;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
