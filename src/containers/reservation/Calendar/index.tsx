import React, { useEffect, useState } from "react";
import { EventWrapper, Wrapper } from "./style";
import {
  CALENDAR_DUMMY_DATA,
  CALENDAR_SPACE,
  EVENT_START_POSITION,
} from "config/const";
import {
  getReservations,
  reservationModuleSelector,
} from "store/modules/reservationModule";
import { useDispatch, useSelector } from "react-redux";
import BaseLoading from "components/templates/loading/BaseLoading";
import { getDateTimeInformation } from "services/utils/datetime";
import { getListTables, tableModuleSelector } from "store/modules/tableModule";
const { endTime, startTime } = CALENDAR_DUMMY_DATA;
const ReservationCalendar: React.FC<{}> = ({}) => {
  const [activeLine, setActiveLine] = useState({ type: "", index: -1 });
  const { reservations } = useSelector(reservationModuleSelector);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [events, setEvents] = useState<any>([]);
  const { tables } = useSelector(tableModuleSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    mount();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const tablesX = CALENDAR_DUMMY_DATA.tables;
      const config = {
        startTime: 15,
        endTime: 23,
      };
      const events = formatReservation(reservations, config, tables);
      setEvents(events);
    }
  }, [isLoaded]);

  const mount = async () => {
    const promises = [];
    promises.push(dispatch(getReservations()));
    promises.push(dispatch(getListTables()));
    await Promise.all(promises);
    setLoaded(true);
  };

  const formatReservation = (reservations, config, tables) => {
    const getLeftValue = (eventStart, configStart) =>
      ((eventStart.hour - configStart) * 4 +
        Math.floor(eventStart.minute / 15)) *
      CALENDAR_SPACE;
    const getWidthValue = (startTime, endTime) =>
      ((endTime.hour - startTime.hour) * 4 +
        Math.ceil((endTime.minute - startTime.minute) / 15)) *
      CALENDAR_SPACE;

    const tableIndexs = tables.map((table) => table.id);
    return reservations.map((reservation) => {
      const startTime = getDateTimeInformation(
        reservation.attributes.startTime
      );
      const endTime = getDateTimeInformation(reservation.attributes.endTime);
      const result = {
        ...reservation.attributes,
        left: getLeftValue(startTime, config.startTime),
        width: getWidthValue(startTime, endTime),
        color: getRandomColor(),
        top:
          tableIndexs.indexOf(reservation.relationships.table.id) *
          CALENDAR_SPACE,
        customer: reservation.relationships.customer,
        table: reservation.relationships.table,
      };
      return result;
    });
  };

  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const getActiveClass = (type, index) => {
    if (type === activeLine.type && index === activeLine.index) return "active";
    return "";
  };

  const handleShowToolTip = (e) => {
    console.log(e);
  };
  return (
    <div>
      <Wrapper duration={endTime - startTime + 1}>
        <div className="head flex justify-between">
          <div className="left">なにか</div>
          <div className="right">リスト予約</div>
        </div>
        {!isLoaded && (
          <div className="loading">
            <BaseLoading />
          </div>
        )}
        {isLoaded && (
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
                      className={`time-header ${getActiveClass(
                        "column",
                        index
                      )}`}
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
                      <div>{table.name ?? "Table name"}</div>
                      <div>
                        {table.minSize ?? 1}P ~{" "}
                        {table.attributes.customerCapacity}P
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
                    onClick={() => handleShowToolTip(event)}
                    key={index}
                    color={event.color}
                    top={event.top}
                    left={event.left}
                    width={event.width}
                  >
                    <div className="core text-center tooltip relative">
                      {event.customer.attributes.name ?? ""}(
                      {event.numberOfGuests ?? "NaN" + "名"})
                      <div className="tooltipContent">
                        <p>Customer name: {event.customer.attributes.name}</p>
                        <p>Number of guest: {event.numberOfGuests}</p>
                      </div>
                    </div>
                  </EventWrapper>
                );
              })}
            </div>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default ReservationCalendar;
