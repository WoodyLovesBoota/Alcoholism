import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";

const NavigationBar = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IForm>();

  const onHomeClick = () => {
    navigate("/");
  };

  const onCocktailClick = () => {
    navigate("/cocktails/Cocktail");
  };

  const onValid = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`);
  };

  return (
    <Wrapper>
      <Logo onClick={onHomeClick}>ALCOHOLISM</Logo>
      <Contents>
        <Item onClick={onHomeClick}>Home</Item>
        <Item onClick={onCocktailClick}>Cocktails</Item>
        <Item>
          <Form onSubmit={handleSubmit(onValid)}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <Input
              {...register("keyword", { required: true, minLength: 1 })}
              placeholder="Search Alcohol"
              autoComplete="off"
            />
          </Form>
        </Item>
        <Item>
          <FontAwesomeIcon icon={faUser} />
        </Item>
      </Contents>
    </Wrapper>
  );
};

export default NavigationBar;

const Wrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.snow};
  padding: 3.125rem 15%;
  display: flex;
  align-items: center;
`;

const Logo = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
`;

const Contents = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

const Item = styled.h2`
  margin-left: 1.875rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
`;

const Form = styled(motion.form)`
  display: flex;
  align-items: center;
`;

const Input = styled(motion.input)`
  padding: 0.625rem;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  border-bottom: 0.0938rem solid ${(props) => props.theme.black};
  background-color: transparent;
  width: 9.375rem;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: lightgray;
    font-size: 0.875rem;
    font-weight: 500;
  }
`;

interface IForm {
  keyword: string;
}
