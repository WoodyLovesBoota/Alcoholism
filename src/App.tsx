import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import { mainTheme } from "./theme";
import Cocktails from "./Routes/Cocktails";

const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/cocktails" element={<Cocktails />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
