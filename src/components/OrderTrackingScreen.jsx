import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Clock, MapPin, Phone, Shield, ChefHat, Bike } from 'lucide-react';

export default function OrderTrackingScreen({ onBackHome }) {
  const [currentStep, setCurrentStep] = useState(2); // 1: Confirmed, 2: Preparing, 3: On the way, 4: Delivered

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => (prev < 4 ? prev + 1 : 4));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { title: 'Order Confirmed', desc: 'Your order has been received by the kitchen', icon: CheckCircle2 },
    { title: 'Preparing Food', desc: 'Chef is preparing your delicious meal', icon: ChefHat },
    { title: 'Out for Delivery', desc: 'Rider Rahul is on his way to your address', icon: Bike },
    { title: 'Delivered', desc: 'Enjoy your meal!', icon: MapPin }
  ];

  return (
    <div className="tracking-screen animate-fade-in">
      <div className="tracking-header">
        <button className="back-btn-tracking" onClick={onBackHome}>
          <ArrowLeft size={18} />
        </button>
        <h2 className="tracking-title">Track Order</h2>
        <div style={{ width: 34 }}></div>
      </div>

      <div className="estimated-card">
        <div className="est-left">
          <span className="est-label">Estimated Delivery</span>
          <h3 className="est-time">18 - 25 Mins</h3>
        </div>
        <div className="est-badge pulse-animation">
          <Clock size={16} /> On Time
        </div>
      </div>

      {/* Map visual illustration */}
      <div className="map-illustration">
        <div className="map-grid"></div>
        <div className="rider-marker-pin animate-pulse">
          <Bike size={24} color="#FFFFFF" />
        </div>
        <div className="home-marker-pin">
          <MapPin size={22} color="#7C3AED" />
        </div>
      </div>

      {/* Step Tracker Timeline */}
      <div className="timeline-card">
        <h4 className="timeline-heading">Order Progress</h4>
        
        <div className="steps-container">
          {steps.map((step, idx) => {
            const stepNum = idx + 1;
            const isDone = stepNum <= currentStep;
            const isCurrent = stepNum === currentStep;
            const StepIcon = step.icon;

            return (
              <div key={idx} className={`step-item ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
                <div className="step-icon-col">
                  <div className="step-badge">
                    <StepIcon size={16} />
                  </div>
                  {idx < steps.length - 1 && <div className="step-line"></div>}
                </div>

                <div className="step-details">
                  <h5 className="step-title">{step.title}</h5>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery Driver Info */}
      <div className="driver-card">
        <img 
          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80" 
          alt="Driver" 
          className="driver-img"
        />
        <div className="driver-info">
          <h4 className="driver-name">Rahul Sharma</h4>
          <span className="driver-role">Your Delivery Partner ⭐ 4.9</span>
        </div>
        <button className="call-driver-btn" title="Call Driver">
          <Phone size={18} />
        </button>
      </div>

      <style>{`
        .tracking-screen {
          padding: 12px 18px 90px 18px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .tracking-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .back-btn-tracking {
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

        .tracking-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-heading);
        }

        .estimated-card {
          background: linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%);
          border-radius: 20px;
          padding: 18px;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 10px 25px rgba(124, 58, 237, 0.3);
        }

        .est-label {
          font-size: 0.75rem;
          color: #E9D5FF;
          font-weight: 600;
        }

        .est-time {
          font-size: 1.5rem;
          font-weight: 800;
        }

        .est-badge {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(6px);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .map-illustration {
          height: 140px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .map-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(var(--border-color) 1px, transparent 1px);
          background-size: 16px 16px;
          opacity: 0.6;
        }

        .rider-marker-pin {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #7C3AED;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(124, 58, 237, 0.6);
          position: absolute;
          left: 35%;
        }

        .home-marker-pin {
          position: absolute;
          right: 25%;
        }

        .timeline-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: var(--shadow-sm);
        }

        .timeline-heading {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--text-heading);
        }

        .steps-container {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .step-item {
          display: flex;
          gap: 14px;
          opacity: 0.4;
          transition: var(--transition-fast);
        }

        .step-item.done {
          opacity: 1;
        }

        .step-icon-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .step-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-input);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-item.done .step-badge {
          background: var(--primary);
          color: #FFFFFF;
          border-color: var(--primary);
        }

        .step-line {
          width: 2px;
          height: 36px;
          background: var(--border-color);
        }

        .step-item.done .step-line {
          background: var(--primary);
        }

        .step-details {
          padding-bottom: 20px;
        }

        .step-title {
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--text-heading);
        }

        .step-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .driver-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: var(--shadow-sm);
        }

        .driver-img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }

        .driver-info {
          flex: 1;
        }

        .driver-name {
          font-size: 0.9rem;
          font-weight: 800;
          color: var(--text-heading);
        }

        .driver-role {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .call-driver-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #22C55E;
          color: #FFFFFF;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        }
      `}</style>
    </div>
  );
}
