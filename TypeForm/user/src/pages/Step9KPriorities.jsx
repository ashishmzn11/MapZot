import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

// Options for Step 9: Brokerage, Tenant Rep, Leasing and Landlord Rep
const brokeragePriorityOptions = [
  { key: "A", label: "Lease faster to local and national chains" },
  { key: "B", label: "Research growing businesses, brands and chains." },
  { key: "C", label: "Monitor business performance and trends" },
  { key: "D", label: "Get store rankings and cross visits" },
  { key: "E", label: "Find better sites for our clients" },
  { key: "F", label: "Other" },
];

export default function Step9KPriorities() {
  const navigate = useNavigate();

  const {
    brokeragePriorities9,
    setBrokeragePriorities9,
    brokeragePriorities9Other,
    setBrokeragePriorities9Other,
  } = useContext(AppContext);

  // ------------ Load saved data ------------
  const savedOtherText = brokeragePriorities9Other || "";

  let savedKeys = [];

  if (Array.isArray(brokeragePriorities9)) {
    savedKeys = brokeragePriorities9
      .map((item) => {
        const found = brokeragePriorityOptions.find((op) => op.label === item);
        return found ? found.key : null;
      })
      .filter(Boolean);

    // Add F if other exists
    if (savedOtherText && !savedKeys.includes("F")) {
      savedKeys.push("F");
    }
  }

  const [selectedKeys, setSelectedKeys] = useState(savedKeys);
  const [otherText, setOtherText] = useState(savedOtherText);
  const [error, setError] = useState("");

  const handleSelect = (key) => {
    setError("");
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]
    );
  };

  const handleSave = () => {
    if (selectedKeys.length === 0) {
      return setError("Please select at least one priority.");
    }

    let finalLabels = selectedKeys
      .filter((k) => k !== "F")
      .map((k) => brokeragePriorityOptions.find((op) => op.key === k).label);

    if (selectedKeys.includes("F")) {
      if (!otherText.trim()) {
        return setError("Please enter the Other priority.");
      }
      setBrokeragePriorities9Other(otherText.trim());
      finalLabels.push(otherText.trim());
    } else {
      setBrokeragePriorities9Other("");
    }

    setBrokeragePriorities9(finalLabels);

    navigate("/Step10Timeline");
  };

  const CheckIcon = () => (
    <svg className="ml-auto w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
  );

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start pt-10 px-3">
      <div className="w-full max-w-md rounded-xl p-6">
        <h5 className="text-base font-semibold mb-2">
          9 → Select top priorities for your team?*
        </h5>

        <p className="text-sm text-gray-700 font-medium mb-4">
          Brokerage, Tenant Rep, Leasing and Landlord Rep
        </p>

        <p className="text-xs text-gray-500 mb-1">Choose as many as you like</p>

        {error && <p className="text-red-600 text-xs mb-3">{error}</p>}

        <div className="space-y-3 max-h-[60vh] overflow-y-auto mb-6 pr-1">
          {brokeragePriorityOptions.map((option) => {
            const isSelected = selectedKeys.includes(option.key);

            return (
              <div key={option.key}>
                <div
                  onClick={() => handleSelect(option.key)}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition 
                      ${
                        isSelected
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white border-gray-300 shadow-sm"
                      }`}
                >
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

                  <span className="text-sm font-medium flex-1">{option.label}</span>

                  {isSelected && <CheckIcon />}
                </div>

                {option.key === "F" && isSelected && (
                  <input
                    type="text"
                    placeholder="Enter Other Priority"
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    className="w-full mt-2 p-3 border text-sm rounded-lg shadow-inner 
                               focus:ring-blue-500 focus:border-blue-500"
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
