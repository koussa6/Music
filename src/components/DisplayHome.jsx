import React from 'react';
import { useAuth } from '../context/AuthContext';
import AlbumItem from './AlbumItem';
import { usePlayer } from '../context/PlayerContext';
import SongItem from './SongItem';

const DisplayHome = () => {
  const { albumsData, songsData } = usePlayer();
  return (
    <>
      <div className="mb-4">
        <h1 className="font-bold text-2xl my-5">Feature Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((album, index) => (
            <AlbumItem
              key={index}
              name={album.name}
              desc={album.desc}
              id={album._id}
              image={album.imageUrl}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="flex overflow-auto no-scrollbar">
          {songsData.map((song, index) => (
            <SongItem
              key={index}
              name={song.name}
              desc={song.desc}
              id={song._id}
              image={song.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
