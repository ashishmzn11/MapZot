import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider"; // Assuming this context exists
import { useNavigate } from "react-router-dom";

// Options for Step 9: Banking, Lending and Financial Services
const bankingPriorityOptions = [
  { key: "A", label: "Improve SME lending or commercial credit underwriting." },
  { key: "B", label: "Open new higher performing branches this year." },
  { key: "C", label: "Forecast deposits and impacts prior to opening new branches" },
  { key: "D", label: "Improve risk monitoring on current portfolios" },
  { key: "E", label: "Other" },
];

// Assuming this component handles the priorities for this specific persona
export default function Step9JPriorities() {
  const navigate = useNavigate();
  // Placeholder context properties for this specific Step 9 (e.g., suffixed with 'Banking')
  const { 
    bankingPriorities9, 
    setBankingPriorities9, 
    bankingPriorities9Other, 
    setBankingPriorities9Other 
  } = useContext(AppContext);

  // ------------ Load existing data ------------
  let savedOtherText = bankingPriorities9Other || "";
  let savedKeys = [];

  // Convert saved labels to keys for initial state
  if (Array.isArray(bankingPriorities9)) {
    savedKeys = bankingPriorities9
      .map((item) => {
        const found = bankingPriorityOptions.find((op) => op.label === item);
        return found ? found.key : null;
      })
      .filter(Boolean);

    // If "Other" text exists in context but "E" wasn't explicitly saved, add "E"
    if (savedOtherText && !savedKeys.includes("E")) {
        savedKeys.push("E");
    }
  }

  // ------------ States ------------
  const [selectedKeys, setSelectedKeys] = useState(savedKeys);
  const [otherText, setOtherText] = useState(savedOtherText);
  const [error, setError] = useState("");

  // ------------ Select Option ------------
  const handleSelect = (key) => {
    setError("");

    setSelectedKeys((prev) =>
      prev.includes(key)
        ? prev.filter((x) => x !== key) // Deselect
        : [...prev, key] // Select
    );
  };

  // ------------ Save Data and Navigate ------------
  const handleSave = () => {
    if (selectedKeys.length === 0) {
      return setError("Please select at least one priority.");
    }

    // Convert keys → labels for non-other options
    let finalLabels = selectedKeys
      .filter((k) => k !== "E") // Exclude the 'E' key itself
      .map((k) => bankingPriorityOptions.find((op) => op.key === k).label);

    // Handle "Other" option
    if (selectedKeys.includes("E")) {
      if (!otherText.trim()) {
        return setError("Please enter the Other priority.");
      }

      setBankingPriorities9Other(otherText.trim());
      // Add the custom text to the final labels list
      finalLabels.push(otherText.trim());
    } else {
      setBankingPriorities9Other(""); // Clear other text if "Other" isn't selected
    }

    // Save the final list of labels in context
    setBankingPriorities9(finalLabels);

    // Navigate to the next step (e.g., Step10)
    navigate("/Step10Timeline"); 
  };

  // Checkbox/check-mark icon (same as provided code)
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
      <div className="w-full max-w-md rounded-xl p-6">
        <h5 className="text-base font-semibold mb-2">
          9 → Select top priorities for your team?*
        </h5>

        {/* Subtitle from the image */}
        <p className="text-sm text-gray-700 font-medium mb-4">
          Banking, Lending and Financial Services
        </p>
        
        <p className="text-xs text-gray-500 mb-1">Choose as many as you like</p>

        {error && <p className="text-red-600 text-xs mb-3">{error}</p>}

        {/* Form options container with scroll */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto mb-6 pr-1">
          {bankingPriorityOptions.map((option) => {
            const isSelected = selectedKeys.includes(option.key);
            
            return (
              <div key={option.key}>
                {/* Option button/div */}
                <div
                  onClick={() => handleSelect(option.key)}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition 
                    ${
                      isSelected
                        ? "bg-blue-600 border-blue-600 text-white" // Selected Style
                        : "bg-white border-gray-300 shadow-sm" // Default Style
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

                  {/* Checkmark Icon */}
                  {isSelected && <CheckIcon />}
                </div>

                {/* "Other" Text Input (Key E) */}
                {option.key === "E" && isSelected && (
                  <input
                    type="text"
                    placeholder="Enter Other Priority"
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    className="w-full mt-2 p-3 border text-sm rounded-lg shadow-inner focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              </div>
            );
          })}
        </div>

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