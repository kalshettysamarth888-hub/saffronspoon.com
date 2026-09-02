import { businessData } from '../data';
import { CheckCircle2, IndianRupee, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import PaymentModal from './PaymentModal';

export default function MealPlans() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [lastOrder, setLastOrder] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('saffron_last_order');
    if (saved) {
      try {
        setLastOrder(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse last order", e);
      }
    }
  }, []);

  const handleReorder = () => {
    if (lastOrder && lastOrder.plan) {
      setSelectedPlan(lastOrder.plan);
    }
  };

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Our Meal Plans</h2>
          <p className="text-lg text-stone-600 mb-6">
            Wholesome, perfectly portioned tiffins delivered right to your door. Choose a plan that fits your lifestyle.
          </p>
          
          {lastOrder && lastOrder.plan && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block"
            >
              <button
                onClick={handleReorder}
                className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-full font-bold shadow-lg shadow-stone-900/20 hover:bg-stone-800 transition-colors"
              >
                <RefreshCw size={18} className="text-orange-400" />
                Reorder Previous: {lastOrder.plan.name}
              </button>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {businessData.meal_plans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              onClick={() => setSelectedPlan(plan)}
              className="cursor-pointer bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl hover:border-orange-400 transition-all flex flex-col h-full relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {plan.name.includes("Premium") && (
                <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  Most Popular
                </div>
              )}
              
              <div className="h-48 w-full overflow-hidden relative bg-stone-100">
                {/* @ts-ignore */}
                <img src={plan.image} alt={plan.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white mb-0">{plan.name}</h3>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <IndianRupee size={20} className="text-stone-900" />
                    <span className="text-4xl font-extrabold text-stone-900">{plan.price_per_meal}</span>
                    <span className="text-stone-500 font-medium">/ meal</span>
                  </div>
                  {plan.monthly_price && (
                    <p className="text-sm font-medium text-orange-600 mt-2 bg-orange-50 inline-block px-2 py-1 rounded">
                      ₹{plan.monthly_price} / month
                    </p>
                  )}
                </div>
                
                <div className="border-t border-stone-100 pt-4 mb-6 flex-grow">
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">
                    {plan.description}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-stone-700 text-sm">
                      <CheckCircle2 size={16} className="text-orange-500 shrink-0 mt-0.5" />
                      <span>Free contactless delivery</span>
                    </li>
                    <li className="flex items-start gap-2 text-stone-700 text-sm">
                      <CheckCircle2 size={16} className="text-orange-500 shrink-0 mt-0.5" />
                      <span>Customizable spice levels</span>
                    </li>
                    {plan.monthly_price && (
                      <li className="flex items-start gap-2 text-stone-700 text-sm">
                        <CheckCircle2 size={16} className="text-orange-500 shrink-0 mt-0.5" />
                        <span>Pause subscription anytime</span>
                      </li>
                    )}
                  </ul>
                </div>
  
                <button
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-center transition-colors border-2 border-orange-600 text-orange-600 group-hover:bg-orange-600 group-hover:text-white"
                >
                  Select Plan
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <PaymentModal 
        isOpen={!!selectedPlan} 
        onClose={() => setSelectedPlan(null)} 
        plan={selectedPlan} 
      />
    </section>
  );
}
