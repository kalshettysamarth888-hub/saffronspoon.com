import { businessData } from '../data';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-stone-600">
            Got questions? We've got answers. Here's everything you need to know about our tiffin service.
          </p>
        </div>

        <div className="space-y-4">
          {businessData.faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl overflow-hidden transition-colors duration-200 ${openIndex === index ? 'border-orange-300 bg-orange-50' : 'border-stone-200 bg-white hover:border-orange-200'}`}
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-lg text-stone-900 pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 text-orange-500"
                >
                  <ChevronDown size={24} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-stone-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center bg-stone-50 p-6 rounded-2xl border border-stone-100">
          <p className="text-stone-600 mb-3">Still have questions?</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a 
              href={`https://wa.me/${businessData.contact.whatsapp.replace(/\D/g,'')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex font-semibold text-orange-600 hover:text-orange-700 transition-colors"
            >
              Chat on 8591905636
            </a>
            <span className="hidden sm:inline text-stone-300">|</span>
            <a 
              href={`https://wa.me/${businessData.contact.whatsapp2.replace(/\D/g,'')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex font-semibold text-orange-600 hover:text-orange-700 transition-colors"
            >
              Chat on 7363942957
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
