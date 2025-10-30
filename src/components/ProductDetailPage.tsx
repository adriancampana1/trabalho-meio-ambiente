import { useState } from 'react';
import { ChevronLeft, Minus, Plus, ShoppingCart, MapPin, Package } from 'lucide-react';
import { Button } from './ui/button';
import { products, producers } from '../lib/data';
import { getImageUrl } from '../lib/images';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProductCard } from './ProductCard';
import { motion } from 'motion/react';

interface ProductDetailPageProps {
  productId: string;
  onNavigate?: (page: string, id?: string) => void;
  onAddToCart?: (productId: string, quantity: number) => void;
}

export function ProductDetailPage({ productId, onNavigate, onAddToCart }: ProductDetailPageProps) {
  const product = products.find(p => p.id === productId);
  const producer = product ? producers.find(p => p.id === product.producerId) : null;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product || !producer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Produto não encontrado</h2>
          <Button onClick={() => onNavigate?.('products')}>
            Voltar para Produtos
          </Button>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    onAddToCart?.(product.id, quantity);
    setQuantity(1);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-[#2a4b3a] hover:text-[#1f3829]"
          onClick={() => onNavigate?.('products')}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Voltar para Produtos
        </Button>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square rounded-lg overflow-hidden bg-white mb-4"
            >
              <ImageWithFallback
                src={getImageUrl(product.images[selectedImage])}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden ${
                      selectedImage === idx ? 'ring-2 ring-[#2a4b3a]' : ''
                    }`}
                  >
                    <ImageWithFallback
                      src={getImageUrl(img)}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="text-sm text-[#666666] mb-2">{product.category}</div>
              <h1 className="mb-4">{product.name}</h1>
              <div className="flex items-baseline gap-2 mb-4">
                <div className="text-[#2a4b3a]">R$ {product.price.toFixed(2)}</div>
                <div className="text-sm text-[#666666]">/ {product.unit}</div>
              </div>
              <p className="text-[#333333]">{product.description}</p>
            </div>

            {/* Stock Info */}
            <div className="flex items-center gap-2 mb-6 text-sm">
              <Package className="w-4 h-4 text-[#2a4b3a]" />
              <span className="text-[#666666]">
                {product.stock > 10 ? 'Em estoque' : `Apenas ${product.stock} unidades disponíveis`}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm mb-2">Quantidade</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#e5e3dd] rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="w-16 text-center">{quantity}</div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-[#666666]">
                  Total: R$ {(product.price * quantity).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              size="lg"
              className="w-full bg-[#e87a5d] hover:bg-[#d66a4d] text-white mb-8"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Adicionar ao Carrinho
            </Button>

            {/* Producer Info */}
            <div className="bg-[#f8f6f2] rounded-lg p-6">
              <h3 className="mb-4">Conheça o Produtor</h3>
              <div className="flex gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={getImageUrl(producer.image)}
                    alt={producer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="mb-1">{producer.name}</div>
                  <div className="flex items-center gap-1 text-sm text-[#666666]">
                    <MapPin className="w-3 h-3" />
                    {producer.location}
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#333333] mb-4">{producer.bio}</p>
              <Button variant="outline" className="border-[#2a4b3a] text-[#2a4b3a] hover:bg-[#2a4b3a] hover:text-white">
                Ver Todos os Produtos
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="mb-6">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onClick={(id) => onNavigate?.('product-detail', id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
