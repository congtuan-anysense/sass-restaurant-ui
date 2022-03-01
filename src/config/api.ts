// key must be attached to the header of the request
export const TENANT_HEADER_KEY = "x-restaurant-tenant-id";

// base API paths
const LOCAL_API_URL = "http://api.lvh.me:3009/v1";
export const BASE_URL = process.env.REACT_APP_API_BASE_URL ?? LOCAL_API_URL;
