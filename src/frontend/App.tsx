import React, { useEffect } from 'react';
import { useAppStore } from './stores/useAppStore';
import { getContent } from './content';
import { useActiveSection } from './hooks/useActiveSection';
import { Layout } from './core/Layout';
import { Chapter00Overture } from './sections/Chapter00Overture';
import { Chapter01Orchestration } from './sections/Chapter01Orchestration';
import { Chapter02SonicSpace } from './sections/Chapter02SonicSpace';
import { Chapter03Matrix } from './sections/Chapter03Matrix';
import { Chapter04Transmission } from './sections/Chapter04Transmission';

const SECTION_IDS = ['overture', 'orchestration', 'sonic-space', 'matrix', 'transmission'];

export const App: React.FC = () => {
  const { locale } = useAppStore();
  const content = getContent(locale);
  const activeSection = useActiveSection(SECTION_IDS);

  // Sync document title and language tag
  useEffect(() => {
    document.title = content.meta.documentTitle;
    document.documentElement.lang = locale;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', content.meta.description);
    }
  }, [content, locale]);

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
