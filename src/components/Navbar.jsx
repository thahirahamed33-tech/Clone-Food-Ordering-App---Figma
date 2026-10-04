import React from 'react';
import { Home, Search, ShoppingBag, User } from 'lucide-react';

export default function Navbar({ activeTab, onTabChange, cartCount }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'cart', label: 'Cart', icon: ShoppingBag, badge: cartCount },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon size={22} />
            <span>{tab.label}</span>
            {tab.badge > 0 && <span className="nav-badge">{tab.badge}</span>}
          </button>
        );
      })}
    </nav>
  );
}
