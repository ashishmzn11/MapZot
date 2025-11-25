import React, { useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

export default function WelcomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { industryKey } = useContext(AppContext);

  // --------------------------
  // Dynamic Flow After Step7
  // --------------------------
  const flowMap = {
    A: ["/Step81UseCases", "/Step9TopPriorities", "/Step10Timeline"],
    B: ["/Step82UseCases", "/Step9BPriorities", "/Step10Timeline"],
    C: ["/Step83UseCases", "/Step10Timeline"],
    D: ["/Step81UseCases", "/Step9TopPriorities", "/Step10Timeline"],
    E: ["/Step85UseCases", "/Step9EPriorities", "/Step10Timeline"],
    F: ["/Step86UseCases", "/Step9FPriorities", "/Step10Timeline"],
    G: ["/Step81UseCases", "/Step9TopPriorities", "/Step10Timeline"],
    H: ["/Step8HUseCases", "/Step10Timeline"],
    I: ["/Step81UseCases", "/Step9TopPriorities", "/Step10Timeline"],
    J: ["/Step88UseCases", "/Step9JPriorities", "/Step10Timeline"],
    K: ["/Step89UseCases", "/Step9KPriorities", "/Step10Timeline"],
    L: ["/Step81UseCases", "/Step9TopPriorities", "/Step10Timeline"],
  };

  const dynamicSteps = industryKey ? flowMap[industryKey] : [];

  // --------------------------
  // Static + Dynamic Steps
  // --------------------------
  const steps = [
    "/",  
    "/step1",
    "/Step2Fullname",
    "/Step3Email",
    "/Step4Number",
    "/Step5Role",
    "/Step6BusinessName",
    "/Step7Industry",
    ...dynamicSteps,       // <-- THIS IS THE MAGIC (Step8, Step9, Step10)
    "/Step11CurrentSolutions",
    "/Step12TrialOptions",
  ];

  const currentIndex = steps.indexOf(location.pathname);

  const goNext = () => {
    if (currentIndex < steps.length - 1) {
      navigate(steps[currentIndex + 1]);
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      navigate(steps[currentIndex - 1]);
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col lg:flex-row overflow-hidden bg-white">

  {/* LEFT SIDE */}
  <div className="w-full lg:w-7/12 relative bg-white flex flex-col items-center p-0 min-h-[40vh] lg:min-h-screen">

    {/* LOGO */}
    <div className="absolute top-0 left-0 p-6 z-10 w-full flex items-center gap-3">
      <svg width="35" height="29" viewBox="0 0 30 23">
        <path
          fill="#9155FD"
          d="M30,21.39C30,21.75 29.9,22.11 29.71,22.42C29.14,23.36 27.92,23.67 26.97,23.1L23.71,21.15C23.11,20.79 22.74,20.14 22.74,19.44L22.74,12.74L15,17.17L7.25,12.74L7.25,19.44C7.25,20.14 6.88,20.79 6.28,21.15L3.02,23.1C2.07,23.67 0.85,23.36 0.28,22.42C0.09,22.11 0,21.75 0,21.39L0,3.57C0,2.46 0.89,1.57 2,1.57C2.36,1.57 2.73,1.67 3.04,1.86L15,9.19L26.95,1.86C27.26,1.67 27.63,1.57 28,1.57C29.1,1.57 30,2.46 30,3.57Z"
        />
      </svg>
      <h1 className="text-3xl font-extrabold text-[#5e43f3]">MapZot.AI</h1>
    </div>

    {/* IMAGE */}
    <img
      src="/image.png"
      alt="MapZot.AI Illustration"
      className="w-full max-w-2xl h-auto object-contain mt-10 lg:mt-20 scale-100"
    />
  </div>

  {/* RIGHT SIDE */}
  <div className="bg-gray-100 w-full lg:w-5/12 flex flex-col p-8 lg:p-16 overflow-y-auto lg:min-h-screen shadow-2xl">

  <div className="max-w-md w-full mx-auto flex flex-col flex-1 m-0 p-0">


      {/* OUTLET */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* BUTTONS BOTTOM */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={goPrevious}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Previous
        </button>

        <button
          onClick={goNext}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          Next
        </button>
      </div>

    </div>
  </div>

</div>

  );
}
