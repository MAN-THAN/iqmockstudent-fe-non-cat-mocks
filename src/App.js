import Main from "./Pages/Main";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styleSheets/Style";
import Instructions from "./Pages/Instructions";
import Terms from "./Pages/Terms";
import Protected from "./Components/Protected";
import AnalysisMain from "./Analysis/AnalysisMain";
import TopicAnalysis from "./Analysis/TopicAnalysis";
import SectionAnalysis from "./Analysis/SectionAnalysis";
import SubtopicAnalysis from "./Analysis/SubtopicAnalysis";
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
import MainUserAuth from "./Pages/MainUserAuth";
import MobileTemp from "./Pages/MobileTemp";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ScoreVsPrecentile from "./Pages/ScoreVsPrecentile";
import CacheBuster from "react-cache-buster";
import version from "../package.json";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState(null);
  const [isUserAuth,setIsUserAuth]= useState(false);
const [authToken,setAuthToken] = useState(localStorage.getItem("auth_token"));
  //  create query client
  const queryClient = new QueryClient();
  const isProduction =
    process.env.REACT_APP_BASE_URL === "https://devsecapi.iqmock.iquanta.in";
    
  useEffect(() => {
    function handleResize() {
      const isMobileOrTablet = window.matchMedia("(max-width:1000px)").matches;
      //console.log("Is mobile or tablet:", isMobileOrTablet, previousLocation);

      if (isMobileOrTablet) {
        if (!previousLocation) {
          //console.log("tyagi");
          setPreviousLocation(location.pathname);
          navigate("/mobileErrorPage");
        }
        // if (previousLocation) {
        //   navigate("/mobileErrorPage");
        // }
      }
      if (!isMobileOrTablet && previousLocation) {
        //console.log("mantha");
        navigate(previousLocation);
        setPreviousLocation(null);
      }
    }

    // Check the initial screen size
    handleResize();

    // Add event listener to handle screen resize
    window.addEventListener("resize", handleResize);

    // Cleanup by removing the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navigate, previousLocation, location]);

  useEffect(()=>{
    
    if(authToken=="undefined"||authToken=="null"||authToken==null||authToken==undefined||authToken=="")
    {
        setIsUserAuth(false);
    }
    else{
      setIsUserAuth(true);
    }

  },[authToken]);

  // Rest of the component code...

  return (
    <CacheBuster
      currentVersion={version}
      isEnabled={true} //If false, the library is disabled.
      isVerboseMode={false} //If true, the library writes verbose logs to console.
      metaFileDirectory={"."} //If public assets are hosted somewhere other than root on your server.
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route
              path="/:email/:otp/:setId/:mockId"
              element={<MainUserAuth />}
            />
            <Route path="/instructions" element={isUserAuth==true?<Instructions />:<ErrorPage errorMessage={"This link is not authorised."}/>} />
            <Route path="/terms" element={isUserAuth==true?<Terms />:<ErrorPage errorMessage={"This link is not authorised."}/>} />
            <Route path="/user_authentication" element={isUserAuth==true?<UserAuth />:<ErrorPage errorMessage={"This link is not authorised."}/>} />
            <Route path="/mobileErrorPage" element={<MobileTemp />} />

            <Route
              path="/analysis/:mockId/:attemptId"
              element={isUserAuth==true?<AnalysisMain />:<ErrorPage errorMessage={"This link is not authorised."}/>}
            >
              <Route path="topicwise" element={<TopicAnalysis />} />
              <Route path="subtopicwise" element={<SubtopicAnalysis />} />
              <Route path="sectionwise" element={<SectionAnalysis />} />
              <Route path="overall" element={<OverallAnalysis />} />
              <Route path="difficulty" element={<DifficultyAnalysis />} />
            </Route>
            <Route
              path="/leaderboard/:mockId/:attemptId"
              element={isUserAuth==true?<LeaderBoard />:<ErrorPage errorMessage={"This link is not authorised."}/>}
            />
            <Route
              path="/viewsolutions/:mockId/:attemptId"
              element={isUserAuth==true?<ViewSolution />:<ErrorPage errorMessage={"This link is not authorised."}/>}
            />
            <Route path="/main" element={isUserAuth==true?<Protected Comp={Main} />:<ErrorPage errorMessage={"This link is not authorised."}/>} />

            <Route
              path="/analysisacross/:mockId/:attemptId"
              element={isUserAuth==true?<AnalysisAcross />:<ErrorPage errorMessage={"This link is not authorised."}/>}
            />
            <Route
              path="/errortracker/:mockId/:attemptId"
              element={isUserAuth==true?<ErrorTracker />:<ErrorPage errorMessage={"This link is not authorised."}/>}
            />
            {/* <Route
            path="/goaltracker/:mockId/:attemptId"
            element={<GoalTracker />}
          /> */}
            <Route
              path="/marketplace/:mockId/:attemptId"
              element={isUserAuth==true?<MarketPlace />:<ErrorPage errorMessage={"This link is not authorised."}/>}
            />
            <Route
              path="/mockcomparison/:mockId/:attemptId"
              element={isUserAuth==true?<MockComparison />:<ErrorPage errorMessage={"This link is not authorised."}/>}
            />
            {/* <Route path="/onboarding" element={<OnBoarding />} /> */}
            <Route
              path="/scorevsprecentile/:mockId/:attemptId"
              element={isUserAuth==true?<ScoreVsPrecentile />:<ErrorPage errorMessage={"This link is not authorised."}/>}
            />
          </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </CacheBuster>
  );
}

export default App;
