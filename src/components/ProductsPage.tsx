import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from './ui/button';
import { ProductCard } from './ProductCard';
import { products, categories, producers } from '../lib/data';

interface ProductsPageProps {
  onNavigate?: (page: string, id?: string) => void;
  onAddToCart?: (productId: string) => void;
}

export function ProductsPage({ onNavigate, onAddToCart }: ProductsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedProducer, setSelectedProducer] = useState('Todos');

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'Todas' || product.category === selectedCategory;
    const producerMatch = selectedProducer === 'Todos' || product.producerId === selectedProducer;
    return categoryMatch && producerMatch;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Nossos Produtos</h1>
          <p className="text-[#666666]">Descubra o melhor da agricultura familiar de Londrina</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-[#2a4b3a]" />
                <h3>Filtros</h3>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="mb-3">Categorias</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category
                          ? 'bg-[#2a4b3a] text-white'
                          : 'text-[#666666] hover:bg-[#f8f6f2]'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Producer Filter */}
              <div>
                <h4 className="mb-3">Produtores</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedProducer('Todos')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedProducer === 'Todos'
                        ? 'bg-[#2a4b3a] text-white'
                        : 'text-[#666666] hover:bg-[#f8f6f2]'
                    }`}
                  >
                    Todos
                  </button>
                  {producers.map(producer => (
                    <button
                      key={producer.id}
                      onClick={() => setSelectedProducer(producer.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedProducer === producer.id
                          ? 'bg-[#2a4b3a] text-white'
                          : 'text-[#666666] hover:bg-[#f8f6f2]'
                      }`}
                    >
                      {producer.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-[#666666]">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </p>
              <Button variant="outline" size="sm" className="lg:hidden">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onClick={(id) => onNavigate?.('product-detail', id)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[#666666]">Nenhum produto encontrado com os filtros selecionados.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory('Todas');
                    setSelectedProducer('Todos');
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
