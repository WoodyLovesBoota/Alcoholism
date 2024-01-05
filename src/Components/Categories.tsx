import styled from "styled-components";
import { useEffect, useState } from "react";
import { IGetCocktailResult, ICocktail } from "../api";
import { PathMatch, useMatch } from "react-router-dom";
import GlassCard from "./GlassCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { enrolledCocktailState, screenState } from "../atoms";
import { motion } from "framer-motion";
import EnrollGlassCard from "./EnrollGlassCard";

const Categories = ({ name, data }: ICategoriesProps) => {
  const [current, setCurrent] = useState(6);
  const [currentList, setCurrentList] = useState<ICocktail[]>([]);
  const [screen, setScreen] = useRecoilState(screenState);
  const [enrolled, setEnrolled] = useRecoilState(enrolledCocktailState);
  const cocktailMatch: PathMatch<string> | null = useMatch("/:category");

  useEffect(() => {
    data && setCurrentList(data?.drinks.slice(0, current));
  }, [current, enrolled]);

  useEffect(() => {
    if (screen === 0) setCurrent((prev) => Math.ceil(prev / 4) * 4);
    else if (screen === 1) setCurrent((prev) => Math.ceil(prev / 3) * 3);
    else setCurrent((prev) => Math.ceil(prev / 3) * 3);
  }, [screen]);

  return (
    <Wrapper>
      <Menus>
        {enrolled.cocktails &&
          enrolled.cocktails
            .filter(
              (cocktail) =>
                cocktail.strCategory && cocktail.strCategory.toUpperCase() === name.toUpperCase()
            )
            .map((cocktail) => (
              <EnrollGlassCard
                key={"cocktail" + cocktail.idDrink + "category"}
                cocktail={cocktail}
                isBookmark={false}
              />
            ))}

        {cocktailMatch &&
          cocktailMatch.params.category === name &&
          currentList.map((cocktail) => (
            <GlassCard key={"cocktail" + cocktail.idDrink} cocktail={cocktail} isBookmark={false} />
          ))}
      </Menus>
      <Page onClick={() => setCurrent((prev) => (screen === 0 ? prev + 4 : prev + 3))}>
        <Ment variants={hoverVar} animate="animate" whileHover={"hover"}>
          See more
          <Icon>
            <FontAwesomeIcon icon={faAngleDown} />
          </Icon>
        </Ment>
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
  grid-gap: 24px;
  width: 100%;
  padding-bottom: 16px;
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
  }
`;

const Page = styled(motion.button)`
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

const Ment = styled(motion.h2)`
  font-size: 32px;
  font-weight: 500;
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

const hoverVar = {
  animate: { y: 0 },
  hover: { y: 15 },
};

interface ICategoriesProps {
  name: string;
  data: IGetCocktailResult | undefined;
}
