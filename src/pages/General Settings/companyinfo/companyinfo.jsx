import { Form, Select } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import InputType from "../../../components/Input Type textbox/InputType";
import Button from "../../../components/button/button";
import Custom_model from "../../../components/custom_modal/custom_model";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import SelectBox from "../../../components/Select Box/SelectBox";
import FileUpload from "../../../components/fileupload/fileUploader";
import { getData, getNameList } from "country-list";
import Phone_Input from "../../../components/PhoneInput/phoneInput";
import PublicFetch from "../../../utils/PublicFetch";
import { countryList } from "../../../utils/countries";
import {
  CRM_BASE_URL_FMS,
  GENERAL_SETTING_BASE_URL,
} from "../../../api/bootapi";

function Companyinfo() {
  const [countryis, setCountryis] = useState();
  const options = useMemo(() => getData(), []);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [addForm] = Form.useForm();
  const [companyname, setCompanyname] = useState();
  const [companyaddress, setCompanyaddress] = useState();
  const [companyphone, setCompanyphone] = useState();
  const [companyemail, setCompanyemail] = useState();
  // const [companycountry,setCompanycountry]= useState()

  const [companyzipcode, setcompanyzipcode] = useState();
  const [companylogo, setCompanylogo] = useState();
  const [companywatermark, setcompanywatermark] = useState();

  const [cmpnyupdate, setcmpnyupdate] = useState();

  const [compnyid, setcmpnyid] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [img, setImg] = useState([]);
  const [imgSizeError, setImgSizeError] = useState(false);
  console.log("set image", img);

  const [getcmpnylogo, setgetcmpnylogo] = useState();
  const [getcmpnywatermark, setgetcmpnywatermark] = useState();
  const [successPopup, setSuccessPopup] = useState(false);

  // const handleChange = (e) => {
  //   setCountryis(e);
  // };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // const handlePreview = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setPreviewImage(file.url || file.preview);
  //   setPreviewVisible(true);
  //   setPreviewTitle(
  //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
  //   );
  // };
  const getallcmpny = async () => {
    try {
      const allcmpny = await PublicFetch.get(
        `${GENERAL_SETTING_BASE_URL}/company`
      );
      // console.log("getting all cmpny", allcmpny);
      console.log(" all cmpny", allcmpny.data.data);
      setcmpnyupdate(allcmpny.data.data.length);
      console.log("dataa", allcmpny.data.data.length);
      let arry = [];
      allcmpny.data.data.forEach((i, indx) => {
        arry.push(i);
      });
      console.log("all cmpny are", arry);
      // setcmpnyupdate(arry)

      arry.map((itm, indx) => {
        console.log("all cmpny maped", itm);
        setcmpnyid(itm.company_id);
        setCompanyname(itm.company_name);
        setCompanyaddress(itm.company_address);
        setCompanyemail(itm.company_email);
        setCompanyphone(itm.company_phone);
        setCountryis(itm.company_country);
        setcompanyzipcode(itm.company_zip_code);

        setgetcmpnylogo(itm.company_logo);
        // setCompanylogo(itm.company_logo)
        setgetcmpnywatermark(itm.company_watermark);
        // setcompanywatermark(itm.company_watermark)

        addForm.setFieldsValue({
          company_name: itm.company_name,
          company_address: itm.company_address,
          company_email: itm.company_email,
          company_phone: itm.company_phone,
          company_country: itm.company_country,
          cmpny_zipcode: itm.company_zip_code,
          cmpny_logo: itm.company_logo,
          cmpny_watermark: itm.company_watermark,
        });
      });
      // setallseaports(allseaports.data.data)
    } catch (err) {
      console.log("error to fetching  compnyinfo", err);
    }
  };

  useEffect(() => {
    getallcmpny();
  }, []);

  const createcompanyinfo = () => {
    const formData = new FormData();
    formData.append("company_name", companyname);
    formData.append("company_address", companyaddress);
    formData.append("company_phone", companyphone);
    formData.append("company_email", companyemail);
    formData.append("company_zip_code", companyzipcode);
    formData.append("company_country", countryis);
    // formData.append("company_logo", companylogo);

    if (companylogo) {
      formData.append("company_logo", companylogo);
    }
    if (companywatermark) {
      formData.append("company_watermark", companywatermark);
    }

    // formData.append("company_watermark", companywatermark);

    if (cmpnyupdate) {
      PublicFetch.patch(`${GENERAL_SETTING_BASE_URL}/company`, formData, {
        "Content-Type": "Multipart/form-Data",
      })
        .then((res) => {
          console.log("dataa is successfully saved", res.data.success);
          if (res.data.success) {
            // setcompanywatermark(null)
            // setCompanylogo(null)
            setSuccessPopup(true);
            getallcmpny();
            addForm.resetFields();

            close_modal(successPopup, 1000);
          }
          // else {
          //   setErrormsg(res.data.data);
          // }
        })
        .catch((err) => {
          console.log("error", err);
          // setError(true);
        });
    } else {
      PublicFetch.post(`${GENERAL_SETTING_BASE_URL}/company`, formData, {
        "Content-Type": "Multipart/form-Data",
      })
        .then((res) => {
          console.log("dataa is successfully saved", res.data.success);
          if (res.data.success) {
            setSuccessPopup(true);
            addForm.resetFields();
            close_modal(successPopup, 1000);
          }
          //  else {
          //   setErrormsg(res.data.data);
          // }
        })
        .catch((err) => {
          console.log("error", err);
          // setError(true);
        });
    }
  };

  // console.log("data of cmpny",cmpnydata)
  return (
    <div>
      <div className="">
        <div className="row">
          <div className="col-12">
            <div className="card  border-0 shadow-sm">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h4 className="">Add CompanyInfo</h4>
                    <div className="">
                      <Form
                        form={addForm}
                        onFinish={(value) => {
                          console.log("the formvaluess iss", value);
                          createcompanyinfo();
                        }}
                        onFinishFailed={(error) => {
                          console.log(error);
                        }}
                      >
                        <div className="row">
                          <div className="col-xl-6 col-lg-6  col-12">
                            <div className="">
                              <label>Company Name</label>
                              <Form.Item
                                name="company_name"
                                rules={[
                                  {
                                    required: true,
                                    message: "Company Name is Required",
                                  },
                                ]}
                              >
                                <InputType
                                  value={companyname}
                                  onChange={(e) => {
                                    setCompanyname(e.target.value);
                                  }}
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6  col-12">
                            <div className="">
                              <label>Address</label>
                              <Form.Item
                                name="company_address"
                                rules={[
                                  {
                                    required: true,
                                    message: "Address is Required",
                                  },
                                ]}
                              >
                                <TextArea
                                  value={companyaddress}
                                  onChange={(e) => {
                                    setCompanyaddress(e.target.value);
                                  }}
                                />
                              </Form.Item>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-2">
                          <div className="col-xl-6 col-lg-6  col-12">
                            <div className="">
                              <label>Email</label>
                              <Form.Item
                                name="company_email"
                                rules={[
                                  {
                                    required: true,
                                    message: "Email is Required",
                                  },
                                ]}
                              >
                                <InputType
                                  value={companyemail}
                                  onChange={(e) => {
                                    setCompanyemail(e.target.value);
                                  }}
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className=" col-sm-6">
                            <div>
                              <label>Phone</label>
                              <Form.Item
                                name="company_phone"
                                rules={[
                                  {
                                    required: true,
                                    message: "Email is Required",
                                  },
                                ]}
                              >
                                {/* <Phone_Input
                               value={companyphone}
                               onChange={(e)=>{
                                setCompanyphone(e)
                               }}
                               /> */}
                                <InputType
                                  value={companyphone}
                                  onChange={(e) => {
                                    setCompanyphone(e.target.value);
                                  }}
                                />
                              </Form.Item>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-xl-6 col-lg-6 col-12">
                            <div className="">
                              <label>Country</label>
                              <Form.Item name="company_country">
                                <SelectBox
                                  allowClear
                                  showSearch
                                  placeholder="Select Country"
                                  optionFilterProp="children"
                                  value={countryis}
                                  onChange={(event) => setCountryis(event)}
                                >
                                  {countryList &&
                                    countryList.map((item, index) => {
                                      return (
                                        <Select.Option
                                          key={item.id}
                                          value={item.name}
                                        >
                                          {item.name}
                                        </Select.Option>
                                      );
                                    })}
                                </SelectBox>
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-12">
                            <div className="">
                              <label>ZipCode</label>
                              <Form.Item
                                name="cmpny_zipcode"
                                // rules={[
                                //   {
                                //     required: true,
                                //     message: "zipcode is Required",
                                //   },
                                // ]}
                              >
                                <InputType
                                  value={companyzipcode}
                                  onChange={(e) => {
                                    setcompanyzipcode(e.target.value);
                                  }}
                                />
                              </Form.Item>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-6 col-lg-6  col-12">
                            <div className="">
                              <label>Logo</label>
                              <Form.Item name="cmpny_logo">
                                <FileUpload
                                  multiple
                                  listType="picture"
                                  accept=".docx,.jpg,.jpeg,.png"
                                  // onPreview={handlePreview}
                                  beforeUpload={true}
                                  onChange={(file) => {
                                    console.log("Before upload", file.file);
                                    console.log(
                                      "Before upload file size",
                                      file.file.size
                                    );

                                    if (
                                      file.file.size > 1000 &&
                                      file.file.size < 500000
                                    ) {
                                      setCompanylogo(file.file.originFileObj);
                                      setImgSizeError(false);
                                      console.log(
                                        "Image must be greater than 1 kb and less than 500 kb"
                                      );
                                    } else {
                                      console.log(
                                        "failed beacuse of large size"
                                      );
                                      setImgSizeError(true);
                                    }
                                  }}
                                />
                              </Form.Item>
                              <div>
                                {getcmpnylogo ? (
                                  <img
                                    src={`${process.env.REACT_APP_BASE_URL}/${getcmpnylogo}`}
                                    height="40px"
                                    width={"40px"}
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-12">
                            <div className="">
                              <label>Water Mark</label>
                              <Form.Item name="cmpny_watermark">
                                <FileUpload
                                  multiple
                                  listType="picture"
                                  accept=".docx,.jpg,.jpeg"
                                  // onPreview={handlePreview}
                                  beforeUpload={true}
                                  onChange={(file) => {
                                    console.log("Before upload", file.file);
                                    console.log(
                                      "Before upload file size",
                                      file.file.size
                                    );

                                    if (
                                      file.file.size > 1000 &&
                                      file.file.size < 500000
                                    ) {
                                      setcompanywatermark(
                                        file.file.originFileObj
                                      );
                                      setImgSizeError(false);
                                      console.log(
                                        "Image must be greater than 1 kb and less than 500 kb"
                                      );
                                    } else {
                                      console.log(
                                        "failed beacuse of large size"
                                      );
                                      setImgSizeError(true);
                                    }
                                  }}
                                />
                              </Form.Item>
                              <div>
                                {getcmpnywatermark ? (
                                  <img
                                    src={`${process.env.REACT_APP_BASE_URL}/${getcmpnywatermark}`}
                                    height="40px"
                                    width={"40px"}
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 mt-2 py-3">
                          <div className="d-flex justify-content-center">
                            <Button
                              type="submit"
                              className="p-2 save_button_style"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </Form>

                      <Custom_model
                        size={"sm"}
                        show={successPopup}
                        onHide={() => setSuccessPopup(false)}
                        success
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Companyinfo;
