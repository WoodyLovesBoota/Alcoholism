import styled from "styled-components";
import { Link, PathMatch, useMatch, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { cockTailState, likesState } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faStar } from "@fortawesome/free-solid-svg-icons";
import NavigationBar from "../Components/NavigationBar";
import { AnimatePresence, motion } from "framer-motion";
import { ReactComponent as Vector } from "../assets/vector.svg";
import { ReactComponent as Like } from "../assets/like.svg";

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
              <Like width={62} height={62} />
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
              <Vector width={50} height={50} />
            </StarBox>
          )}
        </AnimatePresence>
      </Photo>

      <Contents>
        <Name>
          {cocktail.strDrink}
          <Cate>({cocktail.strCategory})</Cate>{" "}
        </Name>
        <ContentItem>
          <ContentTitle>Glass</ContentTitle>
          <ContentDesc>{cocktail.strGlass}</ContentDesc>
        </ContentItem>
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
      </Contents>
      {/* <Button onClick={onBackClick}>
        <FontAwesomeIcon icon={faLeftLong} />
      </Button> */}
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
  margin-left: 12.5rem;
`;

const Name = styled.h2`
  font-size: 1.3125rem;
  font-weight: 500;
  margin-bottom: 1.875rem;
`;

const Ingradients = styled.div`
  margin-top: 1.25rem;
  margin-bottom: 1.875rem;
`;

const IngItem = styled.div`
  display: flex;
  margin-bottom: 0.9375rem;
`;

const IngTitle = styled.h2`
  font-size: 1rem;
  width: 15.625rem;
  font-weight: 500;
  color: ${(props) => props.theme.gray};
`;

const IngContent = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => props.theme.gray};
`;

const ContentItem = styled.div`
  display: flex;
  margin-bottom: 3.125rem;
`;

const ContentTitle = styled.h2`
  font-size: 1rem;
  width: 12.5rem;
  font-weight: 500;
`;

const ContentDesc = styled.h2`
  font-size: 1rem;
  font-weight: 500;
`;

const Cate = styled.span`
  margin-left: 1.25rem;
  font-weight: 500;
  color: ${(props) => props.theme.gray};
`;

const Description = styled.div`
  margin-top: 1.25rem;
`;

const Desc = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.9375rem;
`;

const Button = styled.button`
  position: absolute;
  top: 3.125rem;
  left: 3.125rem;
  font-size: 1.3125rem;
  background-color: ${(props) => props.theme.lightGreen};
  color: ${(props) => props.theme.snow};
  padding: 0.9375rem;
  border-radius: 1.875rem;
  cursor: pointer;
`;

const photoVar = {
  initial: { y: "-120vw" },
  animate: { y: 0, transition: { type: "spring", stiffness: 70, duration: 0.5 } },
};

const vectorVar = {
  initial: { y: 0 },
  animate: { y: 40, transition: { delay: 1.2, type: "spring", stiffness: 100 } },
  exit: { y: 0 },
};

const likeVar = {
  initial: { y: 0 },
  animate: { y: 60, transition: { delay: 1.2, type: "spring", stiffness: 100 } },
  exit: { y: 0 },
};
