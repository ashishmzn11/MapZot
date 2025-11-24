import React from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const WelcomePage = () => {

  return (
    <div className="w-screen h-screen flex">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-5/12 relative bg-white p-10 items-center justify-start overflow-hidden"> 
        <div className="absolute top-8 left-10 z-10">
          <h1 className="text-3xl font-extrabold" style={{ color: '#5e43f3' }}>
            <span className="mr-1">M</span> MapZot.AI
          </h1>
        </div>

        <img
          src="/image.png"
          alt="MapZot.AI Illustration"
          className="w-full h-auto object-contain mt-20"
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-7/12 flex flex-col justify-center p-8 lg:p-16 bg-gray-100 h-screen">
        <div className="max-w-xl mx-auto w-full">
          <Outlet />

          {/* Navigation Buttons */}
          <div className="mt-20 flex justify-end space-x-4">

            {/* PREVIOUS */}
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Previous
            </button>

            {/* NEXT */}
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
              Next
            </button>

          </div>
        </div>
      </div>

    </div>
  );
};

export default WelcomePage;
