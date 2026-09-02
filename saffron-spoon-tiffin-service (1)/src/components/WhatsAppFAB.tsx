import { businessData } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const waNumber1 = businessData.contact.whatsapp.replace(/\D/g, '');
  const waNumber2 = businessData.contact.whatsapp2?.replace(/\D/g, '') || '917363942957';
  const waMessage = encodeURIComponent("Hi Saffron Spoon! I have a query about your tiffin service.");

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end sm:bottom-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-4 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden w-64 origin-bottom-right"
          >
            <div className="bg-[#25D366] p-3 text-white flex justify-between items-center">
              <h4 className="font-bold text-sm">Chat on WhatsApp</h4>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="p-2 space-y-1">
              <a 
                href={`https://wa.me/${waNumber1}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 hover:bg-stone-50 rounded-xl transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-10 h-10 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366] shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase">Primary</p>
                  <p className="font-bold text-stone-800">{businessData.contact.whatsapp.replace('+91 ', '')}</p>
                </div>
              </a>
              <a 
                href={`https://wa.me/${waNumber2}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 hover:bg-stone-50 rounded-xl transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-10 h-10 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366] shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase">Secondary</p>
                  <p className="font-bold text-stone-800">{businessData.contact.whatsapp2?.replace('+91 ', '') || '7363942957'}</p>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:bg-[#20bd5a] focus:outline-none focus:ring-4 focus:ring-[#25D366]/50 transition-colors"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? (
          <X size={28} />
        ) : (
          <svg
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.333.158 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.332 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}

