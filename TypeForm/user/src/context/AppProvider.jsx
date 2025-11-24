import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;

    try {
      return JSON.parse(raw);
    } catch {
      return raw; // if "Other" or plain text, return as is
    }
  } catch {
    return fallback;
  }
}

export default function AppProvider({ children }) {

  // STEP
  const [step, setStep] = useState(() => safeGet("step", 1));
  useEffect(() => localStorage.setItem("step", JSON.stringify(step)), [step]);

  // COUNTRY
  const [country, setCountry] = useState(() => safeGet("country", ""));
  useEffect(() => localStorage.setItem("country", JSON.stringify(country)), [country]);

  const [otherCountry, setOtherCountry] = useState(() => safeGet("otherCountry", ""));
  useEffect(() => localStorage.setItem("otherCountry", JSON.stringify(otherCountry)), [otherCountry]);

  // USER NAME
  const [firstName, setFirstName] = useState(() => safeGet("firstName", ""));
  useEffect(() => localStorage.setItem("firstName", JSON.stringify(firstName)), [firstName]);

  const [lastName, setLastName] = useState(() => safeGet("lastName", ""));
  useEffect(() => localStorage.setItem("lastName", JSON.stringify(lastName)), [lastName]);

  // CONTACT
  const [workEmail, setWorkEmail] = useState(() => safeGet("workEmail", ""));
  useEffect(() => localStorage.setItem("workEmail", JSON.stringify(workEmail)), [workEmail]);

  const [mobileNumber, setMobileNumber] = useState(() => safeGet("mobileNumber", ""));
  useEffect(() => localStorage.setItem("mobileNumber", JSON.stringify(mobileNumber)), [mobileNumber]);

  // ROLE + BUSINESS
  const [userRole, setUserRole] = useState(() => safeGet("userRole", ""));
  useEffect(() => localStorage.setItem("userRole", JSON.stringify(userRole)), [userRole]);

  const [businessName, setBusinessName] = useState(() => safeGet("businessName", ""));
  useEffect(() => localStorage.setItem("businessName", JSON.stringify(businessName)), [businessName]);

  // INDUSTRY
  const [industry, setIndustry] = useState(() => safeGet("industry", ""));
  useEffect(() => localStorage.setItem("industry", JSON.stringify(industry)), [industry]);

  const [industryKey, setIndustryKey] = useState(() => safeGet("industryKey", ""));
  useEffect(() => localStorage.setItem("industryKey", JSON.stringify(industryKey)), [industryKey]);

  // USE CASES 8X
  const [useCases81, setUseCases81] = useState(() => safeGet("useCases81", []));
  useEffect(() => localStorage.setItem("useCases81", JSON.stringify(useCases81)), [useCases81]);

  const [useCases82, setUseCases82] = useState(() => safeGet("useCases82", []));
  useEffect(() => localStorage.setItem("useCases82", JSON.stringify(useCases82)), [useCases82]);

  const [useCases83, setUseCases83] = useState(() => safeGet("useCases83", []));
  useEffect(() => localStorage.setItem("useCases83", JSON.stringify(useCases83)), [useCases83]);

  const [useCases85, setUseCases85] = useState(() => safeGet("useCases85", []));
  useEffect(() => localStorage.setItem("useCases85", JSON.stringify(useCases85)), [useCases85]);

  const [useCases86, setUseCases86] = useState(() => safeGet("useCases86", []));
  useEffect(() => localStorage.setItem("useCases86", JSON.stringify(useCases86)), [useCases86]);

  const [useCases86Other, setUseCases86Other] = useState(() => safeGet("useCases86_other", ""));
  useEffect(() => localStorage.setItem("useCases86_other", JSON.stringify(useCases86Other)), [useCases86Other]);

  const [useCases88, setUseCases88] = useState(() => safeGet("useCases88", []));
  useEffect(() => localStorage.setItem("useCases88", JSON.stringify(useCases88)), [useCases88]);

  const [useCases88Other, setUseCases88Other] = useState(() => safeGet("useCases88_other", ""));
  useEffect(() => localStorage.setItem("useCases88_other", JSON.stringify(useCases88Other)), [useCases88Other]);

  const [useCases89, setUseCases89] = useState(() => safeGet("useCases89", []));
  useEffect(() => localStorage.setItem("useCases89", JSON.stringify(useCases89)), [useCases89]);

  const [useCases89Other, setUseCases89Other] = useState(() => safeGet("useCases89_other", ""));
  useEffect(() => localStorage.setItem("useCases89_other", JSON.stringify(useCases89Other)), [useCases89Other]);

  const [useCases8H, setUseCases8H] = useState(() => safeGet("useCases8H", []));
  useEffect(() => localStorage.setItem("useCases8H", JSON.stringify(useCases8H)), [useCases8H]);

  const [useCases8HOther, setUseCases8HOther] = useState(() => safeGet("useCases8H_other", ""));
  useEffect(() => localStorage.setItem("useCases8H_other", JSON.stringify(useCases8HOther)), [useCases8HOther]);

  // USE CASES 9
  const [useCases9, setUseCases9] = useState(() => safeGet("useCases9", []));
  useEffect(() => localStorage.setItem("useCases9", JSON.stringify(useCases9)), [useCases9]);

  const [useCases9Other, setUseCases9Other] = useState(() => safeGet("useCases9_other", ""));
  useEffect(() => localStorage.setItem("useCases9_other", JSON.stringify(useCases9Other)), [useCases9Other]);

  // CIVIC
  const [civicPriorities9, setCivicPriorities9] = useState(() => safeGet("civicPriorities9", []));
  useEffect(() => localStorage.setItem("civicPriorities9", JSON.stringify(civicPriorities9)), [civicPriorities9]);

  const [civicPriorities9Other, setCivicPriorities9Other] = useState(() => safeGet("civicPriorities9_other", ""));
  useEffect(() => localStorage.setItem("civicPriorities9_other", JSON.stringify(civicPriorities9Other)), [civicPriorities9Other]);

  // MARKETING
  const [marketingPriorities9, setMarketingPriorities9] = useState(() => safeGet("marketingPriorities9", []));
  useEffect(() => localStorage.setItem("marketingPriorities9", JSON.stringify(marketingPriorities9)), [marketingPriorities9]);

  const [marketingPriorities9Other, setMarketingPriorities9Other] = useState(() => safeGet("marketingPriorities9_other", ""));
  useEffect(() => localStorage.setItem("marketingPriorities9_other", JSON.stringify(marketingPriorities9Other)), [marketingPriorities9Other]);

  // CONSUMER
  const [consumerPriorities9, setConsumerPriorities9] = useState(() => safeGet("consumerPriorities9", []));
  useEffect(() => localStorage.setItem("consumerPriorities9", JSON.stringify(consumerPriorities9)), [consumerPriorities9]);

  const [consumerPriorities9Other, setConsumerPriorities9Other] = useState(() => safeGet("consumerPriorities9_other", ""));
  useEffect(() => localStorage.setItem("consumerPriorities9_other", JSON.stringify(consumerPriorities9Other)), [consumerPriorities9Other]);

  // BANKING
  const [bankingPriorities9, setBankingPriorities9] = useState(() => safeGet("bankingPriorities9", []));
  useEffect(() => localStorage.setItem("bankingPriorities9", JSON.stringify(bankingPriorities9)), [bankingPriorities9]);

  const [bankingPriorities9Other, setBankingPriorities9Other] = useState(() => safeGet("bankingPriorities9_other", ""));
  useEffect(() => localStorage.setItem("bankingPriorities9_other", JSON.stringify(bankingPriorities9Other)), [bankingPriorities9Other]);

  // BROKERAGE
  const [brokeragePriorities9, setBrokeragePriorities9] = useState(() => safeGet("brokeragePriorities9", []));
  useEffect(() => localStorage.setItem("brokeragePriorities9", JSON.stringify(brokeragePriorities9)), [brokeragePriorities9]);

  const [brokeragePriorities9Other, setBrokeragePriorities9Other] = useState(() => safeGet("brokeragePriorities9_other", ""));
  useEffect(() => localStorage.setItem("brokeragePriorities9_other", JSON.stringify(brokeragePriorities9Other)), [brokeragePriorities9Other]);

  // STEP 11
  const [currentSolutions11, setCurrentSolutions11] = useState(() => safeGet("currentSolutions11", []));
  useEffect(() => localStorage.setItem("currentSolutions11", JSON.stringify(currentSolutions11)), [currentSolutions11]);

  const [currentSolutions11Other, setCurrentSolutions11Other] = useState(() => safeGet("currentSolutions11_other", ""));
  useEffect(() => localStorage.setItem("currentSolutions11_other", JSON.stringify(currentSolutions11Other)), [currentSolutions11Other]);

  // STEP 10
  const [timeline10, setTimeline10] = useState(() => safeGet("timeline10", ""));
  useEffect(() => localStorage.setItem("timeline10", JSON.stringify(timeline10)), [timeline10]);

  // STEP 12
  const [trialChoice12, setTrialChoice12] = useState(() => safeGet("trialChoice12", ""));
  useEffect(() => localStorage.setItem("trialChoice12", JSON.stringify(trialChoice12)), [trialChoice12]);

  // NAVIGATION
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <AppContext.Provider
      value={{

        step, setStep, nextStep, prevStep,

        country, setCountry,
        otherCountry, setOtherCountry,

        firstName, setFirstName,
        lastName, setLastName,

        workEmail, setWorkEmail,
        mobileNumber, setMobileNumber,

        userRole, setUserRole,
        businessName, setBusinessName,

        industry, setIndustry,
        industryKey, setIndustryKey,

        useCases81, setUseCases81,
        useCases82, setUseCases82,
        useCases83, setUseCases83,
        useCases85, setUseCases85,

        useCases86, setUseCases86,
        useCases86Other, setUseCases86Other,

        useCases88, setUseCases88,
        useCases88Other, setUseCases88Other,

        useCases89, setUseCases89,
        useCases89Other, setUseCases89Other,

        useCases8H, setUseCases8H,
        useCases8HOther, setUseCases8HOther,

        useCases9, setUseCases9,
        useCases9Other, setUseCases9Other,

        civicPriorities9, setCivicPriorities9,
        civicPriorities9Other, setCivicPriorities9Other,

        marketingPriorities9, setMarketingPriorities9,
        marketingPriorities9Other, setMarketingPriorities9Other,

        consumerPriorities9, setConsumerPriorities9,
        consumerPriorities9Other, setConsumerPriorities9Other,

        bankingPriorities9, setBankingPriorities9,
        bankingPriorities9Other, setBankingPriorities9Other,

        brokeragePriorities9, setBrokeragePriorities9,
        brokeragePriorities9Other, setBrokeragePriorities9Other,

        currentSolutions11, setCurrentSolutions11,
        currentSolutions11Other, setCurrentSolutions11Other,

        timeline10, setTimeline10,

        trialChoice12, setTrialChoice12,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
