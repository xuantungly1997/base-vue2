import moment from "moment";

export function formatDate(value, format) {
  if (value) {
    return moment(String(value)).format(format);
  }
  return null;
}

export function formatDateFrom(value, format, fromFormat = "X") {
  if (value) {
    return moment(String(value), fromFormat).format(format);
  }
  return null;
}

export function numberFormat(str) {
  if (!str) return 0;
  return String(str).replace(/(.)(?=(\d{3})+$)/g, "$1,");
}

export function formatYYYMM(str) {
  return (
    str.slice(0, str.length - 2) +
    "年" +
    str.slice(str.length - 2, str.length) +
    "月"
  );
}
