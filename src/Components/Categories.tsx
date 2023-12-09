import styled from "styled-components";
import NavigationBar from "./NavigationBar";
import { useEffect, useState } from "react";
import { IGetCocktailResult, ICocktail } from "../api";
import { Link, PathMatch, useMatch, useNavigate } from "react-router-dom";
import GlassCard from "./GlassCard";

const Categories = ({ name, data }: ICategoriesProps) => {
  const [current, setCurrent] = useState(0);
  const [currentList, setCurrentList] = useState<ICocktail[]>([]);
  const [totalPage, setTotalPage] = useState<number[]>([]);

  const cocktailMatch: PathMatch<string> | null = useMatch("/cocktails/:category");

  useEffect(() => {
    data && setCurrentList(data?.drinks.slice(current, current + 8));
  }, [current]);

  useEffect(() => {
    if (data) {
      let temp = [];
      for (let i = 1; i <= Math.ceil(data?.drinks.length / 8); i++) {
        temp.push(i);
      }
      setTotalPage(temp);
    }
  }, []);

  return (
    <Wrapper>
      <Menus>
        {cocktailMatch &&
          cocktailMatch.params.category === name &&
          currentList.map((cocktail) => <GlassCard key={"cocktail" + cocktail.idDrink} cocktail={cocktail} />)}
      </Menus>
      <Pages>
        {totalPage.map((e) => (
          <Page isNow={current >= (e - 1) * 8 && current < e * 8} onClick={() => setCurrent((e - 1) * 8)}>
            {e}
          </Page>
        ))}
      </Pages>
    </Wrapper>
  );
};

export default Categories;

const Wrapper = styled.div`
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Menus = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 3.125rem;
  grid-column-gap: 0.9375rem;
  width: 100%;
  @media screen and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 599px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Pages = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;
  margin-top: 6.25rem;
`;

const Page = styled.button<{ isNow: boolean }>`
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 500;
  color: ${(props) => (props.isNow ? "black" : props.theme.gray)};
  background-color: transparent;
`;

interface ICategoriesProps {
  name: string;
  data: IGetCocktailResult | undefined;
}
