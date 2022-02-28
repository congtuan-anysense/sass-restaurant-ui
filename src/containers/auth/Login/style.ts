import styled from "styled-components";

export const Wrapper = styled.div`
  > .container {
    width: 970px;
    margin: 100px auto;
    border-radius: 10px;
    border: 1px solid rgb(212, 212, 212);
    padding: 40px;
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .input {
    width: 100%;
    min-width: 400px;
    border: 1px solid rgb(212, 212, 212);
    border-radius: 0px;
    font-size: 14px;
    outline: none;
    padding: 12px;
  }
  button {
    background-color: rgb(252, 188, 52);
    color: rgb(255, 255, 255);
    border: 1px solid rgb(252, 188, 52);
    width: 199px;
    margin: 0px auto;
    height: 44px;
    border-radius: 4px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    cursor: pointer;
    &:hover {
      opacity: 0.75;
      trasition: 0.2s;
    }
  }
  .label {
    color: rgb(252, 188, 52);
    font-size: 14px;
    line-height: 25px;
    margin-bottom: -3px;
  }
  .mb-10 {
    margin-bottom: 10px;
  }
  .mb-20 {
    margin-bottom: 20px;
  }
  .text-error {
    color: red;
  }
  .mb-36 {
    margin-bottom: 36px;
  }
  .mt-10 {
    margin-top: 10px;
  }
`;
