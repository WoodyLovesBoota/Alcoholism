import styled from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ICocktail, ICocktailDetail, getCocktailDetail, getCategoryResult, getAllCategoryResult } from "../api";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cockTailState, likesState, searchState } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as Vector } from "../assets/vector.svg";
import { ReactComponent as Like } from "../assets/like.svg";

const GlassCard = ({ cocktail }: IGlassCardProps) => {
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useRecoilState(searchState);
  const [current, setCurrent] = useRecoilState(cockTailState);
  const [isLike, setIsLike] = useRecoilState(likesState);
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
          <Card onClick={onCardClick} bgPhoto={data?.drinks[0].strDrinkThumb ? data?.drinks[0].strDrinkThumb : ""}>
            <Title>{cocktail.strDrink}</Title>
          </Card>
          {isIn ? (
            <YellowStar onClick={onYellowStarClick}>
              <Like width={"24"} height={"24"} />
            </YellowStar>
          ) : (
            <Star onClick={onStarClick}>
              <Vector width={"14"} height={"18"} />
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

const Card = styled.div<{ bgPhoto: string }>`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  border-radius: 20px;
  width: 100%;
  height: 55vw;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.gray};
  }
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 500;
  display: flex;
  color: white;
`;

const Star = styled.h2`
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
`;

const YellowStar = styled.h2`
  position: absolute;
  right: 11px;
  top: 13px;
  cursor: pointer;
`;

interface IGlassCardProps {
  cocktail: ICocktail;
}
