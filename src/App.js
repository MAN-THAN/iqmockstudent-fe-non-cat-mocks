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
import LeaderBoard from "./Analysis/LeaderBoard";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Instructions />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/analysis/" element={<AnalysisMain />}>
            <Route path="topicwise" element={<TopicAnalysis />}/>
            <Route path="sectionwise" element={<SectionAnalysis />}/>
            <Route path="overall" element={<TopicAnalysis />}/>
            <Route path="difficulty" element={<DifficultyAnalysis />}/>
            <Route path="leaderboard" element={<LeaderBoard />}/>
          </Route>
          <Route
            path="/main/:mockid/:type"
            element={<Protected Comp={Main} />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;