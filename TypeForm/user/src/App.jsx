import "./App.css";
import { Routes, Route } from "react-router-dom";

import WelcomePage from "./component/WelcomePage";
import Step1Country from "./pages/Step1Country";
import Step2Fullname from "./pages/Step2Fullname";
import Step3Email from "./pages/Step3Email";
import Step4Number from "./pages/Step4Number";
import Step5Role from "./pages/Step5Role";
import Step6BusinessName from "./pages/Step6BusinessName";
import Step7Industry from "./pages/Step7Industry";
import Step81UseCases from "./pages/Step81UseCases";
import Step82UseCases from "./pages/Step82UseCases";
import Step83UseCases from "./pages/Step83UseCases";
import Step85UseCases from "./pages/Step85UseCases";
import Step86UseCases from "./pages/Step86UseCases";
import Step8HUseCases from "./pages/Step8HUseCases";
import Step88UseCases from "./pages/Step88UseCases";
import Step89UseCases from "./pages/Step89UseCases";
import Step9TopPriorities from "./pages/Step9TopPriorities";
import Step9BPriorities from "./pages/Step9BPriorities";
import Step9EPriorities from "./pages/Step9EPriorities";
import Step9FPriorities from "./pages/Step9FPriorities";
import Step9JPriorities from "./pages/Step9JPriorities";
import Step9KPriorities from "./pages/Step9KPriorities";
import Step10Timeline from "./pages/Step10Timeline";
import Step11CurrentSolutions from "./pages/Step11CurrentSolutions";
import Step12TrialOptions from "./pages/Step12TrialOptions";

export default function App() {
  return (
    <Routes>

      {/* Layout Route */}
      <Route path="/" element={<WelcomePage />}>

        {/* Default page */}
        <Route index element={<Step1Country />} />

        {/* Sub pages */}
        <Route path="step1" element={<Step1Country />} />
        <Route path="Step2Fullname" element={<Step2Fullname />} />
        <Route path="Step3Email" element={<Step3Email />} />
        <Route path="Step4Number" element={<Step4Number/>} />
        <Route path="Step5Role" element={<Step5Role/>} />
        <Route path="Step6BusinessName" element={<Step6BusinessName/>} />
        <Route path="Step7Industry" element={<Step7Industry/>} />
        <Route path="Step81UseCases" element={<Step81UseCases/>} />
        <Route path="Step82UseCases" element={<Step82UseCases/>} />
        <Route path="Step83UseCases" element={<Step83UseCases/>} />
        <Route path="Step85UseCases" element={<Step85UseCases/>} />
        <Route path="Step86UseCases" element={<Step86UseCases/>} />
        <Route path="Step8HUseCases" element={<Step8HUseCases/>} />
        <Route path="Step88UseCases" element={<Step88UseCases/>} />
        <Route path="Step89UseCases" element={<Step89UseCases/>} />
        <Route path="Step9TopPriorities" element={<Step9TopPriorities/>} />
        <Route path="Step9BPriorities" element={<Step9BPriorities/>} />
        <Route path="Step9EPriorities" element={<Step9EPriorities/>} />
        <Route path="Step9FPriorities" element={<Step9FPriorities/>} />
        <Route path="Step9JPriorities" element={<Step9JPriorities/>} />
        <Route path="Step9KPriorities" element={<Step9KPriorities/>} />
        <Route path="Step10Timeline" element={<Step10Timeline/>} />
        <Route path="Step11CurrentSolutions" element={<Step11CurrentSolutions/>} />
        <Route path="Step12TrialOptions" element={<Step12TrialOptions/>} />

      </Route>

    </Routes>
  );
}
