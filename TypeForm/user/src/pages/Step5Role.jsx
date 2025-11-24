import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

export default function Step5Role() {
  const navigate = useNavigate();
  const { setUserRole, nextStep, userRole } = useContext(AppContext);

  const predefinedRoles = [
    "CEO / Owner / Founder / Investor",
    "Operations",
    "Marketing / Growth Lead",
    "Finance / Procurement",
    "Consultant / Advisor",
    "Real Estate",
    "Franchise",
    "Analyst / Research / Strategy",
  ];

  const [selectedRole, setSelectedRole] = useState(
    predefinedRoles.includes(userRole)
      ? userRole
      : userRole
      ? "Other"
      : ""
  );

  const [otherRoleValue, setOtherRoleValue] = useState(
    selectedRole === "Other" ? userRole : ""
  );

  const [error, setError] = useState("");

  const roles = [
    { id: "A", label: "CEO / Owner / Founder / Investor" },
    { id: "B", label: "Operations" },
    { id: "C", label: "Marketing / Growth Lead" },
    { id: "D", label: "Finance / Procurement" },
    { id: "E", label: "Consultant / Advisor" },
    { id: "F", label: "Real Estate" },
    { id: "G", label: "Franchise" },
    { id: "H", label: "Analyst / Research / Strategy" },
    { id: "I", label: "Other" },
  ];

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (!selectedRole) {
      return setError("Please select your role.");
    }

    let finalRole = selectedRole;

    if (selectedRole === "Other") {
      if (!otherRoleValue.trim()) {
        return setError("Please enter your role.");
      }
      finalRole = otherRoleValue.trim();
    }

    setUserRole(finalRole);
    localStorage.setItem("userRole", finalRole);

    setError("");
    nextStep();
    navigate("/Step6BusinessName");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-3">
      <div className="w-full max-w-md rounded-xl p-4 mt-5">

        <form onSubmit={handleSubmit}>
          <h5 className="text-base font-semibold mb-1">
            5 → What best describes your role?*
          </h5>
          <p className="text-xs text-gray-500 mb-3">Required: Customization</p>

          {error && <p className="text-red-600 text-xs mb-2">{error}</p>}

          <div className="flex flex-col gap-2">
            {roles.map((role) => (
              <div key={role.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole(role.label);
                    setError("");
                  }}
                  className={`flex items-center w-full px-3 py-2 rounded-lg border
                    ${
                      selectedRole === role.label
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                    }
                    text-sm transition`}
                >
                  <span
                    className={`mr-2 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold
                      ${
                        selectedRole === role.label
                          ? "bg-white text-blue-600 border border-blue-200"
                          : "bg-gray-100 text-gray-800 border border-gray-400"
                      }`}
                  >
                    {role.id}
                  </span>

                  <span className="leading-tight">{role.label}</span>

                  {selectedRole === role.label && (
                    <svg
                      className="ml-auto w-4 h-4"
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
                </button>

                {role.label === "Other" && selectedRole === "Other" && (
                  <input
                    type="text"
                    placeholder="Enter your role"
                    value={otherRoleValue}
                    onChange={(e) => setOtherRoleValue(e.target.value)}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-900 text-sm"
            >
              OK
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
