import { businessData } from '../data';
import { X, UtensilsCrossed, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface TodayMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TodayMenuModal({ isOpen, onClose }: TodayMenuModalProps) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const date = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      });
      setCurrentDate(date);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            className="relative w-full max-w-lg bg-stone-50 rounded-2xl shadow-2xl overflow-hidden border border-orange-100"
          >
            {/* Header */}
            <div className="bg-orange-600 px-6 py-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 rounded-full bg-orange-500 blur-2xl opacity-50 pointer-events-none"></div>
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-orange-200 hover:text-white bg-black/10 hover:bg-black/20 rounded-full p-1.5 transition-colors focus:outline-none"
              >
                <X size={20} />
              </button>
              
              <div className="flex justify-center mb-3 text-orange-100">
                <UtensilsCrossed size={32} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 font-serif tracking-tight">
                Today's Menu
              </h2>
              <div className="flex items-center justify-center gap-1.5 text-orange-100 text-sm font-medium">
                <Calendar size={14} />
                <span>{currentDate}</span>
              </div>
            </div>

            {/* Menu Content */}
            <div className="p-6 sm:p-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNlN2U1ZTQiIGZpbGwtb3BhY2l0eT0iLjQiLz48L3N2Zz4=')]">
              <div className="space-y-6">
                {businessData.todays_menu.categories.map((category, index) => (
                  <div key={index} className="text-center">
                    <h3 className="inline-block relative font-bold text-orange-800 text-sm uppercase tracking-widest mb-3">
                      <span className="relative z-10 bg-stone-50 px-3">{category.name}</span>
                      <span className="absolute top-1/2 left-0 right-0 border-t border-orange-200 -z-0"></span>
                    </h3>
                    <ul className="space-y-1.5">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="text-stone-700 font-medium text-lg">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-dashed border-stone-300 text-center">
                <p className="text-sm text-stone-500 italic">
                  {businessData.todays_menu.note}
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 bg-stone-900 hover:bg-stone-800 text-white px-8 py-2.5 rounded-full font-medium transition-colors w-full sm:w-auto"
                >
                  Close Menu
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
