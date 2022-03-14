import styled from "styled-components";

export const Wrapper = styled.div<{
  top: number;
  left: number;
  seat: number;
  rotate: number;
}>`
  border: 1px solid #000000;
  box-sizing: border-box;
  transform: rotate(${(props) => props.rotate}deg);
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  .seats {
    height: 70px;
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
  }
  .face {
    width: ${(props) => Math.ceil(props.seat) * 92}px;
    height: 46px;
    background: #ffffff;
    border: none;
    border-top: 1px solid #000000;
    box-sizing: border-box;
  }
`;
