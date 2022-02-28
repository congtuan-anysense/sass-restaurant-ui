import React, { useState } from "react";
import styled from "styled-components";
import DownIcon from "assets/images/icons/down-dark.svg";
const SelectInput: React.FC<{
  id: string;
  label?: string;
  className?: string;
  onChange: (e) => void;
}> = React.memo(({ id, label, onChange, className }) => {
  const [isShow, setShow] = useState<boolean>(false);
  const hanldeSelect = () => {
    console.log("click");
    setShow(!isShow);
  };
  return (
    <Wrapper className={className}>
      {label && (
        <label className="text-14 mb-8" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative">
        <div
          className="option flex justify-between"
          onClick={() => hanldeSelect()}
          onBlur={() => {
            console.log("blur");
            setShow(false);
          }}
          tabIndex={0}
        >
          <p>全てのタイプ</p>
          <img src={DownIcon} alt="down-icon" />
        </div>
        <div className={`absolute ${!isShow ? "d-none" : ""}`}>
          <div className="option" tabIndex={0} onMouseDown={() => {}}>
            個人
          </div>
          <div className="option">団体</div>
          <div className="option">個人</div>
        </div>
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  .option {
    width: 300px;
    heigh: 40px;
    background: #fff;
    padding: 10px 20px;
    border: 1px solid #c4c4c4;
    box-sizing: border-box;
    border-radius: 3px;
    cursor: pointer;
  }
`;

export default SelectInput;
