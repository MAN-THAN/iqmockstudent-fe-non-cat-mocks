import Main from './Components/Main';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styleSheets/Style";
import Instructions from './Components/Instructions';
import Terms from './Components/Terms';
import Protected from './Components/Protected';


function App() {

  return (
   
    <ThemeProvider theme={theme}>
     <BrowserRouter>
    <Routes>
      <Route path="/" element={<Instructions/>}/>
      <Route path="/terms" element={<Terms/>}/>
      <Route path="/main/:mockid/:type" element={<Protected Comp={Main}/>} />
  
    </Routes>
  </BrowserRouter>
  </ThemeProvider>
  
  );
}

export default App;
