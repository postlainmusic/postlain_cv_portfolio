import React, { useEffect, useState } from 'react';
import { useAppStore } from './stores/useAppStore';
import { getContent } from './content';
import { Layout } from './core/Layout';
import { Chapter00Overture } from './sections/Chapter00Overture';
import { Chapter01Orchestration } from './sections/Chapter01Orchestration';
import { Chapter02SonicSpace } from './sections/Chapter02SonicSpace';
import { Chapter03Matrix } from './sections/Chapter03Matrix';
import { Chapter04Transmission } from './sections/Chapter04Transmission';

export const App: React.FC = () => {
  const { locale } = useAppStore();
  const content = getContent(locale);
  const [activeSection, setActiveSection] = useState<string>('overture');

  useEffect(() => {
    document.title = content.meta.documentTitle;
    document.documentElement.lang = locale;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', content.meta.description);
    }
  }, [content, locale]);

  // Track active section for navigation highlighting
  useEffect(() => {
    const sectionIds = ['overture', 'milestones', 'creative-tech', 'skills-education', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <Layout content={content} activeSection={activeSection}>
      <Chapter00Overture content={content.chapter00} />
      <Chapter01Orchestration content={content.chapter01} />
      <Chapter02SonicSpace content={content.chapter02} />
      <Chapter03Matrix content={content.chapter03} />
      <Chapter04Transmission content={content.chapter04} />
    </Layout>
  );
};

export default App;
