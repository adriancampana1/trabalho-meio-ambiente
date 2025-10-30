// Mock data for Feira de Londrina

export interface Producer {
  id: string;
  name: string;
  bio: string;
  location: string;
  image: string;
  featured: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  producerId: string;
  stock: number;
  unit: string;
  featured: boolean;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  producerId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'shipped' | 'delivered';
  customerName: string;
  date: string;
}

export const producers: Producer[] = [
  {
    id: '1',
    name: 'Sítio Raízes da Terra',
    bio: 'Produção orgânica familiar há três gerações. Cultivamos com amor e respeito à natureza, oferecendo vegetais frescos e saudáveis.',
    location: 'Distrito de Maravilha, Londrina',
    image: 'farmer-1',
    featured: true,
  },
  {
    id: '2',
    name: 'Fazenda Boa Vista',
    bio: 'Especializada em frutas da estação e mel artesanal. Nossa missão é levar o sabor autêntico do campo para sua mesa.',
    location: 'Zona Rural, Londrina',
    image: 'farmer-2',
    featured: true,
  },
  {
    id: '3',
    name: 'Horta do Vale',
    bio: 'Cultivo sustentável de hortaliças e ervas aromáticas. Cada produto é colhido no ponto perfeito de maturação.',
    location: 'Distrito de Espírito Santo, Londrina',
    image: 'farmer-3',
    featured: false,
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Tomate Cereja Orgânico',
    description: 'Tomates cereja cultivados sem agrotóxicos, com sabor intenso e doçura natural. Perfeitos para saladas e aperitivos.',
    price: 12.90,
    images: ['tomato', 'vegetables'],
    category: 'Hortaliças',
    producerId: '1',
    stock: 45,
    unit: 'bandeja 250g',
    featured: true,
  },
  {
    id: '2',
    name: 'Alface Crespa',
    description: 'Alface fresca colhida pela manhã. Folhas verdes e crocantes, ideais para saladas nutritivas.',
    price: 4.50,
    images: ['vegetables', 'salad'],
    category: 'Hortaliças',
    producerId: '1',
    stock: 60,
    unit: 'unidade',
    featured: true,
  },
  {
    id: '3',
    name: 'Mel Silvestre',
    description: 'Mel puro e artesanal, produzido por abelhas em ambiente de mata preservada. Rico em nutrientes e sabor incomparável.',
    price: 28.00,
    images: ['honey', 'market'],
    category: 'Produtos Artesanais',
    producerId: '2',
    stock: 20,
    unit: 'pote 500g',
    featured: true,
  },
  {
    id: '4',
    name: 'Morango Orgânico',
    description: 'Morangos frescos e suculentos, cultivados organicamente. Doçura natural e aroma irresistível.',
    price: 15.90,
    images: ['strawberries', 'berries'],
    category: 'Frutas',
    producerId: '2',
    stock: 30,
    unit: 'bandeja 500g',
    featured: true,
  },
  {
    id: '5',
    name: 'Manjericão Fresco',
    description: 'Manjericão cultivado com técnicas orgânicas. Aroma intenso, perfeito para temperar seus pratos.',
    price: 3.50,
    images: ['herbs', 'vegetables'],
    category: 'Ervas e Temperos',
    producerId: '3',
    stock: 40,
    unit: 'maço',
    featured: false,
  },
  {
    id: '6',
    name: 'Cenoura Orgânica',
    description: 'Cenouras frescas e crocantes, cultivadas sem agrotóxicos. Ricas em vitamina A e sabor.',
    price: 6.90,
    images: ['vegetables', 'market'],
    category: 'Hortaliças',
    producerId: '1',
    stock: 50,
    unit: 'kg',
    featured: false,
  },
];

export const orders: Order[] = [
  {
    id: 'ORD-001',
    producerId: '1',
    items: [
      { productId: '1', quantity: 2, price: 12.90 },
      { productId: '2', quantity: 3, price: 4.50 },
    ],
    total: 39.30,
    status: 'pending',
    customerName: 'Maria Silva',
    date: '2025-10-24',
  },
  {
    id: 'ORD-002',
    producerId: '1',
    items: [
      { productId: '6', quantity: 2, price: 6.90 },
    ],
    total: 13.80,
    status: 'preparing',
    customerName: 'João Santos',
    date: '2025-10-23',
  },
  {
    id: 'ORD-003',
    producerId: '1',
    items: [
      { productId: '1', quantity: 1, price: 12.90 },
      { productId: '2', quantity: 2, price: 4.50 },
      { productId: '6', quantity: 1, price: 6.90 },
    ],
    total: 28.80,
    status: 'shipped',
    customerName: 'Ana Costa',
    date: '2025-10-22',
  },
];

export const categories = [
  'Todas',
  'Hortaliças',
  'Frutas',
  'Ervas e Temperos',
  'Produtos Artesanais',
];
