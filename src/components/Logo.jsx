import React from 'react';
import { Soup, ChefHat } from 'lucide-react';

export default function Logo({ size = 40, className = "" }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
            {/* La Marmite */}
            <div className="absolute bottom-0 text-cookie-orange z-10">
                <Soup size={size * 0.8} strokeWidth={2} />
            </div>

            {/* La Toque (flottant au-dessus) */}
            <div className="absolute -top-1 -right-1 text-cookie-text dark:text-white transform -rotate-12 bg-cookie-card rounded-full p-0.5 z-20">
                <ChefHat size={size * 0.5} strokeWidth={2} fill="currentColor" className="text-cookie-text dark:text-white opacity-90" />
            </div>
        </div>
    );
}
