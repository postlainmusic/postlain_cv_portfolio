import React, { useEffect } from 'react';
import { useAppStore } from './stores/useAppStore';
import { getContent } from './content';
import { NarrativeExperience } from './NarrativeExperience';

export const App: React.FC = () => {
  const { locale } = useAppStore();
  const content = getContent(locale);

  useEffect(() => {
    document.title = content.meta.documentTitle;
    document.documentElement.lang = locale;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', content.meta.description);
    }
  }, [content, locale]);

  return <NarrativeExperience />;
};

export default App;
