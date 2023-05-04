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
import {
  CRM_BASE_URL_FMS,
  CRM_BASE_URL_SELLING,
} from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import { useNavigate, useParams } from "react-router-dom";
// import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes";
function ServiceEdit() {
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [img, setImg] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [imageSize, setImageSize] = useState();

  const [alltaxtype, setalltaxtype] = useState("");

  const [numOfItems, setNumOfItems] = useState("25");
  const [current, setCurrent] = useState(1);
  const pageofIndex = numOfItems * (current - 1) - 1 + 1;

  const [TreeData, setTreeData] = useState();
  const [categoryTree, setCategoryTree] = useState([]);
  const [TaxGroups, setTaxGroups] = useState();

  const [servicename, setservicename] = useState("");
  const [servicecode, setservicecode] = useState("");
  const [servicecategory, setservicecategory] = useState("");
  const [servicepicture, setservicepicture] = useState("");
  const [servicedescription, setservicedescription] = useState("");

  const [taxRate, setTaxRate] = useState("");

  const { id } = useParams();
  const [editForm] = Form.useForm();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(ROUTES.SERVICES);
  };
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.SERVICES);
      }, time);
    }
  };

  const getAllTaxTypes = async () => {
    try {
      const allTxTypes = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/tax-types/minimal`
      );
      console.log("all taxtype are", allTxTypes.data.data);
      setalltaxtype(allTxTypes.data.data);
      // setTaxTypes(allTxTypes.data.data);
    } catch (err) {
      console.log("error while getting the tax types: ", err);
    }
  };

  const getCategorydata = () => {
    PublicFetch.get(`${CRM_BASE_URL_SELLING}/category`)
      .then((res) => {
        console.log("response Data", res);
        if (res.data.success) {
          setTreeData(res.data.data);
          // getTreeData(res.data.data);
          let d = structureTreeData(res.data.data);
          console.log("Structured Tree : ", d);
          setCategoryTree(d);
          console.log("all data", res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const onChangetree = (value) => {
    console.log("Change service catid", value);

    setservicecategory(parseInt(value));
  };
  const onSelect = (value) => {
    console.log("Select the category :", value);
  };

  const structureTreeData = (categories) => {
    let treeStructure = [];
    if (categories && Array.isArray(categories) && categories.length > 0) {
      categories.forEach((category, categoryIndex) => {
        // if (category?.other_crm_v1_categories?.length > 0) {
        let ch = structureTreeData(category?.other_crm_v1_categories);
        treeStructure.push({
          value: category?.category_id,
          title: category?.category_name,
          children: ch,
        });
        // }
      });
    }
    return treeStructure;
    // console.log("Tree structure : ", treeStructure);
  };

  const getoneservice = async () => {
    try {
      const oneservice = await PublicFetch.get(
        `${CRM_BASE_URL_SELLING}/service/${id}`
      );
      console.log("one service details iss", oneservice.data.data);
      // setalltaxtype(oneservice.data.data);

      editForm.setFieldsValue({
        servicename: oneservice?.data?.data?.service_name,
        code: oneservice?.data?.data?.service_code,
        category: oneservice?.data?.data?.crm_v1_categories?.category_id,
        taxGroup: oneservice?.data?.data?.service_taxgroup,
        serviceimg: oneservice.data.data.service_pic,
        description: oneservice.data.data.service_description,
      });
      setservicename(oneservice.data.data.service_name);
      setservicecode(oneservice.data.data.service_code);
      setservicecategory(oneservice.data.data.crm_v1_categories.category_id);
      setTaxRate(oneservice.data.data.fms_v1_tax_types.tax_type_id);
      setservicedescription(oneservice.data.data.service_description);
      setservicepicture(oneservice.data.data.service_pic);
      console.log("one service name", oneservice.data.data.service_name);
    } catch (err) {
      console.log("error while getting the tax types: ", err);
    }
  };

  const handleUpdate = (data) => {
    // console.log("edit data", e);
    const formData = new FormData();

    formData.append("service_name", servicename.trim(" "));
    formData.append("service_code", servicecode);
    formData.append("service_category_id", servicecategory);
    // if (serviceImg && serviceImg !== 0) {
    //   formData.append("service_pic", serviceImg);
    // }
    if(img){
      formData.append("service_pic", img);
    }
   if(data.taxGroup){
    formData.append("service_taxgroup", data.taxGroup);
   }
    if(servicedescription){
      formData.append("service_description", servicedescription);
    }
   

    PublicFetch.patch(`${CRM_BASE_URL_SELLING}/service/${id}`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("data edited successfully", res);
        if (res.data.success) {
          console.log("successDataa", res.data.data);
          // setShowServiceEditModal(false);
          setSuccessPopup(true);
          close_modal(successPopup, 1000);
          // setBrandEditPopup(false);
          editForm.resetFields();
        }
      })
      .catch((err) => {
        console.log("Error", err);
        setError(true);
      });
  };

  const getTaxGroup = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/tax_group`)
      .then((res) => {
        console.log("response");
        if (res.data.success) {
          console.log("Success");
          setTaxGroups(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getAllTaxTypes();
    getCategorydata();
    getoneservice();
    getTaxGroup();
  }, []);

  const beforeUpload = (file, fileList) => {};
  return (
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
              form={editForm}
              onFinish={(value) => {
                console.log("values111333", value);
                handleUpdate(value);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row my-4">
                <div className="col-6 mb-2">
                  <label>Name<span className="required">*</span></label>
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
                      value={servicename}
                      onChange={(e) => {
                        setservicename(e.target.value);
                        // setuniqueCode(false);
                      }}
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
                <div className="col-6 mb-2">
                  <label>Code<span className="required">*</span></label>
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
                      value={servicecode}
                      onChange={(e) => {
                        setservicecode(e.target.value);
                        // setuniqueserCode(false);
                      }}
                     
                    />
                  </Form.Item>
               
                </div>

                <div className="col-6 mb-2">
                  <label>Category<span className="required">*</span></label>

                  <Form.Item
                    // className="mt-2"
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
                      treeData={categoryTree}
                      placeholder="Please select"
                      treeDefaultExpandAll
                      onChange={onChangetree}
                      onSelect={onSelect}
                    />
                  </Form.Item>
                </div>

               
                <div className="col-6 mb-2">
                  <label className="">Tax Groups</label>
                  <Form.Item
                    name="taxGroup"
                   
                  >
                   
                    <SelectBox
                      placeholder={"--Please Select--"}
                      // value={taxRate}
                      onChange={(e) => {
                        console.log("select the brandss", e);
                        setTaxRate(parseInt(e));
                      }}
                    >
                      {TaxGroups &&
                        TaxGroups.length > 0 &&
                        TaxGroups.map((item, index) => {
                          return (
                            <Select.Option
                              key={item.tax_group_id}
                              value={item.tax_group_id}
                            >
                              {item.tax_group_name}
                            </Select.Option>
                          );
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-6 mb-2">
                  <label>Display Picture</label>
                  <Form.Item name="serviceimg" className="mt-2">
                    <FileUpload
                      multiple
                      listType="picture"
                      accept=".png,.jpeg"
                      // height={100}
                      // style={{ height: "65px" }}
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

                  {/* <img
                    src={`${process.env.REACT_APP_BASE_URL}/${servicepicture}`}
                    height="40px"
                    width={"40px"}
                  /> */}
                </div>
                <div className="col-6 mb-2">
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
                      value={servicedescription}
                      onChange={(e) => setservicedescription(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <div className="col-12 d-flex justify-content-center mt-5 pt-4 gap-3 ">
                  <Button className="save_button">Save</Button>

                  <Button
                    as="input"
                    type="reset"
                    value="Reset"
                    onClick={() => {
                      handleCancel();
                    }}
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
  );
}
export default ServiceEdit;
