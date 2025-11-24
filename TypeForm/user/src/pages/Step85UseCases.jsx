import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

const solutionOptions = [
  { key: "A", label: "Mobile Data / Location Analytics" },
  { key: "B", label: "Custom Geofencing" },
  { key: "C", label: "OOH / Marketing / Meta Ads" },
  { key: "D", label: "Segmentation / ICP / Persona" },
  { key: "E", label: "Competitor Intelligence" },
  { key: "F", label: "Trending Hashtags / Strategies To Drive Sales" },
  { key: "G", label: "Other" },
];

export default function Step85UseCases() {
  const navigate = useNavigate();

  // ⭐ Correct values from AppProvider
  const { useCases85, setUseCases85 } = useContext(AppContext);

  // Safe fallback
  const savedUseCases = Array.isArray(useCases85) ? useCases85 : [];

  // Detect saved custom value
  const savedCustom =
    savedUseCases.find(
      (v) => !solutionOptions.map((o) => o.label).includes(v)
    ) || "";

  const [customValue, setCustomValue] = useState(savedCustom);

  // Convert labels → selected keys
  const initialSelectedKeys = savedUseCases.map((label) => {
    const match = solutionOptions.find((o) => o.label === label);
    return match ? match.key : "G"; // unmatched → Other
  });

  const [selectedKeys, setSelectedKeys] = useState(initialSelectedKeys);
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

    let finalArray = [];

    selectedKeys.forEach((key) => {
      if (key === "G") {
        if (!customValue.trim())
          return setError("Please enter your custom use case.");
        finalArray.push(customValue.trim());
      } else {
        const option = solutionOptions.find((o) => o.key === key);
        if (option) finalArray.push(option.label);
      }
    });

    setUseCases85(finalArray);
    localStorage.setItem("useCases85", JSON.stringify(finalArray));

    navigate("/Step9EPriorities");
  };

  const OptionButton = ({ keyOption, label, isSelected, onClick }) => (
    <div
      onClick={onClick}
      className={`flex items-center p-3 rounded-lg border cursor-pointer transition 
      ${isSelected ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300"}`}
    >
      <div
        className={`w-6 h-6 flex items-center justify-center mr-3 text-xs font-semibold rounded
        ${isSelected ? "bg-white text-blue-600" : "bg-gray-200 text-gray-700"}`}
      >
        {keyOption}
      </div>

      {label}

      {isSelected && (
        <svg className="ml-auto w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start pt-10 px-3">
      <div className="w-full max-w-md p-6">

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

              {option.key === "G" && selectedKeys.includes("G") && (
                <input
                  type="text"
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  placeholder="Enter your custom use case"
                  className="w-full mt-2 p-2 border rounded-lg"
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
