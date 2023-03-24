import React, { useEffect, useState } from "react";
import { Checkbox, Select } from "antd";
import Button from "../../../../components/button/button";
import CustomModel from "../../../../components/custom_modal/custom_model";
import { Form, message, InputNumber, TreeSelect } from "antd";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import SelectBox from "../../../../components/Select Box/SelectBox";
import FileUpload from "../../../../components/fileupload/fileUploader";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";

function ServiceEdit(){
    const [successPopup, setSuccessPopup] = useState(false);
    const [error, setError] = useState(false);
    const [img, setImg] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [imageSize, setImageSize] = useState();

    const [taxRate, setTaxRate] = useState();
    const [alltaxtype, setalltaxtype] = useState("");

    const [numOfItems, setNumOfItems] = useState("25");
    const [current, setCurrent] = useState(1);
    const pageofIndex = numOfItems * (current - 1) - 1 + 1;

    const getAllTaxTypes = async () => {
        try {
          const allTxTypes = await PublicFetch.get(
            `${CRM_BASE_URL_FMS}/tax-types?startIndex=${pageofIndex}&perPage=${numOfItems}`
          );
          console.log("all taxtype are", allTxTypes.data.data);
          setalltaxtype(allTxTypes.data.data);
          // setTaxTypes(allTxTypes.data.data);
        } catch (err) {
          console.log("error while getting the tax types: ", err);
        }
      };

      useEffect(() => {
        getAllTaxTypes();
      }, []);

    const beforeUpload = (file, fileList) => {};
    return(
        <>
           <div className="container-fluid">
        <div
          style={{ borderRadius: "8px" }}
          className="card border-0 content-tabs px-2"
        >
          <div className="container my-3">
            <div>
              <h5 className="lead_text my-2">Edit Services</h5>
            </div>

            <Form
              name="addForm"
            //   form={addform}
              onFinish={(value) => {
                console.log("values111333", value);
                // OnSubmit();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row my-4">
                <div className="col-6">
                  <label>Name</label>
                  <Form.Item
                    name="servicename"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        message: "Please enter a Valid Service Name",
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
                  >
                   
                    <InputType
                    //   value={serviceName}
                    //   onChange={(e) => {
                    //     setServiceName(e.target.value);
                    //     setuniqueCode(false);
                    //   }}
                    //   onBlur={async () => {
                    //     // checkAttributeNameis();
                    //     let a = await CheckUnique({
                    //       type: "servicename",
                    //       value: serviceName,
                    //     });
                    //     console.log("hai how are u", a);
                    //     setuniqueCode(a);
                    //   }}
                    />
                  </Form.Item>
                  {/* {uniqueCode ? (
                    <div>
                      <label style={{ color: "red" }}>
                        Service Name {UniqueErrorMsg.UniqueErrName}
                      </label>
                    </div>
                  ) : (
                    ""
                  )} */}
                </div>
                <div className="col-6">
                  <label>Code</label>
                  <Form.Item
                    name="code"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        message: "Please enter a Valid Code",
                      },
                      {
                        min: 2,
                        message: "Code must be at least 2 characters",
                      },
                      {
                        max: 20,
                        message: "Code cannot be longer than 20 characters",
                      },
                    ]}
                  >
                    <InputType
                    //   value={servicecode}
                    //   onChange={(e) => {
                    //     setServicecode(e.target.value);
                    //     setuniqueserCode(false);
                    //   }}
                    //   onBlur={async () => {
                    //     // checkAttributeNameis();
                    //     let a = await CheckUnique({
                    //       type: "servicecode",
                    //       value: servicecode,
                    //     });
                    //     console.log("hai how are u", a);
                    //     setuniqueserCode(a);
                    //   }}
                    />
                  </Form.Item>
                  {/* {uniqueserCode ? (
                    <div>
                      <label style={{ color: "red" }}>
                        Service Code {UniqueErrorMsg.UniqueErrName}
                      </label>
                    </div>
                  ) : (
                    ""
                  )} */}
                </div>
              

<div className="col-6">
<label>Category</label>
                  <Form.Item
                    className="mt-2"
                    name="category"
                    rules={[
                      {
                        required: true,
                        message: "Please select a category",
                      },
                    ]}
                  >
                   
                    <TreeSelect
                      className="tree"
                      name="tree"
                      style={{ width: "100%" }}
                      // value={category}
                      // value={ setState.value}
                      dropdownStyle={{
                        maxHeight: 400,
                        overflow: "auto",
                      }}
                    //   treeData={categoryTree}
                    //   placeholder="Please select"
                    //   treeDefaultExpandAll
                    //   onChange={onChangetree}
                    //   onSelect={onSelect}
                    />
                  </Form.Item>
</div>
                
                <div className="col-6 mt-1">
                  <label className="">Tax Type</label>
                  <Form.Item
                    name="taxRate"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a Valid Tax Rate",
                      },
                      {
                        pattern: new RegExp("^[0-9]+$"),
                        message: "Please enter zero or Postive integers",
                      },
                    ]}
                  >
                    
                    <SelectBox
                      placeholder={"--Please Select--"}
                      value={taxRate}
                      onChange={(e) => {
                        console.log("select the brandss", e);
                        setTaxRate(parseInt(e));
                      }}
                    >
                      {alltaxtype &&
                        alltaxtype.length > 0 &&
                        alltaxtype.map((item, index) => {
                          return (
                            <Select.Option
                              key={item.tax_type_id}
                              value={item.tax_type_id}
                            >
                              {item.tax_type_name}
                            </Select.Option>
                          );
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>

                <div className="col-6 mt-2">
                  <label>Display Picture</label>
                  <Form.Item name="new" className="mt-2">
                    <FileUpload
                      multiple
                      listType="picture"
                      accept=".png,.jpeg"
                      height={100}
                      // onPreview={handlePreview}
                      beforeUpload={beforeUpload}
                      onChange={(file) => {
                        console.log("Before upload file size", file.file.size);
                        if (file.file.size > 2000 && file.file.size < 500000) {
                          setImg(file.file.originFileObj);
                          setImageSize(false);
                          console.log("select imaggg", file.file.originFileObj);
                          console.log(
                            "image is greater than 2 kb and less than 500 kb"
                          );
                        } else {
                          setImageSize(true);
                          console.log("Error in image upload");
                        }
                      }}
                    />
                    {imageSize ? (
                      <p style={{ color: "red" }}>
                        Upload Image size between 1 kb and 500 kb
                      </p>
                    ) : (
                      ""
                    )}
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
                  >
                    <TextArea
                    //   value={description}
                    //   onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <div className="col-12 d-flex justify-content-center mt-5 pt-4 gap-3 ">
                  <Button className="save_button">Save</Button>
                  
                  <Button
                    as="input"
                    type="reset"
                    value="Reset"
                    // onClick={() => {
                    //   handleCancel();
                    // }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
      {error ? <ErrorMsg code={"500"} /> : ""}

      <CustomModel
        size={"sm"}
        success
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
      />

        </>
    )
}
export default ServiceEdit;