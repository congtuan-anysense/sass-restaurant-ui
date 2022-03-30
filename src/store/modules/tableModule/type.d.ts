export interface TablePropsType {
  left: number;
  top: number;
  seat: number;
  rotate: number;
  type: string;
  id: number;
}

export interface FloorAttibuteType {
  id: number | string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TableAttributeType {
  id: number;
  name?: string;
  customerCapacity: number;
  properties: TablePropsType;
  state: string;
  floorId: number;
  createdAt?: string;
  updatedAt?: string;
  _destroy?: boolean;
}
export interface TableType {
  id: number;
  type: string;
  attributes: TableAttributeType;
}

export interface FloorType {
  id: number | string;
  type: string;
  attributes: FloorAttibuteType;
  tables: Array<TablePropsType>;
}

export interface TabelModuleData {
  isLoading: boolean;
  error: string;
  isPresent: boolean;
  floor: any;
  tables: any;
}
