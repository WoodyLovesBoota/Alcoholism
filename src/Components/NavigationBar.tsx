import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  const onHomeClick = () => {
    navigate("/");
  };

  const onCocktailClick = () => {
    navigate("/cocktails/Cocktail");
  };

  return (
    <Wrapper>
      <Logo onClick={onHomeClick}>ALCOHOLISM</Logo>
      <Contents>
        <Item onClick={onHomeClick}>Home</Item>
        <Item onClick={onCocktailClick}>Cocktails</Item>
        <Item>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
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
  padding: 50px 15%;
  display: flex;
  align-items: center;
`;

const Logo = styled.h2`
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
`;

const Contents = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

const Item = styled.h2`
  margin-left: 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
