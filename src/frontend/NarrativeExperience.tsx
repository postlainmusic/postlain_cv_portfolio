import React from 'react';
import { useAppStore } from './stores/useAppStore';
import { getNarrativeCopy } from './content/narrativeCopy';
import { useStageManager, WORLD_IDS } from './narrative/stage/useStageManager';
import { Void } from './narrative/worlds/Void';
import { Water } from './narrative/worlds/Water';
import { Wood } from './narrative/worlds/Wood';
import { Fire } from './narrative/worlds/Fire';
import { Metal } from './narrative/worlds/Metal';
import { Earth } from './narrative/worlds/Earth';
import './styles/narrative.css';

export const NarrativeExperience: React.FC = () => {
  const locale = useAppStore((state) => state.locale);
  const toggleLocale = useAppStore((state) => state.toggleLocale);

  const { currentStage, currentWorldId, isTransitioning, direction, goToStage, nextStage, prevStage } =
    useStageManager();

  const copy = getNarrativeCopy(locale);

  return (
    <div
      className={`postlain-experience world-active--${currentWorldId} ${
        isTransitioning ? `is-transitioning dir--${direction}` : ''
      }`}
      role="region"
      aria-label="POSTLAIN Interactive Art Experience"
    >
      {/* Ambient Header: Brand mark, subtle orientation, locale toggle */}
      <header className="experience-header" role="banner">
        <button
          type="button"
          className="experience-brand-mark"
          onClick={() => goToStage(0)}
          aria-label="Return to beginning (Void)"
        >
          <span className="brand-logo-txt">{copy.brand.entity}</span>
        </button>

        <div className="experience-header-meta">
          <div className="ambient-orientation" aria-hidden="true">
            <span className="current-num">{String(currentStage).padStart(2, '0')}</span>
            <span className="total-divider">/</span>
            <span className="total-num">05</span>
          </div>

          <button
            type="button"
            className="experience-lang-btn"
            onClick={toggleLocale}
            aria-label={`Switch language to ${locale === 'vi' ? 'English' : 'Tiếng Việt'}`}
          >
            {locale === 'vi' ? 'EN' : 'VI'}
          </button>
        </div>
      </header>

      {/* Single Frame Stage: 100dvh Frame */}
      <main className="single-frame-stage" role="main">
        {currentStage === 0 && <Void copy={copy.worlds.void} locale={locale} />}
        {currentStage === 1 && <Water copy={copy.worlds.water} locale={locale} />}
        {currentStage === 2 && <Wood copy={copy.worlds.wood} locale={locale} onNext={nextStage} />}
        {currentStage === 3 && <Fire copy={copy.worlds.fire} locale={locale} project={copy.project} />}
        {currentStage === 4 && <Metal copy={copy.worlds.metal} locale={locale} materials={copy.materials} />}
        {currentStage === 5 && (
          <Earth copy={copy.worlds.earth} locale={locale} brand={copy.brand} onRestart={() => goToStage(0)} />
        )}
      </main>

      {/* Minimalist Orientation Navigation (Non-intrusive index bar) */}
      <nav className="ambient-index-nav" aria-label="World orientation">
        {WORLD_IDS.map((worldId, idx) => {
          const isActive = currentStage === idx;
          const worldCopy = copy.worlds[worldId];
          return (
            <button
              key={worldId}
              type="button"
              className={`index-dot ${isActive ? 'is-active' : ''}`}
              onClick={() => goToStage(idx)}
              aria-label={`Jump to ${worldCopy.name} (${String(idx).padStart(2, '0')})`}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="index-line" />
              <span className="index-label">{String(idx).padStart(2, '0')}</span>
            </button>
          );
        })}
      </nav>

      {/* Ambient Instruction Footer */}
      <footer className="experience-footer" aria-hidden="true">
        <span className="ambient-instruction-txt">{copy.navigation.instruction}</span>
      </footer>
    </div>
  );
};
