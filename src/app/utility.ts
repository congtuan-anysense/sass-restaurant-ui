import { css, createGlobalStyle } from "styled-components";

export const utility = css`
  .text-center {
    text-align: center;
  }
  .text-white {
    color: #ffffff;
  }
  .text-dark {
    color: #000000;
  }
  .text-blue {
    color: #2f80ed;
  }
  .text-required {
    color: #ce0037;
  }

  // fonts
  .text-10 {
    font-size: 10px;
  }
  .text-12 {
    font-size: 12px;
  }
  .text-14 {
    font-size: 14px;
  }
  .text-15 {
    font-size: 15px;
  }
  .text-16 {
    font-size: 16px;
  }
  .text-36 {
    font-size: 36px;
  }
  .font-400 {
    font-weight: 400;
  }
  .font-500 {
    font-weight: 500;
  }
  .font-bold {
    font-weight: bold;
  }
  .line-height-14 {
    line-height: 14px;
  }

  .decorate-none {
    text-decoration: none;
  }
  //background-colors
  .bg-primary {
    background: #ffffff;
  }
  .bg-gray {
    background: #e5e5e5;
  }
  // displays
  .flex {
    display: flex;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  .justify-arround {
    justify-content: space-around;
  }
  .justify-evenly {
    justify-content: space-evenly;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .align-center {
    align-items: center;
  }
  .block {
    display: block;
  }
  .d-none {
    display: none;
  }
  .empty {
    display: inline-block;
    background: white;
  }
  //
  .hover-opacity {
    &:hover {
      opacity: 0.75;
      transition: 0.2s;
    }
  }
  // margins
  .mr-5 {
    margin-right: 5px;
  }
  .mr-10 {
    margin-right: 10px;
  }
  .mr-15 {
    margin-right: 15px;
  }
  .mr-30 {
    margin-right: 30px;
  }
  .ml-15 {
    margin-left: 15px;
  }
  .ml-30 {
    margin-left: 30px;
  }
  .mt-15 {
    margin-top: 15px;
  }
  .mt-8 {
    margin-top: 8px;
  }
  .mt-30 {
    margin-top: 30px;
  }
  .mt-50 {
    margin-top: 50px;
  }
  .mb-8 {
    margin-bottom: 8px;
  }
  .mb-10 {
    margin-bottom: 10px;
  }
  .mb-20 {
    margin-bottom: 20px;
  }
  .mb-25 {
    margin-bottom: 25px;
  }
  .mb-30 {
    margin-bottom: 30px;
  }

  //paddings
  .p-10 {
    padding: 10px;
  }
  .px-10 {
    padding-left: 10px;
    padding-right: 10px;
  }
  .px-20 {
    padding-left: 20px;
    padding-right: 20px;
  }
  .px-30 {
    padding-left: 30px;
    padding-right: 30px;
  }
  .px-70 {
    padding-left: 70px;
    padding-right: 70px;
  }
  .px-55 {
    padding-left: 55px;
    padding-right: 55px;
  }
  .py-5 {
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .py-8 {
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .py-10 {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .py-15 {
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .py-20 {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  // width
  .w-80 {
    width: 80%;
  }
  .w-full {
    width: 100%;
  }
  .w-half {
    width: 50%;
  }
  // positions
  .relative {
    position: relative;
  }
  .absolute {
    position: absolute;
  }
`;

export const Utility = createGlobalStyle`${utility}`;
