export type MenuItemCategory = 'topping' | 'paketan' | 'minuman';

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: MenuItemCategory;
}

export interface ItemQuantities {
  [itemId: string]: number;
}

export const menuItems: MenuItem[] = [
  { id: 1, name: 'Seblak Biasa', price: 6000, category: 'paketan' },
  { id: 2, name: 'Cigor', price: 7000, category: 'paketan' },
  { id: 3, name: 'Karedok Basreng', price: 7000, category: 'paketan' },
  { id: 4, name: 'Mie Ayam', price: 8000, category: 'paketan' },
  { id: 5, name: 'Mie Ayam + Bakso Jumbo', price: 14000, category: 'paketan' },
  { id: 6, name: 'Bakso Tulang', price: 8000, category: 'paketan' },

  { id: 7, name: 'Kwetiaw', price: 2000, category: 'topping' },
  { id: 8, name: 'Dumpling Ayam', price: 2000, category: 'topping' },
  { id: 9, name: 'Dumpling Keju', price: 2000, category: 'topping' },
  { id: 10, name: 'Fishroll', price: 2000, category: 'topping' },
  { id: 11, name: 'Twister', price: 2000, category: 'topping' },
  { id: 12, name: 'Sosis', price: 2000, category: 'topping' },
  { id: 13, name: 'Sosis Merah', price: 2000, category: 'topping' },
  { id: 14, name: 'Jamur Enoki', price: 2000, category: 'topping' },
  { id: 15, name: '3 Bakso Ikan', price: 2000, category: 'topping' },
  { id: 16, name: '3 Cirawang', price: 2000, category: 'topping' },
  { id: 17, name: '3 Cilok', price: 2000, category: 'topping' },
  { id: 18, name: 'Tempura', price: 1000, category: 'topping' },
  { id: 19, name: '3 Sukoy', price: 2000, category: 'topping' },
  { id: 20, name: '3 Basreng', price: 2000, category: 'topping' },
  { id: 21, name: 'Bakso Jumbo', price: 6000, category: 'topping' },
  { id: 22, name: 'Bakso Sapi Sedang', price: 3000, category: 'topping' },

  { id: 23, name: 'Pop Ice', price: 4000, category: 'minuman' },
  { id: 24, name: 'Marimas', price: 1000, category: 'minuman' },
  { id: 25, name: 'Teh Jus', price: 1000, category: 'minuman' },
];

export const kuahOptions = ['Nyemek', 'Sedang', 'Banyak'];
export const kuahVariants = ['Asin', 'Gurih', 'Manis'];
export const levelPedasOptions = ['Level 0', 'Level 1/2', 'Level 1', 'Level 2', 'Level 3'];