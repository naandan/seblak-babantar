import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ItemQuantities, menuItems, kuahOptions, levelPedasOptions, kuahVariants } from './menuData';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface NamedOrderSet {
  id: number;
  name: string;
  quantities: ItemQuantities;
  levelPedas: string;
  jenisKuah: string;
  varianKuah: string;
}

export const calculateTotal = (quantities: ItemQuantities): number => {
  return Object.entries(quantities).reduce((total, [itemId, quantity]) => {
    const q = quantity > 0 ? quantity : 0;
    const item = menuItems.find(i => i.id === Number(itemId));
    return total + (item ? item.price * q : 0);
  }, 0);
};

export const formatRupiah = (number: number): string => {
  if (number === undefined || number === null) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

export const generateWhatsAppMessage = (orderSets: NamedOrderSet[], grandTotal: number): string => {
  let message = '*PESANAN SEBLAK*\n\n';
  
  orderSets.forEach((set) => {
    const subTotal = calculateTotal(set.quantities);
    message += `==== *${set.name} (${formatRupiah(subTotal)})* ====\n`;
    message += `1. Seblak:\n`;
    const selectedToppings = menuItems.filter(item => item.category === 'topping' && set.quantities[item.id] > 0);
    
    if (selectedToppings.length > 0) {
        selectedToppings.forEach(item => {
            message += `- ${item.name} (${set.quantities[item.id]}x)\n`;
        });
    } else {
        message += `- (Tidak ada topping seblak dipilih)\n`;
    }
    
    message += `> Level Pedas: ${set.levelPedas || levelPedasOptions[0]}\n`;
    message += `> Jenis Kuah: ${set.jenisKuah || kuahOptions[0]}\n`;
    message += `> Varian Kuah: ${set.varianKuah || kuahVariants[0]}\n\n`;


    const selectedMinuman = menuItems.filter(item => item.category === 'minuman' && set.quantities[item.id] > 0);
    if (selectedMinuman.length > 0) {
        message += `2. Minuman:\n`;
        selectedMinuman.forEach(item => {
          message += `- ${item.name} (${set.quantities[item.id]}x)\n`;
        });
        message += `\n`;
    }
  });

  message += `\n*Total Keseluruhan: ${formatRupiah(grandTotal)}*\n`;
  message += `\nMohon konfirmasi ketersediaan dan total biaya pengiriman. Terima kasih!`;
  return message;
};