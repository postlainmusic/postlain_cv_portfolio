import React, { useEffect, useState } from 'react';
import { Server, Zap, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { soundEngine } from '../lib/audio';

const WORKER_ENDPOINT = 'https://postlain-api.postlain-music.workers.dev';

export const EdgeDispatch: React.FC = () => {
  const [workerStatus, setWorkerStatus] = useState<'checking' | 'online' | 'error'>('checking');
  const [region, setRegion] = useState<string>('GLOBAL');
  const [latency, setLatency] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  // Ping live Cloudflare Worker
  useEffect(() => {
    let mounted = true;
    const checkWorker = async () => {
      const start = performance.now();
      try {
        const res = await fetch(`${WORKER_ENDPOINT}/api/health`);
        const data = await res.json();
        const duration = Math.round(performance.now() - start);

        if (mounted && res.ok && data.status === 'healthy') {
          setWorkerStatus('online');
          setRegion(data.region || 'EDGE');
          setLatency(duration);
        } else if (mounted) {
          setWorkerStatus('error');
        }
      } catch {
        if (mounted) setWorkerStatus('error');
      }
    };

    checkWorker();
    const interval = setInterval(checkWorker, 15000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundEngine.playClick(880);
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const res = await fetch(`${WORKER_ENDPOINT}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitResult({ success: true, message: data.message });
        setFormData({ name: '', email: '', message: '' });
        soundEngine.playOneShot('laser');
      } else {
        setSubmitResult({ success: false, message: data.message || 'Lỗi gửi tin nhắn' });
      }
    } catch {
      setSubmitResult({ success: false, message: 'Không thể kết nối tới Cloudflare Worker Edge' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 rounded-[2rem] bg-[#07090e] border border-white/10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Background Neon Accent */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Worker Status Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
            <Server className="w-4 h-4 text-[#a3e635]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-white font-bold tracking-wider">CLOUDFLARE WORKER BACKEND</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#a3e635]/15 text-[#a3e635] border border-[#a3e635]/30">
                ACTIVE
              </span>
            </div>
            <a 
              href="https://postlain-api.postlain-music.workers.dev/api/health" 
              target="_blank" 
              rel="noreferrer"
              className="text-[11px] font-mono text-zinc-500 hover:text-zinc-300 block truncate"
            >
              postlain-api.postlain-music.workers.dev
            </a>
          </div>
        </div>

        {/* Live Status Indicators */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
            <span className={`w-2 h-2 rounded-full ${workerStatus === 'online' ? 'bg-[#a3e635] animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-zinc-300 uppercase">{workerStatus === 'online' ? 'LIVE' : 'CHECKING'}</span>
          </div>
          {latency !== null && (
            <div className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-zinc-400">
              ⚡ {latency}ms ({region})
            </div>
          )}
        </div>
      </div>

      {/* Interactive Contact Form */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Họ & Tên / Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Elon Musk, Producer, Đối tác..."
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#a3e635] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="contact@company.com"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#a3e635] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Lời Nhắn / Message</label>
          <textarea
            required
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Nội dung đề xuất hợp tác quản lý, tư vấn tự động hóa AI hoặc sản xuất âm nhạc..."
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#a3e635] transition-colors resize-none"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#a3e635] text-black font-display font-black text-xs uppercase tracking-wider hover:bg-white transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang Gửi Lên Edge...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>GỬI LỜI NHẮN QUA WORKER</span>
              </>
            )}
          </button>

          {submitResult && (
            <div className={`flex items-center gap-2 text-xs font-mono ${submitResult.success ? 'text-[#a3e635]' : 'text-red-400'}`}>
              {submitResult.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{submitResult.message}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
