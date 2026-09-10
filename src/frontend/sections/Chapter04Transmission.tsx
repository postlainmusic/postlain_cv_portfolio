import React, { useState } from 'react';
import { Mail, Phone, MapPin, Download, Copy, Check, Send } from 'lucide-react';
import { SiteContent } from '../content/types';
import { ContactForm } from '../components/ContactForm';

interface Chapter04Props {
  content: SiteContent['chapter04'];
}

export const Chapter04Transmission: React.FC<Chapter04Props> = ({ content }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (text: string, key: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      setCopiedKey(null);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold tracking-widest text-accent-amber uppercase">
            {content.index}
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            {content.title}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400">
            {content.subtitle}
          </p>
        </div>

        {/* Contact Info & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Direct Contact Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone Card */}
            <div className="p-6 rounded-xl bg-zinc-900/70 border border-white/10 space-y-3">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                {content.hotlineLabel}
              </span>
              <a
                href={`tel:${content.hotlineNumber.replace(/[^0-9+]/g, '')}`}
                className="text-2xl font-display font-black text-white hover:text-accent-amber transition-colors block"
              >
                {content.hotlineNumber}
              </a>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleCopy(content.hotlineNumber, 'phone')}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-accent-amber transition-colors"
                >
                  {copiedKey === 'phone' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'phone' ? content.copiedNotice : content.copyNotice}</span>
                </button>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-xl bg-zinc-900/70 border border-white/10 space-y-3">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                {content.emailLabel}
              </span>
              <a
                href={`mailto:${content.emailAddress}`}
                className="text-lg sm:text-xl font-bold text-white hover:text-accent-amber transition-colors break-all block"
              >
                {content.emailAddress}
              </a>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleCopy(content.emailAddress, 'email')}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-accent-amber transition-colors"
                >
                  {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'email' ? content.copiedNotice : content.copyNotice}</span>
                </button>
              </div>
            </div>

            {/* Address Card */}
            <div className="p-6 rounded-xl bg-zinc-900/70 border border-white/10 space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                {content.locationLabel}
              </span>
              <p className="text-sm font-medium text-white flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent-amber flex-shrink-0 mt-0.5" />
                <span>{content.locationAddress}</span>
              </p>
            </div>

            {/* Download Official CV Banner */}
            <div className="p-6 rounded-xl bg-accent-amber/10 border border-accent-amber/30 space-y-3">
              <span className="text-xs font-mono font-bold text-accent-amber uppercase tracking-wider block">
                Bản CV Định Dạng PDF
              </span>
              <p className="text-xs text-zinc-300">
                Tải bản PDF chính thức với đầy đủ thông tin xác thực để lưu trữ hoặc chia sẻ với bộ phận tuyển dụng.
              </p>
              <a
                href={content.downloadCvUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="NGOPHUC_CV_2026.pdf"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded bg-accent-amber text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{content.downloadCvLabel}</span>
              </a>
            </div>

          </div>

          {/* Right: Direct Contact Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl bg-zinc-900/70 border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-accent-amber" />
              <span>{content.form.title}</span>
            </h3>
            <ContactForm formContent={content.form} />
          </div>

        </div>

      </div>
    </section>
  );
};
