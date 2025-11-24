import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

const solutionOptions = [
  { key: "A", label: "Strategy / Research / M&A" },
  { key: "B", label: "Site Selection / Real Estate / Mapping" },
  { key: "C", label: "Forecasting (Sales, Customers, SKU's)" },
  { key: "D", label: "Marketing / OOH / Audience / Ads" },
  { key: "E", label: "Location Analytics / Cannibalization" },
  { key: "F", label: "Franchising / Territory Planning" },
  { key: "G", label: "Competitor Intelligence / Rankings / Sales" },
  { key: "H", label: "Traffic Counts / Zoning / County GIS" },
  { key: "I", label: "Planned Developments" },
  { key: "J", label: "Other / Custom" },
];

export default function Step81UseCases() {
  const navigate = useNavigate();

  // ⭐ now using new store keys
  const { useCases81, setUseCases81 } = useContext(AppContext);

  // Find saved custom value (if exists)
  const savedCustom =
    useCases81.find(
      (v) => !solutionOptions.map((o) => o.label).includes(v)
    ) || "";

  const [customValue, setCustomValue] = useState(savedCustom);

  // Convert saved values into key selection
  const initialKeys = useCases81.map((label) => {
    const match = solutionOptions.find((o) => o.label === label);
    return match ? match.key : "J"; // custom saved as J
  });

  const [selectedKeys, setSelectedKeys] = useState(initialKeys);
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

    let finalData = [];

    selectedKeys.forEach((key) => {
      if (key === "J") {
        if (!customValue.trim())
          return setError("Please enter your custom solution.");

        finalData.push(customValue.trim());
      } else {
        const option = solutionOptions.find((o) => o.key === key);
        if (option) finalData.push(option.label);
      }
    });

    // save in Step81 only (no overwrite of Step82)
    setUseCases81(finalData);

    navigate("/Step9TopPriorities");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start pt-10 px-4">
      <div className="w-full max-w-md p-6">
        
        <h3 className="text-base font-semibold mb-2">
          8 → Select the solutions that best align with your use cases*
        </h3>
        <p className="text-xs text-gray-500 mb-4">Select all that apply</p>

        {error && <p className="text-red-600 text-xs mb-2">{error}</p>}

        <div className="space-y-2 max-h-[65vh] overflow-y-auto mb-4">
          {solutionOptions.map((option) => {
            const isSelected = selectedKeys.includes(option.key);

            return (
              <div key={option.key}>
                <div
                  onClick={() => handleSelect(option.key)}
                  className={`p-3 border rounded-lg cursor-pointer flex items-center 
                    ${isSelected
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-gray-300"}`}
                >
                  <div className="w-6 h-6 mr-3 flex items-center justify-center bg-gray-200 rounded text-xs font-semibold">
                    {option.key}
                  </div>
                  {option.label}
                </div>

                {/* show custom input under "J" */}
                {option.key === "J" && isSelected && (
                  <input
                    type="text"
                    placeholder="Enter your custom solution"
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    className="w-full mt-2 p-2 border rounded bg-white"
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
