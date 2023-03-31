import { Checkbox, Select } from "antd";
import "../../../../components/Input Type textbox/InputType.scss";
import React, { useEffect, useState } from "react";
import Button from "../../../../components/button/button";
import CustomModel from "../../../../components/custom_modal/custom_model";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import FileUpload from "../../../../components/fileupload/fileUploader";
import InputType from "../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../components/Select Box/SelectBox";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import { Form, message, InputNumber } from "antd";
import PublicFetch from "../../../../utils/PublicFetch";
import {
  CRM_BASE_URL_FMS,
  CRM_BASE_URL_SELLING,
} from "../../../../api/bootapi";
import { TreeSelect } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import CheckUnique from "../../../../check Unique/CheckUnique";
import { UniqueErrorMsg } from "../../../../ErrorMessages/UniqueErrorMessage";

function ServiceCreate() {
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [servicecode, setServicecode] = useState("");
  const [category, setCategory] = useState();
  const [Hsn, setHsn] = useState();
  const [taxRate, setTaxRate] = useState();
  // const [displayPicture, setDisplayPicture] = useState([]);
  const [file, setFile] = useState(null);
  const [img, setImg] = useState([]);
  console.log("set image", img);
  const [description, setDescription] = useState();
  const [toggleState, setToggleState] = useState(1);
  const [State, setState] = useState("null");
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const [TreeData, setTreeData] = useState();
  const [categoryTree, setCategoryTree] = useState([]);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [imageSize, setImageSize] = useState();
  const [uniqueCode, setuniqueCode] = useState();
  const [uniqueserCode, setuniqueserCode] = useState();
  const [uniqueHsnCode, setuniqueHsnCode] = useState();
  const [TaxGroups, setTaxGroups] = useState();
  const [numOfItems, setNumOfItems] = useState("25");
  const [current, setCurrent] = useState(1);
  const pageofIndex = numOfItems * (current - 1) - 1 + 1;

  const [alltaxtype, setalltaxtype] = useState("");
  const [addform] = Form.useForm();
  const navigate = useNavigate();
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.SERVICES);
      }, time);
    }
  };

  const onChangetree = (value) => {
    console.log("Change", value);
    setState(parseInt(value));
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

  useEffect(() => {
    getCategorydata();
  }, []);

  const OnSubmit = () => {
    const formData = new FormData();
    formData.append("service_name", serviceName);
    formData.append("service_code", servicecode);
    formData.append("service_category_id", State);
    formData.append("service_hsn", Hsn);
    formData.append("service_pic", img);
    formData.append("service_taxtype", taxRate);
    formData.append("service_description", description);

    PublicFetch.post(`${CRM_BASE_URL_SELLING}/service`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("servicedata is successfully saved", res.data.success);
        if (res.data.data) {
          setSuccessPopup(true);
          addform.resetFields();
          close_modal(successPopup, 1000);
        }
      })
      .catch((err) => {
        console.log("error", err);
        setError(true);
      });
  };
  const handleCancel = () => {
    navigate(ROUTES.SERVICES);
  };

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
    getTaxGroup();
    getAllTaxTypes();
  }, []);
  const beforeUpload = (file, fileList) => {};

  return (
    <div>
      <div className="container-fluid">
        <div
          style={{ borderRadius: "8px" }}
          className="card border-0 content-tabs px-2"
        >
          <div className="container my-3">
            <div>
              <h5 className="lead_text my-2">Add Services</h5>
            </div>

            <Form
              name="addForm"
              form={addform}
              onFinish={(value) => {
                console.log("values111333", value);
                OnSubmit();
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
                      value={serviceName}
                      onChange={(e) => {
                        setServiceName(e.target.value);
                        setuniqueCode(false);
                      }}
                      onBlur={async () => {
                        // checkAttributeNameis();
                        let a = await CheckUnique({
                          type: "servicename",
                          value: serviceName,
                        });
                        console.log("hai how are u", a);
                        setuniqueCode(a);
                      }}
                    />
                  </Form.Item>
                  {uniqueCode ? (
                    <div>
                      <label style={{ color: "red" }}>
                        Service Name {UniqueErrorMsg.UniqueErrName}
                      </label>
                    </div>
                  ) : (
                    ""
                  )}
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
                      value={servicecode}
                      onChange={(e) => {
                        setServicecode(e.target.value);
                        setuniqueserCode(false);
                      }}
                      onBlur={async () => {
                        // checkAttributeNameis();
                        let a = await CheckUnique({
                          type: "servicecode",
                          value: servicecode,
                        });
                        console.log("hai how are u", a);
                        setuniqueserCode(a);
                      }}
                    />
                  </Form.Item>
                  {uniqueserCode ? (
                    <div>
                      <label style={{ color: "red" }}>
                        Service Code {UniqueErrorMsg.UniqueErrName}
                      </label>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {/* <div className="col-4">
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
                      treeData={categoryTree}
                      placeholder="Please select"
                      treeDefaultExpandAll
                      onChange={onChangetree}
                      onSelect={onSelect}
                    />
                  </Form.Item>
                </div> */}

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
                      treeData={categoryTree}
                      placeholder="Please select"
                      treeDefaultExpandAll
                      onChange={onChangetree}
                      onSelect={onSelect}
                    />
                  </Form.Item>
                </div>
                {/* <div className="col-6 mt-2">
                  <label>HSN</label>
                  <Form.Item
                    name="HSN"
                    rules={[
                      {
                        pattern: new RegExp("^[0-9]+$"),
                        message: "Please enter a Valid Code",
                      },
                    ]}
                  >
                    <InputType
                      value={Hsn}
                      onChange={(e) => {
                        setHsn(e.target.value);
                        setuniqueHsnCode(false);
                      }}
                      onBlur={async () => {
                        // checkAttributeNameis();
                        let a = await CheckUnique({
                          type: "servicehsn",
                          value: Hsn,
                        });
                        console.log("hai how are u", a);
                        setuniqueHsnCode(a);
                      }}
                    />
                  </Form.Item>
                  {uniqueHsnCode ? (
                    <div>
                      <label style={{ color: "red" }}>
                        Service Hsn {UniqueErrorMsg.UniqueErrName}
                      </label>
                    </div>
                  ) : (
                    ""
                  )}
                </div> */}
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
                    {/* <InputNumber
                      style={{
                        border: "0",
                        backgroundColor: "whitesmoke",
                        width: "100%",
                        paddingBlock: "2px",
                        boxShadow: "none",
                      }}
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                    /> */}
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
                <div className="col-6 mt-1">
                  <label className="">Tax Groups</label>
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
                    {/* <InputNumber
                      style={{
                        border: "0",
                        backgroundColor: "whitesmoke",
                        width: "100%",
                        paddingBlock: "2px",
                        boxShadow: "none",
                      }}
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                    /> */}
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
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <div className="col-12 d-flex justify-content-center mt-5 pt-4 gap-3 ">
                  <Button className="save_button">Save</Button>{" "}
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
    </div>
  );
}

export default ServiceCreate;
