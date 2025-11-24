import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function IngredientCard({ ingredient }) {
  const isPremium = ingredient.premium;

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`bg-cookie-card rounded-2xl p-6 border transition-shadow duration-300 hover:shadow-xl
      ${isPremium ? 'border-yellow-200 shadow-yellow-50 dark:border-yellow-900/30' : 'border-gray-100 dark:border-gray-800'}`}
    >

      <div className="flex justify-between items-start mb-4">
        <div className="text-4xl">{ingredient.icon}</div>
        {isPremium && (
          <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <Lock size={12} /> Premium
          </span>
        )}
      </div>

      <h3 className="font-bold text-lg text-cookie-text mb-1">{ingredient.name}</h3>
      <div className="text-xs text-gray-400 font-mono mb-3">{ingredient.code}</div>

      <div className="text-sm font-medium text-cookie-orange mb-2">{ingredient.financialName}</div>
      <p className="text-xs text-gray-500 leading-relaxed">{ingredient.description}</p>
    </motion.div>
  );
}
