import React from 'react';
import { Phone, Mail, MapPin, Copy, ExternalLink, ArrowUp } from 'lucide-react';
import { APPLE_CONTENT } from '../../content/appleContent';
import { AppleAudio } from '../../audio/AppleHapticAudio';

interface AppleContactFooterProps {
  lang: 'vi' | 'en';
  onShowToast: (msg: string) => void;
  onScrollToTop: () => void;
}

export const AppleContactFooter: React.FC<AppleContactFooterProps> = ({
  lang,
  onShowToast,
  onScrollToTop,
}) => {
  const contact = APPLE_CONTENT.contact;

  const handleCopy = (text: string, type: 'hotline' | 'email') => {
    navigator.clipboard.writeText(text).catch(() => {});
    AppleAudio.playClick(1800, 0.03);
    const msg =
      type === 'hotline'
        ? contact.copyHotlineSuccess[lang]
        : contact.copyEmailSuccess[lang];
    onShowToast(msg);
  };

  return (
    <footer
      id="contact-section"
      data-section="contact"
      aria-label="Thông tin liên hệ trực tiếp"
      className="relative w-full px-6 sm:px-12 lg:px-20 pt-28 pb-16 bg-black text-white border-t border-white/10"
    >
      <div className="w-full max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase font-bold">
              {contact.sectionBadge}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white uppercase">
              {contact.title[lang]}
            </h2>
            <p className="text-sm sm:text-base font-mono text-zinc-400 max-w-md">
              {contact.subtitle[lang]}
            </p>
          </div>
        </div>

        {/* 2 Big Contact Monolith Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hotline Card */}
          <div
            onMouseEnter={() => AppleAudio.playClick(1400, 0.01)}
            className="p-8 sm:p-12 rounded-3xl bg-zinc-950/90 border border-white/10 hover:border-amber-400/40 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-zinc-400">[DIRECT // TEL]</span>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-mono tracking-widest text-zinc-400 uppercase">HOTLINE / ZALO</p>
                <p className="text-2xl sm:text-4xl font-display font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  {contact.hotline}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => handleCopy(contact.hotline, 'hotline')}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black hover:bg-amber-300 font-mono text-xs font-bold tracking-wider transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'SAO CHÉP SỐ' : 'COPY NUMBER'}</span>
              </button>
              <a
                href={`tel:${contact.hotline}`}
                className="flex items-center justify-center p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 transition-colors"
                title="Gọi ngay"
              >
                <Phone className="w-4 h-4 text-zinc-300" />
              </a>
            </div>
          </div>

          {/* Email Card */}
          <div
            onMouseEnter={() => AppleAudio.playClick(1400, 0.01)}
            className="p-8 sm:p-12 rounded-3xl bg-zinc-950/90 border border-white/10 hover:border-cyan-400/40 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-zinc-400">[DIRECT // INBOX]</span>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-mono tracking-widest text-zinc-400 uppercase">OFFICIAL EMAIL</p>
                <p className="text-xl sm:text-3xl font-display font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors break-all">
                  {contact.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => handleCopy(contact.email, 'email')}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black hover:bg-cyan-300 font-mono text-xs font-bold tracking-wider transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'SAO CHÉP EMAIL' : 'COPY EMAIL'}</span>
              </button>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center justify-center p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 transition-colors"
                title="Gửi Email"
              >
                <Mail className="w-4 h-4 text-zinc-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Hidden Music Venture Monolith Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded bg-amber-400/10 text-amber-400 text-[10px] font-mono tracking-widest font-bold">
              SONIC EXPERIMENTAL VENTURE
            </span>
            <h3 className="text-2xl font-display font-bold text-white uppercase">
              {contact.hiddenMusicTitle}
            </h3>
            <p className="text-xs sm:text-sm font-body text-zinc-400 max-w-xl">
              {contact.hiddenMusicDesc[lang]}
            </p>
          </div>

          <a
            href={contact.hiddenMusicUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => AppleAudio.playClick(1600, 0.015)}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-amber-300 hover:bg-amber-200 text-black font-mono text-xs font-bold tracking-wider transition-all duration-300 shadow-xl shadow-amber-400/10 shrink-0"
          >
            <span>OPEN PORTAL</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Footer Meta Details & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 border-t border-white/10 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            <span>{contact.location[lang]}</span>
          </div>

          <div>
            <span>© 2026 NGÔ PHÚC (POSTLAIN). ALL RIGHTS RESERVED.</span>
          </div>

          <button
            type="button"
            onClick={() => {
              AppleAudio.playCardSnap();
              onScrollToTop();
            }}
            onMouseEnter={() => AppleAudio.playClick(1400, 0.01)}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <span>{lang === 'vi' ? 'LÊN ĐẦU TRANG' : 'BACK TO TOP'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
