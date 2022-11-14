import { Form, Input } from "antd";
import React, { useState } from "react";
import "../../lead/lead.styles.scss";
import "../../../opportunity_ List/opportunitylist.scss";
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
  const [description, setDescription] = useState();
  const [brand, setBrand] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
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
        if (res.data.data) {
          setSuccessPopup(true);
          addForm.resetFields();
          close_modal(successPopup, 1000);
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
      <div className="container-fluid my-4">
        <div>
          <h4 className="lead_text">Brands</h4>
        </div>
        <div
          style={{ borderRadius: "8px" }}
          className="card border-0 content-tabs  my-3 px-4"
        >
          <div className="container my-3">
            <div className="my-3">
              <h5 className="lead_text">Basic Info</h5>
            </div>
            <Form
              name="addForm"
              form={addForm}
              onFinish={(value) => {
                console.log("values111333", value);
                // setDescription(value.description);
                // setBrand(value.brand);
                OnSubmit();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row my-5">
                <div className="col-4">
                  <p>Name</p>
                  <div>
                    {/* <input type="text" className="input_type_style w-100" /> */}
                    <Form.Item
                      name="brand"
                      
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),

                          message: "Please enter a Valid Brand Name",
                        },

                        {
                          whitespace: true,
                        },
                        {
                          min: 3,
                        },
                      ]}
                      onChange={(e) => setBrand(e.target.value)}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-8">
                  <p>Description</p>
                  <div>
                    {/* <textarea className="input_type_style w-100" /> */}
                    <Form.Item
                      name="description"
                      rules={[
                        {
                          required: true,

                          message: "Please enter Valid Description",
                        },

                        {
                          whitespace: true,
                        },
                        {
                          min: 2,
                        },
                        {
                          max: 500,
                        },
                      ]}
                      onChange={(e) => setDescription(e.target.value)}
                    >
                      <TextArea />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-4">
                  <p>Display Picture</p>
                  <Form.Item
                    name="new"
                    rules={[
                      {
                        required: true,
                        message: "Please select an image file",
                      },
                    ]}
                  >
                    <FileUpload
                      multiple
                      listType="picture"
                      accept=".png,.jpg,.jpeg"
                      onPreview={handlePreview}
                      beforeUpload={false}
                      onChange={(file) => {
                        console.log("Before upload", file.file);
                        console.log("Before upload file size", file.file.size);

                        if (file.file.size > 1000 && file.file.size < 50000) {
                          setImg(file.file.originFileObj);
                          console.log(
                            "image grater than 1 kb and less than 50 kb"
                          );
                        } else {
                          console.log("hgrtryyryr");
                        }
                      }}
                    />
                    {/* <Dragger
                      multiple
                      listType="picture"
                      accept=".png,.jpg,.jpeg"
                      onChange={(file) => {
                        console.log("Before upload", file.file);
                        console.log("Before upload file size", file.file.size);

                        if (file.file.size >10 && file.file.size <50) {
                        setImg(file)
                        console.log("image grater than 1 kb and less than 50 kb");
                        
                          }
                         
                              else {
                            console.log("hgrtryyryr");
                           
                            console.log("Set image error",img)
                          }
                      
                          
                        }
                      }
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Support for a single or bulk upload.
                      </p>
                    </Dragger> */}
                  </Form.Item>
                </div>

                <div className="col-12 d-flex justify-content-center py-5">
                  <Button onClick={() => {}} className="save_button">
                    Save
                  </Button>
                </div>
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
