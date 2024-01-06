import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { cockTailState, likesState, screenState } from "../atoms";
import NavigationBar from "../Components/NavigationBar";
import { AnimatePresence, motion } from "framer-motion";
import { ReactComponent as VectorLong } from "../assets/vectorLong.svg";
import { ReactComponent as LikeLong } from "../assets/likeLong.svg";

const Detail = () => {
  const [current, setCurrent] = useRecoilState(cockTailState);
  const cocktail = current.drinks[0];
  const [isLike, setIsLike] = useRecoilState(likesState);
  const [isIn, setIsIn] = useState(false);
  const [screen, setScreen] = useRecoilState(screenState);

  const onYellowStarClick = () => {
    setIsLike((prev) => {
      let index = -1;
      for (let i = 0; i < isLike.length; i++) {
        if (isLike[i].idDrink === cocktail.idDrink) index = i;
      }
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
    setIsIn(false);
  };

  const onStarClick = () => {
    setIsLike((prev) => [...prev, cocktail]);
    setIsIn(true);
  };

  useEffect(() => {
    for (let e of isLike) {
      if (e.idDrink === cocktail.idDrink) setIsIn(true);
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      <NavigationBar ishome={false} issticky={true} />
      <Photo
        key={cocktail.idDrink + "small"}
        variants={screen === 0 ? photoVar : defaultVar}
        initial="initial"
        animate="animate"
      >
        <Bg bgphoto={cocktail?.strDrinkThumb ? cocktail?.strDrinkThumb : ""} />
        <AnimatePresence>
          {isIn ? (
            <StarBox
              key={cocktail.idDrink + "like"}
              variants={screen === 0 ? likeVar : likeLongVar}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={onYellowStarClick}
            >
              <LikeLong width={24} height={126} />
            </StarBox>
          ) : (
            <StarBox
              key={cocktail.idDrink + "vector"}
              variants={screen === 0 ? vectorVar : vectorLongVar}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={onStarClick}
            >
              <VectorLong width={24} height={126} />
            </StarBox>
          )}
        </AnimatePresence>
      </Photo>

      <Contents>
        <Name>{cocktail.strDrink}</Name>
        <Cates>
          {cocktail.strCategory && (
            <Cate>
              {cocktail.strCategory.replaceAll(" ", "").replaceAll("-", "").toUpperCase()}
            </Cate>
          )}
        </Cates>

        <ContentItem>
          <ContentTitle>GLASS</ContentTitle>
          <ContentDesc>{cocktail.strGlass}</ContentDesc>
        </ContentItem>

        <ContentItem>
          <ContentTitle>INGREDIENTS</ContentTitle>
          <Ingradients>
            <IngItem>
              <IngTitle>{cocktail.strIngredient1}</IngTitle>
              <IngContent>{cocktail.strMeasure1}</IngContent>
            </IngItem>
            <IngItem>
              <IngTitle>{cocktail.strIngredient2}</IngTitle>
              <IngContent>{cocktail.strMeasure2}</IngContent>
            </IngItem>
            <IngItem>
              <IngTitle>{cocktail.strIngredient3}</IngTitle>
              <IngContent>{cocktail.strMeasure3}</IngContent>
            </IngItem>
            <IngItem>
              <IngTitle>{cocktail.strIngredient4}</IngTitle>
              <IngContent>{cocktail.strMeasure4}</IngContent>
            </IngItem>
            <IngItem>
              <IngTitle>{cocktail.strIngredient5}</IngTitle>
              <IngContent>{cocktail.strMeasure5}</IngContent>
            </IngItem>
          </Ingradients>
        </ContentItem>

        <ContentItem>
          <ContentTitle>HOW TO MAKE</ContentTitle>
          <Description>
            {cocktail.strInstructions?.split(".").map(
              (e, i) =>
                e !== "" && (
                  <Desc key={i}>
                    {i + 1}. {e}.
                  </Desc>
                )
            )}
          </Description>
        </ContentItem>
      </Contents>
    </Wrapper>
  );
};

export default Detail;

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  position: relative;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    position: inherit;
  }
`;

const Photo = styled(motion.div)<{ bgphoto: string }>`
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: fixed;
  top: 50px;
  left: 0;

  @media screen and (max-width: 800px) {
    position: inherit;
    width: 100%;
    height: 120vw;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding-right: 40px;
  }
`;

const Bg = styled.div<{ bgphoto: string }>`
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)),
    url(${(props) => props.bgphoto});
  background-position: center center;
  background-size: cover;
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  z-index: 1;
  @media screen and (max-width: 800px) {
    position: absolute;
    height: 120vw;
    border-bottom-left-radius: 36px;
    border-bottom-right-radius: 36px;
  }
`;

const StarBox = styled(motion.div)`
  cursor: pointer;
  position: absolute;
  top: -100px;
  left: calc(100vw - 90px);

  @media screen and (max-width: 800px) {
    position: absolute;
    top: auto;
    top: initial;
    left: auto;
    left: initial;
  }
`;

const Contents = styled.div`
  padding: 40px 72px;
  padding-top: 124px;
  width: 100%;
  padding-left: calc(50vw + 72px);
  background: ${(props) => props.theme.black};
  @media screen and (max-width: 800px) {
    padding: 16px;
    width: 100%;
  }
`;

const Name = styled.h2`
  font-size: 42px;
  font-weight: 700;
  margin-right: 12vw;
  color: ${(props) => props.theme.accent};
  @media screen and (max-width: 800px) {
    margin-top: 16px;
    font-size: 32px;
    font-weight: 700;
    margin-right: 80px;
  }
`;

const Cates = styled.div`
  margin-top: 20px;
  margin-bottom: 67px;
  display: flex;
  @media screen and (max-width: 800px) {
    display: flex;
    overflow-x: auto;
    margin-bottom: 50px;
    width: 100%;
  }
`;

const Cate = styled.p`
  font-weight: 400;
  font-size: 18px;
  padding: 4px 14px;
  border-radius: 100px;
  border: 1px solid white;
  margin-right: 8px;

  @media screen and (max-width: 800px) {
    font-weight: 400;
    font-size: 14px;
    padding: 2px 8px;
    border-radius: 100px;
    border: 1px solid white;
    margin-right: 8px;
  }
`;

const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
  @media screen and (max-width: 800px) {
    margin-bottom: 36px;
  }
`;

const ContentTitle = styled.h2`
  font-size: 28px;
  font-weight: 500;
  border-bottom: 2px solid white;
  height: 46px;
  @media screen and (max-width: 800px) {
    font-size: 24px;
    height: 40px;
  }
`;

const ContentDesc = styled.h2`
  font-size: 18px;
  font-weight: 400;
  margin-top: 10px;
  text-transform: uppercase;
  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
`;

const Ingradients = styled.div`
  width: 100%;
`;

const IngItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

const IngTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
`;

const IngContent = styled.h2`
  font-size: 18px;
  font-weight: 400;
  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
`;

const Description = styled.div``;

const Desc = styled.h2`
  font-size: 18px;
  font-weight: 400;
  margin-top: 10px;
  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
`;

const photoVar = {
  initial: { y: "-60vw" },
  animate: { y: 0, transition: { type: "spring", stiffness: 50, duration: 0.3 } },
};

const defaultVar = {
  initial: { y: "-0vw" },
  animate: { y: 0 },
};

const vectorVar = {
  initial: { y: 0 },
  animate: { y: 40, transition: { delay: 0.7, type: "spring", stiffness: 100 } },
  exit: { y: 0 },
};

const vectorLongVar = {
  initial: { y: 0 },
  animate: { y: 70, transition: { delay: 0.5, type: "spring", stiffness: 100 } },
  exit: { y: 0 },
};

const likeVar = {
  initial: { y: 0 },
  animate: { y: 60, transition: { delay: 0.7, type: "spring", stiffness: 100 } },
  exit: { y: 0 },
};

const likeLongVar = {
  initial: { y: 0 },
  animate: { y: 100, transition: { delay: 0.5, type: "spring", stiffness: 100 } },
  exit: { y: 0 },
};
