import styled from "styled-components";
import NavigationBar from "../Components/NavigationBar";
import { useState } from "react";
import { useQuery } from "react-query";
import { IIngredient, getIngredient, getAllCategoryResult, getCategoryResult, IGetCocktailResult } from "../api";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import GlassCard from "../Components/GlassCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Ingredient = () => {
  const nameMatch: PathMatch<string> | null = useMatch("/ingredient/:name");
  const [current, setCurrent] = useState(8);

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

  return (
    <Wrapper>
      {nameMatch && !isLoading && !isCocktailLoading && (
        <Container>
          <Header>
            <NavigationBar isHome={false} />
            <HomeContent>
              <HomeTitle>{nameMatch.params.name === "All" ? "All" : data?.ingredients[0].strIngredient}</HomeTitle>
              <HomeSubTitle>
                {nameMatch.params.name === "All"
                  ? ""
                  : data?.ingredients[0].strDescription !== null && data?.ingredients[0].strDescription !== undefined
                  ? data?.ingredients[0].strDescription?.split(".")[0].length > 150
                    ? data?.ingredients[0].strDescription?.split(".")[0].slice(0, 150) + ".."
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
            <Page onClick={() => setCurrent((prev) => prev + 4)}>
              더보기{" "}
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
  min-height: 100vw;
  padding: 0 16px;
  padding-bottom: 16px;
  background-image: linear-gradient(to top, #141414, rgba(0, 0, 0, 0)), url("/bg.png");
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
`;

const HomeContent = styled.div`
  margin-top: auto;
`;

const HomeTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: ${(props) => props.theme.accent};
`;

const HomeSubTitle = styled.h2`
  font-size: 16px;
  font-weight: 300;
  word-break: break-all;
`;

const Contents = styled.div`
  padding: 24px 16px;
  padding-bottom: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Menus = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
  width: 100%;
  padding-bottom: 16px;
`;

const Page = styled.button`
  width: 100%;
  background-color: transparent;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

const Icon = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-left: 10px;
`;
