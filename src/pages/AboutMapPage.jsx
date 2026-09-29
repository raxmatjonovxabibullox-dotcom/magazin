import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Send, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import LeafletMap from '../components/LeafletMap';

export default function AboutMapPage() {
  const { t, storeLocation, sendTelegramMessage } = useApp();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    setIsSubmitting(true);
    const questionText = `📩 <b>YANGI SAVOL / BOG'LANISH</b>\n\n` +
      `👤 <b>Ismi:</b> ${contactForm.name}\n` +
      `📧 <b>Mijoz Email:</b> <code>${contactForm.email}</code>\n` +
      `✉️ <b>Savol/Taklif:</b> ${contactForm.message}\n\n` +
      `📌 <i>Rasmiy Email: raxmatjonovxabibullox@gmail.com</i>`;

    if (sendTelegramMessage) {
      await sendTelegramMessage(questionText);
    }

    setSubmittedName(contactForm.name);
    setSubmittedEmail(contactForm.email);
    setFormSubmitted(true);
    setContactForm({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider border border-indigo-200 dark:border-gray-700">
          VOV SHOP Tashkent
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
          {t.about_title}
        </h1>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
          Bizning rasmiy do'konimizga tashrif buyuring yoki kartadan qulay marshrutni aniqlang.
        </p>
      </div>

      {/* Main Map & Location Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Interactive Leaflet Map */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="font-extrabold text-base text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-500" />
              <span>Interaktiv Xarita (Leaflet Map)</span>
            </h3>
            <LeafletMap />
          </div>
        </div>

        {/* Right Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
            <h3 className="font-extrabold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">
              {t.store_location}
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block">Manzil:</span>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5">{storeLocation.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block">Ish vaqti:</span>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5">{t.working_hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-gray-700 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block">Bog'lanish:</span>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5">{storeLocation.phone}</p>
                </div>
              </div>
            </div>

            <a
              href={`https://maps.google.com/?q=${storeLocation.lat},${storeLocation.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-extrabold text-xs shadow hover:bg-indigo-700 transition block text-center"
            >
              {t.get_directions} ↗
            </a>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
              {t.contact_us}
            </h3>

            {formSubmitted ? (
              <div className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/60 dark:to-purple-950/60 border border-indigo-200 dark:border-indigo-800 rounded-3xl space-y-3 text-xs animate-in fade-in">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Xabaringiz Qabul Qilindi!</span>
                </div>
                
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p className="font-semibold">
                    Rahmat, <span className="font-extrabold text-gray-900 dark:text-white">{submittedName}</span>! Xabaringiz VOV Shop rahbariyatiga yuborildi.
                  </p>
                  
                  <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl border border-indigo-100 dark:border-gray-800 space-y-1.5 font-mono text-[11px]">
                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-1">
                      <span className="text-gray-400">Javob beruvchi:</span>
                      <span className="font-extrabold text-indigo-600 dark:text-indigo-400">VOV Shop Admin</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-1">
                      <span className="text-gray-400">Mas'ul Shaxs:</span>
                      <span className="font-extrabold text-gray-900 dark:text-white">Raxmatjonov Xabibullox</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-1">
                      <span className="text-gray-400">Rasmiy Email:</span>
                      <span className="font-extrabold text-indigo-500 underline">raxmatjonovxabibullox@gmail.com</span>
                    </div>
                    <div className="flex justify-between pt-0.5">
                      <span className="text-gray-400">Sizning Email:</span>
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{submittedEmail}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-normal">
                    📬 Savol va taklifingizga rasmiy javob <b>raxmatjonovxabibullox@gmail.com</b> pochtasi orqali <code>{submittedEmail}</code> manzilingizga yuboriladi.
                  </p>
                </div>

                <button
                  onClick={() => setFormSubmitted(false)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-extrabold text-xs shadow hover:bg-indigo-700 transition"
                >
                  Yangi xabar yuborish
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Ismingiz..."
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl text-xs bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="email"
                  required
                  placeholder="Email..."
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl text-xs bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <textarea
                  required
                  rows="3"
                  placeholder="Savol yoki taklifingiz..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full p-2.5 rounded-xl text-xs bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-xs hover:opacity-95 shadow-lg shadow-indigo-500/20 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Yuborilmoqda...' : t.send_message}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
