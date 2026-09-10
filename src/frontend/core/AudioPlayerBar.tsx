import React from 'react';
import { Play, Pause, ExternalLink, Disc3, Loader2, AlertCircle } from 'lucide-react';
import { SiteContent } from '../content/types';
import { useAudioController } from '../hooks/useAudioController';
import { useAppStore } from '../stores/useAppStore';

interface AudioPlayerBarProps {
  listeningContent: SiteContent['chapter02']['listeningRoom'];
  platformUrl: string;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  listeningContent,
  platformUrl,
}) => {
  const { soundEnabled } = useAppStore();
  const { status, toggle, progress } = useAudioController();

  if (!soundEnabled) return null;

  return (
    <aside
      aria-label="Editorial Audio Player"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-auto p-4 rounded-xl bg-[#0e1013]/95 border border-white/10 backdrop-blur-md shadow-2xl transition-all duration-300 animate-fadeIn"
    >
      <div className="flex items-center gap-3.5">
        
        {/* Play / Pause / Unavailable State Button */}
        <button
          type="button"
          onClick={toggle}
          disabled={status === 'UNAVAILABLE' || status === 'LOADING'}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
            status === 'UNAVAILABLE'
              ? 'bg-zinc-800 border border-white/5 text-zinc-500 cursor-not-allowed opacity-80'
              : status === 'PLAYING'
              ? 'bg-accent-amber text-black hover:bg-white'
              : 'bg-zinc-800 border border-white/10 text-white hover:border-accent-amber hover:text-accent-amber'
          }`}
          aria-label={
            status === 'UNAVAILABLE'
              ? 'Audio stream unavailable in web build. Visit Hidden Music directly.'
              : status === 'PLAYING'
              ? 'Pause audio playback'
              : status === 'LOADING'
              ? 'Buffering audio stream...'
              : 'Play audio track'
          }
        >
          {status === 'LOADING' ? (
            <Loader2 className="w-4 h-4 animate-spin text-accent-amber" />
          ) : status === 'PLAYING' ? (
            <Pause className="w-4 h-4" />
          ) : status === 'UNAVAILABLE' ? (
            <Disc3 className="w-4 h-4 text-zinc-500" />
          ) : status === 'ERROR' ? (
            <AlertCircle className="w-4 h-4 text-red-400" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}
        </button>

        {/* Track Metadata & Platform Access */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span className="text-[10px] font-mono text-accent-amber uppercase font-semibold tracking-wider truncate">
              {status === 'UNAVAILABLE'
                ? 'OFFLINE STREAM'
                : status === 'PLAYING'
                ? 'NOW PLAYING'
                : 'PREVIEW READY'}
            </span>
            <a
              href={platformUrl}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-accent-amber transition-colors flex items-center gap-1 text-[10px] font-mono"
              title="Visit Hidden Music Platform"
            >
              <span>HIDDEN MUSIC</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <p className="text-xs font-bold text-white truncate">
            {listeningContent.trackTitle}
          </p>
          <p className="text-[10px] font-mono text-zinc-400 truncate">
            {listeningContent.trackMeta}
          </p>
        </div>

      </div>

      {/* Progress Bar */}
      {status === 'PLAYING' && progress > 0 && (
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-3 w-full h-1 bg-zinc-800 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-accent-amber transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </aside>
  );
};
