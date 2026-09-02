import { businessData } from '../data';
import { Menu, X, UtensilsCrossed, Languages, Gift } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import ReferralModal from './ReferralModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'mr' : 'en');
  };

  const links = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.menu'), href: '#menu' },
    { name: t('nav.schedule'), href: '#schedule' },
    { name: t('nav.delivery'), href: '#delivery' },
    { name: t('nav.reviews'), href: '#reviews' },
    { name: t('nav.faqs'), href: '#faq' },
  ];

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-full text-white">
              <UtensilsCrossed size={24} />
            </div>
            <span className="font-bold text-xl md:text-2xl text-stone-800 tracking-tight">
              Saffron Spoon
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-stone-600 hover:text-orange-600 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsReferralOpen(true)}
                className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full border border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors text-sm font-semibold shadow-sm"
              >
                <Gift size={16} />
                Refer & Earn
              </button>
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 text-stone-600 hover:text-orange-600 hover:border-orange-200 transition-colors bg-stone-50 text-sm font-semibold"
              >
                <Languages size={16} />
                {language === 'en' ? 'मराठी' : 'EN'}
              </button>
              <a
                href="#contact"
                className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-sm shadow-orange-200"
              >
                {t('nav.contact')}
              </a>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={toggleLanguage}
              className="flex items-center justify-center p-2 rounded-full border border-stone-200 text-stone-600 hover:text-orange-600 hover:border-orange-200 transition-colors bg-stone-50"
            >
              <Languages size={18} />
              <span className="ml-1 text-xs font-semibold">{language === 'en' ? 'म' : 'EN'}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-600 hover:text-orange-600 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-orange-100 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button
              onClick={() => {
                setIsOpen(false);
                setIsReferralOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-3 text-orange-600 bg-orange-50 rounded-lg font-semibold mb-2"
            >
              <Gift size={18} />
              Refer & Earn
            </button>
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-stone-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="block mt-4 text-center bg-orange-600 text-white px-5 py-3 rounded-xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.contact')}
            </a>
          </div>
        </div>
      )}

      <ReferralModal isOpen={isReferralOpen} onClose={() => setIsReferralOpen(false)} />
    </nav>
  );
}
