import { LanguageProvider } from './LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MealPlans from './components/MealPlans';
import WeeklySchedule from './components/WeeklySchedule';
import ReviewsAndOffers from './components/ReviewsAndOffers';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import FeedbackWidget from './components/FeedbackWidget';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-stone-50 font-sans selection:bg-orange-200 selection:text-orange-900 scroll-smooth">
        <Navbar />
        <main>
          <Hero />
          <MealPlans />
          <WeeklySchedule />
          <ReviewsAndOffers />
          <FAQ />
        </main>
        <Footer />
        <WhatsAppFAB />
        <FeedbackWidget />
      </div>
    </LanguageProvider>
  );
}
