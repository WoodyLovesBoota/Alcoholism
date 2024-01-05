import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { mainTheme } from "./theme";
import { ReactQueryDevtools } from "react-query/devtools";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { enrolledCocktailState, screenState } from "./atoms";

import Home from "./Routes/Home";
import Categories from "./Components/Categories";
import Detail from "./Routes/Detail";
import Favorites from "./Routes/Favorites";
import Ingredient from "./Routes/Ingredient";

import { collection, onSnapshot } from "firebase/firestore";
import { firebaseDB } from "./firebase/firebase";
import DBHandler from "./firebase/DBHandler";
import Enroll from "./Routes/Enroll";
import DetailEnrolled from "./Routes/DetailEnrolled";

const App = () => {
  const mobileMatch = useMediaQuery("(max-width:800px)");
  const midMatch = useMediaQuery("(max-width:1400px)");
  const [screen, setScreen] = useRecoilState(screenState);
  const [enrolled, setEnrolled] = useRecoilState(enrolledCocktailState);

  // useEffect(() => {
  //   onSnapshot(collection(firebaseDB, "cocktails"), (snapshot) => {
  //     const postsArr = snapshot.docs.map((eachDoc) => {
  //       return Object.assign(eachDoc.data(), { id: eachDoc.id });
  //     });
  //     const sortedArr = postsArr.sort((a: any, b: any) => {
  //       return b.timestamp - a.timestamp;
  //     });
  //     return setEnrolled({
  //       cocktails: sortedArr[sortedArr.findIndex((e) => e.id === "enrolled")].cocktails,
  //     });
  //   });
  // }, []);

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
          <Route path="/enroll" element={<Enroll />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/edetails/:id" element={<DetailEnrolled />}></Route>
          <Route path="/details/:id" element={<Detail />}></Route>
          <Route path="/" element={<Home />}>
            <Route path="/:category" element={<Categories data={undefined} name="" />}></Route>
          </Route>
        </Routes>
      </Router>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </ThemeProvider>
  );
};

export default App;
