import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import ProductDetailModal from './components/ProductDetailModal';
import CartScreen from './components/CartScreen';
import OrderSuccessModal from './components/OrderSuccessModal';
import OrderTrackingScreen from './components/OrderTrackingScreen';
import ProfileScreen from './components/ProfileScreen';
import Navbar from './components/Navbar';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState('welcome'); // 'welcome', 'home', 'cart', 'tracking', 'profile'
  const [theme, setTheme] = useState('light');
  const [deviceMode, setDeviceMode] = useState('mobile'); // 'mobile' (Figma frame), 'responsive'
  const [userAddress, setUserAddress] = useState('123 Tech Park, Anna Nagar, Chennai');
  
  // Menu & Filter States
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal States
  const [selectedItem, setSelectedItem] = useState(null);
  const [successOrderAmount, setSuccessOrderAmount] = useState(null);

  // Cart State (Initial sample cart item matching Figma)
  const [cartItems, setCartItems] = useState([
    {
      id: 'cb-1',
      name: 'Chicken Burger',
      category: 'Burger',
      price: 180,
      unitPrice: 180,
      portion: 'Medium',
      rating: 4.8,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      selectedAddOns: [
        { id: 'ao-2', name: 'Extra Cheese', price: 30, quantity: 1 }
      ]
    }
  ]);

  // Sync theme attribute to body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Add to cart handler
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id && item.portion === (product.portion || 'Medium'));
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += (product.quantity || 1);
        return updated;
      }
      return [...prev, product];
    });
  };

  // Update item quantity in cart
  const handleUpdateCartQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQty } : item));
  };

  // Remove item from cart
  const handleRemoveCartItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  // Checkout Success handler
  const handleCheckoutSuccess = (amount) => {
    setSuccessOrderAmount(amount);
    setCartItems([]);
  };

  const handleAddressChange = () => {
    const newAddress = prompt('Enter your delivery address:', userAddress);
    if (newAddress) setUserAddress(newAddress);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-viewport-wrapper">
      {/* Top Prototype Controls for User */}
      <div className="top-control-bar">
        <div className="logo-tag">
          <span>🍕 Foodies</span>
          <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>• Figma Prototype Clone</span>
        </div>

        <div className="controls-group">
          <button 
            className="toggle-btn"
            onClick={() => setDeviceMode(prev => prev === 'mobile' ? 'responsive' : 'mobile')}
            title="Toggle Device Frame Mode"
          >
            {deviceMode === 'mobile' ? <Monitor size={14} /> : <Smartphone size={14} />}
            <span>{deviceMode === 'mobile' ? 'Responsive View' : 'Figma Phone View'}</span>
          </button>
        </div>
      </div>

      {/* Main Mobile Prototype Frame */}
      <div className={`mobile-device-container ${deviceMode === 'responsive' ? 'mode-responsive' : ''} ${screen === 'welcome' ? 'on-welcome' : ''}`}>
        
        {/* Device Status Bar */}
        <div className="device-status-bar">
          <span>9:41</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Screen Content Wrapper */}
        <div className="app-screen-content">
          {screen === 'welcome' && (
            <WelcomeScreen onGetStarted={() => setScreen('home')} />
          )}

          {screen === 'home' && (
            <>
              <Header 
                userAddress={userAddress}
                onAddressClick={handleAddressChange}
                theme={theme}
                toggleTheme={toggleTheme}
                onProfileClick={() => setScreen('profile')}
              />
              <HomeScreen 
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                cartItems={cartItems}
                onSelectItem={(item) => setSelectedItem(item)}
                onAddToCart={handleAddToCart}
                onUpdateQuantity={handleUpdateCartQuantity}
              />
            </>
          )}

          {screen === 'search' && (
            <>
              <Header 
                userAddress={userAddress}
                onAddressClick={handleAddressChange}
                theme={theme}
                toggleTheme={toggleTheme}
                onProfileClick={() => setScreen('profile')}
              />
              <HomeScreen 
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                cartItems={cartItems}
                onSelectItem={(item) => setSelectedItem(item)}
                onAddToCart={handleAddToCart}
                onUpdateQuantity={handleUpdateCartQuantity}
              />
            </>
          )}

          {screen === 'cart' && (
            <CartScreen 
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateCartQuantity}
              onRemoveItem={handleRemoveCartItem}
              onBack={() => setScreen('home')}
              onCheckoutSuccess={handleCheckoutSuccess}
            />
          )}

          {screen === 'tracking' && (
            <OrderTrackingScreen onBackHome={() => setScreen('home')} />
          )}

          {screen === 'profile' && (
            <ProfileScreen 
              theme={theme}
              toggleTheme={toggleTheme}
              userAddress={userAddress}
              onAddressClick={handleAddressChange}
            />
          )}
        </div>

        {/* Product Detail Modal Sheet */}
        {selectedItem && (
          <ProductDetailModal 
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* Order Success Modal Sheet */}
        {successOrderAmount && (
          <OrderSuccessModal 
            totalAmount={successOrderAmount}
            onTrackOrder={() => {
              setSuccessOrderAmount(null);
              setScreen('tracking');
            }}
            onGoHome={() => {
              setSuccessOrderAmount(null);
              setScreen('home');
            }}
          />
        )}

        {/* Bottom Navigation Bar (Hidden on Welcome Screen) */}
        {screen !== 'welcome' && (
          <Navbar 
            activeTab={screen}
            onTabChange={(tabId) => setScreen(tabId)}
            cartCount={totalCartCount}
          />
        )}

      </div>
    </div>
  );
}
