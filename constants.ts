import type { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: 'The Natural - Vintage Tee',
    price: 45.00,
    imageUrl: 'https://placehold.co/600x600/1a202c/e53e3e?text=Fighter+Tee',
    category: 'Apparel',
  },
  {
    id: 2,
    name: 'Signature Series Hoodie',
    price: 75.00,
    imageUrl: 'https://placehold.co/600x600/1a202c/e53e3e?text=Fighter+Hoodie',
    category: 'Apparel',
  },
  {
    id: 3,
    name: 'Championship Legacy Hat',
    price: 35.00,
    imageUrl: 'https://placehold.co/600x600/1a202c/e53e3e?text=Fighter+Hat',
    category: 'Accessories',
  },
  {
    id: 4,
    name: 'Signed Fight Poster (Limited Edition)',
    price: 150.00,
    imageUrl: 'https://placehold.co/600x600/1a202c/e53e3e?text=Signed+Poster',
    category: 'Collectibles',
  },
  {
    id: 5,
    name: 'Iron Will Training Shorts',
    price: 55.00,
    imageUrl: 'https://placehold.co/600x600/1a202c/e53e3e?text=Training+Shorts',
    category: 'Apparel',
  },
  {
    id: 6,
    name: 'Victory Rashguard',
    price: 60.00,
    imageUrl: 'https://placehold.co/600x600/1a202c/e53e3e?text=Rashguard',
    category: 'Apparel',
  },
  {
    id: 7,
    name: 'Autographed Fighting Glove',
    price: 250.00,
    imageUrl: 'https://placehold.co/600x600/1a202c/e53e3e?text=Signed+Glove',
    category: 'Collectibles',
  },
  {
    id: 8,
    name: 'Fighter Crest Mug',
    price: 20.00,
    imageUrl: 'https://placehold.co/600x600/1a202c/e53e3e?text=Fighter+Mug',
    category: 'Accessories',
  },
];

export const WEIGHT_CLASSES = [
    "Flyweight",
    "Bantamweight",
    "Featherweight",
    "Lightweight",
    "Welterweight",
    "Middleweight",
    "Light Heavyweight",
    "Heavyweight",
    "Strawweight (Women's)",
    "Flyweight (Women's)",
    "Bantamweight (Women's)",
    "Featherweight (Women's)",
];
