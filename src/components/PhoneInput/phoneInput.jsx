import React from "react";
import PhoneInput from "react-phone-input-2";

export default function Phone_Input({ value, onChange, countryCodeEditable }) {
  return (
    <div>
      <PhoneInput
        enableSearch={true}
        disableSearchIcon={true}
        country={"in"}
        countryCodeEditable={countryCodeEditable}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}