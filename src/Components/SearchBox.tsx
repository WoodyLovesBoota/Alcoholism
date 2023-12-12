import styled from "styled-components";
import { IGetCocktailResult } from "../api";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { screenState, currentSearchList } from "../atoms";
import { useEffect, useState } from "react";
import GlassCard from "./GlassCard";

const SearchBox = ({ isLoading, data }: ISearchBoxProps) => {
  const [current, setCurrent] = useState(6);
  const [currentList, setCurrentList] = useRecoilState(currentSearchList);

  const [screen, setScreen] = useRecoilState(screenState);

  useEffect(() => {
    data && data?.drinks && setCurrentList(data?.drinks.slice(0, current));
  }, [current, data]);

  useEffect(() => {
    if (screen === 0) setCurrent((prev) => Math.ceil(prev / 4) * 4);
    else if (screen === 1) setCurrent((prev) => Math.ceil(prev / 3) * 3);
    else setCurrent((prev) => Math.ceil(prev / 3) * 3);
  }, [screen]);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Main>
          {data?.drinks ? (
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
export default SearchBox;

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 70px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #141414;
  z-index: 4;
  padding: 0px 72px;
  overflow: auto;
`;

const Loader = styled.h2`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
`;

const NoResult = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  height: 70vh;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding-bottom: 100px;
`;

const Menu = styled.div`
  padding-top: 30px;
  width: 100%;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
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
`;

const MoreIcon = styled.span`
  font-size: 32px;
  font-weight: 500;
  margin-left: 20px;
`;

interface ISearchBoxProps {
  data: IGetCocktailResult | undefined;
  isLoading: boolean;
}
