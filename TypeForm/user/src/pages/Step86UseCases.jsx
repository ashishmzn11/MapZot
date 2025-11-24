import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

const solutionOptions = [
  { key: "A", label: "Revenue & Demand Forecasting" },
  { key: "B", label: "Real Estate Strategy / Placements" },
  { key: "C", label: "ICP Matching / Product Market Fit" },
  { key: "D", label: "Stocking & Overstocking Optimization" },
  { key: "E", label: "Marketing/ OOH Advertising / Audience" },
  { key: "F", label: "Visit Trend / Mobile Data / Location Analytics" },
  { key: "G", label: "Other" },
];

export default function Step86UseCases() {
  const navigate = useNavigate();
  const { useCases86, setUseCases86 } = useContext(AppContext);

  // Detect saved OTHER text
  const savedOtherText = Array.isArray(useCases86)
    ? useCases86.find((x) => !solutionOptions.some((op) => op.label === x))
    : "";

  // Convert saved labels → keys
  let initialSelectedKeys = Array.isArray(useCases86)
    ? useCases86
        .map((label) => {
          const found = solutionOptions.find((x) => x.label === label);
          return found ? found.key : null;
        })
        .filter((x) => x !== null)
    : [];

  // Auto-select G if OTHER was saved
  if (savedOtherText && !initialSelectedKeys.includes("G")) {
    initialSelectedKeys.push("G");
  }

  const [selectedKeys, setSelectedKeys] = useState(initialSelectedKeys);
  const [otherText, setOtherText] = useState(savedOtherText || "");
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

    let final = selectedKeys
      .filter((key) => key !== "G")
      .map((key) => solutionOptions.find((o) => o.key === key).label);

    if (selectedKeys.includes("G")) {
      if (!otherText.trim())
        return setError("Please enter your 'Other' option.");
      final.push(otherText.trim());
    }

    setUseCases86(final);
    navigate("/Step9FPriorities");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center pt-10 px-3">
      <div className="w-full max-w-md p-6 rounded-xl">
        <h5 className="font-semibold mb-2">8 → Select applicable solutions*</h5>

        {error && <p className="text-red-600 text-xs mb-3">{error}</p>}

        {/* Scrollable options box */}
        <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
          {solutionOptions.map((op) => (
            <div
              key={op.key}
              onClick={() => handleSelect(op.key)}
              className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                selectedKeys.includes(op.key)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-gray-300"
              }`}
            >
              <span className="mr-3 font-bold">{op.key}</span>
              <span className="flex-1">{op.label}</span>
            </div>
          ))}

          {selectedKeys.includes("G") && (
            <input
              type="text"
              placeholder="Enter Other"
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              className="w-full p-2 border rounded"
            />
          )}
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
