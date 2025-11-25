import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

export default function Step3Email() {
  const navigate = useNavigate();
  const { workEmail, setWorkEmail } = useContext(AppContext);
  const [email, setEmail] = useState(workEmail || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return setError("Work email is required");
    }

    setError("");
    setWorkEmail(email);
    navigate("/Step4Number");
  };

  return (
    <div className=" min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl p-6">

        <h5 className="text-lg font-semibold mb-2">
          3 → Please provide your work email*
        </h5>

        <p className="text-sm text-gray-500 mb-5">
          We never spam or sell your information.
        </p>

        {error && (
          <p className="text-red-600 text-sm mb-3 font-medium">{error}</p>
        )}

        {/* FORM START */}
        <form onSubmit={handleSubmit}>

          <label className="font-semibold text-sm mb-1 block">
            Enter your work email address
          </label>

          <input
            type="email"
            placeholder="Example: ashish.k@mapzot.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />

          <div className="flex items-center justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-lg font-bold"
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
