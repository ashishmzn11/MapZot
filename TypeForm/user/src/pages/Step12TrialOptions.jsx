import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider"; // Assuming this context exists
import { useNavigate } from "react-router-dom";

// Options for Step 12: Trial Options (Single Select)
const trialOptions = [
  { key: "A", label: "Limited Trial — Explore core capabilities" },
  { key: "B", label: "Custom Demo — Review my specific use cases" },
];

export default function Step12TrialOptions() {
  const navigate = useNavigate();
  // Placeholder context property for Step 12 selection
  const { trialChoice12, setTrialChoice12 } = useContext(AppContext);

  // ------------ Load existing data ------------
  let savedKey = trialChoice12 
    ? trialOptions.find(op => op.label === trialChoice12)?.key || "" 
    : "";

  // ------------ States ------------
  const [selectedKey, setSelectedKey] = useState(savedKey);
  const [error, setError] = useState("");

  // ------------ Select Option (Single Select Logic) ------------
  const handleSelect = (key) => {
    setError("");
    // If the currently selected key is clicked, deselect it. Otherwise, select the new one.
    setSelectedKey(prev => prev === key ? "" : key);
  };

  // ------------ Submit Data and Navigate ------------
  const handleSubmit = () => {
    if (!selectedKey) {
      return setError("Please select one of the options to proceed.");
    }

    // Convert key → label
    const finalLabel = trialOptions.find((op) => op.key === selectedKey).label;

    // Save in context
    setTrialChoice12(finalLabel);

    // Navigate to the end screen (e.g., /ThankYou or a confirmation screen)
    navigate("/Confirmation"); 
  };

  // Checkbox/check-mark icon (for selected option)
  const CheckIcon = () => (
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
  );


  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start pt-10 px-3">
      <div className="w-full max-w-md rounded-xl p-6 bg-white shadow-lg">
        {/* Title */}
        <h5 className="text-base font-semibold mb-4">
          12 → A full trial is currently unavailable for your industry and use case.
        </h5>

        {/* Informational Text */}
        <p className="text-sm text-gray-700 mb-6 leading-relaxed">
          You may proceed with a limited trial to review basic capabilities, or schedule a customized demo with our team for a detailed assessment aligned with your operational requirements.
        </p>

        {error && <p className="text-red-600 text-xs mb-3">{error}</p>}

        {/* Options container */}
        <div className="space-y-3 mb-6">
          {trialOptions.map((option) => {
            const isSelected = selectedKey === option.key;
            
            return (
              <div key={option.key}>
                {/* Option button/div */}
                <div
                  onClick={() => handleSelect(option.key)}
                  className={`flex items-center p-4 rounded-lg border cursor-pointer transition 
                    ${
                      isSelected
                        ? "bg-blue-600 border-blue-600 text-white shadow-md" 
                        : "bg-gray-50 border-gray-300 hover:border-blue-400" 
                    }`}
                >
                  {/* Key (A, B) Circle */}
                  <div
                    className={`flex items-center justify-center w-6 h-6 mr-3 text-xs font-bold rounded
                      ${
                        isSelected
                          ? "bg-white text-blue-600" 
                          : "bg-gray-200 text-gray-700" 
                      }`}
                  >
                    {option.key}
                  </div>

                  {/* Label Text */}
                  <span className="text-sm font-medium flex-1">
                    {option.label}
                  </span>

                  {/* Checkmark Icon */}
                  {isSelected && <CheckIcon />}
                </div>
              </div>
            );
          })}
        </div>

     <div className="w-full flex justify-center">
  <button
    onClick={handleSubmit}
    className="w-full max-w-[120px] px-3 py-3 bg-black text-white text-base font-bold rounded-lg
               hover:bg-gray-800 transition shadow-md border-r-4 flex items-center justify-center"
  >
    Submit
  </button>
</div>


        {/* Footer Link */}
        <p className="text-xs text-gray-500 mt-4">
            Never submit passwords! - <a href="#" className="underline">Report abuse</a>
        </p>
      </div>
    </div>
  );
}