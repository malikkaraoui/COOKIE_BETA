import React from 'react';
import RecipeCard from '../components/RecipeCard';

export default function RecettesPopulaires() {
    const topRecipes = [
        { id: 1, name: 'La Ratatouille Prudente', copies: 3421, rating: 4.9 },
        { id: 2, name: 'Le Bouillon Défensif', copies: 2847, rating: 4.8 },
        { id: 3, name: 'Le Gratin Dividendes', copies: 2634, rating: 4.8 },
    ];

    const standardRecipes = [
        {
            id: 4,
            name: 'Le Bouillon Défensif',
            author: 'Chef Antoine',
            tag: 'Équilibrée',
            description: 'Une recette équilibrée parfaite pour les débutants. Mix d\'obligations, d\'or et d\'ETF monde avec une touche de Bitcoin.',
            ingredients: ['Pain', 'Riz', 'Huile d\'olive', 'Vin rouge', 'Sel'],
            performance: '+8.4%',
            rating: 4.8,
            copies: 2847,
            chefs: 1204,
        },
        {
            id: 5,
            name: 'Le Bourguignon Agressif',
            author: 'Chef Marie',
            tag: 'Relevée',
            description: 'Pour les gourmands de rendement ! ETF S&P 500, actions tech et une pincée d\'altcoins. Risqué mais savoureux.',
            ingredients: ['Bœuf', 'Vin rouge', 'Tomates', 'Piment d\'Espelette', 'Herbes de Provence'],
            performance: '+18.2%',
            rating: 4.6,
            copies: 1923,
            chefs: 856,
        },
        {
            id: 6,
            name: 'La Salade Fraîcheur',
            author: 'Chef Lucas',
            tag: 'Douce',
            description: '100% stablecoins et yield farming sur protocoles blue-chip. Rendement stable sans volatilité du marché.',
            ingredients: ['Laitue', 'Concombre', 'Vinaigre', 'Sel'],
            performance: '+4.5%',
            rating: 4.7,
            copies: 1542,
            chefs: 920,
        },
    ];

    return (
        <div>
            <div className="text-center mb-12">
                <div className="inline-block bg-white px-4 py-1 rounded-full text-xs font-bold text-gray-500 border border-gray-100 mb-4 shadow-sm">
                    🏆 Les meilleures recettes de la communauté
                </div>
                <h1 className="text-4xl font-bold mb-4">
                    Recettes <span className="text-cookie-orange">Populaires</span>
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Découvrez les stratégies d'investissement les plus copiées et les mieux notées par la communauté. Inspirez-vous et adaptez-les à votre profil !
                </p>
            </div>

            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {topRecipes.map((recipe, index) => (
                    <RecipeCard key={recipe.id} recipe={recipe} rank={index + 1} />
                ))}
            </div>

            {/* Standard List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {standardRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} rank={10} /> // Rank > 3 for standard display
                ))}
            </div>
        </div>
    );
}
