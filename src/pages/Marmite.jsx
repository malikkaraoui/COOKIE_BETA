import React from 'react';
import { motion } from 'framer-motion';
import { Soup, ChefHat, TrendingUp, Flame, Sparkles, Clock } from 'lucide-react';

export default function Marmite() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-center mb-12">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 bg-cookie-card px-4 py-1 rounded-full text-xs font-bold text-gray-500 border border-gray-100 dark:border-gray-800 mb-4 shadow-sm"
                >
                    <Sparkles size={14} className="text-cookie-orange" />
                    L'épargne collective qui vous rapporte
                </motion.div>
                <h1 className="text-5xl font-bold mb-6">
                    La <span className="text-cookie-orange">Marmite</span> Communautaire
                </h1>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                    Une épargne gérée par la sagesse collective. Votez chaque jour, participez aux décisions, et partagez les rendements avec toute la communauté.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: La Marmite Visual */}
                <div className="bg-white dark:bg-gradient-to-b dark:from-cookie-card dark:to-gray-900 rounded-3xl p-12 border border-orange-100 dark:border-gray-800 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[500px]">
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                        <motion.div
                            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 left-10 w-4 h-4 bg-orange-200 rounded-full"
                        />
                        <motion.div
                            animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-20 right-20 w-6 h-6 bg-yellow-200 rounded-full"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/4 w-2 h-2 bg-green-200 rounded-full"
                        />
                    </div>

                    <div className="relative z-10">
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="mb-8 text-cookie-orange"
                        >
                            <Soup size={120} strokeWidth={1.5} />
                        </motion.div>

                        <div className="grid grid-cols-3 gap-12 w-full max-w-md mt-12">
                            <div>
                                <div className="text-3xl font-bold text-cookie-text mb-1">1248K€</div>
                                <div className="text-xs text-gray-400 uppercase tracking-wider">Total épargné</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-cookie-text mb-1">3842</div>
                                <div className="text-xs text-gray-400 uppercase tracking-wider">Chefs actifs</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-green-500 mb-1">+12.4%</div>
                                <div className="text-xs text-gray-400 uppercase tracking-wider">Performance</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Question du Chef */}
                <div className="bg-cookie-card rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white">
                            <ChefHat size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-cookie-text">Question du Chef</h3>
                            <div className="flex items-center gap-1 text-sm text-gray-400">
                                <Clock size={14} />
                                Vote quotidien • Expire dans 8h
                            </div>
                        </div>
                    </div>

                    <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-6">
                        Quelle stratégie pour la marmite aujourd'hui ?
                    </h4>

                    <div className="space-y-4 flex-1">
                        <button className="w-full text-left p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-cookie-orange hover:bg-orange-50 dark:hover:bg-gray-800 transition-all group">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:bg-white dark:group-hover:bg-gray-600 group-hover:text-cookie-orange transition-colors">
                                    <Sparkles size={20} />
                                </div>
                                <div>
                                    <div className="font-bold text-cookie-text mb-1">Version mijotée (Douce)</div>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        On reste prudent et on laisse la marmite sur feu doux. Stratégie défensive avec plus de cash et d'obligations.
                                    </p>
                                </div>
                            </div>
                        </button>

                        <button className="w-full text-left p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-cookie-orange hover:bg-orange-50 dark:hover:bg-gray-800 transition-all group">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:bg-white dark:group-hover:bg-gray-600 group-hover:text-cookie-orange transition-colors">
                                    <Flame size={20} />
                                </div>
                                <div>
                                    <div className="font-bold text-cookie-text mb-1">Version relevée (Piment)</div>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        On ajoute une pincée de piment et on augmente le risque pour chercher plus de rendement. Plus d'actions et de crypto.
                                    </p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
