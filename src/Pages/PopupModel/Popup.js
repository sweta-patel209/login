import React, {useState} from "react";

const Popup = props => {
    const [data,setData] = useState(props.content)
    //console.log(props.content)
    //console.log(data)
    
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {/* {props.content} */}
         
        {data}
      </div>
    </div>
  );
};

export default Popup;