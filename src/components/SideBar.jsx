import { ArrowRight, Home, Library, Plus, Search, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import Player from './Player';

const SideBar = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, setIsSearchActive, handleClearSearch } =
    useSearch();
  const handleSearch = () => {
    setShowSearchInput(true);
    setIsSearchActive(true);
    navigate('/search');
  };
  const ClearSearch = () => {
    setShowSearchInput(false);
    handleClearSearch();
  };
  return (
    <div className=" h-full p-2 flex-col text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer hover:text-green-500 transition-colors"
        >
          <Home className="w-6 h-6" />
          <p className="font-bold">Home</p>
        </div>
        <div className=" py-2">
          {!showSearchInput ? (
            <div
              onClick={handleSearch}
              className="flex items-center gap-3 cursor-pointer hover:text-green-400  transition-colors"
            >
              <Search className="w-6 h-6" />
              <p className="font-bold">Search</p>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-4 pr-4">
              <Search className="text-gray-500 w-5 h-5" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="What do you want?"
                className="flex w-full bg-[#2a2a2a] text-white placeholder-gray-400 px-3 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                autoFocus
              />
              <button
                onClick={ClearSearch}
                className="p-1 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Library className="w-8 h-8" />
            <p className="font-semibold">Your library</p>
          </div>
          <div className="flex items-center gap-3">
            <ArrowRight className="w-5 h-5 cursor-pointer hover:text-green-400 transition-colors" />
            <Plus className="w-5 h-5 cursor-pointer hover:text-green-400 transition-colors" />
          </div>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1>Create your first playlist</h1>
          <p className="font-light">It's easy we will help you</p>
          <button className="px-4 py-2 bg-white text-[15px] text-black rounded-full mt-4">
            Create playlist
          </button>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start pl-4">
          <h1>Let's find some podcasts to follow</h1>
          <p className="font-light">We will keep you updated on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Browse podcasts
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
