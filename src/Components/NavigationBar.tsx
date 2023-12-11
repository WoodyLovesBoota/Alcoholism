import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Vector } from "../assets/vector.svg";
import { ReactComponent as Menus } from "../assets/menus.svg";
import { useRecoilState } from "recoil";
import { searchState, menuState } from "../atoms";
import Search from "../Components/Search";
import Menu from "./Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";

const NavigationBar = ({ isHome }: { isHome: boolean }) => {
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useRecoilState(searchState);
  const [isMenu, setIsMenu] = useRecoilState(menuState);
  const mobileMatch = useMediaQuery("(max-width:800px)");
  const midMatch = useMediaQuery("(max-width:1400px)");

  const [screen, setScreen] = useState(0);
  const onHomeClick = () => {
    navigate("/Cocktail");
  };

  const onSearchClick = () => {
    setIsSearch(true);
  };

  const onMenuClick = () => {
    setIsMenu(true);
  };

  const onFavoriteClick = () => {
    navigate("/favorites");
  };

  useEffect(() => {
    if (!mobileMatch && !midMatch) setScreen(2);
    else if (!mobileMatch && midMatch) setScreen(1);
    else if (mobileMatch) setScreen(0);
  }, [mobileMatch, midMatch]);

  return (
    <Wrapper>
      <Logo isHome={isHome} onClick={onHomeClick}>
        ALCOHOLISM
      </Logo>

      <Contents>
        <Item onClick={onSearchClick}>
          {screen === 0 ? <FontAwesomeIcon icon={faMagnifyingGlass} /> : <Word>SEARCH</Word>}
        </Item>
        <Item onClick={onFavoriteClick}>
          {screen === 0 ? <Vector width={14} height={18} /> : <Word>BOOKMARK</Word>}
        </Item>
        <Item onClick={onMenuClick}>{screen === 0 ? <Menus width={24} height={24} /> : <Word>MENU</Word>}</Item>
      </Contents>
      {isSearch && <Search />}
      {isMenu && <Menu />}
    </Wrapper>
  );
};

export default NavigationBar;

const Wrapper = styled.div`
  width: 100%;
  padding: 28px 72px;
  display: flex;
  align-items: flex-end;
  top: 0;
  left: 0;
  z-index: 2;
  height: 84px;
  background-color: #141414;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.25);
  position: fixed;

  @media screen and (max-width: 800px) {
    position: absolute;
    padding: 6px 16px;
    height: 45px;
    background-color: transparent;
    box-shadow: 0 0 0 0 transparent;
  }
`;

const Logo = styled.h2<{ isHome: boolean }>`
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  color: ${(props) => props.theme.accent};
  @media screen and (max-width: 800px) {
    ${(props) => props.isHome && { display: "none" }}
    line-height: 1;
  }
`;

const Contents = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

const Item = styled.h2`
  margin-left: 50px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.accent};

  &:last-child {
    margin-right: 0;
  }

  @media screen and (max-width: 800px) {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    margin-left: 0px;
  }
`;

const Word = styled.span`
  color: ${(props) => props.theme.accent};
  font-size: 18px;
  font-weight: 500;
`;
