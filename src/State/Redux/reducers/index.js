import {combineReducers} from 'redux'
import {employeeReducer} from '../reducers/employeeReducer'
import { employeeUpdateReducer} from '../reducers/employeeReducer'
//import {employeeAddReducer} from '../reducers/employeeReducer'

const reducers = combineReducers({
    allEmployees:employeeReducer,
    updated:employeeUpdateReducer
   
})

export default reducers