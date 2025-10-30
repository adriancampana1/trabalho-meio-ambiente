import { ArrowRight, Heart, Leaf, Truck } from 'lucide-react';
import { Button } from './ui/button';
import { ProductCard } from './ProductCard';
import { products, producers } from '../lib/data';
import { getImageUrl } from '../lib/images';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

interface HomePageProps {
  onNavigate?: (page: string, id?: string) => void;
  onAddToCart?: (productId: string) => void;
}

export function HomePage({ onNavigate, onAddToCart }: HomePageProps) {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const featuredProducers = producers.filter(p => p.featured).slice(0, 2);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={getImageUrl('hero')}
            alt="Feira de Londrina"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>
        
        <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="mb-6 text-white">Descubra os sabores da nossa terra</h1>
            <p className="text-lg sm:text-xl mb-8 text-white/90">
              Produtos frescos e orgânicos direto dos produtores familiares de Londrina para a sua mesa.
            </p>
            <Button 
              size="lg"
              className="bg-[#e87a5d] hover:bg-[#d66a4d] text-white"
              onClick={() => onNavigate?.('products')}
            >
              Explorar Produtos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2a4b3a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-[#2a4b3a]" />
              </div>
              <h3 className="mb-2">100% Orgânico</h3>
              <p className="text-[#666666]">
                Produtos cultivados sem agrotóxicos, respeitando o meio ambiente e sua saúde.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2a4b3a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#2a4b3a]" />
              </div>
              <h3 className="mb-2">Agricultura Familiar</h3>
              <p className="text-[#666666]">
                Apoie os pequenos produtores locais e fortaleça a economia da nossa região.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2a4b3a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-[#2a4b3a]" />
              </div>
              <h3 className="mb-2">Entrega Rápida</h3>
              <p className="text-[#666666]">
                Receba produtos frescos diretamente em sua casa com agilidade e segurança.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="mb-2">Novidades da Semana</h2>
              <p className="text-[#666666]">Os produtos mais frescos e selecionados para você</p>
            </div>
            <Button 
              variant="ghost"
              className="text-[#2a4b3a] hover:text-[#1f3829]"
              onClick={() => onNavigate?.('products')}
            >
              Ver Todos
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onClick={(id) => onNavigate?.('product-detail', id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Producers */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="mb-2">Produtores em Destaque</h2>
            <p className="text-[#666666]">Conheça quem cultiva o alimento que chega à sua mesa</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProducers.map((producer) => (
              <motion.div
                key={producer.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-[#f8f6f2] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="grid md:grid-cols-2">
                  <div className="aspect-square md:aspect-auto">
                    <ImageWithFallback
                      src={getImageUrl(producer.image)}
                      alt={producer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <h3 className="mb-2">{producer.name}</h3>
                    <p className="text-sm text-[#666666] mb-4">{producer.location}</p>
                    <p className="text-[#333333] mb-4">{producer.bio}</p>
                    <Button 
                      variant="outline"
                      className="self-start border-[#2a4b3a] text-[#2a4b3a] hover:bg-[#2a4b3a] hover:text-white"
                    >
                      Ver Produtos
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-[#2a4b3a] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4 text-white">Você é um produtor?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Faça parte da Feira de Londrina e leve seus produtos para milhares de clientes em potencial.
          </p>
          <Button 
            size="lg"
            className="bg-[#e87a5d] hover:bg-[#d66a4d] text-white"
            onClick={() => onNavigate?.('producer-dashboard')}
          >
            Começar Agora
          </Button>
        </div>
      </section>
    </div>
  );
}
