import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, MessageSquareHeart, CheckCircle2 } from 'lucide-react';

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if we are after delivery windows: 
    // Lunch delivery ends at 14:00 (2 PM)
    // Dinner delivery ends at 21:00 (9 PM)
    const checkDeliveryWindow = () => {
      const currentHour = new Date().getHours();
      const isAfterLunch = currentHour >= 14 && currentHour < 18;
      const isAfterDinner = currentHour >= 21 || currentHour < 2;
      
      // For demonstration purposes, we will make it visible 
      // regardless of the exact hour so you can see it in action!
      setIsVisible(true);
    };

    // Delay the appearance slightly so it doesn't immediately overlap with page load animations
    const timer = setTimeout(checkDeliveryWindow, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    // Construct the email content
    const targetEmails = "Kalshettysamarth888@gmail.com,kishuupramanik@gmail.com";
    const subject = encodeURIComponent("Saffron Spoon - Meal Feedback");
    const body = encodeURIComponent(`Rating: ${rating} / 5 Stars\n\nComment:\n${comment || "No comment provided."}`);
    
    // Open the user's default email client
    window.location.href = `mailto:${targetEmails}?subject=${subject}&body=${body}`;
    
    // Show success state
    setSubmitted(true);
    
    // Auto close after 3 seconds
    setTimeout(() => {
      setIsOpen(false);
      // Hide the widget completely for the rest of the session after rating
      setTimeout(() => setIsVisible(false), 500); 
    }, 3000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {!isOpen && !submitted && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-white text-stone-800 px-4 py-3 rounded-full shadow-lg border border-stone-200 hover:border-orange-200 transition-colors focus:outline-none focus:ring-4 focus:ring-orange-500/20"
          >
            <MessageSquareHeart size={20} className="text-orange-500" />
            <span className="font-semibold text-sm hidden sm:block">Rate Today's Meal</span>
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-[320px] overflow-hidden"
          >
            <div className="bg-orange-50 px-4 py-3 border-b border-orange-100 flex justify-between items-center">
              <h3 className="font-bold text-orange-900 flex items-center gap-2 text-sm">
                <Star size={16} className="text-orange-500 fill-orange-500" />
                Rate Your Meal
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-orange-600 hover:bg-orange-100 p-1.5 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center text-center py-6"
                >
                  <CheckCircle2 size={48} className="text-green-500 mb-3" />
                  <h4 className="font-bold text-stone-800 mb-1">Thank You!</h4>
                  <p className="text-sm text-stone-600">Your feedback goes directly to our kitchen.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-semibold text-stone-700 mb-3">How was your tiffin today?</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star 
                            size={32} 
                            className={`${
                              (hoverRating || rating) >= star 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-stone-200'
                            } transition-colors drop-shadow-sm`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                      Add a Comment <span className="text-stone-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="What did you like? Anything to improve?"
                      className="w-full p-3 border border-stone-200 rounded-xl text-sm resize-none h-24 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none transition-shadow custom-scrollbar bg-stone-50 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={rating === 0}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-colors shadow-sm ${
                      rating === 0 
                        ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                        : 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-600/20'
                    }`}
                  >
                    Submit Feedback
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
