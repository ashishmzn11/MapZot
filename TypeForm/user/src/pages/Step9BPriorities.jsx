import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

const civicPriorityOptions = [
  { key: "A", label: "Understand retail leakage and tax loss by industry and cities" },
  { key: "B", label: "Recruit better tenants for ongoing developments" },
  { key: "C", label: "Better understand visitation trends and economic activity" },
  { key: "D", label: "Better Track Local Events and Tourist Activity" },
  { key: "E", label: "Other" },
];

export default function Step9BPriorities() {
  const navigate = useNavigate();

  const {
    civicPriorities9,
    setCivicPriorities9,
    civicPriorities9Other,
    setCivicPriorities9Other,
  } = useContext(AppContext);

  let savedOtherText = civicPriorities9Other || "";
  let savedKeys = [];

  if (Array.isArray(civicPriorities9)) {
    savedKeys = civicPriorities9
      .map((label) => {
        const found = civicPriorityOptions.find((op) => op.label === label);
        return found ? found.key : null;
      })
      .filter(Boolean);

    if (savedOtherText && !savedKeys.includes("E")) {
      savedKeys.push("E");
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
      .filter((k) => k !== "E")
      .map((k) => civicPriorityOptions.find((o) => o.key === k).label);

    if (selectedKeys.includes("E")) {
      if (!otherText.trim()) {
        return setError("Please enter the Other priority.");
      }

      setCivicPriorities9Other(otherText.trim());
      finalLabels.push(otherText.trim());
    } else {
      setCivicPriorities9Other("");
    }

    setCivicPriorities9(finalLabels);

    navigate("/Step10Timeline");
  };

  const CheckIcon = () => (
    <svg className="ml-auto w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  );

 return (
  <div className="bg-gray-100 min-h-screen flex justify-center pt-10 px-3">
    <div className="w-full max-w-md p-6 rounded-xl">

      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>

        <h5 className="font-semibold mb-2">9 → Select top priorities for your team*</h5>

        <p className="text-sm text-gray-700 font-medium mb-4">
          Civic & Economic Development
        </p>

        <p className="text-xs text-gray-500 mb-1">Choose as many as you like</p>

        {error && <p className="text-red-600 text-xs mb-3">{error}</p>}

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {civicPriorityOptions.map((op) => {
            const isSelected = selectedKeys.includes(op.key);

            return (
              <div key={op.key}>
                <div
                  onClick={() => handleSelect(op.key)}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <div
                    className={`w-6 h-6 mr-3 flex items-center justify-center rounded text-xs font-bold ${
                      isSelected ? "bg-white text-blue-600" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {op.key}
                  </div>

                  <span className="flex-1">{op.label}</span>

                  {isSelected && <CheckIcon />}
                </div>

                {op.key === "E" && isSelected && (
                  <input
                    type="text"
                    placeholder="Enter Other Priority"
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    className="w-full mt-2 p-3 border rounded-lg"
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end mt-4">
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
