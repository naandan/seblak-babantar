import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { menuItems, MenuItemCategory } from '@/lib/menuData';
import { NamedOrderSet, formatRupiah, calculateTotal } from '@/lib/utils';
import React from 'react';

interface MenuDialogProps {
    orderSet: NamedOrderSet;
    onUpdate: (updatedSet: NamedOrderSet) => void;
    children: React.ReactNode;
}

export const MenuSelectionDialog: React.FC<MenuDialogProps> = ({ orderSet, onUpdate, children }) => {
    const { quantities } = orderSet;

    const updateQuantity = (itemId: number, newQuantity: number) => {
        onUpdate({
            ...orderSet,
            quantities: {
                ...quantities,
                [itemId]: Math.max(0, newQuantity),
            },
        });
    };

    const getQuantity = (itemId: number) => quantities[itemId] || 0;

    const renderMenuCategory = (category: MenuItemCategory, title: string) => (
        <div className="mb-6 ">
            <h4 className="text-md font-semibold mb-3 sticky top-0 z-10 py-2 text-center border-b rounded-2xl px-2 shadow-2xl bg-red-200">
                {title}
            </h4>
            <div className="space-y-2">
                {menuItems.filter(item => item.category === category).map(item => {
                    const currentQuantity = getQuantity(item.id);
                    return (
                        <div key={item.id} className="flex items-center justify-between p-2 gap-2 border rounded-lg hover:bg-gray-50">
                            <div className="flex flex-col">
                                <span className="font-medium">{item.name}</span>
                                <span className="text-xs text-muted-foreground">{formatRupiah(item.price)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="outline" size="icon"
                                    onClick={() => updateQuantity(item.id, currentQuantity - 1)}
                                    className="w-7 h-7"
                                >
                                    <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-5 text-center">{currentQuantity}</span>
                                <Button
                                    size="icon"
                                    onClick={() => updateQuantity(item.id, currentQuantity + 1)}
                                    className="w-7 h-7 bg-red-500 hover:bg-red-600"
                                >
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-red-700">
                        Pilih Menu ({orderSet.name})
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 p-2 max-h-[65vh] overflow-auto thin-scrollbar">
                    {renderMenuCategory('paketan', '🍜 Menu Utama')}
                    {renderMenuCategory('topping', '🌶️ Topping')}
                    {renderMenuCategory('minuman', '🥤 Minuman')}
                </div>

                <DialogFooter className="flex-col sm:flex-row sm:items-center sm:justify-between px-2">
                    <p className="text-lg font-semibold">
                        Total: {formatRupiah(calculateTotal(quantities))}
                    </p>

                    <DialogClose asChild>
                        <Button type="submit" className="bg-red-500 hover:bg-red-600">
                            Selesai
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
