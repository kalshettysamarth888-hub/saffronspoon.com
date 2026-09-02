import { businessData } from '../data';
import { X, CheckCircle2, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface Plan {
  name: string;
  price_per_meal: number;
  monthly_price: number | null;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
}

export default function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('UPI');
  const [subscriptionType, setSubscriptionType] = useState<'daily' | 'monthly'>('monthly');
  const [address, setAddress] = useState<string>('');
  const [saveAddress, setSaveAddress] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset defaults when opened
      let defaultType: 'daily' | 'monthly' = plan && !plan.monthly_price ? 'daily' : 'monthly';
      
      try {
        const lastOrderRaw = localStorage.getItem('saffron_last_order');
        if (lastOrderRaw && plan) {
          const lastOrder = JSON.parse(lastOrderRaw);
          if (lastOrder.plan && lastOrder.plan.name === plan.name && lastOrder.subscriptionType) {
            defaultType = lastOrder.subscriptionType;
          }
        }
      } catch (e) {
        // ignore
      }
      
      setSubscriptionType(defaultType);
      
      const savedAddress = localStorage.getItem('saffron_delivery_address');
      if (savedAddress) {
        setAddress(savedAddress);
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, plan]);

  if (!plan) return null;

  const getMethodIcon = (method: string) => {
    if (method.includes('UPI') || method.includes('Online')) return <Smartphone size={20} />;
    if (method.includes('Cash')) return <Banknote size={20} />;
    return <CreditCard size={20} />;
  };

  const handleConfirmOrder = () => {
    if (saveAddress && address.trim() !== '') {
      localStorage.setItem('saffron_delivery_address', address.trim());
    } else if (!saveAddress) {
      localStorage.removeItem('saffron_delivery_address');
    }

    localStorage.setItem('saffron_last_order', JSON.stringify({
      plan: plan,
      subscriptionType: subscriptionType
    }));

    const waNumber = businessData.contact.whatsapp.replace(/\D/g, '');
    const price = subscriptionType === 'monthly' ? plan.monthly_price : plan.price_per_meal;
    const typeText = subscriptionType === 'monthly' ? 'a monthly subscription' : 'a daily meal';
    
    let message = `Hi Saffron Spoon! I would like to order ${typeText} for the *${plan.name}*. \n`;
    message += `Price: ₹${price}\n`;
    message += `Preferred Payment Method: ${selectedMethod}\n`;
    if (address.trim() !== '') {
      message += `Delivery Address:\n${address.trim()}\n`;
    }
    message += `\nPlease share the payment details.`;

    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
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
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="bg-stone-50 border-b border-stone-200 px-6 py-4 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold text-stone-800">Complete Your Order</h2>
              <button
                onClick={onClose}
                className="text-stone-400 hover:text-stone-600 transition-colors focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar">
              {/* Plan Summary */}
              <div className="bg-orange-50 rounded-xl p-4 mb-6 border border-orange-100">
                <h3 className="font-bold text-orange-900 mb-1">{plan.name}</h3>
                
                <div className="flex gap-4 mt-3">
                  {plan.monthly_price && (
                    <button 
                      onClick={() => setSubscriptionType('monthly')}
                      className={`flex-1 py-2 px-3 rounded-lg border text-sm font-semibold transition-colors ${subscriptionType === 'monthly' ? 'bg-orange-600 text-white border-orange-600' : 'bg-white text-stone-600 border-stone-200'}`}
                    >
                      Monthly
                      <div className={`text-xs font-normal ${subscriptionType === 'monthly' ? 'text-orange-100' : 'text-stone-500'}`}>₹{plan.monthly_price}</div>
                    </button>
                  )}
                  <button 
                    onClick={() => setSubscriptionType('daily')}
                    className={`flex-1 py-2 px-3 rounded-lg border text-sm font-semibold transition-colors ${subscriptionType === 'daily' ? 'bg-orange-600 text-white border-orange-600' : 'bg-white text-stone-600 border-stone-200'}`}
                  >
                    Daily
                    <div className={`text-xs font-normal ${subscriptionType === 'daily' ? 'text-orange-100' : 'text-stone-500'}`}>₹{plan.price_per_meal}</div>
                  </button>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="mb-6">
                <h3 className="font-bold text-stone-800 mb-3 text-sm uppercase tracking-wider">Delivery Address</h3>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full delivery address (e.g. Flat, Building, Street, Landmark)"
                  className="w-full p-3 border border-stone-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 min-h-[80px] resize-none transition-shadow"
                />
                <label className="flex items-center gap-2 mt-2 cursor-pointer w-max">
                  <input
                    type="checkbox"
                    checked={saveAddress}
                    onChange={(e) => setSaveAddress(e.target.checked)}
                    className="w-4 h-4 text-orange-600 rounded border-stone-300 focus:ring-orange-500 accent-orange-600"
                  />
                  <span className="text-xs text-stone-600">Save this address for future orders</span>
                </label>
              </div>

              {/* Payment Methods */}
              <h3 className="font-bold text-stone-800 mb-3 text-sm uppercase tracking-wider">Select Payment Method</h3>
              <div className="space-y-3 mb-8">
                {businessData.payment_methods.map((method) => (
                  <div key={method} className="flex flex-col">
                    <button
                      onClick={() => setSelectedMethod(method)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors ${selectedMethod === method ? 'border-orange-500 bg-orange-50' : 'border-stone-200 bg-white hover:border-orange-200'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${selectedMethod === method ? 'bg-orange-100 text-orange-600' : 'bg-stone-100 text-stone-500'}`}>
                          {getMethodIcon(method)}
                        </div>
                        <span className={`font-medium ${selectedMethod === method ? 'text-orange-900' : 'text-stone-700'}`}>
                          {method}
                        </span>
                      </div>
                      {selectedMethod === method && (
                        <CheckCircle2 size={20} className="text-orange-500" />
                      )}
                    </button>
                    
                    {selectedMethod === method && method.includes('UPI') && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2 overflow-hidden"
                      >
                        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-stone-200 shadow-inner">
                          <p className="text-sm font-semibold text-stone-700 mb-3 text-center">Scan to Pay using any UPI app</p>
                          <div className="bg-white p-2 rounded-xl shadow-sm border border-stone-100 relative group min-h-[200px] min-w-[200px] flex items-center justify-center mb-4">
                            <img 
                              src="/QR%20Code.jpeg.jpeg" 
                              alt="UPI QR Code" 
                              className="w-48 h-48 object-contain rounded-lg peer"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="hidden absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-stone-50 rounded-lg border-2 border-dashed border-stone-300">
                              <span className="text-xl mb-2">📸</span>
                              <p className="text-sm font-semibold text-stone-600">QR Code Missing</p>
                              <p className="text-xs text-stone-500 mt-1">Please open the <strong>public</strong> folder on the left and upload your <strong>QR Code.jpeg</strong> file there.</p>
                            </div>
                          </div>
                          
                          <div className="w-full relative flex items-center py-2 mb-2">
                            <div className="flex-grow border-t border-stone-200"></div>
                            <span className="flex-shrink-0 mx-4 text-stone-400 text-xs font-medium uppercase tracking-wider">OR</span>
                            <div className="flex-grow border-t border-stone-200"></div>
                          </div>

                          <button
                            onClick={() => {
                              const price = subscriptionType === 'monthly' ? plan.monthly_price : plan.price_per_meal;
                              const upiLink = `upi://pay?pa=saffronspoon@upi&pn=Saffron%20Spoon&am=${price}&cu=INR`;
                              window.location.href = upiLink;
                            }}
                            className="w-full bg-[#EA4335] hover:bg-[#D93025] text-white py-3 rounded-xl font-bold transition-colors shadow-md flex justify-center items-center gap-2 mb-2"
                          >
                            Proceed to Pay with GPay
                          </button>

                          <p className="text-xs text-stone-500 mt-2 text-center px-4 leading-relaxed">
                            After successful payment, please click below to send the screenshot via WhatsApp.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {selectedMethod === method && (method === 'Credit Card' || method === 'Debit Card') && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2 overflow-hidden"
                      >
                        <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-inner space-y-3">
                          <p className="text-sm font-semibold text-stone-700">Enter {method} Details</p>
                          <input 
                            type="text" 
                            placeholder="Card Number" 
                            className="w-full p-2 border border-stone-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-shadow"
                          />
                          <div className="flex gap-3">
                            <input 
                              type="text" 
                              placeholder="MM/YY" 
                              className="w-1/2 p-2 border border-stone-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-shadow"
                            />
                            <input 
                              type="text" 
                              placeholder="CVV" 
                              className="w-1/2 p-2 border border-stone-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-shadow"
                            />
                          </div>
                          <input 
                            type="text" 
                            placeholder="Name on Card" 
                            className="w-full p-2 border border-stone-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-shadow"
                          />
                        </div>
                      </motion.div>
                    )}

                    {selectedMethod === method && method === 'Online Payment' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2 overflow-hidden"
                      >
                        <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-inner">
                          <p className="text-sm font-semibold text-stone-700 mb-3">Select Bank for Net Banking</p>
                          <select className="w-full p-2 border border-stone-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-shadow bg-white">
                            <option value="">Select a Bank...</option>
                            <option value="sbi">State Bank of India (SBI)</option>
                            <option value="hdfc">HDFC Bank</option>
                            <option value="icici">ICICI Bank</option>
                            <option value="axis">Axis Bank</option>
                            <option value="kotak">Kotak Mahindra Bank</option>
                            <option value="pnb">Punjab National Bank</option>
                          </select>
                          <p className="text-xs text-stone-500 mt-3">
                            You will be redirected to your bank's secure portal after clicking confirm.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={handleConfirmOrder}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3.5 rounded-xl font-bold transition-colors shadow-lg shadow-orange-600/20 flex justify-center items-center gap-2"
              >
                Confirm via WhatsApp
              </button>
              <p className="text-center text-xs text-stone-500 mt-3">
                You won't be charged yet. We'll send you payment details on WhatsApp to complete your order.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
