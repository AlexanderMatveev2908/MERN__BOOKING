export const REG_NAME = /^[\p{L}\p{M} .'-]{3,50}$/u;
export const REG_PWD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
export const REG_EMAIL =
  /^(?![.-])(?!.*[.-]$)(?!.*\.\.)(?!.*@.*@)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const REG_HOTEL = /^[A-Za-z0-9\s,'-.\d]{1,}$/;
export const REG_PRICE = /^\d+(\.\d{1,2})?$/;

export const REG_SEARCH = /^[A-Za-z0-9\s,'-.\d]*$/;
export const REG_DATE = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
export const REG_GUESTS = /^(?!.*-)\d*$/;
export const REG_PRICE_MANDATORY = /^(\d*|\d+(\.\d{1,2}))$/;

export const MONGO_ID_REG = /^[a-f0-9]{24}$/;

export const REG_FROM_HOTEL_DETAILS = /^\/hotel-details\/[a-f0-9]{24}$/;
