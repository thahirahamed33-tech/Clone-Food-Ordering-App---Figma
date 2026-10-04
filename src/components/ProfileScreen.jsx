import React from 'react';
import { User, MapPin, CreditCard, Heart, History, Settings, Moon, Sun, ChevronRight, LogOut } from 'lucide-react';

export default function ProfileScreen({ theme, toggleTheme, userAddress, onAddressClick }) {
  const pastOrders = [
    { id: '#ORD-9821', date: 'Yesterday, 8:30 PM', items: 'Chicken Burger, Fresh Fries', total: 260, status: 'Delivered' },
    { id: '#ORD-8742', date: '2 Oct, 1:15 PM', items: 'Cheese Pizza, Cup Cake', total: 220, status: 'Delivered' }
  ];

  return (
    <div className="profile-screen animate-fade-in">
      <h2 className="screen-title">My Profile</h2>

      {/* User Header */}
      <div className="profile-card">
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
          alt="Avatar" 
          className="profile-img"
        />
        <div className="profile-details">
          <h3 className="user-name">Sarah Jenkins</h3>
          <span className="user-email">sarah.j@example.com</span>
          <span className="gold-member-badge">⭐ Gold Member</span>
        </div>
      </div>

      {/* Settings Options List */}
      <div className="settings-group">
        <h4 className="group-title">Preferences & Settings</h4>

        <div className="setting-item" onClick={onAddressClick}>
          <div className="setting-left">
            <div className="icon-wrapper"><MapPin size={18} /></div>
            <div>
              <div className="setting-name">Saved Address</div>
              <div className="setting-sub">{userAddress}</div>
            </div>
          </div>
          <ChevronRight size={18} className="chevron" />
        </div>

        <div className="setting-item" onClick={toggleTheme}>
          <div className="setting-left">
            <div className="icon-wrapper">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </div>
            <div>
              <div className="setting-name">Appearance</div>
              <div className="setting-sub">{theme === 'dark' ? 'Dark Theme' : 'Light Theme'}</div>
            </div>
          </div>
          <ChevronRight size={18} className="chevron" />
        </div>

        <div className="setting-item">
          <div className="setting-left">
            <div className="icon-wrapper"><CreditCard size={18} /></div>
            <div>
              <div className="setting-name">Payment Methods</div>
              <div className="setting-sub">VISA **** 0157, GPay</div>
            </div>
          </div>
          <ChevronRight size={18} className="chevron" />
        </div>
      </div>

      {/* Order History */}
      <div className="settings-group">
        <h4 className="group-title">Recent Orders</h4>

        {pastOrders.map((order, idx) => (
          <div key={idx} className="order-history-card">
            <div className="order-history-top">
              <span className="order-id">{order.id}</span>
              <span className="order-status-badge">{order.status}</span>
            </div>
            <div className="order-items-text">{order.items}</div>
            <div className="order-history-bottom">
              <span className="order-date">{order.date}</span>
              <span className="order-total">₹{order.total}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .profile-screen {
          padding: 16px 18px 90px 18px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .screen-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-heading);
        }

        .profile-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: var(--shadow-sm);
        }

        .profile-img {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--primary);
        }

        .profile-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .user-name {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-heading);
        }

        .user-email {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .gold-member-badge {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--primary);
          background: var(--primary-light);
          padding: 2px 8px;
          border-radius: 10px;
          width: fit-content;
          margin-top: 4px;
        }

        .settings-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .group-title {
          font-size: 0.92rem;
          font-weight: 800;
          color: var(--text-heading);
        }

        .setting-item {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .setting-item:hover {
          border-color: var(--primary);
        }

        .setting-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icon-wrapper {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: var(--primary-light);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .setting-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-heading);
        }

        .setting-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .chevron {
          color: var(--text-muted);
        }

        .order-history-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .order-history-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .order-id {
          font-size: 0.85rem;
          font-weight: 800;
          color: var(--text-heading);
        }

        .order-status-badge {
          background: #DCFCE7;
          color: #15803D;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 8px;
        }

        .order-items-text {
          font-size: 0.8rem;
          color: var(--text-body);
        }

        .order-history-bottom {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .order-total {
          font-weight: 800;
          color: var(--primary);
          font-size: 0.88rem;
        }
      `}</style>
    </div>
  );
}
