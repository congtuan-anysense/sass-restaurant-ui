import React, { useState } from "react";
import { EventWrapper, Wrapper } from "./style";
import { CALENDAR_DUMMY_DATA } from "config/const";
const { endTime, startTime, tables, events } = CALENDAR_DUMMY_DATA;
const ReservationCalendar: React.FC<{}> = ({}) => {
  const [activeLine, setActiveLine] = useState({ type: "", index: -1 });
  const getActiveClass = (type, index) => {
    if (type === activeLine.type && index === activeLine.index) return "active";
    return "";
  };

  return (
    <div>
      <Wrapper duration={endTime - startTime + 1}>
        <div className="head flex justify-between">
          <div className="left">なにか</div>
          <div className="right">リスト予約</div>
        </div>
        <div className="container relative">
          <div className="header">
            <div className="information-header">
              <div>information: 1A 2B</div>
              <div>information: 3C 4D</div>
            </div>
            {Array(endTime - startTime + 1)
              .fill("")
              .map((value, index) => {
                return (
                  <div
                    key={index}
                    className={`time-header ${getActiveClass("column", index)}`}
                  >
                    <div
                      onClick={(e) => {
                        setActiveLine({ type: "column", index: index });
                      }}
                      className={`h-25`}
                    >
                      {startTime + index} H
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
                {Array((endTime - startTime + 1) * 4)
                  .fill("")
                  .map((value, index) => {
                    return (
                      <div
                        key={index}
                        className={`time-bd ${getActiveClass(
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
