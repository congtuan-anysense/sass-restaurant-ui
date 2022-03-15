import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;

  padding: 80px;

  .bd-blue {
    border: 1px solid #2f80ed;
  }
  .bg-none {
    background: none;
  }
  .pd-12 {
    padding: 12px;
  }
  .radius-4 {
    border-radius: 4px;
  }
  .mb-5 {
    margin-bottom: 5px;
  }
  .mr-25 {
    margin-right: 25px;
  }
  .mb-35 {
    margin-bottom: 35px;
  }
  .layout-box {
    position: relative;
    overflow: hidden;
    background: rgba(216, 215, 215, 0.52);
    border: none;
    width: 100%;
    height: auto;
    min-height: 720px;
    .payment-box {
      width: 238px;
      height: 147px;
      background: #ffffff;
      border: 1px solid #000000;
      box-sizing: border-box;
      position: absolute;
      bottom: 15px;
      left: 15px;
    }
  }
  .footer-btn {
    width: 100px;
    border: 1px solid #000000;
    border-radius: 4px;
    padding: 10px 0;
  }
  .mt-80 {
    margin-top: 80px;
  }
  .btn-hover {
    &:hover {
      background: #30336b;
      color: #ffffff;
      transform: 0.2s;
    }
  }
`;
