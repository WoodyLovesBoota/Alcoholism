import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { menuState, currentCateState } from "../atoms";
import { ReactComponent as Menus } from "../assets/menus.svg";

const Menu = () => {
  const [isMenu, setIsMenu] = useRecoilState(menuState);

  const navigate = useNavigate();

  const sample = ["All", "Vodka", "Gin", "Rum", "Tequila", "Lime juice", "Triple Sec", "Brandy", "Bourbon"];

  const onCategoryClick = (index: number) => {
    setIsMenu(false);
    navigate(`/ingredient/${sample[index - 1]}`);
  };

  const onOverlayClick = () => {
    setIsMenu(false);
  };

  return (
    <Container>
      <Overlay onClick={onOverlayClick} variants={overVar} initial="initial" animate="animate" />
      <Wrapper variants={menuVar} initial="initial" animate="animate">
        <Item onClick={onOverlayClick}>
          <Menus width={24} height={24} />
        </Item>
        <Cates>
          {sample.map((e, i) => (
            <Cate onClick={() => onCategoryClick(i + 1)}>
              {e.replaceAll(" ", "_").replaceAll("-", "_").toUpperCase()}
            </Cate>
          ))}
        </Cates>
      </Wrapper>
    </Container>
  );
};
export default Menu;

const Container = styled.div`
  height: 100vh;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
`;

const Overlay = styled(motion.div)`
  width: 50vw;
  height: 100vh;
  z-index: 3;
`;

const Wrapper = styled(motion.div)`
  width: 80vw;
  height: 100vh;
  background-color: #141414;
  z-index: 4;
  padding: 10px 16px;
  overflow: auto;
  border-top-left-radius: 36px;
  border-bottom-left-radius: 36px;
  position: fixed;
  right: -20vw;
  padding-right: calc(20vw + 16px);
  padding-left: 40px;
  box-shadow: 0 12px 50px 50px rgba(0, 0, 0, 0.5);
`;

const Item = styled.h2`
  cursor: pointer;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Cates = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 66px;
`;

const Cate = styled.h2`
  color: ${(props) => props.theme.accent};
  margin-bottom: 36px;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const menuVar = {
  initial: { x: "100vw" },
  animate: { x: "0vw", transition: { type: "spring", stiffness: 80, duration: 0.3 } },
};

const overVar = {
  initial: { backgroundColor: "#00000000" },
  animate: { backgroundColor: "#00000020", transition: { delay: 1, duration: 0.2 } },
};

interface IForm {
  keyword: string;
}
