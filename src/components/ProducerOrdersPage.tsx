import { useState } from 'react';
import { ChevronLeft, Eye, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { orders, products } from '../lib/data';

interface ProducerOrdersPageProps {
  onNavigate?: (page: string) => void;
}

export function ProducerOrdersPage({ onNavigate }: ProducerOrdersPageProps) {
  const [statusFilter, setStatusFilter] = useState('all');
  
  const producerId = '1'; // Simulating logged in producer
  const producerOrders = orders.filter(o => o.producerId === producerId);

  const filteredOrders = statusFilter === 'all' 
    ? producerOrders 
    : producerOrders.filter(o => o.status === statusFilter);

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Pendente',
      preparing: 'Em Preparo',
      shipped: 'Enviado',
      delivered: 'Entregue',
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      preparing: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      shipped: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
      delivered: 'bg-green-100 text-green-800 hover:bg-green-100',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

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
              <h1 className="mb-2">Gestão de Pedidos</h1>
              <p className="text-[#666666]">Acompanhe e processe seus pedidos</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm">Status:</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="preparing">Em Preparo</SelectItem>
                <SelectItem value="shipped">Enviado</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#2a4b3a]" />
                      <span>{order.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-[#2a4b3a]">
                    R$ {order.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusLabel(order.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4 text-[#2a4b3a]" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Detalhes do Pedido {order.id}</DialogTitle>
                          <DialogDescription>
                            Cliente: {order.customerName}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          {/* Order Items */}
                          <div>
                            <h4 className="mb-3">Itens do Pedido</h4>
                            <div className="border border-[#e5e3dd] rounded-lg divide-y divide-[#e5e3dd]">
                              {order.items.map((item, idx) => {
                                const product = products.find(p => p.id === item.productId);
                                return (
                                  <div key={idx} className="p-4 flex items-center justify-between">
                                    <div>
                                      <div className="mb-1">{product?.name}</div>
                                      <div className="text-sm text-[#666666]">
                                        Qtd: {item.quantity} × R$ {item.price.toFixed(2)}
                                      </div>
                                    </div>
                                    <div className="text-[#2a4b3a]">
                                      R$ {(item.quantity * item.price).toFixed(2)}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Order Summary */}
                          <div className="bg-[#f8f6f2] rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[#666666]">Total do Pedido</span>
                              <span className="text-[#2a4b3a]">R$ {order.total.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[#666666]">Status</span>
                              <Badge className={getStatusColor(order.status)}>
                                {getStatusLabel(order.status)}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[#666666]">Data</span>
                              <span>{new Date(order.date).toLocaleDateString('pt-BR')}</span>
                            </div>
                          </div>

                          {/* Status Update */}
                          {order.status !== 'delivered' && (
                            <div>
                              <label className="block text-sm mb-2">Atualizar Status</label>
                              <Select defaultValue={order.status}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pendente</SelectItem>
                                  <SelectItem value="preparing">Em Preparo</SelectItem>
                                  <SelectItem value="shipped">Enviado</SelectItem>
                                  <SelectItem value="delivered">Entregue</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          <Button 
                            className="w-full bg-[#e87a5d] hover:bg-[#d66a4d] text-white"
                          >
                            Salvar Alterações
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#666666]">Nenhum pedido encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
