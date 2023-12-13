import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Vector } from "../assets/vector.svg";
import { ReactComponent as Menus } from "../assets/menus.svg";
import { useRecoilState } from "recoil";
import { searchState, menuState, screenState, currentSearchList, currentKeywordState, favoriteState } from "../atoms";
import Search from "../Components/Search";
import Menu from "./Menu";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { IGetCocktailResult, getCocktailSearch } from "../api";
import { motion } from "framer-motion";
import { faCircleXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "./SearchBox";
import { ReactComponent as Like } from "../assets/like.svg";
import { PathMatch, useMatch } from "react-router-dom";

const NavigationBar = ({ ishome, issticky }: { ishome: boolean; issticky: boolean }) => {
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useRecoilState(searchState);
  const [ismenu, setIsMenu] = useRecoilState(menuState);
  const [isfav, setIsFav] = useRecoilState(favoriteState);

  const [screen, setScreen] = useRecoilState(screenState);
  const [currentKeyword, setCurrentKeyword] = useRecoilState(currentKeywordState);
  const [currentList, setCurrentList] = useRecoilState(currentSearchList);

  const { register, handleSubmit, getValues, setValue } = useForm<IForm>();

  const favMatch: PathMatch<string> | null = useMatch("/favorites");

  const onHomeClick = () => {
    navigate("/");
    setIsFav(false);
    setIsMenu(false);
    setIsSearch(false);
  };

  const onSearchClick = () => {
    setIsMenu(false);
    setIsSearch(true);
  };

  const onMenuClick = () => {
    setIsFav(false);
    setIsSearch(false);
    setIsMenu((current) => !current);
  };

  const onFavoriteClick = () => {
    setIsSearch(false);
    setIsMenu(false);
    setIsFav(true);
    navigate("/favorites");
  };

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
    setCurrentKeyword("");
    setValue("keyword", "");
    setCurrentList([]);
  };

  const { data, isLoading } = useQuery<IGetCocktailResult>(
    ["search", currentKeyword],
    () => getCocktailSearch(currentKeyword),
    {
      enabled: !!currentKeyword,
    }
  );

  useEffect(() => {
    setValue("keyword", currentKeyword);
  }, [screen]);

  return (
    <Wrapper sticky={(issticky || isSearch).toString()}>
      {isSearch && screen === 0 && <Search />}
      {isSearch && screen !== 0 && <SearchBox isLoading={isLoading} data={data} />}
      {ismenu && <Menu />}
      <Container ismenu={ismenu.toString()}>
        <Logo ishome={ishome.toString()} onClick={onHomeClick}>
          ALCOHOLISM
        </Logo>

        <Contents>
          {screen !== 0 && isSearch && (
            <Form
              key={"searchOption"}
              variants={searchVar}
              initial="initial"
              animate="animate"
              onSubmit={handleSubmit(onValid)}
            >
              <Icon type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Icon>
              <Reset type="reset" onClick={onCancelClick}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </Reset>
              <Input
                {...register("keyword", { required: true, minLength: 1 })}
                placeholder="Search Alcohol"
                autoComplete="off"
                onKeyDown={handleChange}
                onKeyUp={handleChange}
              />
            </Form>
          )}
          <SearchItem onClick={onSearchClick} isfavorite={"false"}>
            {screen === 0 ? <FontAwesomeIcon icon={faMagnifyingGlass} /> : !isSearch && <Word>SEARCH</Word>}
          </SearchItem>
          <FavoriteItem onClick={onFavoriteClick} isfavorite={favMatch ? "true" : "false"}>
            {screen === 0 ? (
              favMatch ? (
                <Like width={24} height={24} />
              ) : (
                <Vector width={14} height={18} />
              )
            ) : (
              <Word>BOOKMARK</Word>
            )}
          </FavoriteItem>
          <MenuItem onClick={onMenuClick} isfavorite={ismenu.toString()}>
            {screen === 0 ? <Menus width={24} height={24} /> : <Word>MENU</Word>}
          </MenuItem>
        </Contents>
      </Container>
    </Wrapper>
  );
};

