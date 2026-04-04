'use client';

import { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { NamedOrderSet, calculateTotal, formatRupiah, generateWhatsAppMessage } from '@/lib/utils';
import { kuahOptions, kuahVariants, levelPedasOptions } from '@/lib/menuData';
import { OrderSet } from '@/components/OrderSet';

export default function Home() {
    const [orderSets, setOrderSets] = useState<NamedOrderSet[]>([
        {
            id: 1,
            name: 'Pesanan 1',
            quantities: {},
            levelPedas: levelPedasOptions[0],
            jenisKuah: kuahOptions[0],
            varianKuah: kuahVariants[0],
        },
    ]);

    const addOrderSet = useCallback(() => {
        const newId = (orderSets[orderSets.length - 1]?.id || 0) + 1;
        setOrderSets(prev => [
            ...prev,
            {
                id: newId,
                name: `Pesanan ${newId}`,
                quantities: {},
                levelPedas: levelPedasOptions[0],
                jenisKuah: kuahOptions[0],
                varianKuah: kuahVariants[0],
            },
        ]);
    }, [orderSets]);

    const updateOrderSet = useCallback((updatedSet: NamedOrderSet) => {
        setOrderSets(prev => prev.map(set => (set.id === updatedSet.id ? updatedSet : set)));
    }, []);

    const removeOrderSet = useCallback((idToRemove: number) => {
        setOrderSets(prev => prev.filter(set => set.id !== idToRemove).map((set, index) => ({
            ...set,
            id: index + 1,
            name: set.name.startsWith('Pesanan') ? `Pesanan ${index + 1}` : set.name
        })));
    }, []);

    const grandTotal = useMemo(() => {
        return orderSets.reduce((sum, set) => sum + calculateTotal(set.quantities), 0);
    }, [orderSets]);

    const handleCheckout = () => {
        if (orderSets.length === 0 || grandTotal === 0) return;
        
        const phoneNumber = '6282271642385';
        const message = generateWhatsAppMessage(orderSets, grandTotal);
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    const isOrderEmpty = orderSets.length === 0 || grandTotal === 0;

    return (
        <main className="container max-w-2xl mx-auto p-4 md:p-8 mt-5">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-red-700">🌶️ Seblak Online Order</h1>
                <p className="text-gray-600 mt-2">Pilih menu, hitung total, dan kirim via WhatsApp!</p>
            </header>
            
            <section>
                {orderSets.map(set => (
                    <OrderSet
                        key={set.id}
                        orderSet={set}
                        onUpdate={updateOrderSet}
                        onRemove={() => removeOrderSet(set.id)}
                    />
                ))}
            </section>

            <Button 
                onClick={addOrderSet} 
                variant="outline" 
                className="w-full text-lg border-2 border-red-500 text-red-500 hover:bg-red-50"
                disabled={orderSets.length >= 10}
            >
                + Tambah Pesanan Baru
            </Button>

            <hr className="my-8" />

            <section className="bg-red-50 p-3 px-6 rounded-lg shadow-inner sticky bottom-0 z-50">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-semibold text-red-700">Total Keseluruhan:</p>
                    <p className="text-lg font-bold text-red-700">{formatRupiah(grandTotal)}</p>
                </div>
                <Button 
                    onClick={handleCheckout} 
                    disabled={isOrderEmpty}
                    className="w-full bg-green-500 hover:bg-green-600"
                >
                    {isOrderEmpty ? 'Tambahkan Item Dulu' : 'Pesan Sekarang Via WhatsApp'}
                </Button>
            </section>
        </main>
    );
}