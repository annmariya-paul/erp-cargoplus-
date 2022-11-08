import "./table.scss";
import TableData from "../../../../components/table/table_data";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import Button from "../../../../components/button/button";
import Custom_model from "../../../../components/custom_modal/custom_model";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import { message } from "antd";
import PhoneNumber from "../../../../components/phone_number/phonenumber";
import { useFormik } from "formik";
import * as yup from "yup";
import Lead from "../lead";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/i;

const validationSchema = yup.object({
  contact_person_name: yup
    .string()
    .min(2, "Please Enter Name of minimum 2 Letter")
    .max(100, "Name is exceeded")
    .required("Name is Required"),
  contact_email: yup
    .string()
    .email("Please Enter valid Email Address")
    .required("Email Address is Required"),
  contact_phone_1: yup
    .string()
    .max(14, "plase enter valid number")
    .min(10, "please enter valid number of minimum 10")
    .required("Phone Number is Required"),
  contact_phone_2: yup.number().min(10, "Please enter Valid Mobile Number"),
  contact_designation: yup
    .string()
    .min(2, "Please Enter valid Designation of minimum length of 2")
    .required("Please enter Valid Designation"),
});

function ContactTable(props) {
  const [contactTable, setContactTable] = useState();
  const [phone, setPhone] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [mobile, setMobile] = useState();
  const [modalShow, setModalShow] = useState(true);
  const [showSuccessMOdal, setShowSuccessModal] = useState(false);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [ContactName, setContactName] = useState();
  const [email, setEmail] = useState();
  // const [phoneno, setPhoneno] = useState();
  const [AllContact, setAllcontact] = useState({});
  const [designation, setDesignation] = useState();
  const [validated, setValidated] = useState(false);
  const [validateErr, setValidateErr] = useState(false);
  const [showError, setShowError] = useState(false);

  const getoneleads = async () => {
    try {
      const onelead = await PublicFetch.get(
        `${CRM_BASE_URL}/lead/${props.lead}`
      );
      console.log("getoneleaddds isss", onelead);
    } catch (err) {
      console.log("error while getting all leads: ", err);
    }
  };

  // # funtion getcontacttable to fetch contacts to contact table - Noufal
  const getcontacttable = () => {
    PublicFetch.get(`${CRM_BASE_URL}/contact`)
      .then((res) => {
        console.log("fjehfer", res);
        if (res.data.success) {
          setContactTable(res.data.data);
        } else {
          console.log("Failed to fetch data");
        }
      })
      .catch((err) => {
        console.log("Error While Getting Data", err);
      });
  };

  useEffect(() => {
    getcontacttable();
    getoneleads();
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "contact_id",
      key: "contact_id",
    },
    {
      title: "NAME",
      dataIndex: "contact_person_name",
      key: "contact_email",
    },
    {
      title: "EMAIL",
      dataIndex: "contact_email",
      key: "contact_email",
    },
    {
      title: "PHONE",
      dataIndex: "contact_phone_1",
      key: "contact_phone_1",
    },
    {
      title: "MOBILE",
      dataIndex: "contact_phone_2",
      key: "contact_phone_2",
    },
    {
      title: "DESIGNATION",
      dataIndex: "contact_designation",
      key: "contact_designation",
    },
  ];

  // # function AddContact to add contacts - Noufal
  const onSubmit = (values) => {
    console.log("all values from formik", values);
    PublicFetch.post(`${CRM_BASE_URL}/contact`, values)

      .then((res) => {
        console.log("contactdata,", res);

        if (res.data.success) {
          // getAllContact();
          getcontacttable();
          formik.resetForm();

          setShowSuccessModal(true);

          props.onHide();
          setModalShow(false);
          reset();
          close_modal(showSuccessMOdal, 1000);
        } else {
          console.log("Cannot Get Data while fetching data");
          // validateForm();
        }
      })
      .catch((err) => {
        console.log("error while adding data", err);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setShowSuccessModal(false);
      }, time);
    }
  };

  // Function for add adding data to data base formik is used

  const formik = useFormik({
    initialValues: {
      // contact_lead_id: props.lead,
      contact_person_name: "",
      contact_email: "",
      contact_phone_1: "",
      contact_phone_2: "",
      contact_designation: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  console.log("errors:::", formik.errors);
  console.log(
    "phone:::",
    // formik?.values?.contact_lead_id,
    formik?.values?.contact_phone_1,
    formik.values.contact_phone_2,
    formik.values.contact_person_name,
    formik.values.contact_email,
    formik.values.contact_designation
  );
  console.log("phone:::", formik.values.contact_phone_2);
  console.log("phone:::iiiii", formik.values);
  // console.log("leadid iss",);

  return (
    <div>
      <div className="datatable">
        <TableData
          data={contactTable}
          columns={columns}
          custom_table_css="contact_table"
        />
      </div>
      <Custom_model
        Adding_contents
        show={modalShow}
        onHide={() => setModalShow(false)}
        header="Add Contacts"
        footer={false}
        {...props}
      >
        <Form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="px-5">
              <Form.Group className="mb-3" controlId="addName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  id="contact_person_name"
                  name="contact_person_name"
                  className={formik.touched ? "" : "invalid"}
                  value={formik.values.contact_person_name}
                  // onChange={(e) => setContactName(e.target.value)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* <Form.Control.Feedback type="invalid">
                  Please provide a valid Name.
                </Form.Control.Feedback> */}
                <p style={{ color: "red", fontSize: "10px" }}>
                  {formik.touched.contact_person_name &&
                  formik.errors.contact_person_name
                    ? formik.errors.contact_person_name
                    : ""}
                </p>
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  id="contact_email"
                  name="contact_email"
                  className={`form-control ${errors.email && "invalid"}`}
                  value={formik.values.contact_email}
                  // onChange={(e) => setEmail(e.target.value)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p style={{ color: "red", fontSize: "10px" }}>
                  {formik.touched.contact_email && formik.errors.contact_email
                    ? formik.errors.contact_email
                    : ""}
                </p>
                {/* {showError && (
                  <label style={{ color: "red" }}>
                    Please enter a valid email address.
                  </label>
                )}
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Email.
                </Form.Control.Feedback> */}
              </Form.Group>

              <div className="row mb-3">
                <label for="phone" className="form-label">
                  Phone
                </label>
                <PhoneNumber
                  defaultCountry={"IN"}
                  value={formik.values.contact_phone_1}
                  id="contact_phone_1"
                  name="contact_phone_1"
                  // onChange={(value) => setPhone(value)}
                  onChange={(e) => formik.setFieldValue("contact_phone_1", e)}
                  onBlur={formik.handleBlur("contact_phone_1")}
                />
                {/* {errors.phone && (
                  <small className="text-danger">{errors.phone.message}</small>
                )} */}
                <p style={{ color: "red", fontSize: "10px" }}>
                  {formik?.touched?.contact_phone_1 &&
                  formik?.errors?.contact_phone_1
                    ? formik?.errors?.contact_phone_1
                    : ""}
                </p>
              </div>
              <div className="row mb-3">
                <label for="phone" className="form-label">
                  Mobile
                </label>

                <PhoneNumber
                  defaultCountry={"IN"}
                  value={formik.values.contact_phone_2}
                  id="contact_phone_2"
                  name="contact_phone_2"
                  // onChange={(value) => setMobile(value)}
                  onChange={(e) => formik.setFieldValue("contact_phone_2", e)}
                  onBlur={formik.handleBlur("contact_phone_2")}
                />
                <p style={{ color: "red", fontSize: "10px" }}>
                  {formik.touched.contact_phone_2 &&
                  formik.errors.contact_phone_2
                    ? formik.errors.contact_phone_2
                    : ""}
                </p>
              </div>
              <Form.Group className="mb-1" controlId="designation">
                <Form.Label>Designation/Department</Form.Label>
                <Form.Control
                  type="text"
                  required
                  id="contact_designation"
                  name="contact_designation"
                  className={`${errors.designation && "invalid"}`}
                  // {...register("designation", {
                  //   required: "Please enter a Designation eg:Manager",
                  //   minLength: {
                  //     value: 3,
                  //     message: "Minimum Required length is 3",
                  //   },
                  //   maxLength: {
                  //     value: 100,
                  //   },
                  //   pattern: {
                  //     value: /^[a-zA-Z0-9 ]*$/,
                  //     message: "Only letters and numbers are allowed!",
                  //   },
                  // })}
                  onKeyUp={() => {
                    trigger("designation");
                  }}
                  value={formik.values.contact_designation}
                  // onChange={(e) => setDesignation(e.target.value)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p style={{ color: "red", fontSize: "10px" }}>
                  {formik.touched.contact_designation &&
                  formik.errors.contact_designation
                    ? formik.errors.contact_designation
                    : ""}
                </p>
                {/* {errors.designation && (
                  <small className="text-danger">
                    {errors.designation.message}
                  </small>
                )} */}
                {/* <Form.Control.Feedback type="invalid">
                  Please provide a valid Designation/Department eg:Manager.
                </Form.Control.Feedback> */}
              </Form.Group>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <Form.Group>
                <Button
                  disabled={!formik.isValid || !formik.dirty}
                  btnType="save"
                >
                  Save
                </Button>
              </Form.Group>
            </div>
          </div>
        </Form>
      </Custom_model>
      <Custom_model
        centered
        size={`sm`}
        success
        show={showSuccessMOdal}
        onHide={() => setShowSuccessModal(false)}
      />
    </div>
  );
}

export default ContactTable;
