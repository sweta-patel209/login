import React, { useState } from 'react'


import { useForm } from "react-hook-form"

import { useHistory, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from 'axios'
//import routes from '../../routes' // this line was creating problem 

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const history = useHistory();  
    const onSubmit1 = async(data) => {
        // e.preventDefault()
        
        try{
        let param = {
            email:data.email,
            password:data.password
        }
        let response = await axios.post(`http://localhost:5000/login/`,param)
        
        let user = response.payload.user
        localStorage.setItem("User",JSON.stringify(user))
        localStorage.setItem("token", response.payload.tokens.access.token)
        localStorage.setItem("refresh_token", response.payload.tokens.refresh.token)
        //props.setToken(response.payload.tokens.access.token)
       
        if(user.role === 1 ){
           history.push("/Employee")
        }else if(user.role === 3){
            history.push("/Second")
        }
         }
        catch{
        
        }
        
    }
    return (

        <form className='add-form' onSubmit={handleSubmit(onSubmit1)}>
            <div className='form-control'>
                <label>
                    Email:</label>
                <input {...register("email",{required:true,pattern:/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i})}
                // onChange={(e)=>setEmail(e.target.value)}
                />
                {errors.email && errors.email.type === "required" && (
                    <div className="error">You must enter email</div>
                )}
                {errors.email && errors.email.type === "pattern" && (
                    <div className="error">You must enter valid format of email</div>
                )}

            </div>
            <div className='form-control'>
                <label>
                    Password:</label>
                <input
                    {...register("password", { required: true, minLength: 3, maxLength: 10})}
                // name="password" 
                // type="password" 
                // value={password}
                // onChange={(e)=>setPwd(e.target.value)}            
                />
                {errors.password && errors.password.type === "required" && (
                    <div className="error">You must enter password</div>
                )}
                {errors.password && errors.password.type === "minLength" && (
                    <div className="error">Your password must be at least 3 characters</div>
                )}
                {errors.password && errors.password.type === "maxLength" && (
                    <div className="error">Your password can not have more than 10 characters</div>
                )}

            </div>
            <input className="btn btn-block" type="submit" value='LOGIN' />
        </form>

    )
}


export default Login

