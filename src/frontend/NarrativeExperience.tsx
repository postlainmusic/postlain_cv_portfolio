import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from './stores/useAppStore';

const worlds = [
  { id: 'void', number: '00', nameVi: 'Khoảng không', nameEn: 'The Void', element: 'moon' },
  { id: 'water', number: '01', nameVi: 'Nước', nameEn: 'Water', element: 'water' },
  { id: 'wood', number: '02', nameVi: 'Mộc', nameEn: 'Wood', element: 'wood' },
  { id: 'fire', number: '03', nameVi: 'Hỏa', nameEn: 'Fire', element: 'fire' },
  { id: 'metal', number: '04', nameVi: 'Kim', nameEn: 'Metal', element: 'metal' },
  { id: 'earth', number: '05', nameVi: 'Đất', nameEn: 'Earth', element: 'earth' },
] as const;

const copy = {
  vi: {
    opening: 'Tôi không biết tất cả. Tôi chỉ tiếp tục học.',
    openingSmall: 'Một hành trình của những điều nhỏ bé dần tụ hội.',
    void: 'Không biết không phải là khoảng trống. Nó là nơi mọi thứ bắt đầu.',
    water: 'Mỗi nơi đi qua để lại một chút. Những điều rời rạc bắt đầu tìm thấy nhau.',
    wood: 'Từ những gì đã học, một cách nhìn dần bén rễ.',
    fire: 'Có những thứ không thể học nếu chưa từng đứng giữa sức nóng của nó.',
    metal: 'Sau những gì đã trải qua, những mảnh rời rạc bắt đầu kết tinh.',
    earth: 'Cuối cùng, mọi thứ trở về với một con người.',
    contact: 'Nếu chúng ta cùng một tần số, hãy nói chuyện.',
    scroll: 'Cuộn để đi tiếp',
    person: 'NGÔ PHÚC',
    entity: 'POSTLAIN',
  },
  en: {
    opening: 'I do not know everything. I just keep learning.',
    openingSmall: 'A journey where small pieces slowly find each other.',
    void: 'Not knowing is not an emptiness. It is where everything begins.',
    water: 'Every place leaves something behind. Disparate pieces begin to find each other.',
    wood: 'From what I learned, a way of seeing slowly takes root.',
    fire: 'Some things cannot be learned until you have stood inside their heat.',
    metal: 'After everything lived through, the scattered pieces begin to crystallize.',
    earth: 'In the end, everything returns to a person.',
    contact: 'If we are on the same frequency, let us talk.',
    scroll: 'Scroll to continue',
    person: 'NGÔ PHÚC',
    entity: 'POSTLAIN',
  },
};

type Locale = keyof typeof copy;

