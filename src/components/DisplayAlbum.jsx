import React from 'react';
import { useParams } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import Loading from './Loading';
import { assets } from '../assets/assets';
import { Clock } from 'lucide-react';

const DisplayAlbum = () => {
  const { id } = useParams();
  const { albumsData, songsData } = usePlayer();

  const album = albumsData?.find((a) => a._id === id);
  // 🔒 HARD GUARD (prevents white screen)
  console.log(album);
  if (!albumsData || !album) {
    return <Loading />;
  }

  return (
    <>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img src={album.imageUrl} alt={album.name} className="w-48 rounded" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{album.name}</h2>
          <h4>{album.desc}</h4>
          <p className="mt-1">
            <img
              src={assets.logo}
              alt="logo"
              className="inline-block w-5 mr-1"
            />
            <b>Musify</b> • 1,23,456 likes • <b>6 Songs • </b> about 2 hr 30min
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date added</p>
        <Clock className="m-auto w-4 " />
      </div>

      <hr />

      {songsData
        .filter((song) => song.album === album.name)
        .map((song, index) => (
          <>
            <div
              key={index}
              className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
            >
              <p className="text-white">
                <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                <img src={song.image} className="inline w-10 mr-5" />
                {song.name}
              </p>

              <p className="text-[15px]">{album.name}</p>
              <p className="text-[15px] hidden sm:block">5 days ago</p>
              <p className="text-[15px] text-center">{song.duration}</p>
            </div>
            <hr
              style={{
                backgroundColor: album.bgColor,
                opacity: 0.2,
                height: '2px',
                border: 'none',
              }}
            />
          </>
        ))}
    </>
  );
};

export default DisplayAlbum;
