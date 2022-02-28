import { validateNumber } from "services/utils/validator";

export enum FIELDS {
  ID = "id",
  NAME = "name",
  KANA = "nameKana",
  TYPE = "customerType",
  COMPANY_NAME = "companyName",
  PHONE = "phone",
  POST_CODE = "postcode",
  PREFECTURE = "prefecture",
  MUNICIPALITY = "municipality",
  ADDRESS = "address",
  BUILDING_ADDRESS = "buildingAddress",
  BIRTH_DATE = "dateOfBirth",
  GENDER = "gender",
  EMAIL = "email",
  REMARK = "remarks",
}

export type UpsertCustomerFormInputs = {
  [FIELDS.ID]: string;
  [FIELDS.NAME]: string;
  [FIELDS.KANA]: string;
  [FIELDS.TYPE]: string;
  [FIELDS.COMPANY_NAME]: string;
  [FIELDS.PHONE]: string;
  [FIELDS.POST_CODE]: string;
  [FIELDS.PREFECTURE]: string;
  [FIELDS.MUNICIPALITY]: string;
  [FIELDS.ADDRESS]: string;
  [FIELDS.BUILDING_ADDRESS]: string;
  [FIELDS.BIRTH_DATE]: string;
  [FIELDS.GENDER]: string;
  [FIELDS.EMAIL]: string;
  [FIELDS.REMARK]: string;
};

export const VALIDATIONS = {
  [FIELDS.NAME]: {
    required: {
      value: true,
      message: "Required",
    },
  },
  [FIELDS.KANA]: {
    required: {
      value: true,
      message: "Required",
    },
  },
  [FIELDS.TYPE]: {
    required: {
      value: false,
      message: "Required",
    },
  },
  [FIELDS.COMPANY_NAME]: {
    required: false,
  },
  [FIELDS.PHONE]: {
    required: {
      value: true,
      message: "Required",
    },
    validate: (value) => {
      return validateNumber(value) || "Invalid format phone number.";
    },
  },
  [FIELDS.POST_CODE]: {
    required: false,
    validate: (value) => {
      return !value || validateNumber(value) || "Invalid format post code.";
    },
  },
  [FIELDS.PREFECTURE]: {
    required: false,
  },
  [FIELDS.MUNICIPALITY]: {
    required: false,
  },
  [FIELDS.ADDRESS]: {
    required: false,
  },
  [FIELDS.BUILDING_ADDRESS]: {
    required: false,
  },
  [FIELDS.BIRTH_DATE]: {
    required: false,
  },
  [FIELDS.GENDER]: {
    required: false,
  },
  [FIELDS.EMAIL]: {
    required: false,
  },
  [FIELDS.REMARK]: {
    required: false,
  },
};

export const InitiateValue = {
  [FIELDS.ID]: null,
  [FIELDS.NAME]: "",
  [FIELDS.KANA]: "",
  [FIELDS.TYPE]: "",
  [FIELDS.COMPANY_NAME]: "",
  [FIELDS.PHONE]: "",
  [FIELDS.POST_CODE]: "",
  [FIELDS.PREFECTURE]: "",
  [FIELDS.MUNICIPALITY]: "",
  [FIELDS.ADDRESS]: "",
  [FIELDS.BUILDING_ADDRESS]: "",
  [FIELDS.BIRTH_DATE]: "",
  [FIELDS.GENDER]: "male",
  [FIELDS.EMAIL]: "",
  [FIELDS.REMARK]: "",
};
