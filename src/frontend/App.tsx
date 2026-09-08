import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowUpRight, Sparkles, Disc, Terminal, ShieldCheck, 
  Cpu, Music2, Flame, MapPin, Mail, Phone, ExternalLink,
  ChevronDown, Layers, Award, Zap, Code2, Globe
} from 'lucide-react';
import { PROFILE_DATA } from './constants/profile';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'management' | 'creative' | 'tech'>('all');
  const [activeExp, setActiveExp] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Interactive mouse spotlight & cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredExperiences = PROFILE_DATA.experiences.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'management') return item.type === 'management' || item.type === 'retail';
    if (activeTab === 'creative') return item.type === 'management' || item.type === 'culinary';
    if (activeTab === 'tech') return true;
    return true;
  });

  return (
    <div className="relative min-h-screen bg-[#050608] text-[#e2e8f0] font-sans selection:bg-[#a3e635] selection:text-black overflow-x-hidden">
      {/* Interactive Cursor Spotlight */}
      <div 
        className="pointer-events-none fixed z-30 transition-transform duration-75 ease-out rounded-full blur-[120px] opacity-30 bg-gradient-to-r from-[#a3e635] via-[#10b981] to-[#06b6d4]"
        style={{
          width: '420px',
          height: '420px',
          left: `${mousePos.x - 210}px`,
          top: `${mousePos.y - 210}px`,
        }}
      />

      {/* Noise overlay texture */}
      <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.025] mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Awwwards Minimalist Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-6 flex items-center justify-between backdrop-blur-md bg-[#050608]/40 border-b border-white/[0.04]">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-8 h-8 rounded-full bg-[#101520] border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-[#a3e635]">
            <span className="font-display font-black text-xs text-[#a3e635]">P</span>
            <div className="absolute inset-0 bg-[#a3e635]/20 scale-0 group-hover:scale-100 rounded-full transition-transform duration-300" />
          </div>
          <div>
            <span className="font-display font-black tracking-wider text-sm sm:text-base text-white">POSTLAIN</span>
            <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-widest leading-none">Multi-Disciplinary</span>
          </div>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          {['Kinh nghiệm', 'Năng lực', 'Học vấn', 'Kết nối'].map((label, idx) => {
            const targets = ['#experience', '#skills', '#education', '#contact'];
            return (
              <a 
                key={idx}
                href={targets[idx]}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-[#a3e635] hover:bg-white/[0.03] transition-all duration-200"
              >
                {label}
              </a>
            );
          })}
        </nav>
      </header>

      {/* 1. HERO SECTION (Massive Typography & Sound / Motion Aesthetics) */}
      <section ref={heroRef} className="relative min-h-[92vh] flex flex-col justify-end px-6 sm:px-12 pb-16 pt-36 border-b border-white/[0.06]">
        {/* Subtle Ambient Graphic Lines */}
        <div className="absolute top-20 right-12 w-72 h-72 rounded-full border border-white/[0.05] border-dashed animate-[spin_60s_linear_infinite] pointer-events-none hidden md:block" />
        <div className="absolute top-28 right-20 w-56 h-56 rounded-full border border-white/[0.03] pointer-events-none hidden md:block" />

        <div className="max-w-7xl mx-auto w-full">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-[#a3e635] -ml-4.5" />
            <span className="text-xs font-mono tracking-wider text-zinc-300 uppercase">Available for Operations & AI Leadership • 2026</span>
          </div>

          {/* Giant Display Name */}
          <div className="space-y-1">
            <h1 className="font-display font-black text-6xl sm:text-8xl md:text-[10.5rem] tracking-tight leading-[0.88] text-white uppercase select-none">
              NGÔ PHÚC
            </h1>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 pt-3">
              <h2 className="font-display font-black text-4xl sm:text-6xl md:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] via-[#10b981] to-[#38bdf8] uppercase">
                POSTLAIN
              </h2>
              <p className="max-w-md text-sm sm:text-base font-sans text-zinc-400 font-light leading-relaxed">
                Đam mê nghệ thuật, quản trị vận hành logic và tối ưu quy trình kinh doanh kết hợp trí tuệ nhân tạo (AI Automation).
              </p>
            </div>
          </div>

          {/* Quick Meta Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/[0.06] text-xs font-mono text-zinc-400">
            <div>
              <span className="block text-[10px] text-zinc-600 uppercase tracking-widest">Định vị</span>
              <span className="text-zinc-200 font-medium">Store & Studio Manager</span>
            </div>
            <div>
              <span className="block text-[10px] text-zinc-600 uppercase tracking-widest">Nghệ thuật</span>
              <span className="text-zinc-200 font-medium">Music Producer / MCN</span>
            </div>
            <div>
              <span className="block text-[10px] text-zinc-600 uppercase tracking-widest">Công nghệ</span>
              <span className="text-zinc-200 font-medium">AI Workflows & Web Design</span>
            </div>
            <div>
              <span className="block text-[10px] text-zinc-600 uppercase tracking-widest">Căn cứ</span>
              <span className="text-zinc-200 font-medium">Đà Lạt, Lâm Đồng</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE MARQUEE STRIP (Awwwards Style Statement) */}
      <div className="relative py-5 bg-[#0a0d13] border-b border-white/[0.06] overflow-hidden select-none">
        <div className="flex gap-12 whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {[
            "MANAGEMENT & OPERATIONS",
            "•",
            "AI AUTOMATION AGENTS",
            "•",
            "RETAIL LEADERSHIP",
            "•",
            "MUSIC PRODUCTION & AUDIO",
            "•",
            "CULINARY ARTS & LEADERSHIP",
            "•",
            "HIGH-CONVERSION SYSTEMS",
            "•"
          ].concat([
            "MANAGEMENT & OPERATIONS",
            "•",
            "AI AUTOMATION AGENTS",
            "•",
            "RETAIL LEADERSHIP",
            "•",
            "MUSIC PRODUCTION & AUDIO",
            "•",
            "CULINARY ARTS & LEADERSHIP",
            "•",
            "HIGH-CONVERSION SYSTEMS",
            "•"
          ]).map((txt, idx) => (
            <span 
              key={idx} 
              className={`font-display font-black text-sm tracking-widest uppercase ${txt === '•' ? 'text-[#a3e635]' : 'text-zinc-500 hover:text-white transition-colors'}`}
            >
              {txt}
            </span>
          ))}
        </div>
      </div>

      {/* 3. MANIFESTO & CORE STRENGTHS (Editorial Layout) */}
      <section className="px-6 sm:px-12 py-24 sm:py-32 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <span className="font-mono text-xs text-[#a3e635] tracking-widest uppercase block mb-3">01 // Triết lý & Thế mạnh</span>
              <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight">
                VẬN HÀNH <br />BẰNG LOGIC, <br />THỔI HỒN <br />BẰNG NGHỆ THUẬT.
              </h3>
            </div>

            <div className="lg:col-span-8 space-y-12">
              <p className="font-sans text-xl sm:text-2xl text-zinc-300 font-light leading-relaxed">
                "Là một người giao thoa giữa nghệ thuật và công nghệ, tôi tập trung biến sự phức tạp của việc điều hành nhân sự, chuỗi bán lẻ và phòng thu thành các quy trình tinh gọn, tự động hóa và giàu cảm hứng."
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/[0.08]">
                {PROFILE_DATA.strengths.map((s, idx) => (
                  <div key={idx} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-[#a3e635]/40 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-[#101520] border border-white/10 flex items-center justify-center text-[#a3e635] mb-6 group-hover:scale-110 transition-transform">
                      {idx === 0 ? <ShieldCheck className="w-5 h-5" /> : idx === 1 ? <Cpu className="w-5 h-5" /> : <Music2 className="w-5 h-5" />}
                    </div>
                    <h4 className="font-display font-bold text-lg text-white mb-2 tracking-wide uppercase">{s.title}</h4>
                    <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE EXPERIENCE REEL (Works Section inspired by Ali Sanati Works.jsx) */}
      <section id="experience" className="px-6 sm:px-12 py-24 sm:py-32 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-mono text-xs text-[#a3e635] tracking-widest uppercase block mb-3">02 // Hành trình thực tế</span>
              <h3 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
                EXPERIENCE REEL
              </h3>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] w-fit">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'management', label: 'Quản lý & Retail' },
                { id: 'creative', label: 'Studio & Bếp' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                    activeTab === tab.id 
                      ? 'bg-[#a3e635] text-black font-bold shadow-md shadow-[#a3e635]/20' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Stack List */}
          <div className="divide-y divide-white/[0.08]">
            {filteredExperiences.map((exp, idx) => {
              const isSelected = activeExp === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveExp(idx)}
                  className={`group py-8 sm:py-12 cursor-pointer transition-all duration-300 ${
                    isSelected ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#a3e635] px-2.5 py-0.5 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/20">
                          {exp.period}
                        </span>
                        <span className="text-xs font-mono uppercase text-zinc-500 tracking-widest">{exp.company}</span>
                      </div>
                      <h4 className="font-display font-bold text-2xl sm:text-4xl text-white group-hover:text-[#a3e635] transition-colors uppercase tracking-tight">
                        {exp.role}
                      </h4>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono text-zinc-400 uppercase hidden sm:block">
                        {exp.highlights.length} trách nhiệm cốt lõi
                      </span>
                      <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${
                        isSelected ? 'bg-[#a3e635] text-black rotate-45' : 'text-zinc-400 group-hover:border-[#a3e635] group-hover:text-white'
                      }`}>
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail Tray */}
                  {isSelected && (
                    <div className="mt-8 pt-6 border-t border-dashed border-white/[0.08] grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                      {exp.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                          <Zap className="w-4 h-4 text-[#a3e635] shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. SKILLS MATRIX & AI AUTOMATION LAB (Tech / Skill Section) */}
      <section id="skills" className="px-6 sm:px-12 py-24 sm:py-32 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="font-mono text-xs text-[#a3e635] tracking-widest uppercase block mb-3">03 // Hệ thống Năng lực</span>
            <h3 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
              SKILLS & AI STACK
            </h3>
            <p className="text-sm text-zinc-400 font-light mt-4">
              Sự kết hợp giữa tư duy nghệ thuật, kinh nghiệm điều hành và sức mạnh công nghệ AI hiện đại.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROFILE_DATA.skillGroups.map((grp, idx) => (
              <div key={idx} className="relative p-8 rounded-3xl bg-[#0a0d13] border border-white/[0.06] flex flex-col justify-between overflow-hidden group hover:border-[#a3e635]/40 transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Domain 0{idx + 1}</span>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-[#a3e635]/10 text-[#a3e635] border border-[#a3e635]/20">
                      {grp.level}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-2xl text-white uppercase tracking-tight">{grp.category}</h4>
                  <div className="space-y-3 pt-2">
                    {grp.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-white/[0.06] text-zinc-500 text-[11px] font-mono uppercase tracking-widest">
                  Ready to deploy
                </div>
              </div>
            ))}
          </div>

          {/* AI Workflow Philosophy Statement */}
          <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#101520] via-[#0a0d13] to-[#050608] border border-[#a3e635]/20 relative overflow-hidden">
            <div className="max-w-3xl space-y-4">
              <span className="font-mono text-xs text-[#a3e635] uppercase tracking-widest">AI Operations Thesis</span>
              <h4 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                TỰ ĐỘNG HÓA VẬN HÀNH THÔNG MINH
              </h4>
              <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
                Tối ưu hóa các chuỗi công việc thường nhật từ chấm công, quản lý tồn kho, chăm sóc đối tác MCN đến sản xuất âm nhạc bằng các Agent AI tự trị, giảm thiểu sai sót con người và tăng tốc độ xử lý lên gấp nhiều lần.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. EDUCATION & ROOTS */}
      <section id="education" className="px-6 sm:px-12 py-24 sm:py-32 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-16">
            <span className="font-mono text-xs text-[#a3e635] tracking-widest uppercase block mb-3">04 // Nền tảng Học vấn</span>
            <h3 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
              EDUCATION
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PROFILE_DATA.education.map((edu, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/20 transition-all">
                <span className="font-mono text-xs text-[#a3e635] uppercase">{edu.year}</span>
                <h4 className="font-display font-bold text-xl text-white uppercase mt-2">{edu.school}</h4>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">{edu.major}</p>
                {edu.note && (
                  <span className="inline-block mt-4 text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-white/[0.05] text-zinc-400">
                    {edu.note}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT & INVITATION (Ali Sanati Contact Layout) */}
      <section id="contact" className="px-6 sm:px-12 py-24 sm:py-36 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 sm:p-16 rounded-[2.5rem] bg-[#0a0d13] border border-white/[0.08] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#a3e635]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-3xl space-y-8">
              <span className="font-mono text-xs text-[#a3e635] tracking-widest uppercase block">05 // Liên hệ trực tiếp</span>
              <h3 className="font-display font-black text-4xl sm:text-7xl text-white tracking-tight uppercase leading-[0.95]">
                LET’S BUILD <br />SOMETHING <br />EXTRAORDINARY.
              </h3>
              <p className="text-zinc-400 text-sm sm:text-lg font-light leading-relaxed">
                Sẵn sàng hợp tác cho các vị trí Quản lý Cửa hàng/Phòng thu, Kỹ sư Vận hành Tự động hóa AI, hoặc các dự án Sản xuất Nghệ thuật.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href={`mailto:${PROFILE_DATA.email}`}
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-[#a3e635] text-black font-display font-black text-sm uppercase tracking-wider hover:bg-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{PROFILE_DATA.email}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a 
                  href={`tel:${PROFILE_DATA.phone.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-white/[0.05] border border-white/10 text-white font-mono text-sm uppercase tracking-wider hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#a3e635]" />
                  <span>{PROFILE_DATA.phone}</span>
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 pt-6">
                <MapPin className="w-3.5 h-3.5 text-[#a3e635]" />
                <span>{PROFILE_DATA.location} (Sẵn sàng làm việc Onsite tại Đà Lạt hoặc Remote toàn quốc)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="px-6 sm:px-12 py-10 border-t border-white/[0.04] bg-[#050608] text-xs font-mono text-zinc-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 NGÔ PHÚC (POSTLAIN). CRAFTED WITH DISCIPLINE & AESTHETICS.</div>
          <div className="flex items-center gap-6 text-zinc-400">
            <span className="hover:text-[#a3e635] cursor-pointer">AILERON PROTOCOL</span>
            <span className="hover:text-[#a3e635] cursor-pointer">CLOUDFLARE EDGE</span>
            <span className="hover:text-[#a3e635] cursor-pointer">HONO + DRIZZLE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
