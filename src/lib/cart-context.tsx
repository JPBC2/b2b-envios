'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CartItem {
    commodityCode: string;
    name: string;
    unitPrice: number;
    unit: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
    removeItem: (commodityCode: string) => void;
    updateQuantity: (commodityCode: string, quantity: number) => void;
    clearCart: () => void;
    itemCount: number;
    subtotal: number;
    iva: number;
    total: number;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextType | undefined>(undefined);

const IVA_RATE = 0.16;
const STORAGE_KEY = 'b2b-envios-cart';

// ─── Provider ────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loaded, setLoaded] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setItems(JSON.parse(stored));
            }
        } catch {
            // Ignore localStorage errors
        }
        setLoaded(true);
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        if (loaded) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
            } catch {
                // Ignore localStorage errors
            }
        }
    }, [items, loaded]);

    const addItem = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
        setItems(prev => {
            const existing = prev.find(i => i.commodityCode === item.commodityCode);
            if (existing) {
                return prev.map(i =>
                    i.commodityCode === item.commodityCode
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                );
            }
            return [...prev, { ...item, quantity }];
        });
    };

    const removeItem = (commodityCode: string) => {
        setItems(prev => prev.filter(i => i.commodityCode !== commodityCode));
    };

    const updateQuantity = (commodityCode: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(commodityCode);
            return;
        }
        setItems(prev =>
            prev.map(i =>
                i.commodityCode === commodityCode ? { ...i, quantity } : i
            )
        );
    };

    const clearCart = () => setItems([]);

    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
    const iva = subtotal * IVA_RATE;
    const total = subtotal + iva;

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            itemCount,
            subtotal,
            iva,
            total,
        }}>
            {children}
        </CartContext.Provider>
    );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
