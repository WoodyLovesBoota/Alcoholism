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
  const sample = [
    "",
    "Cocktail",
    "Vodka",
    "Gin",
    "Rum",
    "Tequila",
    "Lime juice",
    "Triple Sec",
    "Brandy",
    "Bourbon",
    "Milk",
    "Coffee",
    "Lemon",
  ];

  const { data, isLoading } = useQuery<IGetCocktailResult>(
    ["cocktails", sample[current]],
    () =>
      current === 1 ? getAllCategoryResult(sample[current]) : getCategoryResult(sample[current]),
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
          <HomeSubTitle>Discover a cocktail that suits your taste. </HomeSubTitle>
          <HomeSubTitle>Explore our diverse range of cocktail recipes.</HomeSubTitle>
        </HomeContent>
        <List>
          {sample.map(
            (e, i) =>
              i !== 0 && (
                <Category
                  isnow={current === i ? "true" : "false"}
                  onClick={() => handleCateClick(i)}
                >
                  {i === 1 ? "ALL" : e.replaceAll(" ", "").toUpperCase()}
                </Category>
              )
          )}
        </List>
      </Header>
      <Contents>
        {!isLoading && <Categories key={current} name={sample[current]} data={data} />}
      </Contents>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  width: 100vw;
`;

const Header = styled.div`
  width: 100vw;
  min-height: 40vw;
  padding: 0 72px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), #141414a0, #141414),
    url("/bg2.webp");
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    background-image: linear-gradient(to top, #141414, rgba(0, 0, 0, 0)), url("/bg.webp");
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
  font-size: 56px;
  font-weight: 700;
  color: ${(props) => props.theme.accent};
  margin-top: 30vw;
  @media screen and (max-width: 800px) {
    margin: 0;
    font-size: 36px;
    font-weight: 700;
  }
`;

const HomeSubTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-top: 16px;
  &:last-child {
    margin: 0;
  }
  @media screen and (max-width: 800px) {
    font-size: 16px;
    font-weight: 300;
    margin-top: 0px;
    text-align: start;
    &:last-child {
      display: none;
    }
  }
`;

const List = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 100px;
  @media screen and (max-width: 800px) {
    margin-top: 60px;
    overflow-x: auto;
    flex-wrap: nowrap;
  }
`;

const Category = styled.h2<{ isnow: string }>`
  border: 1px solid ${(props) => (props.isnow === "true" ? "transparent" : props.theme.white)};
  color: ${(props) => (props.isnow === "true" ? props.theme.accent : props.theme.white)};
  background-color: ${(props) =>
    props.isnow === "true" ? props.theme.accent + "40" : "transparent"};
  margin-right: 12px;
  margin-bottom: 12px;
  padding: 4px 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  font-weight: ${(props) => (props.isnow === "true" ? 700 : 400)};
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.isnow === "true" ? props.theme.red : props.theme.gray)};
    color: ${(props) => props.theme.snow};
  }
  @media screen and (max-width: 800px) {
    padding: 2px 8px;
    margin-right: 8px;
    font-size: 14px;
    margin-bottom: 0;
  }
`;

const Contents = styled.div`
  padding: 24px 72px;
  width: 100%;
  display: flex;
  align-items: center;
  @media screen and (max-width: 800px) {
    padding: 24px 16px;
    padding-bottom: 16px;
  }
`;
