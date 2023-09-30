import { CounselingType } from '@/types/Counseling';
import { toEn } from '@/utils/number';

export const transformCounselingsData = (data: any): CounselingType => {
    return {
    id:data.ID,
    nickName: data?.NICKNAME,
    phoneNumber: toEn(data?.PHONENUMBER),
    stateName: data?.STATE_NAME,
    stateId: data.STATE_ID
  };
};