import { useState } from 'react';
import { Plus, Edit, Power, Search, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { products } from '../lib/data';
import { getImageUrl } from '../lib/images';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProducerProductsPageProps {
  onNavigate?: (page: string) => void;
}

export function ProducerProductsPage({ onNavigate }: ProducerProductsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const producerId = '1'; // Simulating logged in producer
  const producerProducts = products.filter(p => p.producerId === producerId);

  const filteredProducts = producerProducts.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 bg-[#f8f6f2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-4 text-[#2a4b3a] hover:text-[#1f3829]"
            onClick={() => onNavigate?.('producer-dashboard')}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2">Gestão de Produtos</h1>
              <p className="text-[#666666]">Gerencie seu catálogo de produtos</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#e87a5d] hover:bg-[#d66a4d] text-white">
                  <Plus className="w-5 h-5 mr-2" />
                  Adicionar Produto
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Produto</DialogTitle>
                  <DialogDescription>
                    Preencha os dados do seu produto
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 mt-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="productName">Nome do Produto</Label>
                      <Input id="productName" placeholder="Ex: Tomate Cereja Orgânico" />
                    </div>
                    <div>
                      <Label htmlFor="category">Categoria</Label>
                      <Input id="category" placeholder="Ex: Hortaliças" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Descreva seu produto..."
                      rows={4}
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="price">Preço (R$)</Label>
                      <Input id="price" type="number" step="0.01" placeholder="0.00" />
                    </div>
                    <div>
                      <Label htmlFor="unit">Unidade</Label>
                      <Input id="unit" placeholder="Ex: kg, bandeja 250g" />
                    </div>
                    <div>
                      <Label htmlFor="stock">Estoque</Label>
                      <Input id="stock" type="number" placeholder="0" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="images">Imagens do Produto</Label>
                    <Input id="images" type="file" multiple accept="image/*" />
                    <p className="text-xs text-[#666666] mt-1">
                      Adicione até 4 imagens do seu produto
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit"
                      className="flex-1 bg-[#e87a5d] hover:bg-[#d66a4d] text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsDialogOpen(false);
                      }}
                    >
                      Adicionar Produto
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#666666]" />
            <Input
              placeholder="Buscar produtos..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#f8f6f2] flex-shrink-0">
                        <ImageWithFallback
                          src={getImageUrl(product.images[0])}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="mb-1">{product.name}</div>
                        <div className="text-xs text-[#666666]">{product.unit}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-[#2a4b3a]">
                    R$ {product.price.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <span className={product.stock < 10 ? 'text-orange-600' : 'text-[#666666]'}>
                      {product.stock} un.
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${
                      product.stock > 0 
                        ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                        : 'bg-red-100 text-red-800 hover:bg-red-100'
                    }`}>
                      {product.stock > 0 ? 'Ativo' : 'Esgotado'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4 text-[#2a4b3a]" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Power className="w-4 h-4 text-[#666666]" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#666666]">Nenhum produto encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
