import React from 'react';

const SongItem = ({ image, name, desc, id }) => {
  return (
    <div className="min-w-[180px]  px-2 py-2 rounded cursor-pointer hover:bg-[#ffffff26]">
      <img
        src={image}
        alt="album image"
        className="rounded min-h-36 max-h-36"
      />
      <div className="flex justify-between">
        <p className="font-bold mt-2 mb-1">{name}</p>
        <p className="text-slate-200 text-sm mt-3">{desc}</p>
      </div>
    </div>
  );
};

export default SongItem;
