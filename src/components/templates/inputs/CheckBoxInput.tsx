import React from "react";
import styled from "styled-components";
const CheckBoxInput: React.FC<{
  label?: string;
  className?: string;
  onChange?: (e) => void;
  checked?: boolean;
  value?: string;
  id?: string;
}> = React.memo(({ checked, onChange, className, label, id }) => {
  return (
    <Wrapper className={className}>
      <label>
        {label}
        <input id={id} type="checkbox" checked={checked} onChange={onChange} />
        <span className="checkmark"></span>
      </label>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 18px;
  cursor: pointer;
  font-size: 22px;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: #ffffff;
    border-radius: 50%;
    border: 1px solid #000000;
  }
  input:checked ~ .checkmark {
    background-color: #ffffff;
  }
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  input:checked ~ .checkmark:after {
    display: block;
  }
  .checkmark:after {
    top: 2px;
    left: 2px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #000000;
  }
`;

export default CheckBoxInput;
