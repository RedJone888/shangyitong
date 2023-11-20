import {defineStore} from 'pinia'
import {reqHospitalDetail,reqHospitalDepartment} from '@/api/hospital'
import type {HospitalDetail, HospitalDetailResponseData,DepartmentArr,HospitalDepartmentResponseData} from '@/api/hospital/type'
import type {DetailState} from './interface'
const useDetailStore= defineStore('Detail',{
    state:():DetailState=>{
        return {
            hospitalDetailInfo:({} as HospitalDetail),
            hospitalDepartmentArr:([] as DepartmentArr)
        }
    },
    actions:{
        async getHospital(hoscode:string){
            const result:HospitalDetailResponseData= await reqHospitalDetail(hoscode)
            if(result.code===200){
                this.hospitalDetailInfo=result.data
            }
        },
        async getDepartment(hoscode:string){
            const result:HospitalDepartmentResponseData= await reqHospitalDepartment(hoscode)
            if(result.code===200){
                this.hospitalDepartmentArr=result.data
            }
        }
    },
    getters:{

    }
})
export default useDetailStore