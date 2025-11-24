import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

const solutionOptions = [
  { key: "A", label: "SME Lending / Underwriting - Forecasting/Validation" },
  { key: "B", label: "Lending / Risk / Portfolio Monitoring" },
  { key: "C", label: "Strategy / Real Estate / Site Selection / Branch Planning" },
  { key: "D", label: "New Branch Forecasting - Deposits, Transactions" },
  { key: "E", label: "Competitor Intelligence" },
  { key: "F", label: "Business Development / Planned Development" },
  { key: "G", label: "Other" },
];

export default function Step88UseCases() {
  const navigate = useNavigate();
  const { useCases88, setUseCases88 } = useContext(AppContext);

  // Detect saved OTHER text
  const savedOtherText = Array.isArray(useCases88)
    ? useCases88.find((x) => !solutionOptions.some((op) => op.label === x))
    : "";

  // Convert saved labels to keys
  let initialSelectedKeys = Array.isArray(useCases88)
    ? useCases88
        .map((label) => {
          const found = solutionOptions.find((x) => x.label === label);
          return found ? found.key : null;
        })
        .filter((x) => x !== null)
    : [];

  // If OTHER was saved earlier, auto-select G
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
    if (selectedKeys.length === 0) return setError("Please select at least one option.");

    let final = selectedKeys
      .filter((key) => key !== "G")
      .map((key) => solutionOptions.find((o) => o.key === key).label);

    if (selectedKeys.includes("G")) {
      if (!otherText.trim()) return setError("Please enter Other option.");
      final.push(otherText.trim());
    }

    setUseCases88(final);
    navigate("/Step9JPriorities");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center pt-10 px-3">
      <div className="w-full max-w-md p-6 rounded-xl">
        <h5 className="font-semibold mb-2">8 → Select applicable solutions*</h5>

        {error && <p className="text-red-600 text-xs mb-3">{error}</p>}

        {/* SCROLL BOX ADDED — SAME AS STEP 86 */}
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
