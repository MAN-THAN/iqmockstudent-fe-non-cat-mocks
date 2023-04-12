import Main from "./Components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styleSheets/Style";
import Instructions from "./Components/Instructions";
import Terms from "./Components/Terms";
import Protected from "./Components/Protected";
import Termsandcondition from "./Components/Termsandcondition";
import AnalysisMain from "./Analysis/AnalysisMain";
import TopicAnalysis from "./Analysis/TopicAnalysis";
import SectionAnalysis from "./Analysis/SectionAnalysis";
import DifficultyAnalysis from "./Analysis/DifficultyAnalysis";
import OverallAnalysis from "./Analysis/OverallAnalysis";
import ViewSolution from "./Components/ViewSolution";
import UserAuth from "./Components/UserAuth";
import LeaderBoard from "./LeaderBoard.js/LeaderBoard";
import TempCompo from "./Components/tempCompo";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Instructions />} />
        <Route path="/terms/:name/:email/:uid/:mockId" element={<Terms />} />
        <Route path="/user_authentication/:name/:email/:uid/:mockId" element={<UserAuth />} />
        <Route path="/main/:mockId/:type" element={<Protected Comp={Main} />} />

        <Route path="/analysis/:mockId/:attemptId" element={<AnalysisMain />}>
          <Route path="topicwise" element={<TopicAnalysis />} />
          <Route path="sectionwise/:subject" element={<SectionAnalysis />} />
          <Route path="overall" element={<OverallAnalysis />} />
          <Route path="difficulty" element={<DifficultyAnalysis />} />
        </Route>
        <Route path="/leaderboard/:mockId/:attemptId" element={<LeaderBoard />} />
        <Route path="/viewsolutions/:attemptId/:mocktype" element={<ViewSolution />} />
        <Route path="/main/:mockid/:type" element={<Protected Comp={Main} />} />
        <Route path="/tempCompo" element={<TempCompo />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
