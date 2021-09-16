
import React, { useState} from 'react'
import axios from 'axios'

  export const getEmployee = async (props) => {
  //  const emp
    try {
        let response = await axios.get(
            ` http://localhost:5000/employees`
        );
        let newData = response;       
        return newData.data         
        setTimeout(() => {
            
        }, 800);
    } catch (error) {
        
    }
}

export default getEmployee