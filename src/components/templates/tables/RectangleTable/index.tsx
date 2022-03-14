import React from "react";
import { Wrapper } from "./style";
type Props = {
  top: number;
  rotate: number;
  left: number;
  seat: number;
};

const RectangleTable: React.FC<Props> = (props) => {
  return (
    <Wrapper draggable {...props}>
      <div className="face"></div>
      {Array(props.seat)
        .fill("")
        .map((s, i) => (
          <div key={i} className="seat flex justify-center align-center">
            <div></div>
          </div>
        ))}
    </Wrapper>
  );
};

export default RectangleTable;
