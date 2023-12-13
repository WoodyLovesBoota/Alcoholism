import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { menuState, screenState } from "../atoms";
import { ReactComponent as Menus } from "../assets/menus.svg";

const Menu = () => {
  const [isMenu, setIsMenu] = useRecoilState(menuState);
  const [screen, setScreen] = useRecoilState(screenState);

  const navigate = useNavigate();

  const sample = [
    "Vodka",
    "Gin",
    "Rum",
    "Tequila",
    "Scotch",
    "Brandy",
    "Bourbon",
    "Champagne",
    "Tea",
    "Coffee",
    "Red wine",
    "Cognac",
    "Milk",
    "Whiskey",
    "Cider",
    "Bitters",
    "Sugar",
    "Yoghurt",
    "Lime juice",
    "Ginger",
    "Tomato juice",
    "Water",
    "Orange",
  ];

  const onCategoryClick = (index: number) => {
    setIsMenu(false);
    navigate(`/ingredient/${sample[index - 1]}`);
  };

  const onOverlayClick = () => {
    setIsMenu(false);
  };

  return (
    <Container>
      <Overlay onClick={onOverlayClick} />
      <Wrapper variants={screen === 0 ? menuVar : menuPcVar} initial="initial" animate="animate">
        <Item onClick={onOverlayClick}>
          <Menus width={24} height={24} />
        </Item>
        <Cates>
          {sample.map((e, i) => (
            <Cate key={i} onClick={() => onCategoryClick(i + 1)}>
              {/* {e.replaceAll(" ", "_").replaceAll("-", "_").toUpperCase()} */}
              {e.toUpperCase()}
            </Cate>
          ))}
        </Cates>
      </Wrapper>
    </Container>
  );
};
export default Menu;

const Container = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column-reverse;
  top: 0;
  left: 0;
  z-index: 1;
  @media screen and (max-width: 800px) {
    flex-direction: row;
    z-index: 11;
  }
`;

const Overlay = styled(motion.div)`
  width: 100vw;
  height: 80vh;
  z-index: 3;
  @media screen and (max-width: 800px) {
    width: 50vw;
    height: 100vh;
  }
`;

const Wrapper = styled(motion.div)`
  width: 100%;
  background-color: #141414;
  z-index: 4;
  padding: 36px 72px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  position: absolute;
  right: 0;
  top: 70px;
  box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 800px) {
    width: 80vw;
    height: 100vh;
    right: -20vw;
    top: 0;
    z-index: 4;
    position: fixed;
    box-shadow: 0 12px 50px 50px rgba(0, 0, 0, 0.5);
    border-top-left-radius: 36px;
    border-bottom-left-radius: 36px;
    padding: 10px 16px;
    padding-right: calc(20vw + 16px);
    padding-left: 40px;
    overflow: auto;
  }
`;

const Item = styled.h2`
  display: none;

  @media screen and (max-width: 800px) {
    cursor: pointer;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

const Cates = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start;
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    margin-top: 66px;
    justify-content: flex-start;
    grid-row-gap: 0px;
  }
`;

const Cate = styled.h2`
  color: ${(props) => props.theme.accent};
  margin-right: 50px;
  cursor: pointer;
  font-size: 32px;
  font-weight: 700;
  flex-grow: 0;
  margin-bottom: 16px;
  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 800px) {
    margin-bottom: 36px;
    margin-right: 0;
    font-size: 24px;
  }
`;

const menuVar = {
  initial: { x: "50vw" },
  animate: { x: "0vw", transition: { type: "spring", stiffness: 100 } },
};

const menuPcVar = {
  initial: { y: -200 },
  animate: { y: 0, transition: { type: "spring", stiffness: 50, duration: 0.2 } },
};

interface IForm {
  keyword: string;
}
