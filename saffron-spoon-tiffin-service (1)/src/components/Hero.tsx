import { businessData } from '../data';
import { ArrowRight, Leaf, Heart, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import TodayMenuModal from './TodayMenuModal';
import { useLanguage } from '../LanguageContext';

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <section id="home" className="pt-28 pb-16 md:pt-36 md:pb-24 bg-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-200/50 blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-200/50 blur-3xl opacity-60 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-6">
                <Leaf size={16} /> {t('hero.veg')}
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('hero.tagline')}
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-stone-600 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('hero.desc')}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a
                href="#menu"
                className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-semibold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30"
              >
                {t('hero.cta1')} <ArrowRight size={20} />
              </a>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 rounded-full font-semibold text-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {t('hero.cta2')}
              </button>
            </motion.div>
          </div>

          <motion.div
            className="relative hidden md:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-amber-300 rounded-3xl transform rotate-3 scale-105 opacity-20 z-0"></div>
            {/* @ts-ignore */}
            <img 
              src={businessData.hero_image} 
              alt="Fresh home-style Indian meals" 
              className="relative z-10 w-full h-[400px] lg:h-[500px] object-cover rounded-3xl shadow-2xl border-4 border-white"
            />
          </motion.div>
        </div>

        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-full text-orange-600 shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="font-bold text-stone-800 mb-1">Freshly Cooked</h3>
              <p className="text-stone-600 text-sm">Prepared daily with zero artificial preservatives.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-full text-orange-600 shrink-0">
              <Heart size={24} />
            </div>
            <div>
              <h3 className="font-bold text-stone-800 mb-1">Made with Love</h3>
              <p className="text-stone-600 text-sm">Authentic North & South Indian flavors, just like home.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-full text-orange-600 shrink-0">
              <Leaf size={24} />
            </div>
            <div>
              <h3 className="font-bold text-stone-800 mb-1">Healthy & Clean</h3>
              <p className="text-stone-600 text-sm">Nutritious options including custom spice levels.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <TodayMenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </section>
  );
}
