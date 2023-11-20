import request from "@/utils/request"
import {
    HospitalDetailResponseData,
    HospitalDepartmentResponseData,
    LoginData,
    UserLoginResponseData,
    WXLoginResponseData,
    HospitalWorkResponseData,
    HospitalDoctorResponseData,
    VisitorListResponseData,
    DoctorWorkResponseData
} from './type'

enum API {
    HOSPITALDETAIL_URL = '/hosp/hospital',
    HOSPITALDEPARTMENT_URL = '/hosp/hospital/department',
    SMSCODE_URL = '/sms/send',
    USERLOGIN_URL = '/user/login',
    WXLOGIN_URL='/user/weixin/getLoginParam',
    HOSPITALWORK_URL='/hosp/hospital/auth/getBookingScheduleRule',
    HOSPITALDOCTOR_URL='/hosp/hospital/auth/findScheduleList',
    GETVISITORLIST_URL='/user/patient/auth/findAll',
    GETDOCTORWORK_URL='/hosp/hospital/getSchedule'
}

export const reqHospitalDetail = (hoscode: string) => request.get<any, HospitalDetailResponseData>(API.HOSPITALDETAIL_URL + `/${hoscode}`)
export const reqHospitalDepartment = (hoscode: string) => request.get<any, HospitalDepartmentResponseData>(API.HOSPITALDEPARTMENT_URL + `/${hoscode}`)
export const reqSmsCode = (phone: string) => request.get<any, any>(API.SMSCODE_URL + `/${phone}`)
export const reqUserLogin = (data: LoginData) => request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data)
export const reqWxLogin=(wxRedirectUri:string)=>request.get<any,WXLoginResponseData>(API.WXLOGIN_URL+`?wxRedirectUri=${wxRedirectUri}`)
export const reqHospitalWork=(page:number,limit:number,hoscode:string,depcode:string)=>request.get<any,HospitalWorkResponseData>(API.HOSPITALWORK_URL+`/${page}/${limit}/${hoscode}/${depcode}`)
export const reqHospitalDoctor=(hoscode:string,depcode:string,workDate:string)=>request.get<any,HospitalDoctorResponseData>(API.HOSPITALDOCTOR_URL+`/${hoscode}/${depcode}/${workDate}`)
export const reqVisitorList=()=>request.get<any,VisitorListResponseData>(API.GETVISITORLIST_URL)
export const reqDoctorWork=(scheduleId:string)=>request.get<any,DoctorWorkResponseData>(API.GETDOCTORWORK_URL+`/${scheduleId}`)