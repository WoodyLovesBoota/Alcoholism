import styled from "styled-components";
import NavigationBar from "../Components/NavigationBar";
import { useState } from "react";
import Categories from "../Components/Categories";
import { useQuery } from "react-query";
import { IGetCocktailResult, getCategoryResult, getAllCategoryResult } from "../api";
import { useNavigate } from "react-router-dom";

const Cocktails = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(1);
  const sample = ["", "Cocktail", "Vodka", "Gin", "Rum", "Tequila"];
  const { data, isLoading } = useQuery<IGetCocktailResult>(
    ["cocktails", sample[current]],
    () => (current === 1 ? getAllCategoryResult(sample[current]) : getCategoryResult(sample[current])),
    { enabled: !!current }
  );

  const handleCateClick = (num: number) => {
    setCurrent(num);
    navigate(`/cocktails/${sample[num]}`);
  };

  return (
    <Wrapper>
      <NavigationBar />
      <Header>
        <Title>Cocktails</Title>
        <List>
          <Category isNow={current === 1} onClick={() => handleCateClick(1)}>
            All
          </Category>
          <Category isNow={current === 2} onClick={() => handleCateClick(2)}>
            Vodka
          </Category>
          <Category isNow={current === 3} onClick={() => handleCateClick(3)}>
            Gin
          </Category>
          <Category isNow={current === 4} onClick={() => handleCateClick(4)}>
            Rum
          </Category>
          <Category isNow={current === 5} onClick={() => handleCateClick(5)}>
            Tequila
          </Category>
        </List>
      </Header>
      <Main>{!isLoading && <Categories key={current} name={sample[current]} data={data} />}</Main>
    </Wrapper>
  );
};

export default Cocktails;

const Wrapper = styled.div`
  width: 100vw;
  padding-bottom: 8%;
`;

const Main = styled.div`
  padding: 0 8%;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  padding: 5% 8%;
`;

const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 3%;
`;

const Category = styled.h2<{ isNow: boolean }>`
  border: 0.0938rem solid ${(props) => (props.isNow ? props.theme.red : props.theme.gray)};
  color: ${(props) => (props.isNow ? props.theme.snow : props.theme.gray)};
  background-color: ${(props) => (props.isNow ? props.theme.red : "transparent")};
  padding: 1.25rem 0;
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  font-weight: 500;
  font-size: 1.125rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.isNow ? props.theme.red : props.theme.gray)};
    color: ${(props) => props.theme.snow};
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 8%;
  display: flex;
  justify-content: center;
`;
