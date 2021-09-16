import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useHistory, withRouter, useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
//for REDUX
import { useSelector, useDispatch } from 'react-redux'
import { setEmployees } from '../../State/Redux/actions/employeeActions'

const EmpList = () => {
  const history = useHistory();
  const { empid } = useParams();
  const [searchWord, setSearchWord] = useState('')
  const [searchResults, setSearchResults] = useState([''])
  const[date,setDate] = useState(new Date())

  const inputEl = useRef(''); // we will use use ref for fetch of search word 
  //FOR REDUX 
  const employees = useSelector((state) => state.allEmployees.employees)
  const dispatch = useDispatch();
  //console.log('Employees ---> ', employees)

  // this search is based on keyword you enter it will return all the objects
  // which inclused that keyword in anyfield either its fname lname or email
  //this function is not working properly
  const getSearchWord = (value) => {
    // console.log(e.target.value)
    //console.log(inputEl.current.value)
    setSearchWord(value)
    if (searchWord) {
      const empSearchList = employees.filter((emp, index) => {
        return Object.values(emp) //this will fetch value of all field of object
          .join("") //this will join all values into one string
          .toLowerCase() // this will transform whole string into lowercase
          .includes(searchWord.toLowerCase()) // this will check wether search word is included into object string or not
      })
      setSearchResults(empSearchList)
    }
    else {
      setSearchResults(employees)
    }
  }

  const empdis = searchResults && searchResults.map((emp, index) => {
    return (
      <div className='ui link cards' key={index} >
        <div className='card' onClick={() => (history.push(`/EmpDetail/${emp.id}`))}>
          <div className='image'>
          </div>
          <div className='content'>
            <div className='header'>{emp.fname}  {' '}  </div>
            <div >{emp.lname} {' '} </div>
          </div>
        </div>
      </div>
    )
  })

  const empdisplay = employees && employees.map((emp) => {
    return (
      <div className='ui link cards' >
        <div className='card' onClick={() => (history.push(`/EmpDetail/${emp.id}`))}>
          <div className='image'>
          </div>
          <div className='content'>
            <div className='header'>{emp.fname}  {' '}  </div>
            <div >{emp.lname} {' '} </div>
          </div>
        </div>
      </div>
    )
  })

  useEffect(() => {
    getEmpByRedux()
  }, [])

  const getEmpByRedux = async () => {
    const response = await axios.get('http://localhost:5000/employees').catch((err) => {
      console.log(err)
    })
    // console.log(response.data)
    dispatch(setEmployees(response.data))
  }

  return (
    <div >
      <br />
      
   <div className='ui container'>
   <div class="ui label">
      this search is working properly ..it is searching on the basis
   of first name of employee
   </div>
   <br/>
      <div style={{ width: '300px',marginTop:'15px' }} className='ui search'>
        <div className='ui icon input'>
          <input
            value={searchWord}
            //  ref = {inputEl}
            type='text'
            placeholder='Search By Fname'
            className='prompt'
            onChange={e => { setSearchWord(e.target.value) }} />
          <i className='search icon'></i>
        </div>
      </div>
   
      {employees && employees.filter((emp) => {
        if (searchWord == '') {
          return emp
        } else if (emp.fname.toLowerCase().includes(searchWord.toLocaleLowerCase())) {
          return emp
        }
      }).map((emp,index) => {
        return (
          <div className='ui card link' key={index}
            onClick={() => (history.push(`/EmpDetail/${emp.id}`))}>
            {emp.fname}
          </div>
        )
      })}
      <br />
      <br />
      {/* { searchResults.length <=1 ?
      empdisplay : empdis
    } */}
    </div> 




    <div className='ui container'>
   <div class="ui label">
      this search is working properly ..it is searching on the basis
   of dob of employee
   </div>
   <br/>
      <div style={{ width: '300px',marginTop:'15px' }} className='ui search'>
        <div className='ui icon input'>
        <label>DOB</label>
             <DatePicker  className='prompt' selected={date} onChange={date=>setDate(date)}/>
          {/* <input
            value={searchWord}
            //  ref = {inputEl}
            type='text'
            placeholder='Search By Fname'
            className='prompt'
            onChange={e => { setSearchWord(e.target.value) }} /> */}
          <i className='search icon'></i>
        </div>
      </div>
     
      {employees && employees
      .filter((emp) => {
       
        var date1= new Date(emp.dob).setHours(0,0,0,0);
      
var date2= new Date(date).setHours(0,0,0,0);
 
        if (new Date(emp.dob).setHours(0,0,0,0) === date.setHours(0,0,0,0)) {         
          console.log('DOBBBBBBBBBBBBBBBB',emp.dob)
          return emp
        } 
        // else if (emp.dob.getTime() == employees.dob.getTime()) {
        //   return emp
        // }
      })
      .map((emp,index) => {
       // console.log(new Date(emp.dob))
        return (
          <div className='ui card link' key={index}
            onClick={() => (history.push(`/EmpDetail/${emp.id}`))}>
            {emp.fname}
          </div>
        )
      })}
      <br />
      <br />
      {/* { searchResults.length <=1 ?
      empdisplay : empdis
    } */}
    </div> 
    </div>
  )
}

export default EmpList
