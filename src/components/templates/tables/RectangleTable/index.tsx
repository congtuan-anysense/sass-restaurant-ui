import RemoveIcon from "assets/images/icons/remove-black.svg";
import RotateIcon from "assets/images/icons/rotate-black.svg";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTableEvent } from "services/hooks/useTableEvent";
import { tableModuleSelector } from "store/modules/tableModule";
import { TableType } from "store/modules/tableModule/type";
import { Wrapper } from "./style";

const RectangleTable: React.FC<TableType> = (props) => {
  const { isPresent } = useSelector(tableModuleSelector);
  const {
    handleDragStart,
    handleRotate,
    handleRemove,
    handleMouseDown,
    handleMouseUp,
  } = useTableEvent(props, isPresent);

  return (
    <Wrapper
      onDragStart={handleDragStart}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      draggable
      {...props}
      id={`${props.type}__${props.id}`}
      isPresent={isPresent}
    >
      <div className="face"></div>
      {Array(props.seat)
        .fill("")
        .map((s, i) => (
          <div key={i} className="seat flex justify-center align-center">
            <div></div>
          </div>
        ))}
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

export default RectangleTable;
