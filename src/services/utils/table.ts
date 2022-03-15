import { LOCAL_KEY } from "config/app";
import { TableType } from "store/modules/tableModule/type";

export const getTablesData = (): Array<TableType> => {
  return JSON.parse(localStorage.getItem(LOCAL_KEY.TABLE_MANAGE)) ?? [];
};

export const setTablesData = (tables: Array<TableType>): void => {
  localStorage.setItem(LOCAL_KEY.TABLE_MANAGE, JSON.stringify(tables));
};
