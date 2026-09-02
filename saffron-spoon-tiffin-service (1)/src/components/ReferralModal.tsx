import { X, Copy, Share2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { businessData } from '../data';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReferralModal({ isOpen, onClose }: ReferralModalProps) {
  const [copied, setCopied] = useState(false);
  const referralCode = "SAFFRONFRIEND50";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = `Hey! I'm using ${businessData.business_name} for my daily meals and loving it. Use my referral code ${referralCode} to get ₹50 off your first meal plan!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-orange-50 border-b border-orange-100 px-6 py-5 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold text-orange-900 flex items-center gap-2">
                <Share2 size={20} className="text-orange-600" />
                Refer a Friend
              </h2>
              <button
                onClick={onClose}
                className="text-orange-600 hover:text-orange-800 transition-colors bg-orange-100 hover:bg-orange-200 p-1.5 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-4">
                <Share2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-stone-800 mb-2">Give ₹50, Get ₹50</h3>
              <p className="text-stone-600 mb-6 leading-relaxed text-sm">
                Share your unique code with friends. When they subscribe to a meal plan using your code, they get ₹50 off, and you earn ₹50 off your next order!
              </p>

              <div className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 mb-6">
                <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider mb-2">Your Referral Code</p>
                <div className="flex items-center justify-between bg-white border border-stone-200 rounded-lg p-3">
                  <span className="font-mono text-lg font-bold text-stone-800 tracking-wide">{referralCode}</span>
                  <button 
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 bg-orange-50 px-3 py-1.5 rounded-md transition-colors"
                  >
                    {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <button 
                onClick={handleWhatsAppShare}
                className="w-full py-3.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-500/20"
              >
                <Share2 size={18} />
                Share via WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
