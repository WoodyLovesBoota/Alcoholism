import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { cockTailState, likesState } from "../atoms";
import NavigationBar from "../Components/NavigationBar";
import { AnimatePresence, motion } from "framer-motion";
import { ReactComponent as VectorLong } from "../assets/vectorLong.svg";
import { ReactComponent as LikeLong } from "../assets/likeLong.svg";

const Detail = () => {
  const [current, setCurrent] = useRecoilState(cockTailState);
  const cocktail = current.drinks[0];
  const navigate = useNavigate();
  const [isLike, setIsLike] = useRecoilState(likesState);
  const [isIn, setIsIn] = useState(false);

  const onBackClick = () => {
    navigate("/Cocktail");
  };

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
  });

  return (
    <Wrapper>
      <NavigationBar isHome={false} />

      <Photo variants={photoVar} initial="initial" animate="animate">
        <Bg bgPhoto={cocktail?.strDrinkThumb ? cocktail?.strDrinkThumb : ""} />
        <AnimatePresence>
          {isIn ? (
            <StarBox
              key={cocktail.idDrink + "like"}
              variants={likeVar}
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
              variants={vectorVar}
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
            <Cate>{cocktail.strCategory.replaceAll(" ", "_").replaceAll("-", "_").toUpperCase()}</Cate>
          )}
          {cocktail.strIngredient1 && (
            <Cate>{cocktail.strIngredient1.replaceAll(" ", "_").replaceAll("-", "_").toUpperCase()}</Cate>
          )}
          {cocktail.strIngredient2 && (
            <Cate>{cocktail.strIngredient2.replaceAll(" ", "_").replaceAll("-", "_").toUpperCase()}</Cate>
          )}
          {cocktail.strIngredient3 && (
            <Cate>{cocktail.strIngredient3.replaceAll(" ", "_").replaceAll("-", "_").toUpperCase()}</Cate>
          )}
          {cocktail.strIngredient4 && (
            <Cate>{cocktail.strIngredient4.replaceAll(" ", "_").replaceAll("-", "_").toUpperCase()}</Cate>
          )}
          {cocktail.strIngredient5 && (
            <Cate>{cocktail.strIngredient5.replaceAll(" ", "_").replaceAll("-", "_").toUpperCase()}</Cate>
          )}
        </Cates>

        <ContentItem>
          <ContentTitle>GLASS</ContentTitle>
          <ContentDesc>{cocktail.strGlass}</ContentDesc>
        </ContentItem>

        <ContentItem>
          <ContentTitle>Ingradients</ContentTitle>
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
          <ContentTitle>How to Make</ContentTitle>
          <Description>
            {cocktail.strInstructions?.split(".").map(
              (e, i) =>
                e !== "" && (
                  <Desc>
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
`;

const Photo = styled(motion.div)<{ bgPhoto: string }>`
  width: 100%;
  height: 120vw;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 40px;
`;

const Bg = styled.div<{ bgPhoto: string }>`
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)), url(${(props) => props.bgPhoto});
  background-position: center center;
  background-size: cover;
  width: 100%;
  height: 120vw;
  position: absolute;
  left: 0;
  z-index: 1;
  border-bottom-left-radius: 36px;
  border-bottom-right-radius: 36px;
`;

const StarBox = styled(motion.div)`
  cursor: pointer;
  position: absolute;
`;

const Contents = styled.div`
  padding: 16px;
  width: 100%;
`;

const Name = styled.h2`
  margin-top: 16px;
  font-size: 32px;
  font-weight: 700;
  margin-right: 80px;
  color: ${(props) => props.theme.accent};
`;

const Cates = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 50px;
  overflow-x: auto;
  width: 100%;
`;

const Cate = styled.span`
  font-weight: 400;
  font-size: 14px;
  padding: 2px 8px;
  border-radius: 100px;
  border: 1px solid white;
  margin-right: 8px;
`;

const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 36px;
`;

const ContentTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  border-bottom: 2px solid white;
  height: 40px;
`;

const ContentDesc = styled.h2`
  font-size: 16px;
  font-weight: 400;
  margin-top: 10px;
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
  font-size: 16px;
  font-weight: 400;
`;

const IngContent = styled.h2`
  font-size: 16px;
  font-weight: 400;
`;

const Description = styled.div``;

const Desc = styled.h2`
  font-size: 16px;
  font-weight: 400;
  margin-top: 10px;
`;

const Button = styled.button`
  position: absolute;
  top: 50px;
  left: 50px;
  font-size: 21px;
  background-color: ${(props) => props.theme.lightGreen};
  color: ${(props) => props.theme.snow};
  padding: 15px;
  border-radius: 30px;
  cursor: pointer;
`;

const photoVar = {
  initial: { y: "-60vw" },
  animate: { y: 0, transition: { type: "spring", stiffness: 50, duration: 0.3 } },
};

const vectorVar = {
  initial: { y: 0 },
  animate: { y: 40, transition: { delay: 0.7, type: "spring", stiffness: 100 } },
  exit: { y: 0 },
};

const likeVar = {
  initial: { y: 0 },
  animate: { y: 60, transition: { delay: 0.7, type: "spring", stiffness: 100 } },
  exit: { y: 0 },
};
