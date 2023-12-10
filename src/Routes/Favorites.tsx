import styled from "styled-components";
import NavigationBar from "../Components/NavigationBar";
import { useRecoilState } from "recoil";
import { likesState } from "../atoms";
import GlassCard from "../Components/GlassCard";

const Favorites = () => {
  const [likes, setLikes] = useRecoilState(likesState);

  return (
    <Wrapper>
      <NavigationBar isHome={false} />
      <Header>
        <Title>Favorites</Title>
      </Header>
      <Main>
        {likes.map(
          (cocktail, ind) =>
            ind !== 0 && (
              <GlassCard
                key={"favorite" + cocktail.idDrink}
                cocktail={{
                  strDrink: cocktail.strDrink ? cocktail.strDrink : "",
                  strDrinkThumb: cocktail.strDrinkThumb ? cocktail.strDrinkThumb : "",
                  idDrink: cocktail.idDrink ? cocktail.idDrink : "",
                }}
              />
            )
        )}
      </Main>
    </Wrapper>
  );
};

export default Favorites;

const Wrapper = styled.div`
  width: 100vw;
  padding-bottom: 8%;
`;

const Header = styled.div`
  width: 100%;
  padding: 5% 8%;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  margin: 8% 0;
  display: flex;
  justify-content: center;
  color: white;
`;

const Main = styled.div`
  padding: 0 8%;
  width: 100%;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 3.125rem;
  grid-column-gap: 0.9375rem;
  width: 100%;
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
