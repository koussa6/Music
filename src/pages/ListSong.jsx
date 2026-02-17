import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { songsAPI } from '../services/apiService';
import toast from 'react-hot-toast';
import { Album, Clock, Image, Music, Trash2 } from 'lucide-react';

const ListSong = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const response = await songsAPI.list();
      setData(response.data.songs);
    } catch (error) {
      toast.error('Failed to load songs');
    } finally {
      setLoading(false);
    }
  };
  const removeSong = async (id) => {
    try {
      const response = await songsAPI.remove(id);
      if (response.status === 204) {
        toast.success('Album deleted');
        await fetchSongs();
      }
    } catch (error) {
      toast.error('Something went wrong.Try again');
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return data ? (
    <DashboardLayout activeMenu="List Songs">
      <div className="p-6 overflow-hidden">
        {/*Header section*/}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Songs Library
          </h1>
          <p className="text-gray-600">Manage your songs collection</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/*Table header*/}
          <div className="bg-gradient-to-r from-[#3be477] to-[#2dd865] px-6 py-4">
            <div className="grid grid-cols-12  text-white font-semibold">
              <div className="col-span-2 flex items-center gap-2">
                <Music className="w-4 h-4" />
                <span>Cover</span>
              </div>
              <div className="col-span-3">Song Title</div>
              <div className="col-span-3 flex items-center gap-2">
                <Album className="w-4 h-4" />
                <span>Album</span>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Duration</span>
              </div>
              <div className="col-span-2 text-center">Actions</div>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <div className="flex items-center justify-center flex-col gap-2 py-5 pt-10">
                <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg ">No songs found</p>
                <p className="text-gray-400 text-sm ">
                  Add some songs to get started
                </p>
              </div>
            ) : (
              data.map((song, index) => (
                <div
                  className="grid grid-cols-12 gap-4 items-center py-6 hover:bg-gradient-50 transition-colors duration-200"
                  key={index}
                >
                  <div className="col-span-2 pl-5">
                    <div className="w-12 h-12 rounded-lg shadow-md hover:shadow-lg transition-colors duration-200 overflow-hidden">
                      <img
                        src={song.image}
                        alt={song.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="col-span-3 pl-5">
                    <p className="font-medium text-gray-900 truncate ">
                      {song.name}
                    </p>
                  </div>
                  <div className="col-span-3 pl-5">
                    <p className=" text-gray-900 truncate ">{song.album}</p>
                  </div>
                  <div className="col-span-2">
                    <div className=" ">
                      <span className="pl-5 text-gray-500 ">
                        {song.duration}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2 text-center pr-10">
                    <button
                      title="Delete song"
                      onClick={() => removeSong(song._id)}
                      className="bg-red-300 p-2  rounded-full text-red-800 cursor-pointer relative"
                    >
                      <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {data.length > 0 && (
          <div className="mt-6 px-6 py-4 flex items-center justify-between text-sm text-gray-600">
            <span>
              Total Songs:
              <span className="font-semibold text-gray-900">{data.length}</span>
            </span>
            <span>
              Last updated:
              <span className="font-semibold text-gray-900">Just Now</span>
            </span>
          </div>
        )}
      </div>
    </DashboardLayout>
  ) : (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-green-900 via-black to-green-900 backdrop-blur-md z-50">
      {/* Spinner Container */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer Glow Ring */}
        <div className="absolute h-28 w-28 rounded-full border-4 border-green-500/20 animate-pulse"></div>

        {/* 3D-ish Spinner */}
        <div
          className="h-20 w-20 border-4 border-t-green-500 border-r-green-500 border-b-transparent border-l-transparent rounded-full"
          style={{ animation: 'spin 1.2s linear infinite' }}
        ></div>

        {/* Center Glow Dot */}
        <div className="absolute h-4 w-4 bg-green-500 rounded-full shadow-[0_0_25px_rgba(34,197,94,0.8)]"></div>
      </div>

      {/* Text & Ellipsis */}
      <div className="flex flex-col items-center">
        <span
          className="text-gray-200 text-lg font-semibold uppercase tracking-wider mb-3 animate-fade"
          style={{ animation: 'fade 1.5s ease-in-out infinite alternate' }}
        >
          Loading...
        </span>

        <div className="flex space-x-2">
          {[0, 0.2, 0.4].map((delay, i) => (
            <span
              key={i}
              className="h-2 w-2 bg-green-500 rounded-full"
              style={{
                animation: `bounce 0.6s infinite`,
                animationDelay: `${delay}s`,
              }}
            ></span>
          ))}
        </div>
      </div>

      {/* Inline Keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }

          @keyframes fade {
            0% { opacity: 0.6; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default ListSong;
