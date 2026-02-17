import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout.jsx';
import { Check, Image, Music } from 'lucide-react';
import { albumsAPI } from '../services/apiService.js';
import toast from 'react-hot-toast';
import { songsAPI } from '../services/apiService.js';

const AddSong = () => {
  const [image, setImage] = useState(null);
  const [song, setSong] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [album, setAlbum] = useState('');
  const [albumData, setAlbumData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      const request = { name, desc, album };
      formData.append('request', JSON.stringify(request));
      formData.append('audio', song);
      formData.append('image', image);
      const response = await songsAPI.add(formData);
      if (response.status === 201) {
        toast.success('Song added');
        setName('');
        setImage(null);
        setAlbum('');
        setDesc('');
        setSong('');
      } else {
        toast.error('Something went wrong.Please try again');
      }
    } catch (error) {
      toast.error(error.response.message);
    } finally {
      setLoading(false);
    }
  };
  const loadAlbumData = async () => {
    try {
      const response = await albumsAPI.list();
      setAlbumData(response.data.albums);
      console.log(response.data);
    } catch (error) {
      toast.error('Failed to load albums');
    }
  };
  useEffect(() => {
    loadAlbumData();
  }, []);
  return (
    <DashboardLayout activeMenu="Add Song">
      {loading ? (
        <div className="flex items-center justify-center h-124">
          <div className="animate-spin border-b-4 border-green-500 rounded-full h-20 w-20"></div>
        </div>
      ) : (
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-start gap-8 text-gray-600 mt-5"
        >
          <div className="flex gap-10">
            <div className="flex flex-col gap-4">
              <p>Upload Song</p>
              <input
                type="file"
                accept="audio/*,video/*"
                id="song"
                hidden
                onChange={(e) => setSong(e.target.files[0])}
              />
              <label
                className="border-2 border-dashed border-gray-400 flex flex-col items-center justify-center w-16 h-16 rounded-lg"
                htmlFor="song"
              >
                {song ? (
                  <Check className="w-8 h-8 text-green-500" />
                ) : (
                  <Music className="w-8 h-8 text-green-500" />
                )}
              </label>
            </div>
            <div className="flex flex-col gap-4">
              <p>Upload Image</p>
              <input
                type="file"
                accept="image/*"
                id="image"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
              <label
                className="border-2 border-dashed border-gray-400 flex flex-col items-center justify-center w-16 h-16 rounded-lg"
                htmlFor="image"
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Image className="text-gray-500 w-8 h-8" />
                )}
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <p>Song Name</p>
            <input
              type="text"
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250)]"
              placeholder="Type here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <p>Song Description</p>
            <input
              type="text"
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250)]"
              placeholder="Type here"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <p>Album</p>
            <select
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]"
            >
              <option value="none">None</option>
              {albumData.map((album, index) => (
                <option value={album.name} key={index}>
                  {album.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="text-base bg-[#3be477] text-white py-2.5 px-14 cursor-pointer hover:bg-[#3be355]"
          >
            Add
          </button>
        </form>
      )}
    </DashboardLayout>
  );
};

export default AddSong;
