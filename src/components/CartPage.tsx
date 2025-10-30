import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { products } from '../lib/data';
import { getImageUrl } from '../lib/images';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onRemoveItem?: (productId: string) => void;
  onNavigate?: (page: string) => void;
}

export function CartPage({ cart, onUpdateQuantity, onRemoveItem, onNavigate }: CartPageProps) {
  const cartWithProducts = cart.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)!,
  })).filter(item => item.product);

  const subtotal = cartWithProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-[#f8f6f2] rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-[#2a4b3a]" />
            </div>
            <h2 className="mb-4">Seu carrinho está vazio</h2>
            <p className="text-[#666666] mb-8">
              Adicione produtos frescos da nossa feira ao seu carrinho para começar.
            </p>
            <Button
              size="lg"
              className="bg-[#e87a5d] hover:bg-[#d66a4d] text-white"
              onClick={() => onNavigate?.('products')}
            >
              Explorar Produtos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8">Meu Carrinho</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg divide-y divide-[#e5e3dd]">
              {cartWithProducts.map(item => (
                <div key={item.productId} className="p-6 flex gap-6">
                  {/* Product Image */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-[#f8f6f2]">
                    <ImageWithFallback
                      src={getImageUrl(item.product.images[0])}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="mb-1">{item.product.name}</h4>
                        <p className="text-sm text-[#666666]">{item.product.unit}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#666666] hover:text-red-600"
                        onClick={() => onRemoveItem?.(item.productId)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#e5e3dd] rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity?.(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <div className="w-12 text-center text-sm">{item.quantity}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity?.(item.productId, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-[#2a4b3a]">
                        R$ {(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h3 className="mb-6">Resumo do Pedido</h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-[#666666]">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-[#666666]">
                  <span>Entrega</span>
                  <span>{shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}</span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-[#2a4b3a]">
                    Frete grátis para pedidos acima de R$ 50,00
                  </p>
                )}
              </div>

              <div className="pt-6 border-t border-[#e5e3dd] mb-6">
                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span className="text-[#2a4b3a]">R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-[#e87a5d] hover:bg-[#d66a4d] text-white mb-4"
                onClick={() => onNavigate?.('checkout')}
              >
                Finalizar Compra
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => onNavigate?.('products')}
              >
                Continuar Comprando
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
