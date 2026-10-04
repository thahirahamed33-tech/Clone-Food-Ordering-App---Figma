import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function WelcomeScreen({ onGetStarted }) {
  return (
    <div className="welcome-screen-container">
      <div className="purple-glow-bg"></div>
      
      <div className="welcome-content">
        <div className="hero-image-circle animate-fade-in">
          <img 
            src="/hero_food_plate.jpg" 
            alt="Enjoy Your Food" 
            className="hero-food-img"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </div>

        <div className="hero-text-block animate-fade-in">
          <div className="hero-badge">
            <Sparkles size={14} /> Fast & Fresh Delivery
          </div>
          <h1 className="hero-title">Enjoy <br />Your Food</h1>
          <p className="hero-subtitle">
            Discover mouthwatering burgers, cheesy pizzas, and delicious desserts delivered hot to your doorstep.
          </p>
        </div>

        <button className="get-started-btn pulse-animation" onClick={onGetStarted}>
          <span>Get Started</span>
          <ArrowRight size={20} />
        </button>
      </div>

      <style>{`
        .welcome-screen-container {
          min-height: 100%;
          background: linear-gradient(180deg, #6B21A8 0%, #4C1D95 60%, #3b1475 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 40px 24px;
          color: #FFFFFF;
          position: relative;
          overflow: hidden;
        }

        .purple-glow-bg {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(107, 33, 168, 0) 70%);
          pointer-events: none;
        }

        .welcome-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          margin: auto 0;
          z-index: 10;
        }

        .hero-image-circle {
          width: 240px;
          height: 240px;
          border-radius: 50%;
          padding: 10px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(168, 85, 247, 0.5);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-food-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .hero-text-block {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .hero-badge {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          padding: 6px 16px;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #E9D5FF;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hero-title {
          font-size: 2.6rem;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.5px;
          color: #FFFFFF;
        }

        .hero-subtitle {
          font-size: 0.95rem;
          color: #D8B4FE;
          max-width: 290px;
          line-height: 1.5;
        }

        .get-started-btn {
          width: 100%;
          max-width: 320px;
          padding: 18px;
          border-radius: 20px;
          background: #FFFFFF;
          color: #6B21A8;
          border: none;
          font-size: 1.1rem;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
          transition: all 0.25s ease;
        }

        .get-started-btn:hover {
          background: #F3E8FF;
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.35);
        }

        .get-started-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
