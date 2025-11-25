import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

const solutionOptions = [
  { key: "A", label: "Void Analysis / Tenant Mix / Highest Use" },
  { key: "B", label: "Maps - Parcel, Zoning, Flood, Traffic" },
  { key: "C", label: "Smart Site Selection / Identification" },
  { key: "D", label: "Data Layers / Data Imports / Pipeline Management" },
  { key: "E", label: "Competitor Intelligence / Planned Developments" },
  { key: "F", label: "Impacts / Cannibalization / Overlaps / Cross-Visits" },
  { key: "G", label: "Persona / Ideal Customer Profile / Segmentation" },
  { key: "H", label: "Retail Sales / Rankings / Cross Visits" },
  { key: "I", label: "Other" },
];

export default function Step8HUseCases() {
  const navigate = useNavigate();
  const { useCases8H, setUseCases8H, useCases8HOther, setUseCases8HOther } =
    useContext(AppContext);

  // ------------ Load existing "other" text ------------
  let savedOtherText = useCases8HOther || "";

  // ------------ Convert saved labels -> keys ------------
  let savedKeys = [];

  if (Array.isArray(useCases8H)) {
    savedKeys = useCases8H
      .map((item) => {
        const found = solutionOptions.find((op) => op.label === item);
        return found ? found.key : null;
      })
      .filter(Boolean);
  }

  // If Other text exists → auto select "I"
  if (savedOtherText && !savedKeys.includes("I")) {
    savedKeys.push("I");
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
        ? prev.filter((x) => x !== key)
        : [...prev, key]
    );
  };

  // ------------ Save Data ------------
  const handleSave = () => {
    if (selectedKeys.length === 0) {
      return setError("Please select at least one option.");
    }

    // Convert keys → labels
    let finalLabels = selectedKeys
      .filter((k) => k !== "I")
      .map((k) => solutionOptions.find((op) => op.key === k).label);

    // Handle Other
    if (selectedKeys.includes("I")) {
      if (!otherText.trim()) {
        return setError("Please enter the Other use case.");
      }

      setUseCases8HOther(otherText.trim());
      finalLabels.push(otherText.trim());
    } else {
      setUseCases8HOther(""); // remove if not selected
    }

    // Save in context
    setUseCases8H(finalLabels);

    navigate("/Step10Timeline");
  };

 return (
  <div className=" min-h-screen flex justify-center items-start pt-10 px-3">
    <div className="w-full max-w-md rounded-xl p-6">

      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>

        <h5 className="text-base font-semibold mb-2">
          8 → Select the solutions that best align with your use cases*
        </h5>

        <p className="text-xs text-gray-500 mb-1">Select all that apply</p>

        {error && <p className="text-red-600 text-xs mb-3">{error}</p>}

        <div className="space-y-2 max-h-[60vh] overflow-y-auto mb-4 pr-1">
          {solutionOptions.map((option) => (
            <div key={option.key}>
              <div
                onClick={() => handleSelect(option.key)}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition 
                  ${
                    selectedKeys.includes(option.key)
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
              >
                <div
                  className={`flex items-center justify-center w-6 h-6 mr-3 text-xs font-bold rounded
                  ${
                    selectedKeys.includes(option.key)
                      ? "bg-white text-blue-600"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {option.key}
                </div>

                <span className="text-sm font-medium flex-1">
                  {option.label}
                </span>

                {selectedKeys.includes(option.key) && (
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

              {option.key === "I" && selectedKeys.includes("I") && (
                <input
                  type="text"
                  placeholder="Enter Other"
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  className="w-full mt-2 p-2 border text-sm rounded-lg"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 bg-black text-white rounded-lg"
          >
            OK
          </button>
        </div>

      </form>

    </div>
  </div>
);

}
