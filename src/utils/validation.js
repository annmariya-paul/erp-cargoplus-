const validateForm = (formdata) => {
  const error = {};

  if (formdata.ContactName) {
    error.ContactName = "Please Enter Valid Name";
  } else if (formdata.ContactName.length < 3) {
    error.ContactName = "Name have a minimum length of 3";
  }

  if (formdata.email) {
    error.email = "Please Enter Valid Email";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formdata.email)
  ) {
    error.email = "Invalid Email Address";
  }

  if (formdata.phone) {
    error.phone = "Please Enter Valid Phone Number";
  } else if (error.phone.length < 10) {
    error.phone = "Inavlid Phone Number";
  }
  if (formdata.mobile) {
    error.mobile = "please Enter Valid Mobile Number";
  } else if (formdata.mobile.length < 10) {
    error.mobile = "Invalid Mobile Number";
  }
};

export default validateForm;
