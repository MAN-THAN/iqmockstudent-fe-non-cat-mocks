import Main from "./Pages/Main";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styleSheets/Style";
import Instructions from "./Pages/Instructions";
import Terms from "./Pages/Terms";
import Protected from "./Components/Protected";
import AnalysisMain from "./Analysis/AnalysisMain";
import TopicAnalysis from "./Analysis/TopicAnalysis";
import SectionAnalysis from "./Analysis/SectionAnalysis";
import DifficultyAnalysis from "./Analysis/DifficultyAnalysis";
import OverallAnalysis from "./Analysis/OverallAnalysis";
import ViewSolution from "./Pages/ViewSolution";
import UserAuth from "./Pages/UserAuth";
import LeaderBoard from "./Pages/LeaderBoard";
import AnalysisAcross from "./Pages/AnalysisAcross";
import ErrorTracker from "./Pages/ErrorTracker";
import GoalTracker from "./Pages/GoalTracker";
import MarketPlace from "./Pages/MarketPlace";
import MockComparison from "./Pages/MockComparison";
import OnBoarding from "./Pages/OnBoarding";
import Login from "./Pages/Login";
import MainUserAuth from "./Pages/MainUserAuth";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/:email/:otp/:setId/:mockId" element={<MainUserAuth />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/user_authentication" element={<UserAuth />} />
   

        <Route path="/analysis/:mockId/:attemptId" element={<AnalysisMain />}>
          <Route path="topicwise" element={<TopicAnalysis />} />
          <Route path="sectionwise/:subject" element={<SectionAnalysis />} />
          <Route path="overall" element={<OverallAnalysis />} />
          <Route path="difficulty" element={<DifficultyAnalysis />} />
        </Route>
        <Route path="/leaderboard/:mockId/:attemptId" element={<LeaderBoard />} />
        <Route path="/viewsolutions/:mockId/:attemptId" element={<ViewSolution />} />
        <Route path="/main/:mockId/:type" element={<Protected Comp={Main} />} />

        <Route path="/analysisacross/:mockId/:attemptId" element={<AnalysisAcross />} />
        <Route path="/errortracker/:mockId/:attemptId" element={<ErrorTracker />} />
        <Route path="/goaltracker/:mockId/:attemptId" element={<GoalTracker />} />
        <Route path="/marketplace/:mockId/:attemptId" element={<MarketPlace />} />
        <Route path="/mockcomparison/:mockId/:attemptId" element={<MockComparison />} />
        <Route path="/onboarding" element={<OnBoarding />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
