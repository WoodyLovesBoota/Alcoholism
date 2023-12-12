import styled from "styled-components";
import { useEffect, useState } from "react";
import { IGetCocktailResult, ICocktail } from "../api";
import { PathMatch, useMatch } from "react-router-dom";
import GlassCard from "./GlassCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { screenState } from "../atoms";

const Categories = ({ name, data }: ICategoriesProps) => {
  const [current, setCurrent] = useState(6);
  const [currentList, setCurrentList] = useState<ICocktail[]>([]);
  const [screen, setScreen] = useRecoilState(screenState);

  const cocktailMatch: PathMatch<string> | null = useMatch("/:category");

  useEffect(() => {
    data && setCurrentList(data?.drinks.slice(0, current));
  }, [current]);

  useEffect(() => {
    if (screen === 0) setCurrent((prev) => Math.ceil(prev / 4) * 4);
    else if (screen === 1) setCurrent((prev) => Math.ceil(prev / 3) * 3);
    else setCurrent((prev) => Math.ceil(prev / 3) * 3);
  }, [screen]);

  return (
    <Wrapper>
      <Menus>
        {cocktailMatch &&
          cocktailMatch.params.category === name &&
          currentList.map((cocktail) => (
            <GlassCard key={"cocktail" + cocktail.idDrink} cocktail={cocktail} isBookmark={false} />
          ))}
      </Menus>
      <Page onClick={() => setCurrent((prev) => (screen === 0 ? prev + 4 : prev + 3))}>
        See more
        <Icon>
          <FontAwesomeIcon icon={faAngleDown} />
        </Icon>
      </Page>
    </Wrapper>
  );
};

export default Categories;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Menus = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
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
  font-size: 32px;
  font-weight: 500;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    font-size: 16px;
    height: 80px;
  }
`;

const Icon = styled.span`
  font-size: 32px;
  font-weight: 500;
  margin-left: 20px;
  @media screen and (max-width: 800px) {
    margin-left: 10px;
    font-size: 16px;
  }
`;

interface ICategoriesProps {
  name: string;
  data: IGetCocktailResult | undefined;
}
