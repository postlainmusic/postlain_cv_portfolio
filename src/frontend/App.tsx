import React, { useEffect, useRef, useState } from 'react';
import { APPLE_CONTENT } from './content/appleContent';
import './styles/editorial.css';

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const App: React.FC = () => {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [active, setActive] = useState('home');
  const root = useRef<HTMLDivElement>(null);
  const vi = lang === 'vi';

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reveal = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    el.querySelectorAll('[data-reveal]').forEach(e => reveal.observe(e));
    return () => reveal.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const current = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActive(current.target.getAttribute('data-section') || 'home');
      },
      { threshold: [0.25, 0.5, 0.75] }
    );
    document.querySelectorAll('[data-section]').forEach(e => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} className="editorial-site">
      <header className="editorial-header">
        <button className="wordmark" onClick={() => scrollToId('home')}>NGÔ PHÚC <span>[POSTLAIN]</span></button>
        <nav className="editorial-nav" aria-label="Điều hướng">
          {['experience','work','contact'].map((id, i) => (
            <button key={id} className={active === id ? 'is-active' : ''} onClick={() => scrollToId(id)}>0{i+1}</button>
          ))}
          <button onClick={() => setLang(vi ? 'en' : 'vi')}>{vi ? 'VI' : 'EN'}</button>
        </nav>
      </header>

      <main>
        <section id="home" data-section="home" className="editorial-hero">
          <div className="grain" aria-hidden="true" />
          <span className="amber-mark amber-mark-a" aria-hidden="true" />
          <span className="amber-mark amber-mark-b" aria-hidden="true" />

          <div className="hero-top" data-reveal>
            <span>HỒ SƠ CÁ NHÂN / 2026</span><span>ĐÀ LẠT / VIỆT NAM</span>
          </div>

          <div className="hero-main">
            <p className="eyebrow" data-reveal>ĐANG HOẠT ĐỘNG / SẴN SÀNG ĐIỀU HÀNH</p>
            <h1 data-reveal>NGÔ<br />PHÚC</h1>
            <p className="hero-alias" data-reveal>[ POSTLAIN ]</p>
            <div className="hero-statement" data-reveal>
              <span className="quote-mark">“</span>
              <p>{vi
                ? 'Đam mê nghệ thuật và công nghệ. Tôi thích biến những quy trình rối thành cách làm rõ ràng, gọn và hiệu quả.'
                : 'I work where art, technology and operations meet, turning complicated processes into clear, practical systems.'}</p>
            </div>
          </div>

          <div className="hero-bottom" data-reveal>
            <div className="hero-index">
              <span>01</span><span>VẬN HÀNH & AI</span><span>02</span><span>STUDIO & RETAIL</span><span>03</span><span>ÂM NHẠC / HIDDEN MUSIC</span>
            </div>
            <button className="enter-button" onClick={() => scrollToId('experience')}>{vi ? 'XEM HÀNH TRÌNH' : 'VIEW THE WORK'} <span>↓</span></button>
          </div>
        </section>

        <section id="experience" data-section="experience" className="editorial-section experience-section">
          <div className="section-number" data-reveal>01</div>
          <div className="section-intro" data-reveal>
            <p className="eyebrow">TRIẾT LÝ LÀM VIỆC</p>
            <h2>{vi ? 'Quản lí bằng logic. Làm việc bằng cảm nhận.' : 'Run with logic. Work with instinct.'}</h2>
            <p>{vi
              ? 'Kinh nghiệm đi qua bán lẻ, bếp, phòng thu và vận hành đội ngũ. Mỗi nơi cho một cách nhìn khác về con người, tốc độ và chất lượng.'
              : 'Retail, kitchen, studio and team operations shaped the way I read people, pace and quality.'}</p>
          </div>
          <div className="duo-lines" data-reveal>
            <article><span>01 / VẬN HÀNH</span><h3>{vi ? 'Rõ việc. Đúng nhịp.' : 'Clear work. Right rhythm.'}</h3><p>{vi ? 'SOP, phân ca, doanh thu, hàng hóa, nhân sự và xử lý phát sinh.' : 'SOPs, scheduling, revenue, inventory, people and problems in motion.'}</p></article>
            <article><span>02 / NGHỆ THUẬT</span><h3>{vi ? 'Giữ được phần người.' : 'Keep the human part.'}</h3><p>{vi ? 'Âm nhạc, hình ảnh và thẩm mỹ giúp cách vận hành không trở nên máy móc.' : 'Music, image and taste keep operations from becoming mechanical.'}</p></article>
          </div>
        </section>

        <section id="work" data-section="work" className="editorial-section work-section">
          <div className="section-number" data-reveal>02</div>
          <div className="section-intro" data-reveal>
            <p className="eyebrow">KINH NGHIỆM THỰC CHIẾN</p>
            <h2>{vi ? 'Bốn môi trường. Một cách làm.' : 'Four environments. One way of working.'}</h2>
          </div>
          <div className="career-list">
            {APPLE_CONTENT.milestones.slice().reverse().map((item, index) => (
              <article className="career-row" key={item.id} data-reveal>
                <span className="career-index">0{index + 1}</span>
                <div className="career-role"><h3>{item.role[lang]}</h3><p>{item.company}</p></div>
                <p className="career-value">{item.coreValue[lang]}</p>
                <span className="career-period">{item.period}</span>
              </article>
            ))}
          </div>
          <div className="capability-strip" data-reveal>
            {['QUẢN LÝ NHÂN SỰ','RETAIL OPERATIONS','STUDIO / MCN','AI WORKFLOWS','WEB / DIGITAL','HIDDEN MUSIC'].map(x => <span key={x}>{x}</span>)}
          </div>
        </section>

        <section id="contact" data-section="contact" className="editorial-section contact-section">
          <div className="section-number" data-reveal>03</div>
          <div className="contact-copy" data-reveal>
            <p className="eyebrow">LIÊN HỆ</p>
            <h2>{vi ? 'Nếu có việc đáng làm, hãy nói chuyện.' : 'If there is good work to do, let’s talk.'}</h2>
          </div>
          <div className="contact-lines" data-reveal>
            <a href="tel:0938649420"><span>ĐIỆN THOẠI</span><strong>0938 649 420</strong></a>
            <a href="mailto:studionopu@gmail.com"><span>EMAIL</span><strong>studionopu@gmail.com</strong></a>
            <a href={APPLE_CONTENT.contact.hiddenMusicUrl} target="_blank" rel="noreferrer"><span>ÂM NHẠC</span><strong>HIDDEN MUSIC ↗</strong></a>
          </div>
          <footer className="editorial-footer" data-reveal>
            <span>ĐÀ LẠT / GMT+7</span><span>© 2026 NGÔ PHÚC / POSTLAIN</span><button onClick={() => scrollToId('home')}>↑ ĐẦU TRANG</button>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default App;
