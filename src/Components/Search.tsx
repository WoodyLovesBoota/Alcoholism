import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { IGetCocktailResult, getCocktailSearch, getAllCategoryResult } from "../api";
import { useQuery } from "react-query";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { searchState } from "../atoms";
import { useState } from "react";
import GlassCard from "./GlassCard";

const Search = () => {
  const [isSearch, setIsSearch] = useRecoilState(searchState);
  const [keyword, setKeyword] = useState<string>();
  const [currentKeyword, setCurrentKeyword] = useState<string>();

  const { register, handleSubmit, getValues, setValue } = useForm<IForm>();

  const onValid = (data: IForm) => {
    setCurrentKeyword(data.keyword);
  };

  const handleChange = () => {
    const values = getValues("keyword");
    setCurrentKeyword(values);
  };

  const onCancelClick = () => {
    setIsSearch(false);
  };

  const { data: tempData, isLoading: tempIsLoading } = useQuery<IGetCocktailResult>(
    ["search", currentKeyword],
    () => getCocktailSearch(currentKeyword),
    {
      enabled: !!currentKeyword,
    }
  );

  return (
    <Wrapper>
      <Form variants={searchVar} initial="initial" animate="animate" onSubmit={handleSubmit(onValid)}>
        <Icon type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Icon>
        <Reset type="reset">
          <FontAwesomeIcon icon={faCircleXmark} />
        </Reset>
        <Input
          {...register("keyword", { required: true, minLength: 1 })}
          placeholder="Search Alcohol"
          autoComplete="off"
          onKeyDown={handleChange}
          onKeyUp={handleChange}
        />
        <Cancel onClick={onCancelClick}>취소</Cancel>
      </Form>
      {tempIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Main>
          <Menu>
            {tempData?.drinks ? (
              tempData?.drinks.map((cocktail) => (
                <GlassCard key={"search" + cocktail.idDrink} cocktail={cocktail} isBookmark={false} />
              ))
            ) : (
              <Loader>검색 결과가 없습니다.</Loader>
            )}
          </Menu>
        </Main>
      )}
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

const Loader = styled.h2`
  font-size: 16px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 50vh;
`;

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
  text-transform: uppercase;
  &:focus {
    outline: none;
  }
`;

const List = styled.div`
  padding-top: 15px;
  position: absolute;
  background-color: #141414;
  width: 100%;
`;

const Element = styled.div`
  display: flex;
  padding: 15px 52px;
  cursor: pointer;
`;

const Word = styled.div``;

const Normal = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const HighLight = styled.span`
  color: ${(props) => props.theme.accent};
  font-size: 16px;
  font-weight: 500;
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
  font-size: 16px;
  position: absolute;
  left: calc(85% - 25px);
  top: 13px;
  cursor: pointer;
  color: rgba(179, 179, 179, 1);
  display: flex;
  justify-content: center;
  align-items: center;
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
