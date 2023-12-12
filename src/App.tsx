import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { mainTheme } from "./theme";
import { ReactQueryDevtools } from "react-query/devtools";

import Home from "./Routes/Home";
import Categories from "./Components/Categories";
import Detail from "./Routes/Detail";
import Favorites from "./Routes/Favorites";
import Ingredient from "./Routes/Ingredient";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { screenState } from "./atoms";

const App = () => {
  const mobileMatch = useMediaQuery("(max-width:800px)");
  const midMatch = useMediaQuery("(max-width:1400px)");
  const [screen, setScreen] = useRecoilState(screenState);

  useEffect(() => {
    if (!mobileMatch && !midMatch) setScreen(2);
    else if (!mobileMatch && midMatch) setScreen(1);
    else if (mobileMatch) setScreen(0);
  }, [mobileMatch, midMatch]);

  return (
    <ThemeProvider theme={mainTheme}>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/ingredient/:name" element={<Ingredient />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/details/:id" element={<Detail />}></Route>
          <Route path="/" element={<Home />}>
            <Route path="/:category" element={<Categories data={undefined} name="" />}></Route>
          </Route>
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
  );
};

export default App;
