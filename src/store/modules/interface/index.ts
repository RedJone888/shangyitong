import type { HospitalDetail, DepartmentArr,UserInfo } from '@/api/hospital/type'
export interface DetailState {
    hospitalDetailInfo: HospitalDetail,
    hospitalDepartmentArr: DepartmentArr
}
export interface UserState {
    visiable: boolean,
    smsCode: string,
    userInfo: UserInfo
}