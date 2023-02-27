import { Form, Input } from "antd";
import React, { useState } from "react";
import "../../lead/lead.styles.scss";
import "../../../../pages/CRM/lead/opportunity_ List/opportunitylist.scss";
import FileUpload from "../../../../components/fileupload/fileUploader";
import Button from "../../../../components/button/button";
import CustomModel from "../../../../components/custom_modal/custom_model";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import InputType from "../../../../components/Input Type textbox/InputType";

import { UploadProps } from "antd";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
// import { message, Upload } from "antd";
// import { InboxOutlined } from "@ant-design/icons";
import logo from "../../../../components/img/logo192.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { UniqueErrorMsg } from "../../../../ErrorMessages/UniqueErrorMessage";
import CheckUnique from "../../../../check Unique/CheckUnique";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function BrandCreate() {
  const [addForm] = Form.useForm();
  const navigate = useNavigate();
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [file, setFile] = useState(null);
  const [img, setImg] = useState([]);
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [uniqueCode, setuniqueCode] = useState();

  const [BrandError, setBrandError] = useState();
  const [imgSizeError, setImgSizeError] = useState(false);
  console.log("set image", img);

  // const onImageChange = (e) => {
  //   const [file] = e.target.files;
  //   setImg(URL.createObjectURL(file));
  // };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.BRANDS);
      }, time);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.BRANDS);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const OnSubmit = () => {
    const formData = new FormData();

    formData.append("brand_pic", img);
    formData.append("brand_description", description);
    formData.append("brand_name", brand);

    PublicFetch.post(`${CRM_BASE_URL_SELLING}/brand`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("success", res);
        if (res.data.success) {
          setSuccessPopup(true);
          addForm.resetFields();
          close_modal(successPopup, 1000);
        } else {
          console.log("", res.data.data);
          setBrandError(res.data.data);
        }
      })
      .catch((err) => {
        console.log("error", err);
        setError(true);
      });
  };



  console.log("data", brand, description);

  return (
    <div>
      <div className="container-fluid">
       
        <div
          style={{ borderRadius: "8px" }}
          className="card border-0 content-tabs  px-2"
        >
          <div className="container my-2">
            <div className="my-3">
              <h5 className="lead_text">Add Brand</h5>
            </div>
            <Form
              name="addForm"
              form={addForm}
              onFinish={(value) => {
                console.log("values111333", value);
                OnSubmit();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
             
              <div className="row">
                <div className="col-6">
                  <label>Name</label>
                  <div>
                    <Form.Item
                      name="brandName"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid Brand Name",
                        },
                        {
                          min: 2,
                          message: "Name must be at least 2 characters",
                        },
                        {
                          max: 100,
                          message: "Name cannot be longer than 100 characters",
                        },
                      ]}
                      onChange={(e) => setBrand(e.target.value)}
                    >
                      <InputType
                        value={brand}
                        onChange={(e) => {
                          setBrand(e.target.value);
                          setBrandError("");
                          setuniqueCode(false);
                        }}
                        onBlur={async() => {
                          
                          let a = await CheckUnique({type:"brandname",value:brand})
                          setuniqueCode(a)
                        }}
                      />
                    </Form.Item>
                    {uniqueCode ? (
                      <div>
                        <label style={{ color: "red" }}>
                          Brand Name {UniqueErrorMsg.UniqueErrName}
                        </label>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                </div>
                {/* <div className="col-8">
                  <label>Description</label>
                  <div>
                   
                    <Form.Item
                      name="description"
                      rules={[
                        {
                          min: 2,
                          message: "Description must be at least 2 characters",
                        },
                        {
                          max: 500,
                          message:
                            "Description cannot be longer than 500 characters",
                        },
                      ]}
                    >
                      <TextArea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                </div> */}
                <div className="row">
                <div className="col-6">
                  <label>Description</label>
                  <div>
                   
                    <Form.Item
                      name="description"
                      rules={[
                        {
                          min: 2,
                          message: "Description must be at least 2 characters",
                        },
                        {
                          max: 500,
                          message:
                            "Description cannot be longer than 500 characters",
                        },
                      ]}
                    >
                      <TextArea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-6">
                  <label>Display Picture</label>
                  <Form.Item name="new">
                    <FileUpload
                      multiple
                      listType="picture"
                      accept=".png,.jpg,.jpeg"
                      height={100}
                      onPreview={handlePreview}
                      beforeUpload={false}
                      onChange={(file) => {
                        console.log("Before upload", file.file);
                        console.log("Before upload file size", file.file.size);

                        if (file.file.size > 1000 && file.file.size < 500000) {
                          setImg(file.file.originFileObj);
                          setImgSizeError(false);
                          console.log(
                            "Image must be greater than 1 kb and less than 500 kb"
                          );
                        } else {
                          console.log("failed beacuse of large size");
                          setImgSizeError(true);
                        }
                      }}
                    />
                  </Form.Item>
                  {imgSizeError ? (
                    <div>
                      <label style={{ color: "red" }}>
                        Please Select Image Size under 500kb
                      </label>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                </div>

                <div className="col-12 d-flex justify-content-center  gap-2 py-5">
                  <Button className="save_button">Save</Button>
                  <Button
                    btnType="cancel"
                    onClick={() => {
                      handleCancel();
                    }}
                  >
                    cancel
                  </Button>
                </div>
            </Form>
          </div>
        </div>
      </div>
      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
      {error ? <ErrorMsg code={"500"} /> : ""}
    </div>
  );
}

export default BrandCreate;
