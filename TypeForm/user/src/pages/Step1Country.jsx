import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

export default function Step1Country() {
  const navigate = useNavigate();
  const { country, setCountry, otherCountry, setOtherCountry, nextStep } =
    useContext(AppContext);

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!country) {
      return setError("Please select a country");
    }

    if (country === "Other" && !otherCountry.trim()) {
      return setError("Please enter your country name");
    }

    setError("");
    nextStep();
    navigate("/Step2Fullname");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl p-6">

        <h5 className="text-lg font-semibold mb-1">
          1 → Primary Country of Operation*
        </h5>

        <p className="text-sm text-gray-500 mb-5">
          Mandatory: <strong className="text-gray-700">Compliance</strong>
        </p>

        {error && (
          <p className="text-red-600 text-sm mb-3 font-medium">{error}</p>
        )}

        {/* FORM START */}
        <form onSubmit={handleSubmit}>

          <div className="flex flex-wrap gap-3 mb-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg border ${
                country === "United States"
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
              onClick={() => {
                setCountry("United States");
                setError("");
              }}
            >
              United States
            </button>

            <button
              type="button"
              className={`px-4 py-2 rounded-lg border ${
                country === "Other"
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
              onClick={() => {
                setCountry("Other");
                setError("");
              }}
            >
              Other
            </button>
          </div>

          {country === "Other" && (
            <div className="mb-5">
              <label className="font-semibold text-sm mb-1 block">
                Enter Your Country Name
              </label>
              <input
                type="text"
                placeholder="Enter country name"
                value={otherCountry}
                onChange={(e) => {
                  setOtherCountry(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          )}

          <div className="flex items-center justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-black text-white font-bold"
            >
              OK
            </button>
            <span className="text-gray-500 text-sm ml-3">press Enter ↩</span>
          </div>

        </form>
        {/* FORM END */}

      </div>
    </div>
  );
}
