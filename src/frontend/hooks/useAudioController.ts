import { useState, useRef, useEffect, useCallback } from 'react';

export type AudioStatus = 'UNAVAILABLE' | 'READY' | 'LOADING' | 'PLAYING' | 'PAUSED' | 'ERROR';

interface UseAudioControllerProps {
  src?: string;
}

export function useAudioController({ src }: UseAudioControllerProps = {}) {
  const [status, setStatus] = useState<AudioStatus>(src ? 'READY' : 'UNAVAILABLE');
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!src) {
      setStatus('UNAVAILABLE');
      setProgress(0);
      setDuration(0);
      setCurrentTime(0);
      return;
    }

    const audio = new Audio(src);
    audioRef.current = audio;
    audio.preload = 'metadata';

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setStatus('READY');
    };

    const onTimeUpdate = () => {
      if (audio.duration) {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const onWaiting = () => {
      setStatus('LOADING');
    };

    const onPlaying = () => {
      setStatus('PLAYING');
    };

    const onEnded = () => {
      setStatus('PAUSED');
      setProgress(0);
      setCurrentTime(0);
    };

    const onError = () => {
      setStatus('ERROR');
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audioRef.current = null;
    };
  }, [src]);

  const play = useCallback(() => {
    if (!audioRef.current || status === 'UNAVAILABLE') return;
    setStatus('LOADING');
    audioRef.current
      .play()
      .then(() => setStatus('PLAYING'))
      .catch(() => setStatus('ERROR'));
  }, [status]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setStatus('PAUSED');
  }, []);

  const toggle = useCallback(() => {
    if (status === 'PLAYING') {
      pause();
    } else if (status === 'READY' || status === 'PAUSED') {
      play();
    }
  }, [status, play, pause]);

  const seek = useCallback((targetPercent: number) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const targetTime = (targetPercent / 100) * audioRef.current.duration;
    audioRef.current.currentTime = targetTime;
    setProgress(targetPercent);
    setCurrentTime(targetTime);
  }, []);

  return {
    status,
    progress,
    duration,
    currentTime,
    play,
    pause,
    toggle,
    seek,
  };
}

