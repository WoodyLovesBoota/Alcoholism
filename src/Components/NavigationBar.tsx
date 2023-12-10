import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ReactComponent as Vector } from "../assets/vector.svg";
import { ReactComponent as Menus } from "../assets/menus.svg";
import { useRecoilState } from "recoil";
import { searchState } from "../atoms";
import Search from "../Components/Search";

const NavigationBar = ({ isHome }: { isHome: boolean }) => {
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useRecoilState(searchState);

  const onHomeClick = () => {
    navigate("/Cocktail");
  };

  const onSearchClick = () => {
    setIsSearch(true);
  };

  const onFavoriteClick = () => {
    navigate("/favorites");
  };

  return (
    <Wrapper>
      {!isHome && <Logo onClick={onHomeClick}>Grab a Drink</Logo>}

      <Contents>
        <Item onClick={onSearchClick}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Item>
        <Item onClick={onFavoriteClick}>
          <Vector width={14} height={18} />
        </Item>
        <Item>
          <Menus width={24} height={24} />
        </Item>
      </Contents>
      {isSearch && <Search />}
    </Wrapper>
  );
};

export default NavigationBar;

const Wrapper = styled.div`
  width: 100%;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

const Logo = styled.h2`
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  color: ${(props) => props.theme.accent};
`;

const Contents = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

const Item = styled.h2`
  margin-right: 12px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.accent};
  &:last-child {
    margin-right: 0;
  }
`;
