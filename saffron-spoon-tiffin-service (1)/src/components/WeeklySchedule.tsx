import { businessData } from '../data';
import { CalendarDays, Utensils, Wheat, Sparkles, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function WeeklySchedule() {
  const [currentDay, setCurrentDay] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    setCurrentDay(days[today]);
  }, []);

  const filteredSchedule = businessData.weekly_schedule.filter(schedule => {
    const query = searchQuery.toLowerCase();
    return (
      schedule.main.toLowerCase().includes(query) ||
      schedule.dry_veg.toLowerCase().includes(query) ||
      schedule.rice_bread.toLowerCase().includes(query) ||
      schedule.day.toLowerCase().includes(query)
    );
  });

  return (
    <section id="schedule" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Weekly Menu Schedule</h2>
          <p className="text-lg text-stone-600">
            Plan your week ahead. Enjoy a diverse rotation of authentic dishes, so you never get bored of your daily meals.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-12 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={20} className="text-stone-400" />
          </div>
          <input
            type="text"
            placeholder="Search for your favorite dishes (e.g., Paneer, Dal)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-stone-200 rounded-full text-stone-800 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all shadow-sm"
          />
        </div>

        {filteredSchedule.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-stone-500 text-lg">No dishes found matching "{searchQuery}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSchedule.map((schedule, index) => {
              const isToday = schedule.day === currentDay;
              
              return (
                <motion.div
                  key={schedule.day}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl overflow-hidden border transition-all ${
                    isToday 
                      ? 'border-orange-500 shadow-lg shadow-orange-100 scale-[1.02] z-10' 
                      : 'border-stone-200 shadow-sm hover:border-orange-300 hover:shadow-md'
                  }`}
                >
                  {isToday && (
                    <div className="absolute top-0 left-0 right-0 bg-orange-500 text-white text-xs font-bold uppercase tracking-wider text-center py-1.5 z-10">
                      Today's Menu
                    </div>
                  )}
                  
                  <div className={`px-6 py-5 border-b ${isToday ? 'bg-orange-50 border-orange-200 pt-8' : 'bg-stone-50 border-stone-100'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className={`text-xl font-bold ${isToday ? 'text-orange-700' : 'text-stone-800'}`}>
                        {schedule.day}
                      </h3>
                      <CalendarDays size={20} className={isToday ? 'text-orange-500' : 'text-stone-400'} />
                    </div>
                    <p className="text-sm font-medium text-stone-500 italic flex items-center gap-1.5 mt-2">
                      <Sparkles size={14} className="text-amber-500 shrink-0" />
                      {schedule.highlight}
                    </p>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Utensils size={16} className="text-orange-400" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Main Course</h4>
                      </div>
                      <p className="font-semibold text-stone-800">{schedule.main}</p>
                      <p className="text-stone-600 text-sm mt-0.5">{schedule.dry_veg}</p>
                    </div>
                    
                    <div className="pt-4 border-t border-stone-100">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Wheat size={16} className="text-amber-500" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Rice & Breads</h4>
                      </div>
                      <p className="font-medium text-stone-700">{schedule.rice_bread}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            {/* Info Card - only show if not searching or at the end of results */}
            {!searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 7 * 0.1 }}
                className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-center border border-stone-700"
              >
                <h3 className="text-xl font-bold mb-3 text-orange-400">Custom Preferences?</h3>
                <p className="text-stone-300 text-sm leading-relaxed mb-6">
                  Our menu is designed for a balanced diet. However, we also provide <strong className="text-white">Jain meals</strong> and accommodate specific spice levels upon request.
                </p>
                <a 
                  href="https://wa.me/917363942957?text=Hi%20Saffron%20Spoon!%20I%20have%20a%20query%20about%20custom%20preferences."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto block text-center border border-stone-600 hover:border-orange-500 hover:bg-orange-500/10 text-white font-medium py-2.5 rounded-xl transition-colors"
                >
                  Contact Kitchen
                </a>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
