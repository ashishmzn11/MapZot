import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

const solutionOptions = [
  { key: "A", label: "Smart Site Selection / Land Identification" },
  { key: "B", label: "Void Analysis / Tenant Matching" },
  { key: "C", label: "Land GIS / Parcel Vision / Zoning / Wetlands" },
  { key: "D", label: "Mobile Data / Location Analytics" },
  { key: "E", label: "Growth Business Discovery" },
  { key: "F", label: "Revenue Forecasting / Market Planning" },
  { key: "G", label: "Planned Development Insights" },
  { key: "H", label: "Mapping / GIS / Data Import" },
  { key: "I", label: "Other" },
];

export default function Step89UseCases() {
  const navigate = useNavigate();
  const { useCases89, setUseCases89, useCases89Other, setUseCases89Other } =
    useContext(AppContext);

  // Restore keys from saved labels
  let initialKeys = [];
  if (Array.isArray(useCases89)) {
    initialKeys = useCases89
      .map((label) => {
        const found = solutionOptions.find((o) => o.label === label);
        return found ? found.key : null;
      })
      .filter(Boolean);
  }

  // If other text was saved earlier
  if (useCases89Other && !initialKeys.includes("I")) {
    initialKeys.push("I");
  }

  const [selectedKeys, setSelectedKeys] = useState(initialKeys);
  const [otherText, setOtherText] = useState(useCases89Other || "");
  const [error, setError] = useState("");

  const handleSelect = (key) => {
    setError("");

    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSave = () => {
    if (selectedKeys.length === 0)
      return setError("Please select at least one option.");

    let final = selectedKeys
      .filter((key) => key !== "I")
      .map((key) => solutionOptions.find((o) => o.key === key).label);

    if (selectedKeys.includes("I")) {
      if (!otherText.trim())
        return setError("Please enter your 'Other' option.'");

      final.push(otherText.trim());
      setUseCases89Other(otherText.trim());
    } else {
      setUseCases89Other("");
    }

    setUseCases89(final);
    navigate("/Step9KPriorities");
  };

  const OptionButton = ({ keyOption, label, isSelected, onClick }) => (
    <div
      onClick={onClick}
      className={`flex items-center p-3 rounded-lg border cursor-pointer transition
        ${
          isSelected
            ? "bg-blue-600 border-blue-600 text-white"
            : "bg-white border-gray-300"
        }`}
    >
      <div
        className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold mr-3
        ${isSelected ? "bg-white text-blue-600" : "bg-gray-200 text-gray-700"}`}
      >
        {keyOption}
      </div>

      <span className="text-sm flex-1">{label}</span>

      {isSelected && (
        <svg className="w-5 h-5" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center pt-10 px-3">
      <div className="w-full max-w-md p-6 rounded-xl">
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

              {option.key === "I" && selectedKeys.includes("I") && (
                <input
                  type="text"
                  placeholder="Enter Other"
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  className="w-full p-2 border rounded mt-2"
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
