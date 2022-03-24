import React from "react";
import NavigationBar from "./NavigationBar";
import styled from "styled-components";
import ReservationHeader from "./headers/ReservationHeader";

const ReservationLayout = React.memo(({ children }) => {
  return (
    <>
      <ReservationHeader />
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

export default ReservationLayout;
