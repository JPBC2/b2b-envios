'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

export default function CartIcon() {
    const { itemCount } = useCart();

    return (
        <Link
            href="/carrito/"
            className="relative text-slate-600 hover:text-amber-600 transition-colors"
            aria-label={`Carrito (${itemCount} productos)`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {itemCount > 9 ? '9+' : itemCount}
                </span>
            )}
        </Link>
    );
}
