import React, { useState } from 'react';
import IngredientCard from '../components/IngredientCard';

export default function EpicerieFine() {
    const [filter, setFilter] = useState('all'); // all, free, premium

    const ingredients = [
        {
            id: 1,
            name: 'Vin rouge',
            code: 'I15',
            financialName: 'Bitcoin spot',
            description: 'Ingrédient à forte personnalité = poche BTC 1-2%',
            icon: '🍷',
            premium: true,
        },
        {
            id: 2,
            name: 'Vin blanc',
            code: 'I29',
            financialName: 'Produits structurés / autocall',
            description: 'Très utilisé dans certains "styles" de cuisine',
            icon: '🍾',
            premium: true,
        },
        {
            id: 3,
            name: 'Citron',
            code: 'I30',
            financialName: 'Stratégies de couverture/options',
            description: 'Touche d\'acidité pour rééquilibrer quand le plat est trop lourd',
            icon: '🍋',
            premium: true,
        },
        {
            id: 4,
            name: 'Pain',
            code: 'I04',
            financialName: 'ETF actions Monde',
            description: 'Toujours sur la table = cœur actions globales moderne',
            icon: '🥖',
            premium: false,
        },
        {
            id: 5,
            name: 'Beurre',
            code: 'I06',
            financialName: 'ETF / actions à dividende',
            description: 'Donne du "gras" et du confort = flux réguliers de dividendes',
            icon: '🧈',
            premium: false,
        },
        {
            id: 6,
            name: 'Sel',
            code: 'I22',
            financialName: 'Poche cash tactique (2-5%)',
            description: 'Présent partout en petite dose pour ajuster l\'assaisonnement général',
            icon: '🧂',
            premium: false,
        },
        {
            id: 7,
            name: 'Piment d\'Espelette',
            code: 'I26',
            financialName: 'Panier altcoins L1/L2 (ETH, SOL, AVAX...)',
            description: 'Épice plus rare et marquée = poche crypto hors BTC',
            icon: '🌶️',
            premium: true,
        },
        {
            id: 8,
            name: 'Curcuma',
            code: 'I27',
            financialName: 'Stratégies DeFi lending / yield',
            description: 'Épice plutôt exotique en cuisine FR = DeFi',
            icon: '🟡',
            premium: true,
        },
        {
            id: 9,
            name: 'Safran',
            code: 'I28',
            financialName: 'Panier memecoins / micro-caps ultra spéculatives',
            description: 'Très rare, très puissant, très cher au gramme = spéculation pure',
            icon: '🟠',
            premium: true,
        },
    ];

    const filteredIngredients = ingredients.filter(item => {
        if (filter === 'free') return !item.premium;
        if (filter === 'premium') return item.premium;
        return true;
    });

    return (
        <div>
            <div className="text-center mb-12">
                <div className="inline-block bg-white px-4 py-1 rounded-full text-xs font-bold text-gray-500 border border-gray-100 mb-4 shadow-sm">
                    🧺 Votre garde-manger financier
                </div>
                <h1 className="text-4xl font-bold mb-4">
                    L'<span className="text-cookie-orange">Épicerie</span> Fine
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    30 ingrédients financiers pour composer vos recettes d'investissement. Chaque ingrédient correspond à un produit ou une stratégie financière.
                </p>

                <div className="flex justify-center gap-6 mt-6 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-gray-600">24 gratuits</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <span className="text-gray-600">6 premium</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex justify-center mb-10">
                <div className="bg-white p-1 rounded-full border border-gray-100 shadow-sm inline-flex">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === 'all' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        Tous
                    </button>
                    <button
                        onClick={() => setFilter('free')}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === 'free' ? 'bg-green-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        Gratuits (24)
                    </button>
                    <button
                        onClick={() => setFilter('premium')}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === 'premium' ? 'bg-cookie-orange text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        Premium (6)
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIngredients.map(item => (
                    <IngredientCard key={item.id} ingredient={item} />
                ))}
            </div>

            {/* Info Box */}
            <div className="mt-12 bg-orange-50 rounded-2xl p-8 border border-orange-100 flex gap-6 items-start">
                <div className="w-12 h-12 bg-cookie-orange rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                    ℹ️
                </div>
                <div>
                    <h3 className="font-bold text-lg text-cookie-text mb-2">Comment utiliser les ingrédients ?</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        Chaque ingrédient représente un produit financier. Combinez-les pour créer vos propres recettes d'investissement dans la section <strong>"Mes Recettes"</strong>. Les ingrédients gratuits sont disponibles pour tous, les ingrédients premium nécessitent un abonnement.
                    </p>
                    <div className="flex gap-3">
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Gratuit : illimité</span>
                        <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full">Premium : accès réservé</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
