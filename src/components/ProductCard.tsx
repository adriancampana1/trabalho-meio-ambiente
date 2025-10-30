import { ShoppingCart } from 'lucide-react';
import { Product, producers } from '../lib/data';
import { getImageUrl } from '../lib/images';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onClick?: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart, onClick }: ProductCardProps) {
  const producer = producers.find(p => p.id === product.producerId);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
      onClick={() => onClick?.(product.id)}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-[#f8f6f2]">
          <ImageWithFallback
            src={getImageUrl(product.images[0])}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.featured && (
            <div className="absolute top-3 left-3 bg-[#e87a5d] text-white px-3 py-1 rounded-full text-xs">
              Destaque
            </div>
          )}
          {/* Add to cart button - appears on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-end p-4">
            <Button
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#e87a5d] hover:bg-[#d66a4d] text-white shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.(product.id);
              }}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2">
            <h3 className="mb-1">{product.name}</h3>
            <p className="text-xs text-[#666666]">{producer?.name}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[#2a4b3a]">
                R$ {product.price.toFixed(2)}
              </div>
              <div className="text-xs text-[#666666]">{product.unit}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
