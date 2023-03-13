import { Select } from "antd";
import { Checkbox, Col, Row } from "antd";
import React, { useState, useEffect } from "react";

import Button from "../../../components/button/button";

import CustomModel from "../../../components/custom_modal/custom_model";
import ErrorMsg from "../../../components/error/ErrorMessage";

import FileUpload from "../../../components/fileupload/fileUploader";

import { useNavigate } from "react-router-dom";
import { Form } from "antd";
import { TreeSelect } from "antd";
import TextArea from "../../../components/ InputType TextArea/TextArea";

import InputType from "../../../components/Input Type textbox/InputType";

import SelectBox from "../../../components/Select Box/SelectBox";
// import SelectBox from "../../../../components/Select Box/SelectBox";
// import PublicFetch from "../../../../utils/PublicFetch";
// import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
// import { ROUTES } from "../../../../routes";
import "./product.scss";

// import { UniqueErrorMsg } from "../../../../ErrorMessages/UniqueErrorMessage";

// import CheckUnique from "../../../../check Unique/CheckUnique";
// import { UniqueErrorMsg } from "../../../../ErrorMessages/UniqueErrorMessage";

function ProductCreate() {
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [addForm] = Form.useForm();
  const navigate = useNavigate();
 
 
 


  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.PRODUCT);
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


 



  return (
    <div>
      <div className="container-fluid">
        <div>
          <h5 className="lead_text">Products</h5>
        </div>
        <div
          style={{ borderRadius: "8px" }}
          className="card border-0 content-tabs  my-3 px-4"
        >
          <div className="container my-3">
            <div className="my-3">
              <h6 className="lead_text">Add Product</h6>
            </div>
            <Form
              name="addForm"
              form={addForm}
              onFinish={(value) => {
                console.log("values111333", value);
               
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row my-2">
                <div className="col-4">
                  <label>Name</label>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        message: "Please enter a Valid Product Name",
                      },
                      {
                        min: 2,
                        message: "Product Name must be at least 2 characters",
                      },
                      {
                        max: 100,
                        message:
                          "Product Name cannot be longer than 100 characters",
                      },
                    ]}
                  >
                    <InputType
                      onChange={(e) => {
                        setName(e.target.value);

                        setuniqueCode();
                      }}
                      onBlur={async () => {
                        let a = await CheckUnique({
                          type: "productname",
                          value: name,
                        });

                        setuniqueCode(a);
                      }}
                    />
                  </Form.Item>
                  {uniqueCode ? (
                    <div>
                      <label style={{ color: "red" }}>
                        Product name {UniqueErrorMsg.UniqueErrName}
                      </label>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-4">
                  <label>Code</label>
                  <Form.Item
                    name="code"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        message: "Please enter a Valid Product Code",
                      },
                      {
                        min: 2,
                        message: "Product Code must be at least 2 characters",
                      },
                      {
                        max: 20,
                        message:
                          "Product Code cannot be longer than 20 characters",
                      },
                    ]}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setuniqueCode2(false);
                    }}
                  >
                    <InputType
                      onBlur={async () => {
                        let a = await CheckUnique({
                          type: "productcode",
                          value: code,
                        });
                        setuniqueCode2(a);
                      }}
                    />
                  </Form.Item>
                  {uniqueCode2 ? (
                    <label style={{ color: "red" }}>
                      Product Code {UniqueErrorMsg.UniqueErrName}
                    </label>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-4">
                  <label>Category</label>
                  <Form.Item
                    className="mt-2"
                    name="category"
                    rules={[
                      {
                        required: true,
                        message: "Please Select a Category",
                      },
                    ]}
                  >
                    <TreeSelect
                      className="tree"
                      name="tree"
                      style={{ width: "100%" }}
                      dropdownStyle={{
                        maxHeight: 400,
                        overflow: "auto",
                      }}
                      treeData={categoryTree}
                      placeholder="Please select"
                      treeDefaultExpandAll
                      onChange={onChangetree}
                      onSelect={onSelect}
                    />
                  </Form.Item>
                </div>
                <div className="col-6 mt-2">
                  <label>Brand</label>
                  <Form.Item
                    name="brand"
                    rules={[
                      {
                        required: true,
                        message: "Please Select a Brand",
                      },
                    ]}
                  >
                    <SelectBox
                      placeholder={"--Please Select--"}
                      value={brand}
                      onChange={(e) => {
                        console.log("select the brandss", e);
                        setBrand(parseInt(e));
                      }}
                    >
                      {brands &&
                        brands.length > 0 &&
                        brands.map((item, index) => {
                          return (
                            <Select.Option
                              key={item.brand_id}
                              value={item.brand_id}
                            >
                              {item.brand_name}
                            </Select.Option>
                          );
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-6 mt-2">
                  <label>Unit</label>
                  <Form.Item
                    name="unit"
                    rules={[
                      {
                        required: true,
                        message: "Please Select a unit",
                      },
                    ]}
                  >
                    <SelectBox
                      placeholder={"--Please Select--"}
                      value={allunit}
                      onChange={(e) => {
                        console.log("selected unit iss", e);
                        setUnit(parseInt(e));
                      }}
                    >
                      {allunit &&
                        allunit.length > 0 &&
                        allunit.map((item, index) => {
                          return (
                            <Select.Option
                              key={item.unit_id}
                              value={item.unit_id}
                            >
                              {item.unit_name}
                            </Select.Option>
                          );
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>

                <div className="col-6 mt-2">
                  <label>Description</label>
                  <Form.Item
                    className="mt-2"
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
                    onChange={(e) => setDescription(e.target.value)}
                  >
                    <TextArea />
                  </Form.Item>
                </div>

                <div className="col-6 mt-2">
                  <label>Display Picture</label>
                  <Form.Item className="mt-2" name="new">
                    <FileUpload
                      // multiple
                      listType="picture"
                      accept=".png,.jpeg,.jpg"
                      filetype={"Accept only png,jpg and jpeg"}
                      // onPreview={handlePreview}
                      beforeUpload={beforeUpload}
                      onChange={(file) => {
                        console.log("Before upload", file.file);
                        console.log("Before upload file size", file.file.size);

                        if (file.file.size > 2000 && file.file.size < 500000) {
                          setImg(file.file.originFileObj);

                          console.log("selet imggg", file.file.originFileObj);
                          setImageSize(false);
                        } else {
                          setImageSize(true);
                          console.log(
                            "Error in upload, upload image size between 1 kb and  500 kb"
                          );
                        }
                      }}
                    />

                    {/* <img src={previewImage}   
                    height="40px"
                    width="40px"/> */}

                    {imageSize ? (
                      <p style={{ color: "red" }}>
                        Upload Image size between 1 kb and 500 kb
                      </p>
                    ) : (
                      ""
                    )}
                  </Form.Item>
                </div>
                <div className="col-6 ">
                  <label>Attributes</label>
                  <Form.Item
                    name="attribute"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Attributes",
                      },
                    ]}
                  >
                    <Checkbox.Group
                      className="mt-2 px-3"
                      onChange={newValues}
                      //    onChange={(e) => {setAttributes(parseInt(e.target.checked))
                      //   console.log(e.target.checked)
                      //   }
                      // }
                    >
                      <div className="row p-2 attributes__height">
                        {attributes &&
                          attributes.length > 0 &&
                          attributes.map((item, index) => {
                            return (
                              <div className="col-lg-4 col-xl-4 col-12 py-1">
                                <Checkbox value={item?.attribute_id}>
                                  {item?.attribute_name}
                                </Checkbox>
                              </div>
                            );
                          })}
                      </div>
                    </Checkbox.Group>
                  </Form.Item>
                </div>
                <div className="col-12 d-flex justify-content-center pt-2">
                  <Button className="save_button">Save</Button>
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

export default ProductCreate;
