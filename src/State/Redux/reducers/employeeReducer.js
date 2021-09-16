import { ActionTypes } from "../constants/action-types";
import {useSelector} from 'react-redux'

const initialState ={
  
}

//export const empData = useSelector((state) => state.allEmployees.employees)

export const employeeReducer = (state = initialState, { type, payload }) => {
console.log('type of action ', type)
    console.log('payload====> ', payload)
    
    
    //console.log(state)
    switch (type) {
        case ActionTypes.SET_EMPLOYEE:
            return { ...state, employees: payload }
        case ActionTypes.SELECTED_EMPLOYEE:
            return { ...state, employee: payload }        
        case ActionTypes.ADD_EMPLOYEE:
           // return state.employee = payload
           return {
               ...state,
               employees:payload.employees.map((emp)=>{
                   console.log(emp)
                   return emp
               })
               
           }
        case ActionTypes.DELETE_EMPLOYEE:
            return {
               ...state,
               employees:payload.employees.filter((emp)=>
                    payload.employee.id !== emp.id
               )
            }
        default:
            return state
            break;
    }
}

export const employeeUpdateReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.UPDATE_EMP:
            // const emp = state.employees
            // console.log(emp)
            return {
                ...state,
                employees: payload.employees.map((emp) => {
                    if (payload.employee.id === emp.id) {
                        return {
                            ...emp, ...payload.employee
                        }
                    } else {
                        return emp
                    }
                })
            }
        default:
            return state
            break;
    }
}
// export const employeeAddReducer = (state = initialState, { type, payload }) => {
//     console.log(payload)
//     console.log('here')
//     switch (type) {
//         case ActionTypes.ADD_EMPLOYEE:
//             // const emp = state.employees
//             // console.log(emp)
//             return { ...state,
//           //  employees: payload.employees.map((emp)=>{
//            //     console.log
//            // })
            
//             }
//         default:
//             return state
//             break;
//     }
// }
