import React from "react";
import { Wrapper } from "./style";
import { useTableEvent } from "services/hooks/useTableEvent";
import { useSelector } from "react-redux";
import { tableModuleSelector } from "store/modules/tableModule";
import { TableType } from "store/modules/tableModule/type";
import RemoveIcon from "assets/images/icons/remove-black.svg";
import RotateIcon from "assets/images/icons/rotate-black.svg";

const CounterTable: React.FC<TableType> = (props) => {
  const { isPresent } = useSelector(tableModuleSelector);
  const {
    handleDragStart,
    handleRotate,
    handleRemove,
    handleMouseDown,
    handleMouseUp,
  } = useTableEvent(props.id, isPresent, "counter");

  return (
    <Wrapper
      onDragStart={handleDragStart}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      draggable
      {...props}
      id={`counter__${props.id}`}
    >
      <div className="seats flex justify-center align-center">
        {Array(props.seat)
          .fill("")
          .map((s, i) => (
            <div className="seat flex justify-center align-center" key={i}>
              <div></div>
            </div>
          ))}
      </div>
      <div className="face"></div>
      {!isPresent && (
        <>
          <button
            onClick={() =>
              handleRotate({ ...props, rotate: props.rotate + 90 })
            }
            className="action rotate flex justify-center align-center"
          >
            <img src={RotateIcon} alt="" />
          </button>
          <button
            onClick={handleRemove}
            className="action remove flex justify-center align-center"
          >
            <img src={RemoveIcon} alt="" />
          </button>
        </>
      )}
    </Wrapper>
  );
};

export default CounterTable;
