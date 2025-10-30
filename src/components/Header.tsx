import { ShoppingCart, User, Menu, Store } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface HeaderProps {
  cartItemCount?: number;
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export function Header({ cartItemCount = 0, onNavigate, currentPage = 'home' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e5e3dd]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button 
            onClick={() => onNavigate?.('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-[#2a4b3a] rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-semibold text-[#2a4b3a]">Feira de Londrina</div>
              <div className="text-xs text-[#666666]">Sabores da nossa terra</div>
            </div>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => onNavigate?.('home')}
              className={`transition-colors ${
                currentPage === 'home' ? 'text-[#2a4b3a]' : 'text-[#666666] hover:text-[#2a4b3a]'
              }`}
            >
              Início
            </button>
            <button 
              onClick={() => onNavigate?.('products')}
              className={`transition-colors ${
                currentPage === 'products' ? 'text-[#2a4b3a]' : 'text-[#666666] hover:text-[#2a4b3a]'
              }`}
            >
              Produtos
            </button>
            <button 
              onClick={() => onNavigate?.('producer-dashboard')}
              className={`transition-colors ${
                currentPage.startsWith('producer-') ? 'text-[#2a4b3a]' : 'text-[#666666] hover:text-[#2a4b3a]'
              }`}
            >
              Painel do Produtor
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="relative hover:bg-[#2a4b3a]/10"
              onClick={() => onNavigate?.('cart')}
            >
              <ShoppingCart className="w-5 h-5 text-[#2a4b3a]" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#e87a5d] text-white border-0">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-[#2a4b3a]/10"
            >
              <User className="w-5 h-5 text-[#2a4b3a]" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden hover:bg-[#2a4b3a]/10"
            >
              <Menu className="w-5 h-5 text-[#2a4b3a]" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
