import styled from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ICocktail, ICocktailDetail, getCocktailDetail, ICocktailSingle, getAllCategoryResult } from "../api";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cockTailState, likesState, screenState, searchState } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as Vector } from "../assets/vector.svg";
import { ReactComponent as Like } from "../assets/like.svg";
import { motion } from "framer-motion";

const GlassCard = ({ cocktail, isBookmark }: IGlassCardProps) => {
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useRecoilState(searchState);
  const [current, setCurrent] = useRecoilState(cockTailState);
  const [isLike, setIsLike] = useRecoilState(likesState);
  const [screen, setScreen] = useRecoilState(screenState);

  const [isIn, setIsIn] = useState(false);
  const { data, isLoading } = useQuery<ICocktailDetail>(["cocktails", cocktail.idDrink], () =>
    getCocktailDetail(cocktail.idDrink)
  );

  const onCardClick = () => {
    data && setCurrent(data);
    setIsSearch(false);
    navigate(`/details/${data?.drinks[0].idDrink}`);
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
    data && setIsLike((prev) => [...prev, data.drinks[0]]);
    setIsIn(true);
  };

  useEffect(() => {
    for (let e of isLike) {
      if (e.idDrink === cocktail.idDrink) {
        setIsIn(true);
      }
    }
  });

  return (
    <Wrapper>
      {!isLoading && (
        <>
          <Card
            variants={cardVar}
            initial="initial"
            animate="animate"
            onClick={onCardClick}
            bgPhoto={data?.drinks[0].strDrinkThumb ? data?.drinks[0].strDrinkThumb : ""}
          >
            <Title>{cocktail.strDrink}</Title>
          </Card>
          {isIn ? (
            <YellowStar isBook={isBookmark} onClick={onYellowStarClick}>
              {isBookmark ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <Like width={screen === 0 ? "24" : "36"} height={screen === 0 ? "24" : "36"} />
              )}
            </YellowStar>
          ) : (
            <Star onClick={onStarClick}>
              <Vector width={screen === 0 ? "14" : "21"} height={screen === 0 ? "18" : "27"} />
            </Star>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default GlassCard;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const Card = styled(motion.div)<{ bgPhoto: string }>`
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  border-radius: 20px;
  width: 100%;
  height: 35vw;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.gray};
  }

  @media screen and (max-width: 800px) {
    padding: 16px 20px;
    border-radius: 20px;
    height: 55vw;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  color: white;
  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
`;

const Star = styled.h2`
  position: absolute;
  right: 22px;
  top: 19px;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    right: 16px;
    top: 16px;
  }
`;

const YellowStar = styled.h2<{ isBook: boolean }>`
  position: absolute;
  right: 15px;
  top: ${(props) => (props.isBook ? "13px" : "15px")};
  font-size: 18px;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    font-size: 14px;
    top: ${(props) => (props.isBook ? "11px" : "13px")};
    right: 11px;
  }
`;

const cardVar = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

interface IGlassCardProps {
  cocktail: ICocktail | ICocktailSingle;
  isBookmark: boolean;
}