export const NarrativeExperience: React.FC = () => {
  const locale = useAppStore((state) => state.locale) as Locale;
  const toggleLocale = useAppStore((state) => state.toggleLocale);
  const [active, setActive] = useState('void');
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const t = copy[locale];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: '-15% 0px -15% 0px' },
    );
    Object.values(refs.current).forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => refs.current[id]?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className={`narrative narrative--${active}`}>
      <header className="narrative-header">
        <button className="narrative-mark" onClick={() => scrollTo('void')} aria-label="Back to beginning">
          {t.entity}
        </button>
        <div className="narrative-header-right">
          <span>{worlds.find((world) => world.id === active)?.number ?? '00'} / 05</span>
          <button onClick={toggleLocale} aria-label="Switch language">{locale === 'vi' ? 'EN' : 'VI'}</button>
        </div>
      </header>

      <nav className="narrative-nav" aria-label="Story chapters">
        {worlds.map((world) => (
          <button
            key={world.id}
            className={active === world.id ? 'is-active' : ''}
            onClick={() => scrollTo(world.id)}
            aria-label={locale === 'vi' ? world.nameVi : world.nameEn}
          >
            <span>{world.number}</span>
          </button>
        ))}
      </nav>

      <main>
        <section id="void" ref={(node) => { refs.current.void = node; }} className="world world--void">
          <div className="moon" aria-hidden="true" />
          <div className="star-field" aria-hidden="true" />
          <div className="desert" aria-hidden="true" />
          <div className="trace trace--void" aria-hidden="true" />
          <div className="world-copy world-copy--opening">
            <p className="world-index">00 / THE VOID</p>
            <h1>{t.entity}</h1>
            <p className="opening-line">{t.opening}</p>
            <p className="opening-small">{t.openingSmall}</p>
          </div>
          <div className="scroll-cue">{t.scroll}<span>↓</span></div>
        </section>

        <section id="water" ref={(node) => { refs.current.water = node; }} className="world world--water">
          <div className="water-surface" aria-hidden="true"><span /><span /><span /></div>
          <div className="fish fish--one" aria-hidden="true" /><div className="fish fish--two" aria-hidden="true" />
          <div className="water-bank" aria-hidden="true" />
          <div className="trace trace--water" aria-hidden="true" />
          <div className="world-copy world-copy--left">
            <p className="world-index">01 / WATER</p>
            <h2>{locale === 'vi' ? 'Những thứ bắt đầu tụ lại.' : 'Things begin to gather.'}</h2>
            <p>{t.water}</p>
          </div>
          <div className="artifact artifact--water" aria-hidden="true">01</div>
        </section>

        <section id="wood" ref={(node) => { refs.current.wood = node; }} className="world world--wood">
          <div className="canopy" aria-hidden="true" /><div className="tree tree--one" aria-hidden="true" /><div className="tree tree--two" aria-hidden="true" />
          <div className="petals" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="trace trace--wood" aria-hidden="true" />
          <div className="world-copy world-copy--right">
            <p className="world-index">02 / WOOD</p>
            <h2>{locale === 'vi' ? 'Những thứ bén rễ.' : 'Things take root.'}</h2>
            <p>{t.wood}</p>
          </div>
          <div className="bird-notes" aria-hidden="true">· · ·</div>
        </section>

        <section id="fire" ref={(node) => { refs.current.fire = node; }} className="world world--fire">
          <div className="volcano" aria-hidden="true"><span className="lava lava--one" /><span className="lava lava--two" /><span className="lava lava--three" /></div>
          <div className="ember-field" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="trace trace--fire" aria-hidden="true" />
          <div className="world-copy world-copy--left world-copy--fire">
            <p className="world-index">03 / FIRE</p>
            <h2>{locale === 'vi' ? 'Những thứ phải trải qua.' : 'Things lived through.'}</h2>
            <p>{t.fire}</p>
          </div>
          <div className="fire-word" aria-hidden="true">HEAT</div>
        </section>

        <section id="metal" ref={(node) => { refs.current.metal = node; }} className="world world--metal">
          <div className="sun" aria-hidden="true" />
          <div className="crystal-field" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="metal-form" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="trace trace--metal" aria-hidden="true" />
          <div className="world-copy world-copy--right world-copy--metal">
            <p className="world-index">04 / METAL</p>
            <h2>{locale === 'vi' ? 'Những thứ kết tinh.' : 'Things crystallize.'}</h2>
            <p>{t.metal}</p>
          </div>
        </section>

        <section id="earth" ref={(node) => { refs.current.earth = node; }} className="world world--earth">
          <div className="home-light" aria-hidden="true" /><div className="home-shape" aria-hidden="true" />
          <div className="earth-grain" aria-hidden="true" />
          <div className="humanoid" aria-hidden="true"><span className="humanoid-head" /><span className="humanoid-body" /><span className="humanoid-ribbon humanoid-ribbon--one" /><span className="humanoid-ribbon humanoid-ribbon--two" /></div>
          <div className="world-copy world-copy--earth">
            <p className="world-index">05 / EARTH</p>
            <h2>{t.earth}</h2>
            <p>{t.contact}</p>
            <div className="earth-name"><span>{t.person}</span><small>{t.entity}</small></div>
            <a href="mailto:hello@postlain.com" className="earth-email">hello@postlain.com</a>
          </div>
        </section>
      </main>
    </div>
  );
};
