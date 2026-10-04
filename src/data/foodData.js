export const CATEGORIES = [
  { id: 'All', label: 'All', icon: ' Utensils ' },
  { id: 'Burger', label: 'Burger', icon: '🍔' },
  { id: 'Pizza', label: 'Pizza', icon: '🍕' },
  { id: 'Dessert', label: 'Dessert', icon: '🧁' }
];

export const FOOD_ITEMS = [
  {
    id: 'cb-1',
    name: 'Chicken Burger',
    category: 'Burger',
    price: 180,
    rating: 4.8,
    reviewsCount: 124,
    description: 'Big Juicy Chicken Burger with cheese, lettuce, tomato, onions and special sauce!',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '15-20 min',
    calories: '450 kcal'
  },
  {
    id: 'cp-1',
    name: 'Cheese Pizza',
    category: 'Pizza',
    price: 150,
    rating: 4.5,
    reviewsCount: 98,
    description: 'Big Cheese Pizza with cheese, oregano powder, chili powder, onions and special sauce!',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '20-25 min',
    calories: '620 kcal'
  },
  {
    id: 'hb-1',
    name: 'Ham Burger',
    category: 'Burger',
    price: 200,
    rating: 4.9,
    reviewsCount: 210,
    description: 'Big Ham Burger with cheese, lettuce, tomato, onions and special sauce!',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '15-20 min',
    calories: '520 kcal'
  },
  {
    id: 'chb-1',
    name: 'Cheese Burger',
    category: 'Burger',
    price: 170,
    rating: 4.5,
    reviewsCount: 88,
    description: 'Big Cheese Burger with cheese, lettuce, pickles and special sauce!',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80',
    popular: false,
    prepTime: '12-18 min',
    calories: '480 kcal'
  },
  {
    id: 'vb-1',
    name: 'Veg Burger',
    category: 'Burger',
    price: 150,
    rating: 4.7,
    reviewsCount: 156,
    description: 'Big Veg Burger with tomato, onions, crisp vegetable patty and special sauce!',
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=800&q=80',
    popular: false,
    prepTime: '15-20 min',
    calories: '390 kcal'
  },
  {
    id: 'np-1',
    name: 'Normal Pizza',
    category: 'Pizza',
    price: 150,
    rating: 4.5,
    reviewsCount: 64,
    description: 'Classic Margherita Pizza with tomato sauce, mozzarella cheese, oregano and chili powder!',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
    popular: false,
    prepTime: '18-22 min',
    calories: '540 kcal'
  },
  {
    id: 'ckp-1',
    name: 'Chicken Pizza',
    category: 'Pizza',
    price: 190,
    rating: 4.8,
    reviewsCount: 175,
    description: 'Big Chicken Pizza with cheese, oregano powder, chili powder, onions, grilled chicken and special sauce!',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '20-25 min',
    calories: '680 kcal'
  },
  {
    id: 'sp-1',
    name: 'Special Pizza',
    category: 'Pizza',
    price: 200,
    rating: 4.9,
    reviewsCount: 310,
    description: 'Special Supreme Pizza loaded with cheese, bell peppers, olives, mushrooms and house sauce!',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '22-28 min',
    calories: '750 kcal'
  },
  {
    id: 'ds-1',
    name: 'Desserts',
    category: 'Dessert',
    price: 100,
    rating: 4.6,
    reviewsCount: 92,
    description: 'Delicious Berry Cheesecake topped with fresh strawberry sauce and dark chocolate curl!',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '10 min',
    calories: '310 kcal'
  },
  {
    id: 'ff-1',
    name: 'Fresh Fries',
    category: 'Dessert',
    price: 80,
    rating: 4.8,
    reviewsCount: 420,
    description: 'Crispy Golden Seasoned French Fries served with garlic mayo dipping sauce!',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '8-12 min',
    calories: '280 kcal'
  },
  {
    id: 'cc-1',
    name: 'Cup Cake',
    category: 'Dessert',
    price: 70,
    rating: 4.7,
    reviewsCount: 115,
    description: 'Fluffy Vanilla & Chocolate Frosting Cup Cake topped with rainbow sprinkles!',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
    popular: false,
    prepTime: '5 min',
    calories: '220 kcal'
  },
  {
    id: 'kf-1',
    name: 'Kulfi',
    category: 'Dessert',
    price: 80,
    rating: 4.9,
    reviewsCount: 230,
    description: 'Traditional Royal Pistachio & Saffron Kulfi ice cream on stick!',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    popular: false,
    prepTime: '5 min',
    calories: '190 kcal'
  }
];

export const ADD_ONS = [
  { id: 'ao-1', name: 'Jalapeno', price: 20, icon: '🌶️' },
  { id: 'ao-2', name: 'Extra Cheese', price: 30, icon: '🧀' },
  { id: 'ao-3', name: 'Special Mayo', price: 15, icon: '🥣' },
  { id: 'ao-4', name: 'Tomatoes', price: 10, icon: '🍅' },
  { id: 'ao-5', name: 'Mushrooms', price: 25, icon: '🍄' },
  { id: 'ao-6', name: 'Crispy Onion', price: 15, icon: '🧅' }
];

export const PROMOTION = {
  title: "Today's Offer",
  description: 'Free box of Fries on all orders above ₹150',
  code: 'FREEFRIES',
  image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=400&q=80'
};
