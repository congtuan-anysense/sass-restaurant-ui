import React from "react";
import Header from "./headers/BaseHeader";
import NavigationBar from "./NavigationBar";
import styled from "styled-components";

const BaseLayout = React.memo(({ children }) => {
  return (
    <>
      <Header />
      <MainWrapper>
        <NavigationBar />
        {children}
      </MainWrapper>
    </>
  );
});

const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: 230px 1fr;
`;

export default BaseLayout;
