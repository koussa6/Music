import React from 'react';

const Loading = () => {
  return (
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

export default Loading;
