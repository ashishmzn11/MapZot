import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

export default function Step4Number() {
  const navigate = useNavigate();
  const { mobileNumber, setMobileNumber } = useContext(AppContext);

  const initial = mobileNumber?.replace("+91", "") || "";
  const [number, setNumber] = useState(initial);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!number.trim()) return setError("Mobile Number is required for 2FA.");
    if (number.trim().length !== 10)
      return setError("Please enter a valid 10-digit mobile number.");

    setError("");

    const fullNumber = "+91" + number.trim();
    setMobileNumber(fullNumber);

    navigate("/Step5Role");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl p-6">

        {/* Title */}
        <h5 className="text-lg font-semibold mb-2">
          4 → Mobile Number*
        </h5>

        {/* Sub Text */}
        <p className="text-sm text-gray-500 mb-5">
          Required: Two-Factor Authentication
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm mb-3 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Label */}
          <label className="font-semibold text-sm mb-1 block">
            Enter your mobile number
          </label>

          {/* Input + Country Code UI */}
          <div className="flex items-center space-x-2">

            {/* Country Code */}
            <div className="flex items-center border border-gray-300 rounded-lg h-10 px-3 bg-gray-50">
              <span className="text-lg mr-1">🇮🇳</span>
              <span className="text-sm font-semibold">+91</span>
            </div>

            {/* Number Input */}
            <input
              type="tel"
              placeholder="Example: 84499 20648"
              value={number}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10);
                setNumber(cleaned);
                setError("");
              }}
              className="flex-grow px-4 py-2 border bg-white border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-lg"
            >
              OK
            </button>
            <span className="text-gray-500 text-sm ml-3">press Enter ↩</span>
          </div>
        </form>

      </div>
    </div>
  );
}
