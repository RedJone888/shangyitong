import request from "@/utils/request"
import type {
    SubmitOrderResponseData,
    CertificationTypeResponseData,
    CityResponseData,
    AddOrUpdateVisitor,
    OrderInfoResponseData,
    QrcodeResponseData,
    PayStatusResponseData,
    UserInfoResponseData,
    UserAuthParam,
    UserOrderInfoResponseData,
    OrderStatusResponseData
} from './type'
enum API{
    SUBMITORDER_URL='/order/orderInfo/auth/submitOrder',
    GETORDERINFO_URL='/order/orderInfo/auth/getOrderInfo',
    CANCELORDER_URL='/order/orderInfo/auth/cancelOrder',
    GETQRCODE_URL='/order/weixin/createNative',
    PAYSTATUS_URL='/order/weixin/queryPayStatus',
    USERINFO_URL='/user/auth/getUserInfo',
    CERTIFICATIONTYPE_URL='/cmn/dict/findByDictCode',
    USERAUTH_URL='/user/auth/userAuah',
    USERORDERINFO_URL='/order/orderInfo/auth',
    ORDERSTATUS_URL='/order/orderInfo/auth/getStatusList',
    CITY_URL='/cmn/dict/findByParentId',
    ADDVISITOR_URL='/user/patient/auth/save',
    UPDATEVISITOR_URL='/user/patient/auth/update',
    DELETEVISITOR_URL='/user/patient/auth/remove'
}
export const reqSubmitOrder=(hoscode:string,scheduleId:string,patientId:number)=>request.post<any,SubmitOrderResponseData>(API.SUBMITORDER_URL+`/${hoscode}/${scheduleId}/${patientId}`)
export const reqOrderInfo=(id:string)=>request.get<any,OrderInfoResponseData>(API.GETORDERINFO_URL+`/${id}`)
export const reqCancelOrder=(orderId:string)=>request.get<any,any>(API.CANCELORDER_URL+`/${orderId}`)
export const reqQrcode=(orderId:string)=>request.get<any,QrcodeResponseData>(API.GETQRCODE_URL+`/${orderId}`)
export const reqPayStatus=(orderId:string)=>request.get<any,PayStatusResponseData>(API.PAYSTATUS_URL+`/${orderId}`)
export const reqUserInfo=()=>request.get<any,UserInfoResponseData>(API.USERINFO_URL)
export const reqCertificationType=(dictCode='CertificatesType')=>request.get<any,CertificationTypeResponseData>(API.CERTIFICATIONTYPE_URL+`/${dictCode}`)
export const reqUserAuth=(data:UserAuthParam)=>request.post<any,any>(API.USERAUTH_URL,data)
export const reqUserOrderInfo=(page:number,limit:number,patientId:string,orderStatus:string)=>request.get<any,UserOrderInfoResponseData>(API.USERORDERINFO_URL+`/${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)
export const reqOrderStatus=()=>request.get<any,OrderStatusResponseData>(API.ORDERSTATUS_URL)
export const reqCity=(parentId:string)=>request.get<any,CityResponseData>(API.CITY_URL+`/${parentId}`)
export const reqAddOrUpadateVisitor=(data:AddOrUpdateVisitor)=>{
    if(data.id){
        return request.put<any,any>(API.UPDATEVISITOR_URL,data)
    }else{
        return request.post<any,any>(API.ADDVISITOR_URL,data)
    }
}
export const deleteVisitor=(id:number)=>request.delete<any,any>(API.DELETEVISITOR_URL+`/${id}`)
