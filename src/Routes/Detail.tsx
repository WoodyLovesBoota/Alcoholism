import styled from "styled-components";
import { Link, PathMatch, useMatch, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { cockTailState } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

const Detail = () => {
  const [current, setCurrent] = useRecoilState(cockTailState);
  const cocktail = current.drinks[0];
  const navigate = useNavigate();

  const onBackClick = () => {
    navigate("/cocktails/Cocktail");
  };

  return (
    <Wrapper>
      <Main>
        <Photo bgPhoto={cocktail?.strDrinkThumb ? cocktail?.strDrinkThumb : ""} />
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
        <Button onClick={onBackClick}>
          <FontAwesomeIcon icon={faLeftLong} />
        </Button>
      </Main>
    </Wrapper>
  );
};

export default Detail;

const Wrapper = styled.div`
  padding: 8% 15%;
  width: 100vw;
  min-height: 100vh;
  background-color: ${(props) => props.theme.lightGreen};
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.snow};
  border-radius: 1.875rem;
  padding: 6.25rem;
  position: relative;
  @media screen and (max-width: 899px) {
    flex-direction: column;
  }
`;

const Photo = styled.div<{ bgPhoto: string }>`
  width: 18.75rem;
  height: 18.75rem;
  background-image: url(${(props) => props.bgPhoto});
  background-position: center center;
  background-size: cover;
  border-radius: 9.375rem;
  @media screen and (max-width: 899px) {
    margin-bottom: 2.5rem;
  }
`;

const Contents = styled.div`
  margin-left: 9.375rem;
  @media screen and (max-width: 899px) {
    margin-left: 0;
  }
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
