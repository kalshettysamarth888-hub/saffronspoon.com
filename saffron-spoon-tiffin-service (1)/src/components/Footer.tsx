import { businessData } from '../data';
import { MapPin, Phone, Mail, Clock, CreditCard, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-stone-900 text-stone-300 py-16 border-t-4 border-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand & About */}
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-4">Saffron Spoon</h2>
            <p className="text-stone-400 mb-6">{businessData.description}</p>
            <div className="flex items-start gap-3 text-stone-400">
              <MapPin size={20} className="text-orange-500 shrink-0 mt-1" />
              <p>
                {businessData.location.address},<br />
                {businessData.location.city}, {businessData.location.state} - {businessData.location.postal_code}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-orange-500 mt-1" />
                <div className="flex flex-col gap-1">
                  <a href={`tel:${businessData.contact.phone.replace(/\s+/g, '')}`} className="hover:text-orange-400 transition-colors">
                    {businessData.contact.phone}
                  </a>
                  <a href={`tel:${businessData.contact.phone2.replace(/\s+/g, '')}`} className="hover:text-orange-400 transition-colors">
                    {businessData.contact.phone2}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-orange-500" />
                <a href={`mailto:${businessData.contact.email}`} className="hover:text-orange-400 transition-colors">
                  {businessData.contact.email}
                </a>
              </li>
              <li className="flex flex-col mt-4">
                <p className="text-sm text-stone-500 mb-2 uppercase tracking-wider font-semibold">Payment Methods</p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 bg-stone-800 px-3 py-1.5 rounded-md text-xs font-medium border border-stone-700 text-stone-300">
                    <CreditCard size={14} /> Cards & UPI
                  </div>
                  <div className="flex items-center gap-1 bg-stone-800 px-3 py-1.5 rounded-md text-xs font-medium border border-stone-700 text-stone-300">
                    Cash on Delivery
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Delivery Areas */}
          <div id="delivery">
            <h3 className="text-lg font-bold text-white mb-6">Delivery Areas</h3>
            <ul className="space-y-3">
              {businessData.delivery_area.map((area, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-orange-500" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Service Hours</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b border-stone-800 pb-2">
                <span className="text-stone-400">Monday - Friday</span>
                <span className="text-white font-medium">8:00 AM - 9:30 PM</span>
              </li>
              <li className="flex justify-between border-b border-stone-800 pb-2">
                <span className="text-stone-400">Saturday</span>
                <span className="text-white font-medium">8:00 AM - 9:30 PM</span>
              </li>
              <li className="flex justify-between pb-2">
                <span className="text-stone-400">Sunday</span>
                <span className="text-orange-400 font-medium">8:00 AM - 2:00 PM</span>
              </li>
            </ul>
            
            <div className="mt-8 bg-stone-800 p-6 rounded-2xl text-center border border-stone-700">
              <p className="font-medium text-white mb-3">Ready to order your tiffin?</p>
              <div className="flex flex-col gap-3">
                <a 
                  href={`https://wa.me/${businessData.contact.whatsapp.replace(/\D/g,'')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-block bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-4 rounded-xl font-bold transition-colors shadow-lg"
                >
                  WhatsApp 8591905636
                </a>
                <a 
                  href={`https://wa.me/${businessData.contact.whatsapp2.replace(/\D/g,'')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-block bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-4 rounded-xl font-bold transition-colors shadow-lg"
                >
                  WhatsApp 7363942957
                </a>
              </div>
            </div>
          </div>

        </div>
        
        <div className="mt-16 pt-8 border-t border-stone-800 text-center text-sm text-stone-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {businessData.business_name}. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
