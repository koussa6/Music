import React, { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Image } from 'lucide-react';
import toast from 'react-hot-toast';
import { albumsAPI } from '../services/apiService.js';
const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [color, setColor] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const submithandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      const request = { name, desc, bgColor: color };
      formData.append('request', JSON.stringify(request));
      formData.append('file', image);
      const response = await albumsAPI.add(formData);
      if (response.status === 201) {
        toast.success('Album added');
        setName('');
        setDesc('');
        setImage(false);
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.log(error.message);
      toast.error('Error adding album.PLease try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout activeMenu="Add Album">
      {loading ? (
        <div className="flex items-center justify-center h-124">
          <div className="animate-spin border-b-4 border-green-500 rounded-full h-20 w-20"></div>
        </div>
      ) : (
        <form
          onSubmit={submithandler}
          className="flex flex-col items-start gap-8 text-gray-600 mt-5"
        >
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
          <div className="flex flex-col gap-2.5">
            <p>Album Name</p>
            <input
              type="text"
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250)]"
              placeholder="Type here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <p>Album Description</p>
            <input
              type="text"
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250)]"
              placeholder="Type here"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <p>Background Color</p>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-base bg-[#3be477] text-white py-2.5 px-14 cursor-pointer hover:bg-[#3be3]"
          >
            Add
          </button>
        </form>
      )}
    </DashboardLayout>
  );
};

export default AddAlbum;
