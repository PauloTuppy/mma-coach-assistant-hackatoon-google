import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { StorePage } from './pages/StorePage';
import { CartModal } from './components/CartModal';
import type { Product, CartItem } from './types';
import { products as initialProducts } from './constants';

type Page = 'coach' | 'store';

const App: React.FC = () => {
    const [products] = useState<Product[]>(initialProducts);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [currentPage, setCurrentPage] = useState<Page>('coach');
    const [fighterName, setFighterName] = useState<string>('The Natural');
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = useCallback((product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        alert(`Added ${product.name} to cart!`);
    }, []);

    const removeFromCart = (productId: number) => {
        setCart(cart => cart.filter(item => item.id !== productId));
    };

    const updateCartQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            setCart(cart =>
                cart.map(item =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const handleNavigate = (page: Page) => {
        setCurrentPage(page);
    };

    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
            <Header 
                page={currentPage}
                onNavigate={handleNavigate}
                cartItemCount={cartItemCount}
                storeName={fighterName}
                onCartClick={() => setIsCartOpen(true)}
            />
            {currentPage === 'coach' && 
                <HomePage 
                    onNavigateToStore={() => handleNavigate('store')}
                    fighterName={fighterName}
                    setFighterName={setFighterName}
                />
            }
            {currentPage === 'store' && 
                <StorePage 
                    products={products} 
                    cart={cart} 
                    onAddToCart={addToCart}
                    storeName={fighterName}
                />
            }
            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cart}
                onRemove={removeFromCart}
                onUpdateQuantity={updateCartQuantity}
            />
        </div>
    );
};

export default App;