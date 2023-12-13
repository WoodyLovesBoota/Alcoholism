import styled from "styled-components";
import NavigationBar from "../Components/NavigationBar";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { IIngredient, getIngredient, getAllCategoryResult, getCategoryResult, IGetCocktailResult } from "../api";
import { PathMatch, useMatch } from "react-router-dom";
import GlassCard from "../Components/GlassCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { screenState } from "../atoms";

const Ingredient = () => {
  const nameMatch: PathMatch<string> | null = useMatch("/ingredient/:name");
  const [current, setCurrent] = useState(6);
  const [screen, setScreen] = useRecoilState(screenState);

  const { data, isLoading } = useQuery<IIngredient>(
    ["ingradient", nameMatch?.params.name],
    () => getIngredient(nameMatch?.params.name),
    { enabled: !!nameMatch }
  );

  const { data: cocktailData, isLoading: isCocktailLoading } = useQuery<IGetCocktailResult>(
    ["cocktailData", nameMatch?.params.name],
    () =>
      nameMatch?.params.name === "All" ? getAllCategoryResult("Cocktail") : getCategoryResult(nameMatch?.params.name),
    { enabled: !!data }
  );

  useEffect(() => {
    if (screen === 0) setCurrent((prev) => Math.ceil(prev / 4) * 4);
    else if (screen === 1) setCurrent((prev) => Math.ceil(prev / 3) * 3);
    else setCurrent((prev) => Math.ceil(prev / 3) * 3);
  }, [screen]);

  return (
    <Wrapper>
      {nameMatch && !isLoading && !isCocktailLoading && (
        <Container>
          <Header>
            <NavigationBar ishome={false} issticky={false} />
            <HomeContent>
              <HomeTitle>{nameMatch.params.name === "All" ? "All" : data?.ingredients[0].strIngredient}</HomeTitle>
              <HomeSubTitle>
                {nameMatch.params.name === "All"
                  ? ""
                  : data?.ingredients[0].strDescription !== null && data?.ingredients[0].strDescription !== undefined
                  ? data?.ingredients[0].strDescription?.split(".")[0].length > (screen === 0 ? 150 : 400)
                    ? data?.ingredients[0].strDescription?.split(".")[0].slice(0, screen === 0 ? 150 : 400) + ".."
                    : data?.ingredients[0].strDescription?.split(".")[0] + "."
                  : ""}
              </HomeSubTitle>
            </HomeContent>
          </Header>
          <Contents>
            <Menus>
              {cocktailData &&
                cocktailData?.drinks
                  .slice(0, current)
                  .map((cocktail) => (
                    <GlassCard key={"cocktail" + cocktail.idDrink} cocktail={cocktail} isBookmark={false} />
                  ))}
            </Menus>
            <Page onClick={() => setCurrent((prev) => (screen === 0 ? prev + 4 : prev + 3))}>
              See more
              <Icon>
                <FontAwesomeIcon icon={faAngleDown} />
              </Icon>
            </Page>
          </Contents>
        </Container>
      )}
    </Wrapper>
  );
};

export default Ingredient;

const Wrapper = styled.div`
  width: 100vw;
`;

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  width: 100vw;
  padding: 200px 72px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    background-image: linear-gradient(to top, #141414, rgba(0, 0, 0, 0)), url("/bg.png");
    background-size: cover;
    background-position: center center;
    min-height: 100vw;
    padding: 0 16px;
    padding-bottom: 16px;
  }
`;

const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    margin-top: auto;
  }
`;

const HomeTitle = styled.h2`
  font-size: 56px;
  font-weight: 700;
  color: ${(props) => props.theme.accent};
  margin-bottom: 36px;
  @media screen and (max-width: 800px) {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 0;
  }
`;

const HomeSubTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  word-break: normal;
  margin-top: auto;
  width: 70%;
  @media screen and (max-width: 800px) {
    font-size: 16px;
    font-weight: 300;
    word-break: break-all;
    margin: 0;
  }
`;

const Contents = styled.div`
  padding: 80px 72px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    padding: 24px 16px;
    padding-bottom: 16px;
  }
`;

const Menus = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  width: 100%;
  padding-bottom: 16px;
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
  }
`;

const Page = styled.button`
  width: 100%;
  background-color: transparent;
  height: 210px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  font-weight: 500;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    font-size: 16px;
    height: 80px;
  }
`;

const Icon = styled.span`
  font-size: 28px;
  font-weight: 500;
  margin-left: 20px;
  @media screen and (max-width: 800px) {
    margin-left: 10px;
    font-size: 16px;
  }
`;
