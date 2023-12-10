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
`;

const Main = styled.div`
  padding: 16px;
  padding-top: 60px;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
  width: 100%;
`;
