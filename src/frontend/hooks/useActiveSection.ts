import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || 'overture');

  useEffect(() => {
    if (typeof window === 'undefined' || sectionIds.length === 0) return;

    // Check hash on initial load
    const hash = window.location.hash.replace('#', '');
    if (hash && sectionIds.includes(hash)) {
      setActiveSection(hash);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}


