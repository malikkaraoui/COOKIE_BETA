import React from 'react';

export default function MesRecettes() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-4xl mb-6">
                👨‍🍳
            </div>
            <h2 className="text-2xl font-bold text-cookie-text mb-2">Vos créations culinaires</h2>
            <p className="text-gray-500 max-w-md mb-8">
                Vous n'avez pas encore créé de recette. Allez faire un tour à l'Épicerie Fine pour choisir vos ingrédients !
            </p>
            <button className="bg-cookie-orange text-white font-bold px-8 py-3 rounded-xl hover:bg-orange-600 transition-colors">
                Créer ma première recette
            </button>
        </div>
    );
}
