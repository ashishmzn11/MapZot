import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

export default function Step2Fullname() {
  const navigate = useNavigate();
  const { firstName, lastName, setFirstName, setLastName, nextStep } =
    useContext(AppContext);

  const [fName, setFName] = useState(firstName);
  const [lName, setLName] = useState(lastName);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fName.trim()) return setError("First name is required");
    if (!lName.trim()) return setError("Last name is required");

    setError("");
    setFirstName(fName);
    setLastName(lName);

    nextStep();
    navigate("/Step3Email");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md  rounded-xl p-6">

        <p className="text-gray-500 text-sm">
          2 → 
          <span className="text-2xl font-medium text-gray-800 ml-2">
            Please provide your <b>first</b> and <b>last name</b>
          </span>
        </p>

        <p className="text-gray-500 text-sm mb-6">Required for account creation</p>

        {error && (
          <p className="text-red-600 text-sm mb-3 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-1">
              First name
            </label>
            <input
              type="text"
              value={fName}
              onChange={(e) => {
                setFName(e.target.value);
                setError("");
              }}
              className="w-full text-xl pb-2 bg-white border-b-2 border-gray-300 focus:outline-none"
            />
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 font-semibold mb-1">
              Last name
            </label>
            <input
              type="text"
              value={lName}
              onChange={(e) => {
                setLName(e.target.value);
                setError("");
              }}
              className="w-full text-xl pb-2 bg-white border-b-2 border-gray-300 focus:outline-none"
            />
          </div>

          <div className="flex items-center mt-10">
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 font-bold rounded shadow-md"
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
