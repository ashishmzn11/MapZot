import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

const priorityOptions = [
  { key: "A", label: "Make better location decisions" },
  { key: "B", label: "Get performance estimates prior to opening new locations" },
  { key: "C", label: "Drive more customers to open locations" },
  { key: "D", label: "Optimize marketing and ads spend" },
  { key: "E", label: "Better understand who our customers are" },
  { key: "F", label: "Other" },
];

export default function Step9TopPriorities() {
  const navigate = useNavigate();

  const {
    useCases9,
    setUseCases9,
    useCases9Other,
    setUseCases9Other,
  } = useContext(AppContext);

  // ------------ Load Existing Saved Data ------------
  let savedOtherText = useCases9Other || "";
  let savedKeys = [];

  if (Array.isArray(useCases9)) {
    savedKeys = useCases9
      .map((label) => {
        const found = priorityOptions.find((x) => x.label === label);
        return found ? found.key : null;
      })
      .filter(Boolean);

    // Auto-select Other if text exists
    if (savedOtherText && !savedKeys.includes("F")) {
      savedKeys.push("F");
    }
  }

  // ------------ State ------------
  const [selectedKeys, setSelectedKeys] = useState(savedKeys);
  const [otherText, setOtherText] = useState(savedOtherText);
  const [error, setError] = useState("");

  // ------------ Select Handler ------------
  const handleSelect = (key) => {
    setError("");

    setSelectedKeys((prev) => {
      if (prev.includes(key)) {
        if (key === "F") setOtherText("");
        return prev.filter((x) => x !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  // ------------ Save Handler ------------
  const handleSave = () => {
    if (selectedKeys.length === 0)
      return setError("Please select at least one priority.");

    let final = selectedKeys
      .filter((k) => k !== "F")
      .map((k) => priorityOptions.find((x) => x.key === k).label);

    if (selectedKeys.includes("F")) {
      if (!otherText.trim())
        return setError("Please enter the Other priority.");

      setUseCases9Other(otherText.trim());
      final.push(otherText.trim());
    } else {
      setUseCases9Other("");
    }

    setUseCases9(final);
    navigate("/Step10Timeline");
  };

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
      />
    </svg>
  );

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center pt-10 px-3">
      <div className="w-full max-w-md p-6 rounded-xl">
        <h5 className="font-semibold mb-2">
          9 → Select top priorities for your team*
        </h5>

        {error && <p className="text-red-600 text-xs mb-3">{error}</p>}

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {priorityOptions.map((op) => {
            const isSelected = selectedKeys.includes(op.key);

            return (
              <div key={op.key}>
                <div
                  onClick={() => handleSelect(op.key)}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-6 h-6 mr-3 text-xs font-bold rounded ${
                      isSelected
                        ? "bg-white text-blue-600"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {op.key}
                  </div>

                  <span className="flex-1">{op.label}</span>

                  {isSelected && <CheckIcon />}
                </div>

                {op.key === "F" && isSelected && (
                  <input
                    type="text"
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    placeholder="Enter Other Priority"
                    className="w-full mt-2 p-3 border rounded-lg"
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
