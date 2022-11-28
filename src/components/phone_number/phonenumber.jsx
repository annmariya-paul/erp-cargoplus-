import React from "react";
import 'react-phone-number-input/style.css';
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
import 'react-phone-number-input/style.css';
import "./phonenumber.scss"


function PhoneNumber(
    {
        defaultCountry,
        value,
        onChange,
        error

    }
){
 
    return (
      <div>
        <PhoneInput
          defaultCountry={defaultCountry}
          className="phoneInput"
        //   international
          value={value}
          onChange={onChange}
          error={error}
        />
      </div>
    );
}
export default PhoneNumber;
