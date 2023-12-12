import styled from "styled-components";
import NavigationBar from "../Components/NavigationBar";
import { useEffect, useState } from "react";
import Categories from "../Components/Categories";
import { useQuery } from "react-query";
import { IGetCocktailResult, getCategoryResult, getAllCategoryResult } from "../api";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentCateState } from "../atoms";

const Home = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(1);
  const [currentCate, setCurrentCate] = useRecoilState(currentCateState);
  const sample = ["", "Cocktail", "Vodka", "Gin", "Rum", "Tequila", "Lime juice", "Triple Sec", "Brandy", "Bourbon"];
  const { data, isLoading } = useQuery<IGetCocktailResult>(
    ["cocktails", sample[current]],
    () => (current === 1 ? getAllCategoryResult(sample[current]) : getCategoryResult(sample[current])),
    { enabled: !!current }
  );

  const handleCateClick = (num: number) => {
    setCurrent(num);
    setCurrentCate(num);
    navigate(`/${sample[num]}`);
  };

  useEffect(() => {
    navigate(`/${sample[current]}`);
  }, []);

  return (
    <Wrapper>
      <Header>
        <NavigationBar ishome={true} issticky={false} />
        <HomeContent>
          <HomeTitle>Grab a Drink</HomeTitle>
          <HomeSubTitle>
            Discover a cocktail
            <br />
            that suits your taste.
          </HomeSubTitle>
        </HomeContent>
        <List>
          <Category isnow={(current === 1).toString()} onClick={() => handleCateClick(1)}>
            ALL
          </Category>
          <Category isnow={(current === 2).toString()} onClick={() => handleCateClick(2)}>
            VODKA
          </Category>
          <Category isnow={(current === 3).toString()} onClick={() => handleCateClick(3)}>
            GIN
          </Category>
          <Category isnow={(current === 4).toString()} onClick={() => handleCateClick(4)}>
            RUM
          </Category>
          <Category isnow={(current === 5).toString()} onClick={() => handleCateClick(5)}>
            TEQUILA
          </Category>
          <Category isnow={(current === 6).toString()} onClick={() => handleCateClick(6)}>
            LIMEJUICE
          </Category>
          <Category isnow={(current === 7).toString()} onClick={() => handleCateClick(7)}>
            TRIPLESEC
          </Category>
          <Category isnow={(current === 8).toString()} onClick={() => handleCateClick(8)}>
            BRANDY
          </Category>
          <Category isnow={(current === 9).toString()} onClick={() => handleCateClick(9)}>
            BOURBON
          </Category>
        </List>
      </Header>
      <Contents>{!isLoading && <Categories key={current} name={sample[current]} data={data} />}</Contents>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  width: 100vw;
`;

const Header = styled.div`
  width: 100vw;
  min-height: 60vw;
  padding: 0 72px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), #141414),
    url("/bg2.png");
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  margin-top: 2vh;
  @media screen and (max-width: 800px) {
    background-image: linear-gradient(to top, #141414, rgba(0, 0, 0, 0)), url("/bg.png");
    padding: 0 16px;
    padding-bottom: 16px;
    height: 100vw;
    margin-top: 0;
  }
`;

const HomeContent = styled.div`
  width: 100%;
  @media screen and (max-width: 800px) {
    margin-top: auto;
    width: 80%;
  }
`;

const HomeTitle = styled.h2`
  font-size: 100px;
  font-weight: 500;
  color: ${(props) => props.theme.accent};
  margin-top: 30vw;
  @media screen and (max-width: 800px) {
    margin: 0;
    font-size: 36px;
    font-weight: 700;
  }
`;

const HomeSubTitle = styled.h2`
  text-align: end;
  font-size: 48px;
  font-weight: 500;
  margin-top: 50px;
  @media screen and (max-width: 800px) {
    font-size: 16px;
    font-weight: 300;
    margin-top: 0px;
    text-align: start;
  }
`;

const List = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  margin-top: 160px;
  @media screen and (max-width: 800px) {
    margin-top: 60px;
  }
`;

const Category = styled.h2<{ isnow: string }>`
  border: 1px solid ${(props) => (props.isnow === "true" ? "transparent" : props.theme.white)};
  color: ${(props) => (props.isnow === "true" ? props.theme.accent : props.theme.white)};
  background-color: ${(props) => (props.isnow === "true" ? props.theme.accent + "40" : "transparent")};
  margin-right: 12px;
  padding: 4px 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  font-weight: ${(props) => (props.isnow === "true" ? 700 : 400)};
  font-size: 22px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.isnow === "true" ? props.theme.red : props.theme.gray)};
    color: ${(props) => props.theme.snow};
  }
  @media screen and (max-width: 800px) {
    padding: 2px 8px;
    margin-right: 8px;
    font-size: 14px;
  }
`;

const Contents = styled.div`
  padding: 40px 72px;
  width: 100%;
  display: flex;
  align-items: center;
  @media screen and (max-width: 800px) {
    padding: 24px 16px;
    padding-bottom: 16px;
  }
`;
