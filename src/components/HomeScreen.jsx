import React, { useState } from 'react';
import { Search, SlidersHorizontal, Sparkles, Tag, X } from 'lucide-react';
import FoodCard from './FoodCard';
import { CATEGORIES, FOOD_ITEMS, PROMOTION } from '../data/foodData';

export default function HomeScreen({ 
  selectedCategory, 
  onSelectCategory, 
  searchQuery, 
  onSearchChange,
  cartItems,
  onSelectItem,
  onAddToCart,
  onUpdateQuantity
}) {
  const [showPromoClaimed, setShowPromoClaimed] = useState(false);

  // Filter food items based on category and search query
  const filteredItems = FOOD_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-screen">
      {/* Search Input Bar */}
      <div className="search-section">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search burgers, pizza, desserts..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => onSearchChange('')}>
              <X size={14} />
            </button>
          )}
        </div>
        <button className="filter-btn" title="Filters">
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* Category Horizontal Filter Pills */}
      <div className="categories-scroll">
        {CATEGORIES.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              className={`category-pill ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-label">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Promotion Card matching Figma */}
      {!searchQuery && (
        <div className="promo-card">
          <div className="promo-content">
            <div className="promo-tag">
              <Tag size={12} /> {PROMOTION.title}
            </div>
            <h4 className="promo-text">{PROMOTION.description}</h4>
            <button 
              className={`promo-claim-btn ${showPromoClaimed ? 'claimed' : ''}`}
              onClick={() => setShowPromoClaimed(true)}
            >
              {showPromoClaimed ? '✓ Offer Applied' : 'Claim Offer'}
            </button>
          </div>
          <div className="promo-image-wrapper">
            <img src={PROMOTION.image} alt="Promotion" />
          </div>
        </div>
      )}

      {/* Food Grid Section */}
      <div className="popular-section">
        <div className="section-header">
          <h2 className="section-title">
            {selectedCategory === 'All' ? 'Popular Items' : `${selectedCategory} Selection`}
          </h2>
          <span className="item-count-badge">{filteredItems.length} items</span>
        </div>

        {filteredItems.length > 0 ? (
          <div className="food-grid">
            {filteredItems.map(item => {
              const cartItem = cartItems.find(ci => ci.id === item.id);
              return (
                <FoodCard 
                  key={item.id} 
                  item={item} 
                  cartItem={cartItem}
                  onSelect={onSelectItem}
                  onAddToCart={onAddToCart}
                  onUpdateQuantity={onUpdateQuantity}
                />
              );
            })}
          </div>
        ) : (
          <div className="empty-search-state">
            <p>No food items match "{searchQuery}"</p>
            <button className="btn-secondary" onClick={() => { onSearchChange(''); onSelectCategory('All'); }}>
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <style>{`
        .home-screen {
          padding: 8px 18px 90px 18px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .search-section {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .search-input-wrapper {
          flex: 1;
          background: var(--bg-input);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          padding: 0 16px;
          height: 46px;
          transition: var(--transition-fast);
        }

        .search-input-wrapper:focus-within {
          border-color: var(--primary);
          background: var(--bg-surface);
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
        }

        .search-icon {
          color: var(--text-muted);
          margin-right: 8px;
        }

        .search-input {
          border: none;
          background: transparent;
          width: 100%;
          outline: none;
          color: var(--text-heading);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .clear-search-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
        }

        .filter-btn {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: var(--primary);
          color: #FFFFFF;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 6px 14px rgba(124, 58, 237, 0.25);
          transition: var(--transition-fast);
        }

        .filter-btn:hover {
          background: var(--primary-hover);
          transform: scale(1.05);
        }

        .categories-scroll {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: none;
        }
        .categories-scroll::-webkit-scrollbar {
          display: none;
        }

        .category-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 10px 18px;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-body);
          cursor: pointer;
          white-space: nowrap;
          transition: var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }

        .category-pill:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .category-pill.active {
          background: var(--primary-gradient);
          color: #FFFFFF;
          border-color: transparent;
          box-shadow: 0 6px 16px rgba(124, 58, 237, 0.3);
        }

        .cat-icon {
          font-size: 1.1rem;
        }

        .promo-card {
          background: linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%);
          border-radius: 24px;
          padding: 18px 20px;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
          box-shadow: 0 12px 28px rgba(124, 58, 237, 0.25);
        }

        .promo-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-width: 62%;
          z-index: 2;
        }

        .promo-tag {
          font-size: 0.72rem;
          font-weight: 800;
          background: rgba(255, 255, 255, 0.2);
          padding: 3px 10px;
          border-radius: 12px;
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .promo-text {
          font-size: 0.92rem;
          font-weight: 700;
          line-height: 1.35;
          color: #F3E8FF;
        }

        .promo-claim-btn {
          background: #FFFFFF;
          color: #7C3AED;
          border: none;
          padding: 8px 16px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 800;
          cursor: pointer;
          width: fit-content;
          transition: var(--transition-fast);
        }

        .promo-claim-btn.claimed {
          background: #22C55E;
          color: #FFFFFF;
        }

        .promo-image-wrapper {
          width: 95px;
          height: 95px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .promo-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .popular-section {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .section-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-heading);
        }

        .item-count-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          background: var(--bg-input);
          padding: 4px 10px;
          border-radius: 12px;
        }

        .food-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .empty-search-state {
          text-align: center;
          padding: 40px 20px;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .btn-secondary {
          background: var(--bg-input);
          color: var(--text-heading);
          border: 1px solid var(--border-color);
          padding: 8px 18px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
