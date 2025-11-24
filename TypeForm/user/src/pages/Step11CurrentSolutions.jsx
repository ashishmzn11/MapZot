import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider"; // Assuming this context exists
import { useNavigate } from "react-router-dom";

// Options for Step 11: Current Solutions
const solutionOptions = [
  { key: "A", label: "Basic GIS/Mapping" },
  { key: "B", label: "Listing Platform: Example CoStar, Loopnet" },
  { key: "C", label: "CRM Platforms: Example Monday, Salesforce" },
  { key: "D", label: "Data Warehouse: Example Snowflake, Tableau" },
  { key: "E", label: "Other" },
];

export default function Step11CurrentSolutions() {
  const navigate = useNavigate();
  // Placeholder context properties for Step 11 solutions
  const { 
    currentSolutions11, 
    setCurrentSolutions11, 
    currentSolutions11Other, 
    setCurrentSolutions11Other 
  } = useContext(AppContext);

  // ------------ Load existing data ------------
  let savedOtherText = currentSolutions11Other || "";
  let savedKeys = [];

  // Convert saved labels to keys for initial state
  if (Array.isArray(currentSolutions11)) {
    savedKeys = currentSolutions11
      .map((item) => {
        const found = solutionOptions.find((op) => op.label === item);
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

  // ------------ Select Option (Multi-Select Logic) ------------
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
      return setError("Please select at least one solution.");
    }

    // Convert keys → labels for non-other options
    let finalLabels = selectedKeys
      .filter((k) => k !== "E") // Exclude the 'E' key itself
      .map((k) => solutionOptions.find((op) => op.key === k).label);

    // Handle "Other" option
    if (selectedKeys.includes("E")) {
      if (!otherText.trim()) {
        return setError("Please enter the Other solution.");
      }

      setCurrentSolutions11Other(otherText.trim());
      // Add the custom text to the final labels list
      finalLabels.push(otherText.trim());
    } else {
      setCurrentSolutions11Other(""); // Clear other text if "Other" isn't selected
    }

    // Save the final list of labels in context
    setCurrentSolutions11(finalLabels);

    // Navigate to the end screen (e.g., /ThankYou)
    navigate("/Step12TrialOptions"); 
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
          11 → What solutions does your team use today?
        </h5>

        {/* Subtitle from the image */}
        <p className="text-sm text-gray-500 font-medium mb-4">
          Select all that apply
        </p>
        
        <p className="text-xs text-gray-500 mb-1">Choose as many as you like</p>

        {error && <p className="text-red-600 text-xs mb-3">{error}</p>}

        {/* Form options container with scroll */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto mb-6 pr-1">
          {solutionOptions.map((option) => {
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
                    placeholder="Enter Other Solution"
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