import styled from "styled-components";
import NavigationBar from "../Components/NavigationBar";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  IIngredient,
  getIngredient,
  ITotalIngredient,
  getCategoryResult,
  IGetCocktailResult,
  getIngredientList,
} from "../api";
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
  const [total, setTotal] = useState<{ strIngredient1: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: totalList, isLoading: isTotalLoading } = useQuery<ITotalIngredient>(
    ["ingradientList", "list"],
    () => getIngredientList(),
    { enabled: !!nameMatch?.params.name }
  );

  const { data, isLoading } = useQuery<IIngredient>(
    ["ingradient", nameMatch?.params.name],
    () => getIngredient(nameMatch?.params.name),
    { enabled: !!totalList }
  );

  const { data: cocktailData, isLoading: isCocktailLoading } = useQuery<IGetCocktailResult>(
    ["cocktailData", total[currentPage - 1]?.strIngredient1],
    () => getCategoryResult(total[currentPage - 1].strIngredient1),
    { enabled: !!currentPage }
  );

  useEffect(() => {
    let sample =
      totalList &&
      totalList.drinks.filter((e) =>
        e.strIngredient1
          .toLowerCase()
          .split(" ")
          .some(
            (e) =>
              e === (nameMatch && nameMatch.params.name ? nameMatch.params.name.toLowerCase() : "")
          )
      );
    sample && setTotal(sample);
    setCurrentPage(1);
  }, [nameMatch?.params.name, totalList]);

  useEffect(() => {
    if (screen === 0) setCurrent((prev) => Math.ceil(prev / 4) * 4);
    else if (screen === 1) setCurrent((prev) => Math.ceil(prev / 3) * 3);
    else setCurrent((prev) => Math.ceil(prev / 3) * 3);
  }, [screen]);

  return (
    <Wrapper>
      {nameMatch && !isLoading && !isCocktailLoading && !isTotalLoading && (
        <Container>
          <Header>
            <NavigationBar ishome={false} issticky={false} />
            <HomeContent>
              <HomeTitle>
                {data?.ingredients ? data?.ingredients[0].strIngredient : nameMatch.params.name}
              </HomeTitle>
              <HomeSubTitle>
                {data?.ingredients
                  ? data?.ingredients[0].strDescription !== null &&
                    data?.ingredients[0].strDescription !== undefined
                    ? data?.ingredients[0].strDescription?.split(".")[0].length >
                      (screen === 0 ? 150 : 400)
                      ? data?.ingredients[0].strDescription
                          ?.split(".")[0]
                          .slice(0, screen === 0 ? 150 : 400) + ".."
                      : data?.ingredients[0].strDescription?.split(".")[0] + "."
                    : ""
                  : ""}
              </HomeSubTitle>
            </HomeContent>
          </Header>
          <Lists>
            {total.map((e, i) => (
              <List
                isnow={(currentPage === i + 1).toString()}
                onClick={() => {
                  setCurrentPage(i + 1);
                }}
              >
                {e.strIngredient1}
              </List>
            ))}
          </Lists>
          <Contents>
            <Menus>
              {cocktailData &&
                cocktailData?.drinks
                  .slice(0, current)
                  .map((cocktail) => (
                    <GlassCard
                      key={"cocktail" + cocktail.idDrink}
                      cocktail={cocktail}
                      isBookmark={false}
                    />
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
  padding: 20px 72px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    padding: 24px 16px;
    padding-bottom: 16px;
  }
`;

const Lists = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 100px;
  padding: 0 72px;
  @media screen and (max-width: 800px) {
    margin-top: 60px;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding: 0 16px;
  }
`;

const List = styled.h2<{ isnow: string }>`
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
