import {ActionTypes } from '../constants/action-types'

export const setEmployees = (employees) => {
  //  console.log('here')
    return{
     type:ActionTypes.SET_EMPLOYEE,
     payload:employees,
    };
}

export const selectedEmployee = (employee) => {
    return {
        type: ActionTypes.SELECTED_EMPLOYEE,
        payload:employee
    }
}

export const updateEmployee = (employees,employee) => {
   // console.log('in employee action ',employees,employee)
    return {
        type: ActionTypes.UPDATE_EMP,
        payload:{employees,employee}
    }
}

export const addEmployee = (employees,employee) => {
    console.log(employees,employee)
    return {
        type: ActionTypes.ADD_EMPLOYEE,
        payload:{employees,employee}
    }
}

export const deleteEmployee = (employee,employees) => {
      console.log(employee)
      return {
          type: ActionTypes.DELETE_EMPLOYEE,
          payload:{employees,employee}
      }
  }