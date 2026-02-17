import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import {
  ListMusic,
  Maximize2,
  Mic,
  Minimize2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Speaker,
  Volume2,
} from 'lucide-react';

export const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
  } = useContext(PlayerContext);

  // Return null if no track to prevent crashes
  if (!track) return null;

  return (
    /* Removed h-[10%] and justify-between to allow it to fill the sidebar area naturally */
    <div className="w-full flex flex-col gap-4 text-white">
      {/* 1. Track Info: Image and Text */}
      <div className="flex items-center gap-4 w-full">
        <img src={track.image} alt="" className="w-12 h-12 rounded shadow-lg" />
        <div className="flex-1 min-w-0">
          {' '}
          {/* min-w-0 allows text truncation */}
          <p className="font-bold truncate">{track.name}</p>
          <p className="text-sm opacity-70 truncate">{track.desc}</p>
        </div>
      </div>

      {/* 2. Controls and Progress Bar Group */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* Playback Buttons */}
        <div className="flex gap-6 items-center">
          <Shuffle className="w-4 h-4 cursor-pointer hover:text-green-500 transition-colors" />
          <SkipBack
            onClick={previous}
            className="w-5 h-5 cursor-pointer hover:text-green-500"
          />

          <div className="bg-white rounded-full p-2 text-black cursor-pointer hover:scale-105 transition-transform">
            {playStatus ? (
              <Pause onClick={pause} className="w-5 h-5 fill-black" />
            ) : (
              <Play onClick={play} className="w-5 h-5 fill-black" />
            )}
          </div>

          <SkipForward
            onClick={next}
            className="w-5 h-5 cursor-pointer hover:text-green-500"
          />
          <Repeat className="w-4 h-4 cursor-pointer hover:text-green-500 transition-colors" />
        </div>

        {/* Seek Bar Area: Now stretches to full width of the sidebar */}
        <div className="flex items-center gap-3 w-full">
          <p className="text-xs text-gray-400">
            {time.currentTime.minute}:
            {time.currentTime.second.toString().padStart(2, '0')}
          </p>

          <div
            ref={seekBg}
            onClick={seekSong}
            className="flex-1 bg-gray-600 h-1 rounded-full cursor-pointer relative"
          >
            {/* The actual progress bar */}
            <div
              ref={seekBar}
              className="absolute top-0 left-0 h-full bg-green-500 rounded-full w-0"
            />
          </div>

          <p className="text-xs text-gray-400">{track.duration}</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <ListMusic className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />
        <Mic className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />
        <Speaker className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />
        <Volume2 className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />
        <Minimize2 className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />
        <Maximize2 className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />
      </div>
    </div>
  );
};

export default Player;
