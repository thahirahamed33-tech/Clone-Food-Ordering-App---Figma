import React from 'react';
import { MapPin, Moon, Sun } from 'lucide-react';

export default function Header({ userAddress, onAddressClick, theme, toggleTheme, onProfileClick }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <h1 className="menu-title">Menu</h1>
        <button className="location-pill" onClick={onAddressClick}>
          <MapPin size={14} className="location-icon" />
          <span className="location-text">{userAddress}</span>
        </button>
      </div>

      <div className="header-right">
        <button className="icon-btn theme-toggle-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="profile-avatar" onClick={onProfileClick} title="View Profile">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
            alt="User Profile" 
          />
          <span className="online-indicator"></span>
        </div>
      </div>

      <style>{`
        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px 8px 20px;
          background: var(--bg-main);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .header-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .menu-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-heading);
          letter-spacing: -0.5px;
        }

        .location-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          color: var(--primary);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
        }

        .location-icon {
          color: var(--primary);
        }

        .location-text {
          max-width: 140px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          color: var(--text-heading);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }

        .icon-btn:hover {
          background: var(--primary-light);
          color: var(--primary);
          border-color: var(--primary);
        }

        .profile-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          position: relative;
          cursor: pointer;
          border: 2px solid var(--primary);
          padding: 2px;
          background: var(--bg-surface);
        }

        .profile-avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .online-indicator {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 10px;
          height: 10px;
          background: #22C55E;
          border: 2px solid var(--bg-surface);
          border-radius: 50%;
        }
      `}</style>
    </header>
  );
}
