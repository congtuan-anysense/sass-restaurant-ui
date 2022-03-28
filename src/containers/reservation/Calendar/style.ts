import styled from "styled-components";

export const Wrapper = styled.div<{ duration: number }>`
  padding: 20px;
  width: calc(100vw - 230px);
  background: #ffffff;
  height: calc(100vh - 130px);
  .head {
    height: 50px;
    > div,
    button {
      background-color: #b33939;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      color: #ffffff;
      width: 200px;
      line-height: 30px;
      padding: 10px;
    }
    > .right {
      margin-right: -20px;
      border-top-right-radius: 0;
    }
  }
  .container {
    overflow: scroll;
    height: calc(100% - 20px);
    border: 1px solid #000;
    text-align: center;
    .header {
      display: grid;
      background: #ffffff;
      z-index: 10;
      grid-template-columns: 200px ${(props) => {
          return Array(props.duration).fill("200px").join(" ");
        }};
      .information-header {
        border-bottom: 1px solid #000;
      }
      .time-header {
        height: 50px;
        border-left: 1px solid #7f8fa6;
        border-bottom: 1px solid #7f8fa6;
        background-color: #f5f6fa;
        height: 50px;
      }
    }
    .time {
      width: 50px;
      height: 25px;
      border-top: 1px solid #7f8fa6;
      border-left: 1px solid #7f8fa6;
      &:first-child {
        border-left: none;
      }
    }

    .body {
      display: grid;
      widht: fix-content;
      grid-template-columns: 200px ${(props) => {
          return Array(props.duration * 4)
            .fill("50px")
            .join(" ");
        }};
      .table {
        padding-left: 10px;
        > div {
          height: 100%;
          padding-right: 10px;
          border-bottom: 1px #dfe6e9 solid;
        }
      }
      .time-bd {
        height: 50px;
        border-left: 1px solid #7f8fa6;
        border-bottom: 1px solid #7f8fa6;
      }
    }
  }
  .h-25 {
    height: 25px;
  }
  .active {
    background-color: #ffeaa7 !important;
  }
`;

export const EventWrapper = styled.div<{
  top: number;
  left: number;
  color: number;
}>`
  position: absolute;
  height: 50px;
  width: 200px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  background-color: #ffffff;
  padding: 5px;
  border-left: 1px solid #7f8fa6;
  border-bottom: 1px solid #7f8fa6;

  .core {
    background-color: ${(props) => props.color};
    border-radius: 5px;
    height: 190px;
    height: 40px;
    color: #ffffff;
    line-height: 40px;
  }
`;
