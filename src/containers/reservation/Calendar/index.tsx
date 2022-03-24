import React, { useState } from "react";
import { EventWrapper, Wrapper } from "./style";
interface Props {}

const events = [
  {
    top: 50,
    left: 200,
    color: "#487eb0",
    name: "Table Name",
    guests: 3,
  },
  {
    top: 50,
    left: 450,
    color: "#ff6b81",
    name: "Table Name",
    guests: 3,
  },
  {
    top: 100,
    left: 200,
    color: "#fbc531",
    name: "Table Name",
    guests: 3,
  },
  {
    top: 100,
    left: 500,
    color: "#9c88ff",
    name: "Table Name",
    guests: 3,
  },
  {
    top: 150,
    left: 1400,
    color: "#9c88ff",
    name: "Table Name",
    guests: 3,
  },
  {
    top: 200,
    left: 500,
    color: "#9c88ff",
    name: "Table Name",
    guests: 3,
  },
  {
    top: 250,
    left: 1100,
    color: "#ff4757",
  },
  {
    top: 300,
    left: 500,
    color: "#9c88ff",
  },
  {
    top: 750,
    left: 800,
    color: "#9c88ff",
  },
  {
    top: 500,
    left: 900,
    color: "#9c88ff",
  },
];

const StartTime = 15;
const EndTime = 23;

const tables = [
  {
    name: "Table 1",
    minSize: 1,
    maxSize: 4,
    fixSize: 2,
  },
  {
    name: "Table 2",
    minSize: 1,
    maxSize: 4,
    fixSize: 2,
  },
  {
    name: "Table 3",
    minSize: 1,
    maxSize: 4,
    fixSize: 2,
  },
  {
    name: "Table 4",
    minSize: 1,
    maxSize: 4,
    fixSize: 2,
  },
  {
    name: "Table 5",
    minSize: 1,
    maxSize: 4,
    fixSize: 2,
  },
  {
    name: "Table 5",
    minSize: 1,
    maxSize: 4,
    fixSize: 2,
  },
  {
    name: "Table 5",
    minSize: 1,
    maxSize: 4,
    fixSize: 2,
  },
  {
    name: "Table 5",
    minSize: 1,
    maxSize: 4,
    fixSize: 2,
  },
  {
    name: "Table 5",
    minSize: 1,
    maxSize: 4,
    fixSize: 2,
  },
  {
    name: "Table 5",
    minSize: 1,
    maxSize: 4,
    fixSize: 2,
  },
  {
    name: "Table 5",
    minSize: 1,
    maxSize: 4,
    fixSize: 2,
  },
  {
    name: "Table 5",
    minSize: 1,
    maxSize: 4,
    fixSize: 2,
  },
  {
    name: "Table 5",
    minSize: 1,
    maxSize: 4,
    fixSize: 2,
  },
  {
    name: "Table 5",
    minSize: 1,
    maxSize: 4,
    fixSize: 2,
  },
  {
    name: "Table 5",
    minSize: 1,
    maxSize: 4,
    fixSize: 2,
  },
  {
    name: "Table 5",
    minSize: 1,
    maxSize: 4,
    fixSize: 2,
  },
  {
    name: "Table 5",
    minSize: 1,
    maxSize: 4,
    fixSize: 2,
  },
];

const ReservationCalendar: React.FC<Props> = ({}) => {
  const [activeLine, setActiveLine] = useState({ type: "", index: -1 });
  const getActiveClass = (type, index) => {
    if (type === activeLine.type && index === activeLine.index) return "active";
    return "";
  };

  return (
    <div>
      <Wrapper duration={EndTime - StartTime + 1}>
        <div className="head flex justify-between">
          <div className="left">なにか</div>
          <div className="right">リスト予約</div>
        </div>
        <div className="container relative">
          <div className="header fixed">
            <div className="information-header">
              <div>information: 1A 2B</div>
              <div>information: 3C 4D</div>
            </div>
            {Array(EndTime - StartTime + 1)
              .fill("")
              .map((value, index) => {
                return (
                  <div
                    key={index}
                    className={`time-header ${
                      index === EndTime - StartTime ? "end" : ""
                    } ${getActiveClass("column", index)}`}
                  >
                    <div
                      onClick={(e) => {
                        setActiveLine({ type: "column", index: index });
                      }}
                      className={`h-25`}
                    >
                      {StartTime + index} H
                    </div>
                    <div className="flex justify-center align-center">
                      <div className="time">0</div>
                      <div className="time">15</div>
                      <div className="time">30</div>
                      <div className="time">45</div>
                    </div>
                  </div>
                );
              })}
          </div>

          {tables.map((table, tableIndex) => {
            return (
              <div className={`body`} key={tableIndex}>
                <div
                  className={`table ${getActiveClass("row", tableIndex)}`}
                  onClick={() =>
                    setActiveLine({ type: "row", index: tableIndex })
                  }
                >
                  <div className="flex justify-between align-center">
                    <div>{table.name}</div>
                    <div>
                      {table.minSize}P ~ {table.maxSize}P
                    </div>
                  </div>
                </div>
                {Array((EndTime - StartTime + 1) * 4)
                  .fill("")
                  .map((value, index) => {
                    return (
                      <div
                        key={index}
                        className={`time-bd ${
                          index === 0
                            ? "first-column"
                            : index === (EndTime - StartTime + 1) * 4 - 1
                            ? "last-column"
                            : ""
                        } ${getActiveClass(
                          "column",
                          Math.floor(index / 4)
                        )} ${getActiveClass("row", tableIndex)}`}
                      ></div>
                    );
                  })}
              </div>
            );
          })}
          <div className="events">
            {events.map((event, index) => {
              return (
                <EventWrapper
                  key={index}
                  color={event.color}
                  top={event.top}
                  left={event.left}
                >
                  <div className="core text-center">
                    {event.name ?? "emplty name"}(
                    {event.guests ?? "empty guests"})
                  </div>
                </EventWrapper>
              );
            })}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ReservationCalendar;
