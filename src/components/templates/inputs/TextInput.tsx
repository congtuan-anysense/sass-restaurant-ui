import React from "react";
import styled from "styled-components";
const TextInput: React.FC<{
  id: string;
  label?: string;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange: (e) => void;
  error?: string;
  value?: string;
  type?: string;
}> = React.memo(
  ({
    id,
    label,
    onChange,
    disabled,
    className,
    defaultValue,
    value,
    error,
    type = "text",
  }) => {
    return (
      <Wrapper className={className}>
        {label && (
          <label className="text-14 mb-8" htmlFor={id}>
            {label}
          </label>
        )}
        <div>
          <input
            id={id}
            onChange={onChange}
            defaultValue={defaultValue}
            value={value}
            disabled={disabled}
            type={type}
          />
          <p className="text-required text-12">{error}</p>
        </div>
      </Wrapper>
    );
  }
);

const Wrapper = styled.div`
  input {
    width: 100%;
    min-width: 300px;
    height: 40px;
    background: #fff;
    padding: 10px 20px;
    border: 1px solid #c4c4c4;
    box-sizing: border-box;
    border-radius: 3px;
  }
`;

export default TextInput;
