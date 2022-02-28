import React from "react";
import styled from "styled-components";
import DownIcon from "assets/images/icons/down.svg";
const Header: React.FC<{}> = () => {
  return (
    <Wrapper>
      <div></div>
      <div className="user flex">
        <p className="text-18 font-400 text-white">鈴木 次郎</p>
        <img src={DownIcon} alt="down-icon" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100%;
  height: 80px;
  background-color: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 22px;
  .user {
    color: #ffffff;
    font-size: 18px;
    font-weight: 400;
  }
  .flex {
    display: flex;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  .text-18 {
    font-size: 18px;
  }
  .text-white {
    color: #fff;
  }
`;

export default Header;
