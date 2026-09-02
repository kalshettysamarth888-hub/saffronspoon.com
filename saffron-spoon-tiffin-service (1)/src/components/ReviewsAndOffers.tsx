import { businessData } from '../data';
import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

export default function ReviewsAndOffers() {
  return (
    <section id="reviews" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Offers Section */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-stone-900 mb-4">Special Offers</h2>
              <p className="text-stone-600">Take advantage of our current promotions to get the best value on your everyday meals.</p>
            </div>
            
            <div className="space-y-6">
              {businessData.special_offers.map((offer, index) => (
                <motion.div 
                  key={index}
                  className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Decorative background circle */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                    <p className="text-orange-50 mb-6">{offer.description}</p>
                    
                    {offer.promo_code && (
                      <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2">
                        <span className="text-xs uppercase tracking-wider text-orange-100 block mb-1">Use Promo Code</span>
                        <span className="font-mono font-bold text-xl">{offer.promo_code}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-stone-900 mb-4">What Our Customers Say</h2>
              <p className="text-stone-600">Don't just take our word for it. Hear from our happy community of food lovers.</p>
            </div>
            
            <div className="space-y-6">
              {businessData.reviews.map((review, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Quote size={32} className="text-orange-200 mb-4" />
                  <p className="text-stone-700 italic mb-6 text-lg">"{review.comment}"</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <p className="font-bold text-stone-900">{review.customer_name}</p>
                      <p className="text-sm text-stone-500">Verified Customer</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={18} 
                          className={i < review.rating ? "fill-orange-400 text-orange-400" : "fill-stone-100 text-stone-200"} 
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
