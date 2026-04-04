import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Plus, X, Edit } from 'lucide-react';
import { NamedOrderSet, calculateTotal, formatRupiah } from '@/lib/utils';
import { menuItems, kuahOptions, levelPedasOptions, MenuItem, MenuItemCategory, kuahVariants } from '@/lib/menuData';
import { MenuSelectionDialog } from './MenuDialog';
import React, { useMemo } from 'react';

interface OrderSetProps {
    orderSet: NamedOrderSet;
    onUpdate: (updatedSet: NamedOrderSet) => void;
    onRemove: () => void;
}

const ItemDisplay: React.FC<{ item: MenuItem; quantity: number }> = ({ item, quantity }) => (
    <div className="flex justify-between items-center py-1 text-sm">
        <span className="text-gray-600">{item.name} <span className="font-semibold">({quantity}x)</span></span>
        <span className="font-medium">{formatRupiah(item.price * quantity)}</span>
    </div>
);

const NameInput: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => (
    <div className="flex items-center gap-2">
        <div className="relative w-full">
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Contoh: Pesanan Raka"
                className="bg-transparent pr-8 border-0 border-b border-gray-400 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-gray-600"
            />
            <Edit className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
    </div>
);


export const OrderSet: React.FC<OrderSetProps> = ({ orderSet, onUpdate, onRemove }) => {
    const { id, quantities, levelPedas, jenisKuah, varianKuah, name } = orderSet;
    const subTotal = calculateTotal(quantities);

    const updateKuahLevel = (key: 'levelPedas' | 'jenisKuah' | 'varianKuah', value: string) => {
        onUpdate({ ...orderSet, [key]: value });
    };

    const updateName = (newName: string) => {
        onUpdate({ ...orderSet, name: newName });
    };

    const selectedItems = useMemo(() => {
        return menuItems.filter(item => quantities[item.id] > 0);
    }, [quantities]);

    const itemsByType = (category: MenuItemCategory) => 
        selectedItems.filter(item => item.category === category);
        
    const renderItemSummary = (category: MenuItemCategory, title: string) => {
        const items = itemsByType(category);
        if (items.length === 0) return null;

        return (
            <div className="mt-2 pt-2 border-t border-dashed first:border-t-0 first:pt-0">
                <p className="text-sm font-bold mb-2">{title}:</p>
                {items.map(item => (
                    <ItemDisplay key={item.id} item={item} quantity={quantities[item.id]} />
                ))}
            </div>
        );
    };


    return (
        <Card className="mb-6 shadow-lg border-red-500/50 p-0">
            <CardHeader className="bg-red-100/50 flex flex-row items-center justify-between p-6">
                <div>
                    <CardTitle className="text-xl text-red-700 mb-1">Pesanan {id}</CardTitle>
                    <NameInput value={name} onChange={updateName} />
                </div>
                <Button variant="outline" size="icon" onClick={onRemove} className="text-red-500 hover:text-red-700">
                    <X className="w-5 h-5" />
                </Button>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
                
                <div className="border p-3 rounded-lg bg-gray-50">
                    <h3 className="font-semibold text-base mb-2">Item Dipilih:</h3>
                    
                    {renderItemSummary('paketan', 'Menu Utama')}
                    {renderItemSummary('topping', 'Topping')}
                    {renderItemSummary('minuman', 'Minuman')}

                    {selectedItems.length === 0 && (
                        <p className="text-sm italic text-gray-500">Belum ada item dipilih.</p>
                    )}
                </div>

                <MenuSelectionDialog orderSet={orderSet} onUpdate={onUpdate}>
                    <Button 
                        variant="outline" 
                        className="w-full text-red-500 border-red-300 hover:bg-red-50"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Tambah/Edit Item
                    </Button>
                </MenuSelectionDialog>

                <div className="grid grid-cols-1 gap-4 pt-4 border-t mt-4">
                    <div className='space-y-3'>
                        <Label className="font-semibold">Jenis Kuah</Label>
                        <RadioGroup 
                            value={jenisKuah} 
                            onValueChange={(v) => updateKuahLevel('jenisKuah', v)} 
                            className="flex flex-wrap gap-4 mt-2"
                        >
                            {kuahOptions.map(option => (
                                <div key={option} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option} id={`kuah-${id}-${option}`} />
                                    <Label htmlFor={`kuah-${id}-${option}`}>{option}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    <div className='space-y-3'>
                        <Label className="font-semibold">Varian Kuah</Label>
                        <RadioGroup 
                            value={varianKuah} 
                            onValueChange={(v) => updateKuahLevel('varianKuah', v)} 
                            className="flex flex-wrap gap-4 mt-2"
                        >
                            {kuahVariants.map(option => (
                                <div key={option} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option} id={`varian-${id}-${option}`} />
                                    <Label htmlFor={`varian-${id}-${option}`}>{option}</Label>
                                </div>
                            ))}    
                        </RadioGroup>
                    </div>
                    
                    <div className='space-y-3'>
                        <Label className="font-semibold">Level Pedas</Label>
                        <RadioGroup 
                            value={levelPedas} 
                            onValueChange={(v) => updateKuahLevel('levelPedas', v)} 
                            className="flex flex-wrap gap-4 mt-2"
                        >
                            {levelPedasOptions.map(option => (
                                <div key={option} className="flex items-center space-x-2">
                                <RadioGroupItem value={option} id={`pedas-${id}-${option}`} />
                                <Label htmlFor={`pedas-${id}-${option}`}>{option}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </div>

                <div className="text-right mt-4 pt-4 border-t-2 border-dashed border-red-300">
                    <p className=" text-lg font-semibold">Sub-Total: {formatRupiah(subTotal)}</p>
                </div>
            </CardContent>
        </Card>
    );
};