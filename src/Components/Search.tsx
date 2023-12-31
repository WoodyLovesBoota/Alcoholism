import styled from "styled-components";
import { IGetCocktailResult, getCocktailSearch, ICocktail } from "../api";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faMagnifyingGlass, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { currentSearchList, screenState, searchState, currentKeywordState } from "../atoms";
import { useEffect, useState } from "react";
import GlassCard from "./GlassCard";

const Search = () => {
  const [isSearch, setIsSearch] = useRecoilState(searchState);
  const [currentKeyword, setCurrentKeyword] = useRecoilState(currentKeywordState);
  const [current, setCurrent] = useState(6);
  const [currentList, setCurrentList] = useRecoilState(currentSearchList);

  const [screen, setScreen] = useRecoilState(screenState);

  const { register, handleSubmit, getValues, setValue } = useForm<IForm>();

  const onValid = (data: IForm) => {
    setCurrentKeyword(data.keyword);
    setValue("keyword", "");
  };

  const handleChange = () => {
    const values = getValues("keyword");
    setCurrentKeyword(values);
  };

  const onCancelClick = () => {
    setIsSearch(false);
  };

  const { data, isLoading } = useQuery<IGetCocktailResult>(
    ["search", currentKeyword],
    () => getCocktailSearch(currentKeyword),
    {
      enabled: !!currentKeyword,
    }
  );

  useEffect(() => {
    data && data?.drinks && setCurrentList(data?.drinks.slice(0, current));
  }, [current, data]);

  useEffect(() => {
    setValue("keyword", currentKeyword);
  }, []);

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
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Main>
          {currentList ? (
            <>
              <Menu>
                {currentList.map((cocktail) => (
                  <GlassCard key={"search" + cocktail.idDrink} cocktail={cocktail} isBookmark={false} />
                ))}
              </Menu>
              <Page onClick={() => setCurrent((prev) => (screen === 0 ? prev + 4 : prev + 3))}>
                See more
                <MoreIcon>
                  <FontAwesomeIcon icon={faAngleDown} />
                </MoreIcon>
              </Page>
            </>
          ) : (
            <NoResult>No search results found.</NoResult>
          )}
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
  z-index: 11;
  padding: 16px 72px;
  overflow: auto;
  @media screen and (max-width: 800px) {
    padding: 16px;
  }
`;

const Loader = styled.h2`
  font-size: 16px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
`;

const NoResult = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  height: 50vh;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Menu = styled.div`
  padding-top: 30px;
  width: 100%;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
    padding-top: 30px;
  }
`;

const Form = styled(motion.form)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
`;

const Input = styled(motion.input)`
  border: none;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 50px;
  border-radius: 12px;
  width: 90%;
  color: ${(props) => props.theme.black};
  &:focus {
    outline: none;
  }

  @media screen and (max-width: 800px) {
    width: 85%;
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
  font-size: 18px;
  position: absolute;
  top: 13px;
  cursor: pointer;
  color: rgba(179, 179, 179, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  left: calc(85% - 30px);
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

const Page = styled.button`
  width: 100%;
  background-color: transparent;
  height: 210px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 500;
  cursor: pointer;

  @media screen and (max-width: 800px) {
    font-size: 16px;
    height: 80px;
  }
`;

const MoreIcon = styled.span`
  font-size: 32px;
  font-weight: 500;
  margin-left: 20px;

  @media screen and (max-width: 800px) {
    margin-left: 10px;
    font-size: 16px;
  }
`;

const searchVar = {
  initial: { y: "-100" },
  animate: { y: 0, transition: { duration: 0.4 } },
};

interface IForm {
  keyword: string;
}
