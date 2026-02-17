import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

export const PlayerContext = createContext();
export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const API_BASE_URL = 'http://localhost:8080';

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, token } = useAuth();
  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const play = async () => {
    audioRef.current.play();
    setPlayStatus(true);
  };
  const pause = async () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };
  const playwithid = async (id) => {
    songsData.map((item) => {
      if (id === item._id) {
        setTrack(item);
      }
    });
    await audioRef.current.play();
    setPlayStatus(true);
  };
  const previous = async () => {
    const currentIndex = songsData.findIndex((item) => item._id === track._id);
    if (currentIndex > 0) {
      const prevTrack = songsData[currentIndex - 1];
      setTrack(prevTrack); // Update the track state
    }
  };

  const next = async () => {
    const currentIndex = songsData.findIndex((item) => item._id === track._id);
    if (currentIndex < songsData.length - 1) {
      const nextTrack = songsData[currentIndex + 1];
      setTrack(nextTrack);
    }
  };
  const seekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  const getAuthHeaders = () =>
    token ? { Authorization: `Bearer ${token}` } : {};

  const getSongsData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/songs`, {
        headers: getAuthHeaders(),
      });
      const songs = res.data.songs || [];
      setSongsData(songs);
      if (songs.length > 0) {
        setTrack(songs[0]);
      }
    } catch (err) {
      console.error(err);
      setSongsData([]);
    }
  };

  const getAlbumsData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/albums`, {
        headers: getAuthHeaders(),
      });
      setAlbumsData(res.data.albums || []);
    } catch (err) {
      console.error(err);
      setAlbumsData([]);
    }
  };

  useEffect(() => {
    if (!user || !token) return;

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getAlbumsData(), getSongsData()]);
      setLoading(false);
    };

    fetchData();
  }, [user, token]);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateSeekBar = () => {
      if (seekBar.current && audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        seekBar.current.style.width = Math.floor(progress) + '%';
        setTime({
          currentTime: {
            second: Math.floor(audio.currentTime % 60),
            minute: Math.floor(audio.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audio.duration % 60),
            minute: Math.floor(audio.duration / 60),
          },
        });
      }
    };

    const handleLoadedMetaData = () => {
      if (seekBar.current) {
        seekBar.current.style.width = '0%';
      }
    };
    audio.addEventListener('timeupdate', updateSeekBar);
    audio.addEventListener('loadedmetadata', handleLoadedMetaData);
    return () => {
      audio.removeEventListener('timeupdate', updateSeekBar);
      audio.removeEventListener('loadedmetadata', handleLoadedMetaData);
    };
  }, [track]);
  return (
    <PlayerContext.Provider
      value={{
        albumsData,
        songsData,
        loading,
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playwithid,
        previous,
        next,
        seekSong,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
