export type MenuItemCategory = 'topping' | 'paketan' | 'minuman';

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: MenuItemCategory;
  hasLevel?: boolean;
  hasKuah?: boolean;
}

export interface ItemQuantities {
  [itemId: string]: number;
}

export const menuItems: MenuItem[] = [
  // ================= PAKETAN =================
  { id: 1, name: 'Cilok Goang', price: 10000, category: 'paketan', hasLevel: true },
  { id: 2, name: 'Cigor Tulang', price: 10000, category: 'paketan', hasLevel: true },
  { id: 3, name: 'Baso Ikan Bahari Sedang', price: 7000, category: 'paketan' },
  { id: 4, name: 'Baso Ikan Bahari Jumbo Isi Jando', price: 10000, category: 'paketan' },
  { id: 5, name: 'Mietulang', price: 12000, category: 'paketan', hasLevel: true, hasKuah: true },
  { id: 6, name: 'Karedok Basreng Tulang', price: 10000, category: 'paketan', hasLevel: true },
  { id: 7, name: 'Cimol Banjur + Tulang', price: 10000, category: 'paketan', hasLevel: true, hasKuah: true },

  // ================= TOPPING =================
  { id: 8, name: 'Tulang Ceker', price: 2000, category: 'topping' },
  { id: 9, name: 'Dumpling Ayam', price: 2000, category: 'topping' },
  { id: 10, name: 'Dumpling Ayam Pedas', price: 2000, category: 'topping', hasLevel: true },
  { id: 11, name: 'Dumpling Keju', price: 2000, category: 'topping' },
  { id: 12, name: 'Cikua', price: 1500, category: 'topping' },
  { id: 13, name: 'Fishroll', price: 2000, category: 'topping' },
  { id: 14, name: 'Baso Ayam', price: 1000, category: 'topping' },
  { id: 15, name: 'Baso Sapi Besar', price: 3000, category: 'topping' },
  { id: 16, name: 'Baso Ikan Kecil (3 pcs)', price: 2000, category: 'topping' },
  { id: 17, name: 'Baso Ikan Bahari', price: 3000, category: 'topping' },
  { id: 18, name: 'Udang', price: 2000, category: 'topping' },
  { id: 19, name: 'Kornet Koin', price: 1000, category: 'topping' },
  { id: 20, name: 'Sosis Biasa', price: 1000, category: 'topping' },
  { id: 21, name: 'Sosis Ayam', price: 2000, category: 'topping' },
  { id: 22, name: 'Sosis Dilamo', price: 2500, category: 'topping' },
  { id: 23, name: 'Odeng', price: 2500, category: 'topping' },
  { id: 24, name: 'Bola Ikan', price: 2000, category: 'topping' },
  { id: 25, name: 'Tahu', price: 2500, category: 'topping' },
  { id: 26, name: 'Otak-otak', price: 1000, category: 'topping' },
  { id: 27, name: 'Telur Ayam', price: 3000, category: 'topping' },
  { id: 28, name: 'Telur Puyuh', price: 1000, category: 'topping' },
  { id: 29, name: 'Jamur Enoki', price: 3000, category: 'topping' },
  { id: 30, name: 'Babanggi', price: 1000, category: 'topping' },
  { id: 31, name: 'Abrul', price: 1000, category: 'topping' },
  { id: 32, name: 'Krupuk Hitam', price: 1000, category: 'topping' },
  { id: 33, name: 'Krupuk Bintang', price: 1000, category: 'topping' },
  { id: 34, name: 'Potato', price: 1000, category: 'topping' },
  { id: 35, name: 'Makaroni Kuning', price: 1000, category: 'topping' },
  { id: 36, name: 'Mie', price: 2000, category: 'topping' },
  { id: 37, name: 'Kwetiaw', price: 1000, category: 'topping' },
  { id: 38, name: 'Somay Lidah', price: 1000, category: 'topping' },
  { id: 39, name: 'Somay Kering', price: 1000, category: 'topping' },
  { id: 40, name: 'Somay Tahu', price: 2000, category: 'topping' },
  { id: 41, name: 'Dadali Cikur', price: 1000, category: 'topping' },
  { id: 42, name: 'Sayur', price: 0, category: 'topping' },

  // ================= MINUMAN =================
  { id: 43, name: 'Pop Ice Aneka Rasa', price: 3000, category: 'minuman' },
  { id: 44, name: 'Teh Jus', price: 2000, category: 'minuman' },
  { id: 45, name: 'Nutrisari', price: 3000, category: 'minuman' },
  { id: 46, name: 'Marimas', price: 1000, category: 'minuman' },
  { id: 47, name: 'Es Jeruk', price: 5000, category: 'minuman' },
  { id: 48, name: 'Josu', price: 5000, category: 'minuman' },
];

export const kuahOptions = ['Nyemek', 'Sedang', 'Banyak'];
export const kuahVariants = ['Asin', 'Gurih', 'Manis'];
export const levelPedasOptions = ['Level 0', 'Level 1/2', 'Level 1', 'Level 2', 'Level 3'];
