import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { PROFILE_INFO } from '../constants/dictionary';
import { usePortfolioStore } from '../stores/usePortfolioStore';
import { soundEngine } from '../lib/audio';

const API_ENDPOINT = 'https://postlain-api.postlain-music.workers.dev';

export const DirectDispatch: React.FC = () => {
  const { locale } = usePortfolioStore();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    soundEngine.playClick(880);
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundEngine.playClick(750);
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch(`${API_ENDPOINT}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitStatus({
          success: true,
          message: locale === 'vi' 
            ? 'Thư đã được gửi thành công tới studionopu@gmail.com!' 
            : 'Email successfully delivered to studionopu@gmail.com!',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || 'Lỗi gửi thư. Vui lòng liên hệ hotline.',
        });
      }
    } catch {
      setSubmitStatus({
        success: false,
        message: 'Không thể gửi thư lúc này. Vui lòng liên hệ hotline 0938-649-420.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto h-full flex flex-col justify-center px-4 sm:px-8">
      <div className="p-6 sm:p-10 rounded-[2.5rem] bg-[#07090e]/95 border border-white/10 relative overflow-hidden backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)] max-h-[85vh] flex flex-col justify-between">
        
        {/* Background Atmosphere */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#a3e635]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start overflow-y-auto custom-scrollbar flex-1 py-2">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div>
              <span className="font-mono text-xs text-[#a3e635] tracking-widest uppercase block mb-1">
                04 // DIRECT INITIATION
              </span>
              <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase leading-[0.95]">
                {locale === 'vi' ? 'KẾT NỐI TRỰC TIẾP' : 'GET IN TOUCH'}
              </h3>
              <p className="font-serif italic text-sm sm:text-base text-zinc-400 mt-2">
                {locale === 'vi' 
                  ? 'Sẵn sàng trao đổi về cơ hội Quản lí Vận hành hoặc Hợp tác Dự án Âm nhạc.' 
                  : 'Open for Operations Management or Creative Sound Projects.'}
              </p>
            </div>

            {/* Direct Contact Buttons */}
            <div className="space-y-2.5 pt-1">
              {/* Phone */}
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${PROFILE_INFO.phone.replace(/[^0-9]/g, '')}`}
                  onClick={() => soundEngine.playClick(600)}
                  data-cursor="CALL"
                  className="flex-1 flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-white font-mono text-xs sm:text-sm transition-all"
                >
                  <Phone className="w-4 h-4 text-[#a3e635]" />
                  <span>{PROFILE_INFO.phone}</span>
                </a>
                <button
                  onClick={() => handleCopy(PROFILE_INFO.phone, 'phone')}
                  data-cursor="COPY"
                  className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white transition-all"
                  title="Copy Phone"
                >
                  {copiedKey === 'phone' ? <Check className="w-4 h-4 text-[#a3e635]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${PROFILE_INFO.email}`}
                  onClick={() => soundEngine.playClick(700)}
                  data-cursor="MAIL"
                  className="flex-1 flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-white font-mono text-xs sm:text-sm transition-all truncate"
                >
                  <Mail className="w-4 h-4 text-[#a3e635] flex-shrink-0" />
                  <span className="truncate">{PROFILE_INFO.email}</span>
                </a>
                <button
                  onClick={() => handleCopy(PROFILE_INFO.email, 'email')}
                  data-cursor="COPY"
                  className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white transition-all"
                  title="Copy Email"
                >
                  {copiedKey === 'email' ? <Check className="w-4 h-4 text-[#a3e635]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/[0.015] border border-white/[0.05] text-xs font-mono text-zinc-400">
                <MapPin className="w-4 h-4 text-[#a3e635] flex-shrink-0" />
                <span>{PROFILE_INFO.locationVi}</span>
              </div>
            </div>
          </div>

          {/* Right Direct Email Dispatch Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    {locale === 'vi' ? 'Họ & Tên' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={locale === 'vi' ? 'Họ tên của bạn...' : 'John Doe...'}
                    className="w-full px-4 py-3 rounded-2xl bg-white/[0.02] border border-white/10 text-white placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:border-[#a3e635] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-2xl bg-white/[0.02] border border-white/10 text-white placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:border-[#a3e635] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                  {locale === 'vi' ? 'Nội Dung Trao Đổi' : 'Message'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={locale === 'vi' ? 'Đề xuất hợp tác quản lí hoặc dự án...' : 'Inquiry details...'}
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.02] border border-white/10 text-white placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:border-[#a3e635] transition-colors resize-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-cursor="SEND"
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-[#a3e635] text-black font-display font-black text-xs uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(163,230,53,0.3)]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{locale === 'vi' ? 'ĐANG GỬI...' : 'DISPATCHING...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{locale === 'vi' ? 'GỬI THƯ TRỰC TIẾP' : 'SEND DIRECT EMAIL'}</span>
                    </>
                  )}
                </button>

                {submitStatus && (
                  <div className={`flex items-center gap-2 text-xs font-mono ${submitStatus.success ? 'text-[#a3e635]' : 'text-red-400'}`}>
                    {submitStatus.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    <span>{submitStatus.message}</span>
                  </div>
                )}
              </div>
            </form>
          </div>

        </div>

        {/* Footer Status */}
        <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-zinc-500 flex-shrink-0">
          <span>{locale === 'vi' ? 'DISPATCH TỚI' : 'DISPATCH TO'}: studionopu@gmail.com</span>
          <span className="text-[#a3e635]">HOTLINE: 0938-649-420</span>
        </div>

      </div>
    </div>
  );
};

