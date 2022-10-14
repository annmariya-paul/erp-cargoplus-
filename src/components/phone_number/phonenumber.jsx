import React from "react";
import 'react-phone-number-input/style.css';
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css';


function PhoneNumber(
    {
        defaultCountry,
        value,
        onChange

    }
){
 
    return(
     <div>
 <PhoneInput
 defaultCountry={defaultCountry}
  className="phoneInput"
  
  value={value}
  onChange={onChange}
  
  />

     </div>
    )
}
export default PhoneNumber;
