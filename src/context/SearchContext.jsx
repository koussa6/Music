import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { usePlayer } from './PlayerContext';
export const SearchContext = createContext();
export const useSearch = () => {
  const context = useContext(SearchContext);
  return context;
};
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ songs: [], albums: [] });
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { songsData, albumsData } = usePlayer();
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults({ songs: [], albums: [] });
      return;
    }

    const query = searchQuery.toLowerCase();
    const filteredAlbums = albumsData.filter(
      (album) =>
        album.name.toLowerCase().includes(query) ||
        album.desc.toLowerCase().includes(query),
    );
    const filteredSongs = albumsData.filter(
      (song) =>
        song.name.toLowerCase().includes(query) ||
        song.desc.toLowerCase().includes(query),
    );
    setSearchResults({
      songs: filteredSongs,
      albums: filteredAlbums,
    });
  }, [albumsData, songsData, searchQuery]);
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults({ albums: [], songs: [] });
    setIsSearchActive(false);
  };
  const contextValue = {
    handleClearSearch,
    searchQuery,
    setSearchQuery,
    isSearchActive,
    setIsSearchActive,
    searchResults,
  };
  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};
