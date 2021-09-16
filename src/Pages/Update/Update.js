import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment'
import {getEmployee} from '../EmpData'
//for redux
//import {updateEmployee, setEmployees} from '../../State/Redux/actions/employeeActions'
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios'
import { updateEmployee } from '../../State/Redux/actions/employeeActions';

function Update(props) {
    // console.log('update Data ---> ',props.updateData)
    const [fname, setfname] = useState('')
    const [lname, setlname] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState('')
    const [obj, setObj] = useState([''])
    const [id,setId] = useState(0)


    const employees = useSelector((state)=>state.allEmployees.employees)
    console.log(employees)
    const dispatch = useDispatch();

    useEffect(() => {
        setInitialValues(obj)
    }, [props.updateData.fname])

    

    const setInitialValues = (obj) => {
        obj = props.updateData
        setfname(obj.fname)
        setlname(obj.lname)
        setEmail(obj.email)
        // this will convert date into same format as new Date() 
        // because to set value of date you will need same format as of inbuilt function new Date()       
        let date1 = new Date(obj.dob);
        setDob(date1)
        setId(obj.id)
    }

    const onSubmit = async(data) => {
        data.preventDefault();
        let param = {
            fname:fname,
            lname:lname,
            email:email,
            dob:dob,
            role:3
            

        }
        try{
            let response = await axios.put(`http://localhost:5000/employees/${id}`, param)
            console.log('response of update--->',response.data)
            dispatch(updateEmployee(employees,response.data))
            props.OnUpdateClick(response.data)
            
            
        }
        catch{

        }
    }

    return (
        <div className='container'>
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>First Name</label>
                    <input value={fname} type="text" onChange={(e) => setfname(e.target.value)} />
                </div>
                <div className='form-control'>
                    <label>Last Name</label>
                    <input value={lname} type="text" onChange={(e) => setlname(e.target.value)} />
                </div>
                <div className='form-control'>
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                </div>
                <div className='form-control'>
                    <label>DOB</label>
                    <DatePicker selected={dob} onChange={dob => setDob(dob)} />
                </div>

                
                 <input type='submit' className="btn btn-success" value='Update'/>
               
            </form>

        </div>
    )
}

export default Update
