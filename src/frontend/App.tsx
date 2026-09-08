import React from 'react';
import { usePortfolioStore, PortfolioTab } from './stores/usePortfolioStore';
import { PROFILE_DATA } from './constants/profile';
import { 
  Terminal, User, Briefcase, Code2, Mail, MapPin, Phone, 
  ExternalLink, Sparkles, Award, GraduationCap, Cpu, Music, Store,
  ChevronRight, ArrowUpRight, Compass, ShieldCheck
} from 'lucide-react';
import { cn } from './lib/utils';

export const App: React.FC = () => {
  const { activeTab, setActiveTab } = usePortfolioStore();

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full" />
        <div className="absolute top-[40%] right-[-5%] w-[450px] h-[450px] bg-cyan-500/5 blur-[160px] rounded-full" />
      </div>

      {/* Modern Studio Navbar */}
      <header className="border-b border-slate-800/80 bg-[#07090e]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-[1px] flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Terminal className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="font-extrabold text-base sm:text-lg tracking-tight flex items-center gap-2">
                POSTLAIN <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-medium">ENGINEERING</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Ngô Phúc | Đà Lạt, VN</p>
            </div>
          </div>

          <nav className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
            {[
              { id: 'overview' as PortfolioTab, label: 'Giới thiệu', icon: User },
              { id: 'experience' as PortfolioTab, label: 'Kinh nghiệm', icon: Briefcase },
              { id: 'skills' as PortfolioTab, label: 'Kỹ năng & AI', icon: Cpu },
              { id: 'contact' as PortfolioTab, label: 'Liên hệ', icon: Mail },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full z-10">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-fade-in">
            {/* Hero Section */}
            <div className="relative p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="max-w-3xl space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5" /> Quản lý • Kỹ thuật phần mềm • AI Automation
                </div>
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                  Ngô Phúc <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">(POSTLAIN)</span>
                </h1>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                  {PROFILE_DATA.bio}
                </p>
                <div className="flex flex-wrap gap-4 pt-4 text-xs sm:text-sm font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 bg-slate-800/60 px-3.5 py-2 rounded-xl border border-slate-700/50">
                    <MapPin className="w-4 h-4 text-emerald-400" /> {PROFILE_DATA.location}
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-800/60 px-3.5 py-2 rounded-xl border border-slate-700/50">
                    <Mail className="w-4 h-4 text-cyan-400" /> {PROFILE_DATA.email}
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-800/60 px-3.5 py-2 rounded-xl border border-slate-700/50">
                    <Phone className="w-4 h-4 text-emerald-400" /> {PROFILE_DATA.phone}
                  </div>
                </div>
              </div>
            </div>

            {/* Core Strengths */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-bold tracking-tight text-white">Thế Mạnh Nổi Bật</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {PROFILE_DATA.strengths.map((st, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-emerald-500/40 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                      {i === 0 ? <Briefcase className="w-5 h-5" /> : i === 1 ? <Cpu className="w-5 h-5" /> : <Music className="w-5 h-5" />}
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 mb-2">{st.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{st.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Timeline */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold tracking-tight text-white">Học Vấn & Đào Tạo</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PROFILE_DATA.education.map((edu, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-900/30 border border-slate-800/50 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-cyan-400">{edu.year}</span>
                      <h4 className="text-base font-bold text-white mt-1">{edu.school}</h4>
                      <p className="text-xs text-slate-400 mt-1">{edu.major}</p>
                    </div>
                    {edu.note && (
                      <span className="inline-block mt-3 text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 w-fit">
                        {edu.note}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div className="space-y-8 animate-fade-in">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-bold text-white">Hành Trình Kinh Nghiệm</h2>
              <p className="text-sm text-slate-400">Trải nghiệm thực tế từ Quản lý phòng thu âm, Quản lý chuỗi bán lẻ đến Bếp trưởng ẩm thực cao cấp.</p>
            </div>

            <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-10">
              {PROFILE_DATA.experiences.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-emerald-400 group-hover:bg-emerald-400 transition-colors" />

                  <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/70 hover:border-slate-700 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {exp.period}
                      </span>
                      <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">{exp.company}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mt-1">{exp.role}</h3>

                    <ul className="mt-4 space-y-2">
                      {exp.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="text-sm text-slate-300 flex items-start gap-2 leading-relaxed">
                          <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS & AI TAB */}
        {activeTab === 'skills' && (
          <div className="space-y-8 animate-fade-in">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-bold text-white">Năng Lực Kỹ Năng & Ứng Dụng AI</h2>
              <p className="text-sm text-slate-400">Bộ kỹ năng tích hợp giữa tư duy quản trị nhân sự, điều hành kinh doanh và giải pháp công nghệ AI tự động hóa.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROFILE_DATA.skillGroups.map((grp, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-white">{grp.category}</h3>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {grp.level}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {grp.skills.map((s, sIdx) => (
                        <span key={sIdx} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 text-slate-200 border border-slate-700/60">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Philosophy Box */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/50 border border-emerald-500/30">
              <div className="flex items-center gap-3 mb-3">
                <Cpu className="w-6 h-6 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Triết Lý Tự Động Hóa Vận Hành Bằng AI</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Áp dụng các hệ thống Agentic AI (như Antigravity, LLM Evals, Drizzle ORM, Edge Computing) để xây dựng hệ thống quy trình quản lý nhân sự không có điểm nghẽn, tự động hoá việc báo cáo, quản lý tồn kho và tối ưu trải nghiệm khách hàng.
              </p>
            </div>
          </div>
        )}

        {/* CONTACT TAB */}
        {activeTab === 'contact' && (
          <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white">Kết Nối & Hợp Tác</h2>
              <p className="text-sm text-slate-400">Sẵn sàng trao đổi về cơ hội quản lý vận hành, phát triển dự án công nghệ hoặc sản xuất nghệ thuật.</p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href={`mailto:${PROFILE_DATA.email}`}
                  className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:border-emerald-500/50 flex items-center gap-3 transition-colors"
                >
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-xs text-slate-400 font-mono">Email Trực Tiếp</div>
                    <div className="text-sm font-semibold text-white">{PROFILE_DATA.email}</div>
                  </div>
                </a>

                <a 
                  href={`tel:${PROFILE_DATA.phone.replace(/[^0-9]/g, '')}`}
                  className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:border-emerald-500/50 flex items-center gap-3 transition-colors"
                >
                  <Phone className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-xs text-slate-400 font-mono">Số Điện Thoại</div>
                    <div className="text-sm font-semibold text-white">{PROFILE_DATA.phone}</div>
                  </div>
                </a>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-800 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400 font-mono">Địa Điểm Làm Việc</div>
                  <div className="text-sm text-slate-200">{PROFILE_DATA.location} (Sẵn sàng onsite / remote)</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modern Studio Footer */}
      <footer className="border-t border-slate-800/80 bg-[#07090e] py-8 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 Ngô Phúc (POSTLAIN). All rights reserved.</div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>React 18</span> • <span>Tailwind CSS</span> • <span>Cloudflare Workers</span> • <span>Drizzle ORM</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
