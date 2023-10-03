import { isNumber, isObject } from "./type";
import { SimpleObject } from "@/types/General";

export const isEmpty = (data: unknown): data is never | undefined | null =>
  (!data && !isNumber(data)) ||
  (Array.isArray(data) && data.length === 0) ||
  (isObject(data) && Object.keys(data).length === 0);


export const cleanObject = <T extends SimpleObject>(obj: T): Partial<T> => {
  if (!isObject(obj)) return {};
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => (newObj[key] === undefined ? delete newObj[key] : {}));
  return newObj;
};

