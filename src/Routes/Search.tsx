import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { IGetCocktailResult, getCocktailSearch, getAllCategoryResult } from "../api";
import { useQuery } from "react-query";
import GlassCard from "../Components/GlassCard";
import NavigationBar from "../Components/NavigationBar";

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const navigate = useNavigate();

  const { data, isLoading } = useQuery<IGetCocktailResult>(["search", keyword], () => getCocktailSearch(keyword));

  return (
    <Wrapper>
      <NavigationBar />
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Main>
          <Title>
            Search results for <Keyword>"{keyword}"</Keyword>
          </Title>

          <Menu>
            {data?.drinks.map((cocktail) => (
              <GlassCard cocktail={cocktail} />
            ))}
          </Menu>
        </Main>
      )}
    </Wrapper>
  );
};
export default Search;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.wine};
`;

const Loader = styled.h2``;

const Main = styled.div`
  padding: 8%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Menu = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 50px;
  width: 100%;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.snow};
  font-size: 21px;
  font-weight: 500;
  margin-bottom: 50px;
  margin-left: 50px;
`;

const Keyword = styled.span`
  color: ${(props) => props.theme.lightGreen};
  font-size: 21px;
  font-weight: 500;
  margin-bottom: 50px;
`;
