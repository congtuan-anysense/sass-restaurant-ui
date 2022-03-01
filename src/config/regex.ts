export const EMAIL_REGEXP =
  /^[A-Za-z0-9]{1}[A-Za-z0-9+_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
export const FULLWIDTH_REGEXP = /^[^\x01-\x7E\xA1-\xDF]+$/;
export const HALFWIDTH_RECEXP = /^[0-9a-zA-Z]+$/;
export const NUMBER_RECEXP = /^[0-9]+$/;
export const PASSWORD_REGEXP =
  /^[A-Za-z0-9@*+!"#$%&'()=~|^\-[\]{}?<>,.\/_:;\s]*$/;
export const MIRATEO_ID_REGEXP =
  /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/;
export const KANA_FULLWIDTH_REGEXP = /^[\u30a0-\u30ff]+$/;
