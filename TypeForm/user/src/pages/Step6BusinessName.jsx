import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

export default function Step6BusinessName() {
  const navigate = useNavigate();
  const { businessName, setBusinessName } = useContext(AppContext);

  const [name, setName] = useState(businessName || "");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!name.trim()) {
      return setError("Organization or Business Name is required.");
    }

    setError("");
    setBusinessName(name.trim());
    console.log("Saved:", name.trim());

    navigate("/Step7Industry"); // Next step
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSave();
  };

  return (
    <div className=" min-h-screen flex items-center justify-center p-3">
      <div className="w-full max-w-md rounded-xl p-6 ">

        {/* Title */}
        <h5 className="text-base font-semibold mb-1">
          6 → Organization or Business Name*
        </h5>
        <p className="text-xs text-gray-500 mb-3">
          Required: "City of Atlanta" or "Poke Bar" or "AMZDialysis"
        </p>

        {/* Error */}
        {error && <p className="text-red-600 text-xs mb-2">{error}</p>}

        {/* Input */}
        <input
  type="text"
  placeholder="e.g., MapZot.Ai"
  value={name}
  onChange={(e) => {
    setName(e.target.value);
    setError("");
  }}
  onKeyPress={handleKeyPress}
  autoFocus
  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:outline-none transition duration-150 ease-in-out mb-4"
/>

        {/* OK Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-900 text-sm shadow-sm transition duration-150 ease-in-out"
          >
            OK
          </button>
          <span className="text-gray-500 text-sm ml-3">press Enter ↩</span>
        </div>
      </div>
    </div>
  );
}
