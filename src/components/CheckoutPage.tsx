import { useState } from 'react';
import { CreditCard, MapPin, User, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { products } from '../lib/data';
import { CartItem } from './CartPage';

interface CheckoutPageProps {
  cart: CartItem[];
  onNavigate?: (page: string) => void;
}

export function CheckoutPage({ cart, onNavigate }: CheckoutPageProps) {
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

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

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      onNavigate?.('home');
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-[#2a4b3a] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-white" />
            </div>
            <h2 className="mb-4">Pedido Realizado com Sucesso!</h2>
            <p className="text-[#666666] mb-8">
              Seu pedido foi confirmado e em breve você receberá os produtos frescos em sua casa.
            </p>
            <p className="text-sm text-[#666666]">
              Redirecionando para a página inicial...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8">Finalizar Compra</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[
              { num: 1, label: 'Entrega', icon: MapPin },
              { num: 2, label: 'Pagamento', icon: CreditCard },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      step >= s.num
                        ? 'bg-[#2a4b3a] text-white'
                        : 'bg-[#f8f6f2] text-[#666666]'
                    }`}
                  >
                    <s.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs mt-2">{s.label}</span>
                </div>
                {idx < 1 && (
                  <div
                    className={`w-24 h-0.5 mx-4 transition-colors ${
                      step > s.num ? 'bg-[#2a4b3a]' : 'bg-[#e5e3dd]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="mb-6">Informações de Entrega</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="Seu nome" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" placeholder="(00) 00000-0000" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input id="address" placeholder="Rua, número" />
                    </div>
                    <div>
                      <Label htmlFor="cep">CEP</Label>
                      <Input id="cep" placeholder="00000-000" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input id="city" placeholder="Londrina" />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado</Label>
                      <Input id="state" placeholder="PR" />
                    </div>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full mt-6 bg-[#e87a5d] hover:bg-[#d66a4d] text-white"
                  onClick={() => setStep(2)}
                >
                  Continuar para Pagamento
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="mb-6">Informações de Pagamento</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardName">Nome no Cartão</Label>
                    <Input id="cardName" placeholder="Nome como está no cartão" />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Número do Cartão</Label>
                    <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Validade</Label>
                      <Input id="expiry" placeholder="MM/AA" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="000" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Voltar
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 bg-[#e87a5d] hover:bg-[#d66a4d] text-white"
                    onClick={handlePlaceOrder}
                  >
                    Confirmar Pedido
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h3 className="mb-6">Resumo do Pedido</h3>

              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {cartWithProducts.map(item => (
                  <div key={item.productId} className="flex items-center justify-between text-sm">
                    <div className="flex-1">
                      <div className="text-[#333333]">{item.product.name}</div>
                      <div className="text-[#666666]">Qtd: {item.quantity}</div>
                    </div>
                    <div className="text-[#2a4b3a]">
                      R$ {(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-[#e5e3dd]">
                <div className="flex items-center justify-between text-[#666666]">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-[#666666]">
                  <span>Entrega</span>
                  <span>{shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-[#e5e3dd] mt-6">
                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span className="text-[#2a4b3a]">R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
