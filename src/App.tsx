import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { mainTheme } from "./theme";
import { ReactQueryDevtools } from "react-query/devtools";

import Home from "./Routes/Home";
import Cocktails from "./Routes/Cocktails";
import Categories from "./Components/Categories";
import Detail from "./Routes/Detail";
import Search from "./Routes/Search";

const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/details/:id" element={<Detail />}></Route>
          <Route path="/cocktails" element={<Cocktails />}>
            <Route path="/cocktails/:category" element={<Categories data={undefined} name="" />}></Route>
          </Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
  );
};

export default App;
