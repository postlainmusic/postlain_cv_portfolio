import React, { useEffect } from 'react';
import { useAppStore } from './stores/useAppStore';
import { getNarrativeCopy } from './content/narrativeCopy';
import { NarrativeExperience } from './NarrativeExperience';

export const App: React.FC = () => {
  const { locale } = useAppStore();
  const copy = getNarrativeCopy(locale);

  useEffect(() => {
    document.title = copy.meta.title;
    document.documentElement.lang = locale;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', copy.meta.description);
    }
  }, [copy, locale]);

  return <NarrativeExperience />;
};

export default App;

