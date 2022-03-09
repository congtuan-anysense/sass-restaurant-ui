import React, { useImperativeHandle, useState } from "react";
import styled from "styled-components";
import DownIcon from "assets/images/icons/down-dark.svg";
const SelectInput: React.FC<{
  id: string;
  label?: string;
  className?: string;
  onChange: (e) => void;
  options?: Array<{ label: string; value: string }>;
  shared?: any;
  activeValue?: string;
}> = React.memo(
  ({ id, label, onChange, className, options, activeValue, shared }) => {
    const [isShow, setShow] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string>(activeValue);

    useImperativeHandle(shared, () => ({
      updateSelectedValue: setSelectedValue,
    }));

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
            onClick={() => setShow(!isShow)}
            onBlur={() => setShow(false)}
            tabIndex={0}
          >
            <p>{selectedValue}</p>
            <img src={DownIcon} alt="down-icon" />
          </div>
          <div
            className={`absolute ${!isShow ? "d-none" : ""} options-container`}
          >
            {options?.map((option, index) => {
              return (
                <div
                  key={index}
                  className="option"
                  tabIndex={0}
                  data-value={option.value}
                  data-label={option.label}
                  onMouseDown={(e) => {
                    onChange(e.target["dataset"]?.value);
                    setSelectedValue(e.target["dataset"]?.label);
                  }}
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        </div>
      </Wrapper>
    );
  }
);

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
  .options-container {
    max-height: 277px;
    overflow: scroll;
  }
`;

export default SelectInput;
