export type TableType = {
  left: number;
  top: number;
  seat: number;
  rotate: number;
  type: string;
  id: number;
};
export type TabelModuleData = {
  isLoading: boolean;
  error: string;
  isPresent: boolean;
  tables: Array<TableType>;
};