export default NavigationBar;

const Wrapper = styled.div<{ sticky: string }>`
  position: ${(props) => (props.sticky === "true" ? "fixed" : "absolute")};
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${(props) => props.sticky === "true" && 1};
  @media screen and (max-width: 800px) {
    position: absolute;
  }
`;

const Container = styled.div<{ ismenu: string }>`
  background-color: #141414;
  position: absolute;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 72px;
  height: 84px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: ${(props) => props.ismenu === "false" && `0px 4px 8px 2px rgba(0, 0, 0, 0.25)`};
  z-index: 10;
  @media screen and (max-width: 800px) {
    align-items: flex-end;
    padding: 6px 16px;
    height: 45px;
    background-color: transparent;
    box-shadow: 0 0 0 0 transparent;
  }
`;

const Logo = styled.h2<{ ishome: string }>`
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  color: ${(props) => props.theme.accent};
  @media screen and (max-width: 800px) {
    ${(props) => props.ishome === "true" && { display: "none" }}
    line-height: 1;
  }
`;

const Contents = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

const SearchItem = styled.h2<{ isfavorite: string }>`
  margin-left: 26px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.accent};
  background-color: ${(props) => (props.isfavorite === "true" ? props.theme.accent : "transparent")};
  border-radius: 100px;
  padding: 4px 12px;
  &:last-child {
    margin-right: 0;
  }
  span {
    color: ${(props) => (props.isfavorite === "true" ? props.theme.black : props.theme.accent)};
  }

  @media screen and (max-width: 800px) {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    margin-left: 0px;
    background-color: transparent;
    padding: 0;
    span {
      color: ${(props) => props.theme.accent};
    }
  }
`;

const MenuItem = styled.h2<{ isfavorite: string }>`
  margin-left: 26px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.accent};
  background-color: ${(props) => (props.isfavorite === "true" ? props.theme.accent : "transparent")};
  border-radius: 100px;
  padding: 4px 12px;
  &:last-child {
    margin-right: 0;
  }
  span {
    color: ${(props) => (props.isfavorite === "true" ? props.theme.black : props.theme.accent)};
  }

  @media screen and (max-width: 800px) {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    margin-left: 0px;
    background-color: transparent;
    padding: 0;
    span {
      color: ${(props) => props.theme.accent};
    }
  }
`;

const FavoriteItem = styled.h2<{ isfavorite: string }>`
  margin-left: 26px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.accent};
  background-color: ${(props) => (props.isfavorite === "true" ? props.theme.accent : "transparent")};
  border-radius: 100px;
  padding: 4px 12px;
  &:last-child {
    margin-right: 0;
  }
  span {
    color: ${(props) => (props.isfavorite === "true" ? props.theme.black : props.theme.accent)};
  }

  @media screen and (max-width: 800px) {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    margin-left: 0px;
    background-color: transparent;
    padding: 0;
    span {
      color: ${(props) => props.theme.accent};
    }
  }
`;

const Word = styled.span`
  color: ${(props) => props.theme.accent};
  font-size: 18px;
  font-weight: 500;
`;

const Form = styled(motion.form)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 260px;
  left: 40px;
  transform-origin: center right;
`;

const Input = styled(motion.input)`
  border: none;
  font-size: 18px;
  font-weight: 400;
  padding: 4px 12px;
  padding-left: 44px;
  border-radius: 100px;
  color: ${(props) => props.theme.black};
  width: 260px;
  height: 34px;
  background-color: ${(props) => props.theme.accent};
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 16px;
    color: ${(props) => props.theme.black};
  }
`;

const Icon = styled.button`
  font-size: 16px;
  color: ${(props) => props.theme.black};
  position: absolute;
  left: 10px;
  top: 7px;
  cursor: pointer;
  background-color: transparent;
`;

const Reset = styled.button`
  font-size: 18px;
  position: absolute;
  left: calc(100% - 30px);
  top: 9px;
  background-color: transparent;
  cursor: pointer;
  color: ${(props) => props.theme.black};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const searchVar = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
};

interface IForm {
  keyword: string;
}
