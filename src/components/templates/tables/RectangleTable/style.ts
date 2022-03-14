import styled from "styled-components";

export const Wrapper = styled.div<{
  top: number;
  rotate: number;
  left: number;
  seat: number;
}>`
  height: 240px;
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  border: 1px solid #000000;
  box-sizing: border-box;
  transform: rotate(${(props) => props.rotate}deg);
  display: grid;
  grid-auto-flow: column;
  grid-row-gap: 40px;
  padding: 0 30px;
  grid-template-rows: 100px 100px;

  .face {
    width: ${(props) => Math.ceil(props.seat / 2) * 92}px;
    height: 92px;
    background: #ffffff;
    border: 1px solid #000000;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .seat {
    width: 92px;
    > div {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #000000;
      z-index: 20;
    }
  }
`;
