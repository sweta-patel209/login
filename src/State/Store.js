import {createStore } from 'redux'
import reducers from './Redux/reducers/index'
//import {initialState} from './Redux/reducers/employeeReducer'



const store = createStore(reducers, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    console.log(store.getState())
export default store;