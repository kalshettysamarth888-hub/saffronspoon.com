import { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.menu': 'Menu & Plans',
    'nav.schedule': 'Weekly Schedule',
    'nav.delivery': 'Delivery',
    'nav.reviews': 'Reviews',
    'nav.faqs': 'FAQs',
    'nav.contact': 'Contact Us',
    'hero.tagline': 'Ghar jaisa khaana, har din.',
    'hero.desc': 'Saffron Spoon is a local tiffin service serving fresh, homemade North and South Indian meals to students, professionals, and families.',
    'hero.veg': '100% Vegetarian Home-Style Food',
    'hero.cta1': 'Subscribe to a Meal Plan',
    'hero.cta2': 'View Today\'s Menu',
  },
  mr: {
    'nav.home': 'मुख्य पृष्ठ',
    'nav.menu': 'मेनू आणि योजना',
    'nav.schedule': 'साप्ताहिक वेळापत्रक',
    'nav.delivery': 'डिलिव्हरी',
    'nav.reviews': 'अभिप्राय',
    'nav.faqs': 'प्रश्न',
    'nav.contact': 'संपर्क करा',
    'hero.tagline': 'घरच्यासारखं जेवण, रोज.',
    'hero.desc': 'सॅफ्रन स्पून ही एक स्थानिक टिफिन सेवा आहे जी विद्यार्थी, व्यावसायिक आणि कुटुंबांना ताजे, घरगुती उत्तर आणि दक्षिण भारतीय जेवण देते.',
    'hero.veg': '१००% शाकाहारी घरगुती जेवण',
    'hero.cta1': 'जेवण योजना सबस्क्राईब करा',
    'hero.cta2': 'आजचा मेनू पहा',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
