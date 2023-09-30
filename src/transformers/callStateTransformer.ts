import { CallStateType } from '../types/CallState';
export const transformCallStateData = (data: any): CallStateType => {
  return {
    id: data.ID,
    name: data.name,
  };
};
