// Image mapping for products and producers
export const imageMap: Record<string, string> = {
  'market': 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzYxMzA2NjI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'tomato': 'https://images.unsplash.com/photo-1745791562822-7ac21012bbb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXN8ZW58MXx8fHwxNzYxMjM5NjIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'farmer-1': 'https://images.unsplash.com/photo-1654526645468-9ae1cde48fe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjEyOTA1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'farmer-2': 'https://images.unsplash.com/photo-1654526645468-9ae1cde48fe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjEyOTA1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'farmer-3': 'https://images.unsplash.com/photo-1654526645468-9ae1cde48fe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjEyOTA1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'strawberries': 'https://images.unsplash.com/photo-1710528184650-fc75ae862c13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHN0cmF3YmVycmllc3xlbnwxfHx8fDE3NjEyNzQ4OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'berries': 'https://images.unsplash.com/photo-1710528184650-fc75ae862c13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHN0cmF3YmVycmllc3xlbnwxfHx8fDE3NjEyNzQ4OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'honey': 'https://images.unsplash.com/photo-1645549826194-1956802d83c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwaG9uZXklMjBqYXJ8ZW58MXx8fHwxNzYxMzAwODc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'herbs': 'https://images.unsplash.com/photo-1662422325326-19089df23d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGhlcmJzJTIwYmFzaWx8ZW58MXx8fHwxNzYxMjI4MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'vegetables': 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzYxMzA2NjI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'salad': 'https://images.unsplash.com/photo-1741515042603-70545daeb0c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwZ3JlZW5zfGVufDF8fHx8MTc2MTMxNDc3MHww&ixlib=rb-4.1.0&q=80&w=1080',
  'hero': 'https://images.unsplash.com/photo-1665028621583-acd8952beb09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXJzJTIwbWFya2V0JTIwc3RhbmR8ZW58MXx8fHwxNzYxMjM3NzUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
};

export const getImageUrl = (key: string): string => {
  return imageMap[key] || imageMap['market'];
};
