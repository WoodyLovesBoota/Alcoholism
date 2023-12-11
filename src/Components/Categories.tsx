import styled from "styled-components";
import NavigationBar from "./NavigationBar";
import { useEffect, useState } from "react";
import { IGetCocktailResult, ICocktail } from "../api";
import { Link, PathMatch, useMatch, useNavigate } from "react-router-dom";
import GlassCard from "./GlassCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Categories = ({ name, data }: ICategoriesProps) => {
  const [current, setCurrent] = useState(8);
  const [currentList, setCurrentList] = useState<ICocktail[]>([]);
  const [totalPage, setTotalPage] = useState<number[]>([]);

  const cocktailMatch: PathMatch<string> | null = useMatch("/:category");

  useEffect(() => {
    data && setCurrentList(data?.drinks.slice(0, current));
  }, [current]);

  return (
    <Wrapper>
      <Menus>
        {cocktailMatch &&
          cocktailMatch.params.category === name &&
          currentList.map((cocktail) => (
            <GlassCard key={"cocktail" + cocktail.idDrink} cocktail={cocktail} isBookmark={false} />
          ))}
      </Menus>
      <Page onClick={() => setCurrent((prev) => prev + 4)}>
        더보기{" "}
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

interface ICategoriesProps {
  name: string;
  data: IGetCocktailResult | undefined;
}
