export const CUSTOMER_TYPE = [
  {
    label: "個人",
    value: "individual",
  },
  {
    label: "団体",
    value: "grouped",
  },
];
export const INIT_TABLE_ID = 1;
export const TABLE_ADDITION_ID_PREFIX = "additional__table__";

export const INIT_FLOOR_ID = 1;
export const FLOOR_INIT = {
  name: "Floor init #1",
};

export const CALENDAR_SPACE = 50;
export const EVENT_START_POSITION = {
  LEFT: 200,
  TOP: 50,
};

export const CALENDAR_DUMMY_DATA = {
  events: [
    {
      top: 0,
      left: 0,
      width: 300,
      color: "#487eb0",
      name: "Table Name",
      guests: 3,
    },
    {
      top: 50,
      left: 600,
      width: 200,
      color: "#ff6b81",
      name: "Table Name",
      guests: 3,
    },
    {
      top: 100,
      left: 200,
      width: 100,
      color: "#fbc531",
      name: "Table Name",
      guests: 3,
    },
    {
      top: 100,
      width: 200,
      left: 500,
      color: "#9c88ff",
      name: "Table Name",
      guests: 3,
    },
    {
      top: 150,
      width: 150,
      left: 1400,
      color: "#9c88ff",
      name: "Table Name",
      guests: 3,
    },
    {
      top: 150,
      width: 150,
      left: 200,
      color: "#9c88ff",
      name: "Table Name",
      guests: 3,
    },
  ],
  startTime: 0,
  endTime: 23,
  tables: [
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
  ],
};
