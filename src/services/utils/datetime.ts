export const formatYMD = (dateStr: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const getDateTimeFormatFromStr = (str: string) => {
  const regex =
    /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}(\+[0-9]{2}:[0-9]{2})?Z?/;
  if (regex.test(str)) {
    const [dateStr, rest] = str.split("T");
    const [y, mo, d] = dateStr.split("-");
    const timeStr = rest.split(".")[0];
    const [h, mi, s] = timeStr.split(":");
    return {
      year: Number(y),
      month: Number(mo),
      date: Number(d),
      hour: Number(h),
      minute: Number(mi),
      second: Number(s),
    };
  }
};
