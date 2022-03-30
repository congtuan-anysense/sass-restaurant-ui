import React from "react";
import styled from "styled-components";
const BaseLoading: React.FC<{ color?: string }> = ({ color = "#fff" }) => {
  return (
    <Wrapper color={color} className="flex justify-center align-center">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ color: string }>`
  height: 100%;
  width: 100%;
  .lds-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ripple div {
    position: absolute;
    border: 4px solid ${(props) => props.color};
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`;
export default BaseLoading;
