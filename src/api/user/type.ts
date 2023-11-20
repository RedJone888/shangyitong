export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}
export interface SubmitOrderResponseData extends ResponseData {
    data: number
}
export interface OrderInfo {
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {
        orderStatusString: string,
    },
    userId: number,
    outTradeNo: string,
    hoscode: string,
    hosname: string,
    depcode: string,
    depname: string,
    scheduleId: string,
    title: string,
    reserveDate: string,
    reserveTime: number,
    patientId: number,
    patientName: string,
    patientPhone: string,
    hosRecordId: string,
    number: number,
    fetchTime: string,
    fetchAddress: string,
    amount: number,
    quitTime: string,
    orderStatus: number
}
export interface OrderInfoResponseData extends ResponseData {
    data: OrderInfo
}
export interface QrcodeInfo {
    codeUrl: string,
    orderId: number,
    totalFee: number,
    resultCode: string
}
export interface QrcodeResponseData extends ResponseData {
    data: QrcodeInfo
}
export interface PayStatusResponseData extends ResponseData {
    data: boolean
}
export interface UserInfo {
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {},
    openid: null,
    nickName: null,
    phone: string,
    name: string,
    certificatesType: null,
    certificatesNo: null,
    certificatesUrl: null,
    authStatus: number,
    status: number
}
export interface UserInfoResponseData extends ResponseData {
    data: UserInfo
}
export interface CertificationType {
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {},
    parentId: number,
    name: string,
    value: string,
    dictCode: string,
    hasChildren: boolean
}
export type CertificationTypeArr = CertificationType[]
export interface CertificationTypeResponseData extends ResponseData {
    data: CertificationTypeArr
}
export interface UserAuthParam {
    certificatesNo: string,
    certificatesType: string,
    certificatesUrl: string,
    name: string
}
export interface OneOrderInfo {
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {
        orderStatusString: string
    },
    userId: number,
    outTradeNo: string,
    hoscode: string,
    hosname: string,
    depcode: string,
    depname: string,
    scheduleId: null,
    title: string,
    reserveDate: string,
    reserveTime: number,
    patientId: number,
    patientName: string,
    patientPhone: string,
    hosRecordId: string,
    number: number,
    fetchTime: string,
    fetchAddress: string,
    amount: number,
    quitTime: string,
    orderStatus: number
}
export type OrderRecords = OneOrderInfo[]
export interface UserOrderInfoResponseData extends ResponseData {
    data: {
        records: OrderRecords,
        total: number,
        size: number,
        current: number,
        orders: [],
        hitCount: boolean,
        searchCount: boolean,
        pages: number
    }
}
export interface OrderStatus {
    comment: string,
    status: number
}
export type AllOrderStatus = OrderStatus[]
export interface OrderStatusResponseData extends ResponseData {
    data: AllOrderStatus
}
export interface City {
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {},
    parentId: number,
    name: string,
    value: string,
    dictCode: null,
    hasChildren: boolean
}
export type Cities = City[]
export interface CityResponseData extends ResponseData {
    data: Cities
}
export interface AddOrUpdateVisitor {
    id?: number,
    name: string,
    certificatesType: string,
    certificatesNo: string,
    sex: number,
    birthdate: string,
    phone: string,
    isMarry: number,
    isInsure: number,
    addressSelected: string[],
    address: string,
    contactsName: string,
    contactsCertificatesType: string,
    contactsCertificatesNo: string,
    contactsPhone: string
}
