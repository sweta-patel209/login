import React, { useState, useEffect } from 'react'
import table from 'react-bootstrap'

import Popup from '../PopupModel/Popup'
import moment from 'moment'
import axios from 'axios'
import {Link, useHistory, withRouter } from "react-router-dom";
import {FaTimes} from 'react-icons/fa'
//import Autocomplete from '@material-ui/lab/Autocomplete';
import Update from '../Update/Update'
import GetEmployee from '../EmpData'
//for REDUX
import {useSelector, useDispatch} from 'react-redux'
import {setEmployees} from '../../State/Redux/actions/employeeActions'
import {deleteEmployee} from '../../State/Redux/actions/employeeActions'


function EmpDoc() {
  const [emp, setEmpData] = useState([''])
  const [oneEmpData, setoneEmpData] = useState([''])
  const [OpenPopup, setOpenPopup] = useState(false);
  const [myOptions, setMyOptions] = useState([])
  const [users, setUsers] = useState([])
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)
  const [updateData, setupdateData] = useState([''])
  const history = useHistory(); 
  const dispatch = useDispatch();

  //FOR REDUX 
  const employees = useSelector((state) => state.allEmployees.employees)
  
  
  useEffect(() => {
     getEmp()
     getEmpByRedux()
  }, [])

  const getEmpByRedux = async() => {
    const response = await axios.get('http://localhost:5000/employees').catch((err)=>{
      console.log(err)
    })
   
    console.log(response.data)
  dispatch(setEmployees(response.data))
  }

  const getEmp = async() => {
    let res = await GetEmployee()
    
    if(res){
   
    setEmpData(res);}
  }
 
  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(' http://localhost:5000/employees');
      
      setUsers(response)
    }
    loadUsers()
  }, [])

  const onChangeHandler = (text) => {
   // setSuggestions(matches)
    let matches = []
   
    let usersData = users.data
    if (text.length > 0) {
      matches = usersData.filter(user => {
       
        const regex = new RegExp(`${text}`, "i");
        return user.fname.match(regex)
      })
    }
    setSuggestions(matches)
    setText(text)
  }

  const radioClick = (data) => {
   
   // OpenPopupClickEvent(data)
  // setIsUpdate(true)
  //console.log(isUpdate)
  setIsUpdate(true)
 
  setupdateData(data)
  }

  const OpenPopupClickEvent = (data) => {
    
    //setoneEmpData(data)
    setOpenPopup(!OpenPopup)
   
  }  
  
  // const getEmployee = async (props) => {
      
  //     try {
  //         let response = await axios.get(
  //             `http://localhost:5000/employees`
  //         );
  //         let newData = response;       
  //         setEmpData(newData);          
  //         setTimeout(() => {
  //             
  //         }, 800);
  //     } catch (error) {
  //         
  //     }
  // }
  

  const onSuggestHandler = (text) => {
    setText(text)
    
    setoneEmpData(text)
    setOpenPopup(!OpenPopup)
   setSuggestions([])
  }
  const onDelete = async(id) => {
    let response1 = await axios.get(`http://localhost:5000/employees/${id}`)

    console.log('in deleted111111 ',response1.data)
    let response = await axios.delete(`http://localhost:5000/employees/${id}`)
    console.log('in deleted ',response)
    dispatch(deleteEmployee(response1.data,employees))
   // getEmployee()
   getEmp()
  }

  const OnUpdateClick = (data) => {
   
    getEmp()
   getEmpByRedux()
  // dispatch(updateEmployee(data))


  }

  const EmpDetails = (data) => {
   
    history.push("/Emplist")
   // history.push(`/EmpDetail/${data}`)
  }
  
  return (
    <>
      <div>
        <input type="text" className="col-md-12 input"
         placeholder="enter employee name initials"
          onChange={e => onChangeHandler(e.target.value)}
          value={text}
         // onBlur={() => setSuggestions([])}
        />
        
        {suggestions && suggestions.map((suggestion, i) => 
          <div className="suggestion col-md-12 justify-content-md-center" 
          onClick={() => onSuggestHandler(suggestion.fname + ' ' + suggestion.lname)}>{suggestion.fname } {' '}  {suggestion.lname}</div>
        )}
      </div>
      <table style={{backgroundColor:'lightyellow',textAlign:'center'}} class="table table-striped table-hover">
        <thead className='table-primary'>
          <tr className='myClass'>
            <th style={{width:'100px'}} scope="col">To Update</th>
            <th style={{width:'100px'}} scope="col">Card View</th>
            <th style={{width:'150px'}} scope="col">Name</th>
            <th style={{width:'250px'}} scope="col">Email</th>
            <th scope="col">DOB</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>        
          {emp.map((data, index) => 
            <tr>
              <th style={{backgroundColor:'lightgreen'}} scope="row">
                <input onClick={() => radioClick(data)} class="form-check-input" type="radio" name="RadioDefault" id="RadioDefault" />
              </th>
              
              <td scope="row" 
              onClick={()=>EmpDetails(data.id)}
              >
                <Link to="/Emplist">EMPLIST </Link>
                </td>
<td>{data.fname} {' '} {data.lname}</td>
          <td>{data.email}</td>
              <td>{moment(data.dob).format("DD/MMM/YYYY")}</td>
              
              <th style={{backgroundColor:'black'}}>
              <FaTimes style={{ align: 'left' }}
                   onClick={() => onDelete(data.id)}
                    style={{ color: 'red', cursor: 'pointer' }} />

              </th>
            </tr>)
          }


        </tbody>
      </table>
      {/* <button onClick={OpenPopupClickEvent}>button</button> */}
      <div>
        {OpenPopup && <Popup
          content={oneEmpData}
          handleClose={OpenPopupClickEvent}
        />}
      </div>
      { isUpdate && <Update 
      OnUpdateClick={OnUpdateClick} //this function is passing click of update button from update component to this componnet
      updateData={updateData}/>

      }
    </>
  )
}

export default EmpDoc
