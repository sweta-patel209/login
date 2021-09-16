import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { selectedEmployee } from '../../State/Redux/actions/employeeActions'

const EmpDetail = (props) => {
    const employee = useSelector((state) => state.allEmployees.employee)

    const { id } = useParams();
    const empID = parseInt(id)
    console.log(empID)
    console.log('in emp details', employee)
    const dispatch = useDispatch()

    console.log('emp id in details comp -->', empID)
    useEffect(() => {

        getEmpDetailById()

    }, [])

    const getEmpDetailById = async () => {
        console.log('here')
        const response = await axios.get(`http://localhost:5000/employees/${empID}`).catch((err) => {
            console.log(err);
        })
        console.log('details of one employee', response)
        dispatch(selectedEmployee(response.data))
    }

    return (
        <div>


            {employee ? <div className='ui link card'>
                
                <div class="content">
    <a class="header">{employee.fname}{' '}{employee.lname}</a>
                    <div class="meta">
<span class="meta">{employee.email} {' '}$</span>
                    </div>                    
                </div>
                {/* {employee.id} */}

            </div>


                : ''}


        </div>
    )
}

export default EmpDetail
