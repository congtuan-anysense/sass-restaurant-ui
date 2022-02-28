import React from "react";
import styled from "styled-components";

const BaseButton: React.FC<{
  label: string;
  className?: string;
  onClick?: () => void;
  iconSrc?: string;
  disabled?: boolean;
  background?: string;
  border?: string;
  textColor?: string;
  textSize?: number;
}> = React.memo(
  ({
    label,
    onClick,
    className,
    iconSrc,
    disabled,
    background,
    border,
    textColor,
    textSize,
  }) => {
    return (
      <Wrapper
        className={`flex justify-arround ${className}`}
        disabled={disabled}
        onClick={onClick}
        background={background}
        border={border}
        textColor={textColor}
      >
        {iconSrc && <img src={iconSrc} alt="icon" />}
        {label}
      </Wrapper>
    );
  }
);

const Wrapper = styled.button<{
  background: string;
  border: string;
  text: string;
}>`
  background: ${(props) => props.background ?? "ffa300"};
  border-radius: 4px;
  border: ${(props) => (props.border ? "solid 1px " + props.border : "none")};
  color: ${(props) => props.textColor ?? "#fff"};
  img {
    width: 19px;
    height: 19px;
  }
`;

export default BaseButton;
