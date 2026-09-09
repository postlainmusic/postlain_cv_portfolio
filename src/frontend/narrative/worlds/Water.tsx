import type { MutableRefObject, RefCallback } from 'react';
import { useWaterSimulation } from '../interaction/useWaterSimulation';

type WaterCopy = {
  water: string;
  scroll: string;
};

type WaterProps = {
  copy: WaterCopy;
  locale: 'vi' | 'en';
  sectionRef: RefCallback<HTMLElement>;
};

const flowLabels = {
  vi: ['Mặt nước tĩnh (Pond)', 'Dòng chảy êm (Stream)', 'Sóng xung lực (Surge)'],
  en: ['Still Pond', 'Slow Stream', 'Ripple Surge'],
};

export const Water = ({ copy, locale, sectionRef }: WaterProps) => {
  const { bind, canvasRef, containerRef, flowState, isReducedMotion, nextFlowState } = useWaterSimulation();

  return (
    <section
      id="water"
      ref={(node) => {
        sectionRef(node);
        (containerRef as MutableRefObject<HTMLElement | null>).current = node;
      }}
      className="world world--water"
      data-flow={flowState}
      data-reduced-motion={isReducedMotion || undefined}
      {...bind}
      aria-labelledby="water-title"
    >
      <canvas ref={canvasRef} className="water-canvas" aria-hidden="true" />
      <div className="water-vignette" aria-hidden="true" />
      <p className="water-index" aria-hidden="true">01 — GATHER</p>

      <div className="water-copy">
        <p className="water-kicker">
          {locale === 'vi' ? '2019 — 2020 // KHỞI ĐẦU THỰC CHIẾN' : '2019 — 2020 // EARLY GROUNDING'}
        </p>
        <h2 id="water-title">
          {locale === 'vi' ? 'Những thứ bắt đầu tụ lại.' : 'Things begin to gather.'}
        </h2>
        <p className="water-statement">{copy.water}</p>
        <p className="water-secondary">
          {locale === 'vi'
            ? 'Những ca làm đầu tiên tại Viva Star Coffee — nơi sự kiên nhẫn và trật tự dòng chảy hình thành trước khi chạm vào âm thanh.'
            : 'Early frontline shifts at Viva Star Coffee — where patience and operational flow took shape before meeting sound.'}
        </p>
      </div>

      <div className="water-controls">
        <button
          type="button"
          className="water-compose"
          onClick={nextFlowState}
          aria-describedby="water-instruction"
        >
          <span aria-hidden="true">{String(flowState + 1).padStart(2, '0')}</span>
          {isReducedMotion
            ? flowLabels[locale][flowState]
            : `${flowLabels[locale][flowState]} — ${locale === 'vi' ? 'Chạm để khuấy động' : 'Touch to disturb'}`}
        </button>
        <p id="water-instruction" className="sr-only">
          Move pointer or drag to produce fluid ripples across the water surface. The button cycles flow intensities.
        </p>
      </div>

      <div className="water-artifact" aria-hidden="true">
        <span>01</span>
        <small>H₂O // CONVERGENCE</small>
      </div>

      <a className="water-next" href="#wood">
        <span>{copy.scroll}</span>
        <i aria-hidden="true">↓</i>
      </a>
    </section>
  );
};
