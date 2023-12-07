import styled from "styled-components";
import NavigationBar from "../Components/NavigationBar";
const Cocktails = () => {
  return (
    <Wrapper>
      <NavigationBar />
    </Wrapper>
  );
};

export default Cocktails;

const Wrapper = styled.div`
  width: 100vw;
`;

const Main = styled.div`
  padding: 10% 15%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 5%;
  background-color: ${(props) => props.theme.darkGreen};
`;

const Column = styled.div``;

const Title = styled.h2`
  color: ${(props) => props.theme.snow};
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 50px;
`;

const Desc = styled.h2`
  color: ${(props) => props.theme.snow};
  font-size: 18px;
  font-weight: 300;
  line-height: 2;
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 50px;
`;

const ButtonMain = styled.button`
  padding: 20px 30px;
  font-size: 18px;
  font-weight: 400;
  border-radius: 20px;
  background-color: ${(props) => props.theme.red};
  color: ${(props) => props.theme.snow};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.wine};
  }
`;

const ButtonSub = styled.button`
  padding: 20px 30px;
  font-size: 18px;
  font-weight: 400;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.snow};
  background-color: transparent;
  color: ${(props) => props.theme.snow};
  cursor: pointer;
  margin-left: 20px;
`;

const Logo = styled.div`
  width: 50%;
`;

const Sub = styled.div`
  background-color: ${(props) => props.theme.snow};
  padding: 10% 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubTitle = styled.h2`
  font-size: 36px;
  font-weight: 600;
`;
