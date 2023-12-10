import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { IGetCocktailResult, getCocktailSearch, getAllCategoryResult } from "../api";
import { useQuery } from "react-query";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { searchState } from "../atoms";
import { useState } from "react";
import GlassCard from "./GlassCard";

const Search = () => {
  const [isSearch, setIsSearch] = useRecoilState(searchState);
  const [keyword, setKeyword] = useState<string>();

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IForm>();

  const onValid = (data: IForm) => {
    setKeyword(data.keyword);
  };

  const onCancelClick = () => {
    setIsSearch(false);
  };

  const { data, isLoading } = useQuery<IGetCocktailResult>(["search", keyword], () => getCocktailSearch(keyword), {
    enabled: !!keyword,
  });

  return (
    <Wrapper>
      {/* <Main>
          <Title>
            Search results for <Keyword>"{keyword}"</Keyword>
          </Title>

          <Menu>
            {data?.drinks.map((cocktail) => (
              <GlassCard key={"search" + cocktail.idDrink} cocktail={cocktail} />
            ))}
          </Menu>
        </Main> */}
      <Form variants={searchVar} initial="initial" animate="animate" onSubmit={handleSubmit(onValid)}>
        <Icon type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Icon>
        <Reset type="reset">X</Reset>
        <Input
          {...register("keyword", { required: true, minLength: 1 })}
          placeholder="Search Alcohol"
          autoComplete="off"
        />
        <Cancel onClick={onCancelClick}>취소</Cancel>
      </Form>
      <Main>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <Menu>
            {data?.drinks.map((cocktail) => (
              <GlassCard key={"search" + cocktail.idDrink} cocktail={cocktail} />
            ))}
          </Menu>
        )}
      </Main>
    </Wrapper>
  );
};
export default Search;

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #141414;
  z-index: 4;
  padding: 16px;
  overflow: auto;
`;

const Loader = styled.h2``;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Menu = styled.div`
  padding-top: 30px;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
  width: 100%;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.snow};
  font-size: 1.3125rem;
  font-weight: 500;
  margin-bottom: 3.125rem;
  margin-left: 3.125rem;
`;

const Keyword = styled.span`
  color: ${(props) => props.theme.lightGreen};
  font-size: 1.3125rem;
  font-weight: 500;
  margin-bottom: 3.125rem;
`;

const Form = styled(motion.form)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Input = styled(motion.input)`
  border: none;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 50px;
  border-radius: 12px;
  width: 85%;
  color: ${(props) => props.theme.black};
  &:focus {
    outline: none;
  }
`;

const Icon = styled.button`
  font-size: 18px;
  color: ${(props) => props.theme.black};
  position: absolute;
  left: 15px;
  top: 10px;
  cursor: pointer;
  background-color: transparent;
`;

const Reset = styled.button`
  font-size: 8px;
  position: absolute;
  left: calc(85% - 25px);
  top: 13px;
  cursor: pointer;
  background-color: rgba(179, 179, 179, 1);
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  font-weight: 900;
  vertical-align: center;
`;

const Cancel = styled.button`
  font-size: 16px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 10px 20px;
  padding-right: 4px;
  cursor: pointer;
`;

const searchVar = {
  initial: { y: "-100" },
  animate: { y: 0, transition: { duration: 0.4 } },
};

interface IForm {
  keyword: string;
}
