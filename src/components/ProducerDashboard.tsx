import { useState } from 'react';
import { TrendingUp, Package, DollarSign, ShoppingBag, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { orders, products } from '../lib/data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProducerDashboardProps {
  onNavigate?: (page: string) => void;
}

export function ProducerDashboard({ onNavigate }: ProducerDashboardProps) {
  const producerId = '1'; // Simulating logged in producer

  // Calculate KPIs
  const producerOrders = orders.filter(o => o.producerId === producerId);
  const monthlyRevenue = producerOrders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = producerOrders.filter(o => o.status === 'pending').length;
  const producerProducts = products.filter(p => p.producerId === producerId);
  const topProduct = producerProducts.reduce((top, p) => 
    p.featured ? p : top, producerProducts[0]
  );

  // Mock sales data for chart
  const salesData = [
    { day: '18/10', value: 120 },
    { day: '19/10', value: 180 },
    { day: '20/10', value: 150 },
    { day: '21/10', value: 220 },
    { day: '22/10', value: 280 },
    { day: '23/10', value: 240 },
    { day: '24/10', value: 310 },
  ];

  return (
    <div className="min-h-screen py-8 bg-[#f8f6f2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2">Painel do Produtor</h1>
            <p className="text-[#666666]">Bem-vindo de volta, Sítio Raízes da Terra</p>
          </div>
          <Button 
            className="bg-[#e87a5d] hover:bg-[#d66a4d] text-white"
            onClick={() => onNavigate?.('producer-products')}
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Produto
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-[#e5e3dd]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Faturamento Mensal</CardTitle>
              <DollarSign className="w-4 h-4 text-[#2a4b3a]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-[#2a4b3a] mb-1">
                R$ {monthlyRevenue.toFixed(2)}
              </div>
              <p className="text-xs text-[#666666]">
                <span className="text-green-600">+12.5%</span> vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#e5e3dd]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Pedidos Pendentes</CardTitle>
              <ShoppingBag className="w-4 h-4 text-[#2a4b3a]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-[#2a4b3a] mb-1">{pendingOrders}</div>
              <p className="text-xs text-[#666666]">Aguardando processamento</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#e5e3dd]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Produtos Ativos</CardTitle>
              <Package className="w-4 h-4 text-[#2a4b3a]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-[#2a4b3a] mb-1">{producerProducts.length}</div>
              <p className="text-xs text-[#666666]">No catálogo</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#e5e3dd]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Mais Vendido</CardTitle>
              <TrendingUp className="w-4 h-4 text-[#2a4b3a]" />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-[#2a4b3a] mb-1">{topProduct?.name}</div>
              <p className="text-xs text-[#666666]">R$ {topProduct?.price.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sales Chart */}
          <Card className="lg:col-span-2 bg-white border-[#e5e3dd]">
            <CardHeader>
              <CardTitle>Vendas dos Últimos 7 Dias</CardTitle>
              <CardDescription>Evolução do faturamento diário</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e3dd" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#666666"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#666666"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e5e3dd',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2a4b3a" 
                    strokeWidth={2}
                    dot={{ fill: '#2a4b3a', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white border-[#e5e3dd]">
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
              <CardDescription>Últimos pedidos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {producerOrders.slice(0, 5).map(order => (
                  <div key={order.id} className="flex items-start gap-3 pb-4 border-b border-[#e5e3dd] last:border-0">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      order.status === 'pending' ? 'bg-yellow-500' :
                      order.status === 'preparing' ? 'bg-blue-500' :
                      order.status === 'shipped' ? 'bg-purple-500' :
                      'bg-green-500'
                    }`} />
                    <div className="flex-1">
                      <div className="text-sm mb-1">
                        {order.customerName}
                      </div>
                      <div className="text-xs text-[#666666]">
                        {order.id} • R$ {order.total.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-xs text-[#666666]">
                      {new Date(order.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline"
                className="w-full mt-4"
                onClick={() => onNavigate?.('producer-orders')}
              >
                Ver Todos os Pedidos
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Card 
            className="bg-white border-[#e5e3dd] cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNavigate?.('producer-products')}
          >
            <CardHeader>
              <CardTitle>Gerenciar Produtos</CardTitle>
              <CardDescription>Adicionar, editar ou remover produtos</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="bg-white border-[#e5e3dd] cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNavigate?.('producer-orders')}
          >
            <CardHeader>
              <CardTitle>Pedidos</CardTitle>
              <CardDescription>Visualizar e processar pedidos</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white border-[#e5e3dd] cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
              <CardDescription>Perfil e preferências</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
