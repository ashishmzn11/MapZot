import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

const solutionOptions = [
  { key: "A", label: "Retail Leakage / Tax Loss" },
  { key: "B", label: "Tenant Recruitment / Void Analysis" },
  { key: "C", label: "Visits / Mobile Data / Location Analytics" },
  { key: "D", label: "Custom Geofencing / Track Corridors" },
  { key: "E", label: "Reasoning (Spikes / Declines)" },
  { key: "F", label: "Population Research / Traffic Demographics" },
  { key: "G", label: "Cannibalization / Impacts / Overlaps" },
  { key: "H", label: "Visitor Spending / Resident Spending" },
  { key: "I", label: "Other" },
];

export default function Step82UseCases() {
  const navigate = useNavigate();

  // ⭐ NEW STORE FOR STEP 82
  const { useCases82, setUseCases82 } = useContext(AppContext);

  // Convert saved labels → keys
  const initialKeys = Array.isArray(useCases82)
    ? useCases82.map((label) => {
        const found = solutionOptions.find((o) => o.label === label);
        return found ? found.key : "I"; // for custom
      })
    : [];

  const [selectedKeys, setSelectedKeys] = useState(initialKeys);

  // Load saved OTHER value
  const savedOther = localStorage.getItem("useCases82_other") || "";
  const [otherText, setOtherText] = useState(savedOther);

  const [error, setError] = useState("");

  const handleSelect = (key) => {
    setError("");

    setSelectedKeys((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  };

  const handleSave = () => {
    if (selectedKeys.length === 0)
      return setError("Please select at least one option.");

    let finalList = [];

    selectedKeys.forEach((key) => {
      if (key === "I") {
        if (!otherText.trim())
          return setError("Please enter the 'Other' value.");

        finalList.push(otherText.trim());

        // Save OTHER text separately
        localStorage.setItem("useCases82_other", otherText.trim());
      } else {
        const option = solutionOptions.find((o) => o.key === key);
        if (option) finalList.push(option.label);
      }
    });

    // ⭐ Save Step82 ONLY
    setUseCases82(finalList);

    // Store in localStorage
    localStorage.setItem("useCases82", JSON.stringify(finalList));

    navigate("/Step9BPriorities");
  };

  const OptionButton = ({ keyOption, label, isSelected, onClick }) => (
    <div
      onClick={onClick}
      className={`flex items-center p-3 rounded-lg border cursor-pointer transition 
      ${isSelected ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300"}`}
    >
      <div
        className={`flex items-center justify-center w-6 h-6 mr-3 text-xs font-semibold rounded
        ${isSelected ? "bg-white text-blue-600" : "bg-gray-200 text-gray-700"}`}
      >
        {keyOption}
      </div>

      <span className="text-sm font-medium">{label}</span>

      {isSelected && (
        <svg className="ml-auto w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start pt-10 px-3">
      <div className="w-full max-w-md rounded-xl p-6 flex flex-col">

        <h5 className="text-base font-semibold mb-2">
          8 → Select the solutions that best align with your use cases*
        </h5>
        <p className="text-xs text-gray-500 mb-4">Select all that apply</p>

        {error && <p className="text-red-600 text-xs mb-3">{error}</p>}

        <div className="space-y-2 max-h-[60vh] overflow-y-auto mb-4">
          {solutionOptions.map((option) => (
            <div key={option.key}>
              <OptionButton
                keyOption={option.key}
                label={option.label}
                isSelected={selectedKeys.includes(option.key)}
                onClick={() => handleSelect(option.key)}
              />

              {/* Other Input */}
              {option.key === "I" && selectedKeys.includes("I") && (
                <input
                  type="text"
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  className="mt-2 w-full p-2 border rounded-lg text-sm"
                  placeholder="Enter your custom use case"
                />
              )}
            </div>
          ))}
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
