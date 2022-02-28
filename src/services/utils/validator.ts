export const pValidEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validEmail = (email) => {
  return pValidEmail(email) || "Email is not valid";
};

export const validateNumber = (value: string) => {
  const regex = /^[0-9]+$/;
  return regex.test(value);
};
