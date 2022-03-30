import { LOCAL_KEY } from "config/app";
import { FloorType, TablePropsType } from "store/modules/tableModule/type";
import { getDateTimeInformation } from "./datetime";

export const getTablesData = (): Array<TablePropsType> => {
  return JSON.parse(localStorage.getItem(LOCAL_KEY.TABLE_MANAGE)) ?? [];
};

export const getFloorLocalData = (): FloorType => {
  return (
    JSON.parse(localStorage.getItem(LOCAL_KEY.FLOOR_MANAGE)) ?? { tables: [] }
  );
};

export const setTablesData = (tables: Array<TablePropsType>): void => {
  const floor = getFloorLocalData();
  floor.tables = tables;
  localStorage.setItem(LOCAL_KEY.FLOOR_MANAGE, JSON.stringify(floor));
};

export const setFloorData = (floor: FloorType): void => {
  localStorage.setItem(LOCAL_KEY.FLOOR_MANAGE, JSON.stringify(floor));
};
