import { SimpleObject } from "@/types/General";
import { isObject } from "./type";

export const cleanObject = <T extends SimpleObject>(obj: T): Partial<T> => {
  if (!isObject(obj)) return {};
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => (newObj[key] === undefined ? delete newObj[key] : {}));
  return newObj;
};


