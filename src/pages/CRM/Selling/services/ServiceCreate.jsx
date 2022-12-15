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
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
import { TreeSelect } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes";

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
  const [imageSize,setImageSize]= useState();
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

  // const createservice=async()=>{

  //   const formData = new FormData();
  //     formData.append("service_name", serviceName);
  //     formData.append("service_code", servicecode );
  //     formData.append("service_category_id", category);
  //     formData.append("service_hsn", Hsn);
  //     formData.append("service_pic",displayPicture);
  //     formData.append("service_taxrate",taxRate);
  //     formData.append("service_description",description );

  // try{
  // const service= await PublicFetch.post(
  //   `${CRM_BASE_URL_SELLING}/service`, {
  //  formData,
  //  "Content-Type": "Multipart/form-Data",
  //   })
  //   console.log("service created succesfully ", service)
  // }
  // catch(err){
  //   console.log("err to add the services",err)
  //   }
  // }

  const OnSubmit = () => {
    const formData = new FormData();
    formData.append("service_name", serviceName);
    formData.append("service_code", servicecode);
    formData.append("service_category_id", State);
    formData.append("service_hsn", Hsn);
    formData.append("service_pic", img);
    formData.append("service_taxrate", taxRate);
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
 const handleCancel=()=>{
  navigate(ROUTES.SERVICES)
 }



  return (
    <div>
      <div className="container-fluid mt-3">
        <div>
          <h4 className="lead_text">Services</h4>
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
              form={addform}
              onFinish={(value) => {
                console.log("values111333", value);
                OnSubmit();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row my-5">
                <div className="col-4">
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
                      onChange={(e) => setServiceName(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <div className="col-4">
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
                      onChange={(e) => setServicecode(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <div className="col-4">
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
                <div className="col-6 mt-2">
                  <label>HSN</label>
                  <Form.Item name="HSN">
                    <InputType
                      value={Hsn}
                      onChange={(e) => setHsn(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <div className="col-6 mt-2">
                  <label className="mb-2">Tax Rate</label>
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
                    <InputNumber
                      style={{
                        border: "0",
                        backgroundColor: "whitesmoke",
                        width: "100%",
                        paddingBlock: "2px",
                        boxShadow: "none",
                      }}
                      value={taxRate}
                      onChange={(e) => setTaxRate(e)}
                    />
                  </Form.Item>
                </div>

                <div className="col-12 mt-2 d-flex justify-content-center ">
                  <div className="text-center">
                    <label>Display Picture</label>
                    <Form.Item name="new">
                      <FileUpload
                        multiple
                        listType="picture"
                        accept=".png,.jpeg"
                        onPreview={handlePreview}
                        beforeUpload={false}
                        onChange={(file) => {
                          console.log(
                            "Before upload file size",
                            file.file.size
                          );
                          if (
                            file.file.size > 2000 &&
                            file.file.size < 500000
                          ) {
                            setImg(file.file.originFileObj);
                            setImageSize(false);
                            console.log(
                              "select imaggg",
                              file.file.originFileObj
                            );
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
                </div>
                <div className="col-6 mt-2">
                  <label>Description</label>
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
                <div className="col-12 d-flex justify-content-center pt-5 gap-3 ">
                  <Button className="save_button">Save</Button>{" "}
                  <Button as="input" type="reset" value="Reset" onClick={()=>{
                    handleCancel()
                  }} >
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
