import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from "moment";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; 
import {get} from 'lodash'
import { useHistory, withRouter } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {addEmployee, setEmployees} from '../../State/Redux/actions/employeeActions'



function Employee() {
    const[fname,setFname] = useState('')
    const[lname,setLname] = useState('')
    const[email,setEmail] = useState('')
    const[emp,setEmpData] = useState([''])
    const[date,setDate] = useState(new Date())
    const [image,setImage]=useState()
    const [selectedFile, setSelectedFile] = useState({});
    const history = useHistory(); 
    //this variable is used to refrence HTML element of file
    var fileInput = React.useRef();
    const dispatch = useDispatch();

    const employees = useSelector((state) => state.allEmployees.employees)   

    useEffect(() => {
     //   getEmployee()
       // setSelectedFile('')
      }, [])
      useEffect(() => {
       // getEmp()
        getEmpByRedux()
     }, [])
   
     const getEmpByRedux = async() => {
       const response = await axios.get('http://localhost:5000/employees').catch((err)=>{
         console.log(err)
       })
      
      // console.log(response.data)
     dispatch(setEmployees(response.data))
     }
    
      
  const fileupload = (e) => {    
    let temp = e.target.files[0]   
    setSelectedFile(temp); 
    };


  const onSubmit = async(e) => {
      e.preventDefault();
      
      //you can not use form data for passing data in post API while working with fake json-server
      let formData = new FormData();
      formData.append('fname',fname);
      formData.append('lname',lname);
      formData.append('email',email);
      formData.append('role',3);
      formData.append('photo',selectedFile.name);
      formData.append('dob',date)     
      const params = {
         fname:fname,
         lname:lname,
         email:email,
         role:3,
         photo:selectedFile.name,
         dob:date
      }
      
      let res = await axios.post(`http://localhost:5000/employees`, params)
      
      
      dispatch(addEmployee(employees,res.data))
     // setEmpData([...emp,],formData)
      e.target.value = null;     
      setEmail('')
      setFname('')
      setLname('')
      setDate(new Date())
      if(fileInput){
      fileInput.value = "";
      }
      
      history.push("/EmpDoc")
  }
//  const getEmployee = async(props) => {
//        /// axios.get('http://localhost:5000/employees')
//         try {
//             let response = await get(
//               `http://localhost:5000/employees`
//             );
//             let newData = response; 
                        
//             setEmpData(newData);
//             setTimeout(() => {
//               
//             }, 800);
//           } catch (error) {
//            
//           }
//     }
     
    return (
        //this format of form is also working
        // <form className=" add-form" onSubmit={onSubmit} >
        //     <div className="form-control">
        //     <label>First Name</label>
        //     <input type='text'value={fname}
        //     onChange={(e)=>setFname(e.target.value)} />
        //     </div>
        //     <div className='form-control'>
        //     <label>Last Name</label>
        //     <input type='text' value={lname} onChange={(e)=>setLname(e.target.value)}/>
        //     </div>
        //     <div className='form-control'>
        //     <label>Email</label>
        //     <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        //     </div>
        //     <div className='form-control'>
        //     <label>DOB</label>
        //     <DatePicker selected={date} onChange={date=>setDate(date)}/>
        //     </div>
        //     <input type="file" onChange={fileupload} ref={ref=> fileInput = ref} />

        //     <input type='submit'   className='btn btn-primary'  />
            
        // </form>
        <div className='container'>
        <form className="ui form" onSubmit={onSubmit}>
        <div className="field">
          <label>First Name</label>
          <input 
          type='text'
          value={fname}
            onChange={(e)=>setFname(e.target.value)} 
            placeholder="First Name"
            />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input 
          type='text'
          value={lname}
            onChange={(e)=>setLname(e.target.value)} 
            placeholder="Last Name"
            />
        </div>
        <div className="field">
          <label>Email</label>
          <input 
          type='text'
          value={email}
            onChange={(e)=>setEmail(e.target.value)} 
            placeholder="Email"
            />
        </div>
        <div className='field'>
             <label>DOB</label>
             <DatePicker selected={date} onChange={date=>setDate(date)}/>
             </div>
             <input type="file" onChange={fileupload} ref={ref=> fileInput = ref} />

        {/* <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" tabindex="0" class="hidden">
            <label>I agree to the Terms and Conditions</label>
          </div>
        </div> */}
        <button class="ui button" type="submit">Submit</button>
      </form>
      </div>
    )
}

export default Employee
