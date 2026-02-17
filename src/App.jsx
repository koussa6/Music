import React, { useContext, useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import DisplayHome from './components/DisplayHome';
import NavBar from './components/NavBar';
import Search from './components/Search';
import DisplayAlbum from './components/DisplayAlbum';
import SideBar from './components/SideBar';
import { PlayerContext } from './context/PlayerContext';
import Player from './components/Player';

function App() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { albumsData, audioRef, track } = useContext(PlayerContext);
  const displayRef = useRef();

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register';

  const isAlbum = location.pathname.startsWith('/album');

  const album = isAlbum
    ? albumsData.find((a) => location.pathname.endsWith(a._id))
    : null;

  const bgColor = album?.bgColor || '#121212';

  useEffect(() => {
    if (!displayRef.current) return;

    displayRef.current.style.background = isAlbum
      ? `linear-gradient(${bgColor}, #121212)`
      : '#121212';
  }, [isAlbum, bgColor]);

  return (
    <>
      <Toaster />

      {isAuthPage ? (
        <Routes>
          <Route
            path="/register"
            element={!isAuthenticated() ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={isAuthenticated() ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      ) : (
        <div className="h-screen bg-black flex p-2 gap-2 overflow-hidden">
          <audio ref={audioRef} src={track ? track.file : ''} preload="auto" />
          {/* LEFT COLUMN: Sidebar + Player */}
          {/* LEFT COLUMN: Sidebar + Player */}
          <div className="w-[30%] lg:w-[25%] h-full flex flex-col gap-2 items-stretch">
            {/* Sidebar Wrapper */}
            <div className="flex-1 bg-[#121212] rounded-lg overflow-y-auto w-full">
              <SideBar />
            </div>

            {/* Player Wrapper */}
            <div className="bg-[#121212] rounded-lg p-4 w-full min-h-[180px]">
              <Player />
            </div>
          </div>{' '}
          {/* RIGHT COLUMN: Main Display Area */}
          <div
            ref={displayRef}
            className="flex-1 h-full bg-[#121212] rounded-lg overflow-y-auto flex flex-col"
          >
            <div className="sticky top-0 z-10 backdrop-blur-sm px-6 pt-4 pb-3">
              <NavBar />
            </div>

            <div className="flex-1 px-6 pb-4">
              <Routes>
                <Route
                  path="/"
                  element={
                    isAuthenticated() ? (
                      <DisplayHome />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route path="/search" element={<Search />} />
                <Route path="/album/:id" element={<DisplayAlbum />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
