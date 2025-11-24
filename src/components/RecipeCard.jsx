import React from 'react';
import { motion } from 'framer-motion';
import { Medal, FileText, Star, Users, ChefHat, TrendingUp } from 'lucide-react';

export default function RecipeCard({ recipe, rank }) {
  const isTop3 = rank <= 3;

  // Colors for top 3 medals
  const medalColor = rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-gray-400' : 'text-orange-700';
  const bgColor = rank === 1 ? 'bg-yellow-400' : rank === 2 ? 'bg-gray-400' : rank === 3 ? 'bg-orange-700' : 'bg-white';
  const textColor = rank <= 3 ? 'text-white' : 'text-cookie-text';

  if (isTop3) {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className={`${bgColor} rounded-2xl p-6 text-white relative overflow-hidden shadow-lg`}
      >
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <Medal size={32} className="mb-1" />
          <span className="font-bold text-xl">{rank}</span>
        </div>

        <div className="mt-16 text-center">
          <h3 className="font-bold text-xl mb-2">{recipe.name}</h3>

          <div className="flex justify-center gap-4 text-sm opacity-90">
            <div className="flex items-center gap-1">
              <FileText size={14} /> {recipe.copies}
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} fill="currentColor" /> {recipe.rating}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-cookie-card rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-cookie-orange">
            <ChefHat size={20} />
          </div>
          <div>
            <h3 className="font-bold text-cookie-text">{recipe.name}</h3>
            <div className="text-xs text-gray-400">par {recipe.author}</div>
          </div>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${recipe.tag === 'Équilibrée' ? 'bg-orange-100 text-orange-600' :
          recipe.tag === 'Relevée' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
          }`}>
          {recipe.tag}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-6 flex-1 leading-relaxed">
        {recipe.description}
      </p>

      <div className="mb-6">
        <div className="text-xs text-gray-400 mb-2 uppercase font-bold tracking-wider">Ingrédients principaux :</div>
        <div className="flex flex-wrap gap-2">
          {recipe.ingredients.map((ing, i) => (
            <span key={i} className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-md border border-gray-100">
              {ing}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div>
          <div className="text-green-500 font-bold flex items-center gap-1">
            <TrendingUp size={14} />
            {recipe.performance}
          </div>
          <div className="text-xs text-gray-400">Perf.</div>
        </div>
        <div className="text-right">
          <div className="font-bold text-cookie-text flex items-center justify-end gap-1">
            <Star size={14} fill="#FFA500" className="text-cookie-orange" /> {recipe.rating}
          </div>
          <div className="text-xs text-gray-400">Note</div>
        </div>
        <div className="text-right">
          <div className="font-bold text-cookie-text">{recipe.copies}</div>
          <div className="text-xs text-gray-400">Copies</div>
        </div>
        <div className="text-right">
          <div className="font-bold text-cookie-text">{recipe.chefs}</div>
          <div className="text-xs text-gray-400">Chefs</div>
        </div>
      </div>

      <button className="w-full mt-6 bg-cookie-orange text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
        <FileText size={18} /> Copier cette recette
      </button>
    </motion.div>
  );
}
