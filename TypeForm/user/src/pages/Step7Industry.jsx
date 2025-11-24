import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

const industryOptions = [
  { key: "A", label: "Restaurants / QSR / Coffee / Drive-Thru" },
  { key: "B", label: "Civic / Economic Development / Public" },
  { key: "C", label: "Medical / Clinics / Health Systems / Healthcare" },
  { key: "D", label: "Retail / Wellness / Cannabis / Petcare / Entertainment" },
  { key: "E", label: "Advertising / Media / Marketing Agencies" },
  { key: "F", label: "Consumer Brands / CPG / Distribution" },
  { key: "G", label: "Automotive / Quick Lube / Carwash / Parts" },
  { key: "H", label: "CRE / Developers / REITS / Hedge Funds" },
  { key: "I", label: "Market Research / Consulting" },
  { key: "J", label: "Banking / Financial Services" },
  { key: "K", label: "Leasing / Brokerage / TenantRep / Advisory" },
  { key: "L", label: "Other" },
];

const redirectMap = {
  A: "/Step81UseCases",
  B: "/Step82UseCases",
  C: "/Step83UseCases",
  D: "/Step81UseCases",
  E: "/Step85UseCases",
  F: "/Step86UseCases",
  G: "/Step81UseCases",
  H: "/Step8HUseCases",
  I: "/Step81UseCases",
  J: "/Step88UseCases",
  K: "/Step89UseCases",
  L: "/Step81UseCases",
};

export default function Step7Industry() {
  const navigate = useNavigate();

  const { industry, setIndustry, industryKey, setIndustryKey } =
    useContext(AppContext);

  const [selectedKey, setSelectedKey] = useState(industryKey || "");
  const [otherIndustryValue, setOtherIndustryValue] = useState(
    industryKey === "L" ? industry : ""
  );
  const [error, setError] = useState("");

  const handleSelect = (key) => {
    setSelectedKey(key);
    setIndustryKey(key);
    setError("");

    if (key !== "L") {
      const selectedLabel = industryOptions.find((o) => o.key === key).label;
      setIndustry(selectedLabel);

      setTimeout(() => {
        navigate(redirectMap[key]);
      }, 1000);
    }
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();

    if (!selectedKey) return setError("Please select an industry.");

    if (selectedKey === "L") {
      if (!otherIndustryValue.trim()) {
        return setError("Please enter your industry.");
      }

      setIndustry(otherIndustryValue.trim());
      setIndustryKey("L");

      return navigate(redirectMap["L"]);
    }

    const selectedLabel = industryOptions.find(
      (o) => o.key === selectedKey
    ).label;

    setIndustry(selectedLabel);
    setIndustryKey(selectedKey);

    navigate(redirectMap[selectedKey]);
  };

  const OptionButton = ({ keyOption, label, isSelected, onClick }) => (
    <div
      onClick={onClick}
      className={`flex items-center p-3 rounded-lg border cursor-pointer transition
        ${isSelected ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300"}`}
    >
      <div
        className={`w-6 h-6 mr-3 flex items-center justify-center rounded
        ${isSelected ? "bg-white text-blue-600" : "bg-gray-200 text-gray-700"}`}
      >
        {keyOption}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start pt-10 px-3">
      <div className="w-full max-w-md rounded-xl p-6 flex flex-col">

        <form onSubmit={handleSave}>
          <h5 className="text-base font-semibold mb-2">
            7 → What best describes the Industry your business operates in?*
          </h5>
          <p className="text-xs text-gray-500 mb-4">
            Required to customize your experience
          </p>

          {error && <p className="text-red-600 text-xs mb-3">{error}</p>}

          <div className="space-y-2 max-h-[60vh] overflow-y-auto mb-4">
            {industryOptions.map((option) => (
              <OptionButton
                key={option.key}
                keyOption={option.key}
                label={option.label}
                isSelected={selectedKey === option.key}
                onClick={() => handleSelect(option.key)}
              />
            ))}

            {selectedKey === "L" && (
              <input
                type="text"
                placeholder="Enter your industry"
                value={otherIndustryValue}
                onChange={(e) => setOtherIndustryValue(e.target.value)}
                className="w-full mt-2 px-3 py-2 border bg-white rounded-lg text-sm"
              />
            )}
          </div>

          {/* ⭐ OK button aligned to the right */}
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