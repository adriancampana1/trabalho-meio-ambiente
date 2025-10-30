import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage, CartItem } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { ProducerDashboard } from './components/ProducerDashboard';
import { ProducerProductsPage } from './components/ProducerProductsPage';
import { ProducerOrdersPage } from './components/ProducerOrdersPage';
import { Toaster, toast } from 'sonner@2.0.3';

type Page = 
  | 'home' 
  | 'products' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout'
  | 'producer-dashboard'
  | 'producer-products'
  | 'producer-orders';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page as Page);
    if (id) setSelectedProductId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (productId: string, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === productId);
      
      if (existingItem) {
        toast.success('Quantidade atualizada no carrinho');
        return prevCart.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success('Produto adicionado ao carrinho');
        return [...prevCart, { productId, quantity }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    toast.success('Produto removido do carrinho');
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f8f6f2]">
      <Header
        cartItemCount={totalItems}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      {currentPage === 'home' && (
        <HomePage
          onNavigate={handleNavigate}
          onAddToCart={handleAddToCart}
        />
      )}

      {currentPage === 'products' && (
        <ProductsPage
          onNavigate={handleNavigate}
          onAddToCart={handleAddToCart}
        />
      )}

      {currentPage === 'product-detail' && (
        <ProductDetailPage
          productId={selectedProductId}
          onNavigate={handleNavigate}
          onAddToCart={handleAddToCart}
        />
      )}

      {currentPage === 'cart' && (
        <CartPage
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'checkout' && (
        <CheckoutPage
          cart={cart}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'producer-dashboard' && (
        <ProducerDashboard onNavigate={handleNavigate} />
      )}

      {currentPage === 'producer-products' && (
        <ProducerProductsPage onNavigate={handleNavigate} />
      )}

      {currentPage === 'producer-orders' && (
        <ProducerOrdersPage onNavigate={handleNavigate} />
      )}

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
