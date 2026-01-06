import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface WishlistItem {
    id: number;
    name: string;
    price: string;
    image: string;
    category?: string;
}

interface WishlistContextType {
    wishlist: WishlistItem[];
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (id: number) => void;
    isInWishlist: (id: number) => boolean;
    getWishlistCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
        const savedWishlist = localStorage.getItem('osmon-wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    useEffect(() => {
        localStorage.setItem('osmon-wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (item: WishlistItem) => {
        setWishlist(prev => {
            const exists = prev.find(wishlistItem => wishlistItem.id === item.id);
            if (exists) {
                return prev; // Already in wishlist
            }
            return [...prev, item];
        });
    };

    const removeFromWishlist = (id: number) => {
        setWishlist(prev => prev.filter(item => item.id !== id));
    };

    const isInWishlist = (id: number) => {
        return wishlist.some(item => item.id === id);
    };

    const getWishlistCount = () => {
        return wishlist.length;
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                getWishlistCount,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
