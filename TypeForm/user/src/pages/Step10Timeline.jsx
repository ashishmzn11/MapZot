import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider"; // Assuming this context exists
import { useNavigate } from "react-router-dom";

// Options for Step 10: Timeline
const timelineOptions = [
  { key: "A", label: "Immediately (this week)" },
  { key: "B", label: "Within 30 days" },
  { key: "C", label: "Within 90 days" },
  { key: "D", label: "Just exploring" },
];

export default function Step10Timeline() {
  const navigate = useNavigate();
  // Placeholder context properties for Step 10 timeline
  const { timeline10, setTimeline10 } = useContext(AppContext);

  // ------------ Load existing data (This is a single-select question) ------------
  let savedKey = timeline10 
    ? timelineOptions.find(op => op.label === timeline10)?.key || "" 
    : "";

  // ------------ States ------------
  // For a single-select, we store the single selected key or null/empty string
  const [selectedKey, setSelectedKey] = useState(savedKey);
  const [error, setError] = useState("");

  // ------------ Select Option (Single Select Logic) ------------
  const handleSelect = (key) => {
    setError("");
    // If the currently selected key is clicked, deselect it. Otherwise, select the new one.
    setSelectedKey(prev => prev === key ? "" : key);
  };

  // ------------ Save Data and Navigate ------------
  const handleSave = () => {
    if (!selectedKey) {
      return setError("Please select a timeline option.");
    }

    // Convert key → label
    const finalLabel = timelineOptions.find((op) => op.key === selectedKey).label;

    // Save in context
    setTimeline10(finalLabel);

    // Navigate to the next step or thank you screen
    navigate("/Step11CurrentSolutions"); 
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start pt-10 px-3">
      <div className="w-full max-w-md rounded-xl p-6">
        <h5 className="text-base font-semibold mb-6">
          10 → Timeline to Get Started
        </h5>

        {error && <p className="text-red-600 text-xs mb-3">{error}</p>}

        {/* Form options container */}
        <div className="space-y-3 mb-6">
          {timelineOptions.map((option) => {
            const isSelected = selectedKey === option.key;
            
            return (
              <div key={option.key}>
                {/* Option button/div */}
                <div
                  onClick={() => handleSelect(option.key)}
                  // The styling is adapted for a single-select box, making it look clean and distinct
                  className={`flex items-center p-4 rounded-lg border cursor-pointer transition 
                    ${
                      isSelected
                        ? "bg-blue-600 border-blue-600 text-white shadow-md" // Selected Style
                        : "bg-white border-gray-300 hover:border-blue-400" // Default Style
                    }`}
                >
                  {/* Key (A, B, C, etc.) Circle */}
                  <div
                    className={`flex items-center justify-center w-6 h-6 mr-3 text-xs font-bold rounded
                      ${
                        isSelected
                          ? "bg-white text-blue-600" // Selected Key Style
                          : "bg-gray-200 text-gray-700" // Default Key Style
                      }`}
                  >
                    {option.key}
                  </div>

                  {/* Label Text */}
                  <span className="text-sm font-medium flex-1">
                    {option.label}
                  </span>

                  {/* Checkmark Icon (Only for selected) */}
                  {isSelected && (
                    <svg
                      className="ml-auto w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* OK Button */}
       <div className="flex justify-end">
  <button
    onClick={handleSave}
    className="px-5 py-2 bg-black text-white rounded-lg"
  >
    OK
  </button>
</div>
      </div>
    </div>
  );
}