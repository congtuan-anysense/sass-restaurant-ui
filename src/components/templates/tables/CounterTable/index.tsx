import React from "react";
import { Wrapper } from "./style";
type Props = {
  top: number;
  rotate: number;
  left: number;
  seat: number;
};

const CounterTable: React.FC<Props> = (props) => {
  return (
    <Wrapper draggable {...props}>
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
    </Wrapper>
  );
};

export default CounterTable;
