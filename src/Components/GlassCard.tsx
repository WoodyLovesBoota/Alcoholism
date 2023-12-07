import styled from "styled-components";
import NavigationBar from "../Components/NavigationBar";
import { useState } from "react";
import Categories from "../Components/Categories";
import { useQuery } from "react-query";
import { ICocktail, ICocktailDetail, getCocktailDetail, getCategoryResult, getAllCategoryResult } from "../api";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cockTailState } from "../atoms";

const GlassCard = ({ cocktail }: IGlassCardProps) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useRecoilState(cockTailState);

  const { data, isLoading } = useQuery<ICocktailDetail>(["cocktails", cocktail.idDrink], () =>
    getCocktailDetail(cocktail.idDrink)
  );

  const onCardClick = () => {
    data && setCurrent(data);
    navigate(`/details/${data?.drinks[0].idDrink}`);
  };

  return (
    <Wrapper>
      {!isLoading && (
        <Card onClick={onCardClick}>
          <Photo bgPhoto={data?.drinks[0].strDrinkThumb ? data?.drinks[0].strDrinkThumb : ""} />
          <Title>{cocktail.strDrink}</Title>
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
  padding: 0 20px;
  padding-top: 70px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.lightGray};
  border-radius: 40px;
  width: 300px;
  height: 450px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.gray};
  }
`;

const Photo = styled.div<{ bgPhoto: string }>`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 21px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  text-align: center;
`;

interface IGlassCardProps {
  cocktail: ICocktail;
}
