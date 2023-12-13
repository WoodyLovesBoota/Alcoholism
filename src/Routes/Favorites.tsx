import styled from "styled-components";
import NavigationBar from "../Components/NavigationBar";
import { useRecoilState } from "recoil";
import { likesState } from "../atoms";
import GlassCard from "../Components/GlassCard";
import { useEffect } from "react";

const Favorites = () => {
  const [likes, setLikes] = useRecoilState(likesState);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      <NavigationBar ishome={false} issticky={false} />
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
                isBookmark={true}
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
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  width: 100%;
  padding: 72px;
  padding-top: 100px;
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
    padding: 16px;
    padding-top: 60px;
  }
`;
