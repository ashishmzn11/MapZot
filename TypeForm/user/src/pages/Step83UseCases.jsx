import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

const solutionOptions = [
  { key: "A", label: "Real Estate Strategy / Site Selection" },
  { key: "B", label: "Forecast - Patient Volumes / Revenues" },
  { key: "C", label: "Visits / Visitors / Reasons For Spikes" },
  { key: "D", label: "Referral Metrics / Insurance Claims" },
  { key: "E", label: "Providers by Specialization, Cross Visitation" },
  { key: "F", label: "Marketing / OOH/ Ads / Audience" },
  { key: "G", label: "Other" },
];

export default function Step83UseCases() {
  const navigate = useNavigate();
  const { useCases83, setUseCases83 } = useContext(AppContext);

  // -------------------------------
  // Handle existing saved values
  // -------------------------------
  const optionLabels = solutionOptions.map((x) => x.label);

  const savedOther =
    useCases83?.find((val) => !optionLabels.includes(val)) || "";

  const [otherText, setOtherText] = useState(savedOther);

  const initialSelected = [];

  if (Array.isArray(useCases83)) {
    useCases83.forEach((label) => {
      const match = solutionOptions.find((o) => o.label === label);

      if (match) {
        // Normal option
        initialSelected.push(match.key);
      } else {
        // Custom label → belongs to Other (G)
        if (!initialSelected.includes("G")) initialSelected.push("G");
      }
    });
  }

  const [selectedKeys, setSelectedKeys] = useState(initialSelected);

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

    let finalLabels = selectedKeys.map(
      (key) => solutionOptions.find((o) => o.key === key)?.label
    );

    // --- Handle "Other" ---
    if (selectedKeys.includes("G")) {
      if (!otherText.trim())
        return setError("Please enter the 'Other' value.");

      finalLabels = finalLabels.filter((l) => l !== "Other"); // remove 'Other'
      finalLabels.push(otherText.trim()); // add custom text
    }

    setUseCases83(finalLabels);
    localStorage.setItem("useCases83", JSON.stringify(finalLabels));
    navigate("/Step10Timeline");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center pt-10">
      <div className="w-full max-w-md p-6">

        <h5 className="text-base font-semibold mb-2">
          8 → Select the solutions that best align with your use cases*
        </h5>

        {error && <p className="text-red-600 text-xs mb-3">{error}</p>}

        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {solutionOptions.map((opt) => (
            <div key={opt.key}>
              <div
                onClick={() => handleSelect(opt.key)}
                className={`flex items-center p-3 rounded-lg border cursor-pointer
                  ${selectedKeys.includes(opt.key)
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-gray-300"
                  }`}
              >
                <div
                  className={`w-6 h-6 flex items-center justify-center mr-3 rounded
                    ${selectedKeys.includes(opt.key)
                      ? "bg-white text-blue-600"
                      : "bg-gray-300 text-gray-700"
                    }`}
                >
                  {opt.key}
                </div>

                {opt.label}

                {selectedKeys.includes(opt.key) && (
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
                )}
              </div>

              {/* Other Input */}
              {opt.key === "G" && selectedKeys.includes("G") && (
                <input
                  type="text"
                  className="mt-2 w-full p-2 border rounded"
                  placeholder="Enter your custom solution"
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
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
