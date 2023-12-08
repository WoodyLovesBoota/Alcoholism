import styled from "styled-components";
import NavigationBar from "../Components/NavigationBar";
import { useEffect, useState } from "react";
import Categories from "../Components/Categories";
import { useQuery } from "react-query";
import { ICocktail, ICocktailDetail, getCocktailDetail, getCategoryResult, getAllCategoryResult } from "../api";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cockTailState, likesState } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const GlassCard = ({ cocktail }: IGlassCardProps) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useRecoilState(cockTailState);
  const [isLike, setIsLike] = useRecoilState(likesState);
  const [isIn, setIsIn] = useState(false);
  const { data, isLoading } = useQuery<ICocktailDetail>(["cocktails", cocktail.idDrink], () =>
    getCocktailDetail(cocktail.idDrink)
  );

  const onCardClick = () => {
    data && setCurrent(data);
    navigate(`/details/${data?.drinks[0].idDrink}`);
  };

  const onStarClick = () => {
    if (isIn) {
      setIsLike((prev) => {
        let index = -1;
        for (let i = 0; i < isLike.length; i++) {
          if (isLike[i].idDrink === cocktail.idDrink) index = i;
        }
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    } else {
      data && setIsLike((prev) => [...prev, data.drinks[0]]);
    }
  };

  useEffect(() => {
    for (let e of isLike) {
      if (e.idDrink === cocktail.idDrink) setIsIn(true);
    }
  });

  return (
    <Wrapper>
      {!isLoading && (
        <Card onClick={onCardClick}>
          <Photo bgPhoto={data?.drinks[0].strDrinkThumb ? data?.drinks[0].strDrinkThumb : ""} />
          <Title>{cocktail.strDrink}</Title>
          <Star isOn={isIn} onClick={onStarClick}>
            <FontAwesomeIcon icon={faStar} />
          </Star>
        </Card>
      )}
    </Wrapper>
  );
};

export default GlassCard;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  padding: 0 1.25rem;
  padding-top: 4.375rem;
  padding-bottom: 3.125rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.lightGray};
  border-radius: 2.5rem;
  width: 18.75rem;
  height: 28.125rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.gray};
  }
`;

const Photo = styled.div<{ bgPhoto: string }>`
  width: 15.625rem;
  height: 15.625rem;
  border-radius: 50%;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  margin-bottom: 1.875rem;
`;

const Title = styled.h2`
  font-size: 1.3125rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Star = styled.h2<{ isOn: boolean }>`
  color: ${(props) => (props.isOn ? "yellow" : "black")};
`;

interface IGlassCardProps {
  cocktail: ICocktail;
}
