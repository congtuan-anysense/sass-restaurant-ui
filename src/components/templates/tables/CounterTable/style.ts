import styled from "styled-components";

export const Wrapper = styled.div<{
  top: number;
  left: number;
  seat: number;
  rotate: number;
  isPresent: boolean;
}>`
  border: ${(props) =>
    props.isPresent ? "1px solid rgba(255,255,255,0)" : "1px solid #000000"};
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
  .action {
    width: 40px;
    height: 40px;
    background: #ffffff;
    border: 1px solid #000000;
    box-sizing: border-box;
    position: absolute;
    transform: translate(0, -50%);
    > img {
      transform: rotate(${(props) => 360 - props.rotate}deg);
    }
  }
  .rotate {
    right: 22px;
    top: 0;
  }
  .remove {
    top: 0;
    right: -20px;
  }
`;
