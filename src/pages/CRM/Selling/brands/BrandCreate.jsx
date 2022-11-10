import { Form, Input } from "antd";
import React, { useState } from "react";
import "../../lead/lead.styles.scss";
import "../../../opportunity_ List/opportunitylist.scss";
import FileUpload from "../../../../components/fileupload/fileUploader";
import Button from "../../../../components/button/button";
import CustomModel from "../../../../components/custom_modal/custom_model";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "antd/lib/input/TextArea";
import { UploadProps } from "antd";
// import { message, Upload } from "antd";
// import { InboxOutlined } from "@ant-design/icons";

// const { Dragger } = Upload;
function BrandCreate() {
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [file, setFile] = useState(null);
  const [img, setImg] = useState([]);
  console.log("set image",img);

  // const UploadProps = {
  //   name: "file",
  //   multiple: true,

  //   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  //   onChange(info) {
  //     const { status } = info.file;
  //     //   if (status != ".png" || status !=".jpg" ) {
  //     //     window.alert("File does not support. You must use .png or .jpg ");

  //     //     return false;
  //     //  }
  //     //  if (file.size > 10e6) {
  //     //    window.alert("Please upload a file smaller than 10 MB");
  //     //    return false;
  //     //  }
  //     if (status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   onDrop(e) {
  //     console.log("Dropped files", e.dataTransfer.files);
  //   },
  // };
  // const fileChangedHandler = event => {
  //   let file = event.target.files[0];
  //   let reader = new FileReader();

  //   console.log(file);
  //   reader.onload = function(e) {
  //     setFile(e.target.result);
  //   };
  //   reader.readAsDataURL(event.target.files[0]);

  // };

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
              onFinish={(value) => {
                console.log(value);
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
                    // onChange={fileChangedHandler}
                  >
                    <FileUpload   multiple
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
                      }/>
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
                  <Button
                    // onClick={() => {
                    //   setSuccessPopup(true);
                    //   setError(true);
                    // }}
                    className="save_button"
                  >
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
