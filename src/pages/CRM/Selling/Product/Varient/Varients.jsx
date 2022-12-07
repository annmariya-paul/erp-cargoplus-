import { Form, Select } from "antd";
import ProductVariantsEditModal from "./ProductVariantsEditModal";

import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdPageview } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import TextArea from "../../../../../components/ InputType TextArea/TextArea";
import Button from "../../../../../components/button/button";
import CustomModel from "../../../../../components/custom_modal/custom_model";
import ErrorMsg from "../../../../../components/error/ErrorMessage";
import FileUpload from "../../../../../components/fileupload/fileUploader";
import InputType from "../../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../../components/Select Box/SelectBox";
import TableData from "../../../../../components/table/table_data";
import { ROUTES } from "../../../../../routes";
import { CRM_BASE_URL_SELLING } from "../../../../../api/bootapi";
import PublicFetch from "../../../../../utils/PublicFetch";
function Varients() {
  const { id } = useParams();
  console.log("iddddd", id);
  const [addForm] = Form.useForm();
  const [attForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const navigate = useNavigate();
  const [toggleState, setToggleState] = useState(1);
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [varientattr, setVarientAttr] = useState([]);
  const [varname, setvarname] = useState();
  const [varcode, setvarcode] = useState();
  const [varpic, setvarpic] = useState();
  const [unit, setUnit] = useState("");
  const [varquantity, setvarquantity] = useState();
  const [varminprice, setvarminprice] = useState();
  const [varmaxprice, setvarmaxprice] = useState();
  const [vartaxrate, setvartaxrate] = useState();
  const [vardescription, setvardescription] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [prid, setPrid] = useState(id);
  console.log("product id in state is ", prid);
  const [prunit, setPrUnit] = useState();
  console.log("product unit id in state is ", prunit);
  const [allunit, setAllunit] = useState();
  const [modalOpportunity, setModalOpportunity] = useState(false);
  const [ClicktoOpen, setClicktoOpen] = useState(true);
  const [varientId, setVarientId] = useState();
  const [attributes, setAttributes] = useState();
  const [attributeValue, setAttributeValues] = useState();
  const [ModelForedit, setModalForEdit] = useState(false);
  const [varientAttribute_id, setVarientAttribute_id] = useState();
  const [Editattribute112, setEditattribute112] = useState(false);
  const [varientattrVArient_id, setVArientAttrVarient_id] = useState();

  console.log("varient id", varientId);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [prattributes, setPrAttributes] = useState();

  console.log("attributes by api call ", prattributes);

  // Start API call for get one product
  const GetAllProductData = () => {
    // console.log("Entered");
    PublicFetch.get(`${CRM_BASE_URL_SELLING}/product/${id}`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("product details", res.data.data);
          // setAllPrList(res.data.data);
          // setPrName(res?.data?.data?.product_name);
          // setPrcode(res?.data?.data?.product_code);
          // setPrCategory(res?.data?.data?.product_category_id);
          // setPrBrand(res?.data?.data?.product_brand_id);
          // setPrUnit(res?.data?.data?.product_unit_id);

          setPrAttributes(res?.data?.data?.crm_v1_attributes);
          if (id.includes(res.data.data.product_id)) {
            console.log("gfgfdgg", res.data.data);
          }
          // setPrDescription(res?.data?.data?.product_description);

          // setPrImage(res?.data?.data?.product_pic);
        } else {
          console.log("FAILED T LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

  useEffect(() => {
    GetAllProductData();
  }, [id]);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        toggleTab(2);
        // navigate(`${ROUTES.PRODUCTDETAIL}/${id}`, { state: toggleState === 2 });
      }, time);
    }
  };

  const close_modal1 = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        // toggleTab(2);
        // navigate(`${ROUTES.PRODUCTDETAIL}/${id}`, { state: toggleState === 2 });
      }, time);
    }
  };

  const getvarientAttr = async () => {
    try {
      const allvarientAttr = await PublicFetch.get(
        `${CRM_BASE_URL_SELLING}/variantAttr`
      );
      console.log(
        "getting all varient  attributes dattta",
        allvarientAttr.data.data
      );
      let temp = [];

      allvarientAttr.data.data.forEach((item, index) => {
        console.log("All varient data", item);
        console.log("Varient Id : ", item.variant_attr_variant_id);
        if (varientId === item.variant_attr_variant_id) {
          // setVarientAttr(allvarientAttr.data.data);
          temp.push({
            variant_attr_attribute_id: item.variant_attr_attribute_id,
            variant_attr_id: item.variant_attr_id,
            variant_attr_status: item.variant_attr_status,
            variant_attr_value: item.variant_attr_value,
            variant_attr_variant_id: item.variant_attr_variant_id,
          });
        }
        console.log("hfvhhhhf345", temp);
        setVarientAttr(temp);
        // if (varientId.includes(allvarientAttr.data.data)) {
        //   setVarientAttr(allvarientAttr.data.data);
        // }
      });
    } catch (err) {
      console.log("error to fetching  attributes", err);
    }
  };

  useEffect(() => {
    getvarientAttr();
  }, []);

  const getallunits = async () => {
    try {
      const allunits = await PublicFetch.get(`${CRM_BASE_URL_SELLING}/unit`);
      console.log("all units are ::", allunits?.data?.data);

      // if(allunits?.data.success){}
      setAllunit(allunits?.data?.data);
      // setunitTable(allunits?.data?.data)
    } catch (err) {
      console.log("error to getting all units", err);
    }
  };

  useEffect(() => {
    getallunits();
  }, []);
  const OnSubmit = () => {
    const formData = new FormData();

    formData.append("variant_name", varname);

    formData.append("variant_code", varcode);
    formData.append("variant_product_id", prid);
    formData.append("variant_unit", unit);

    formData.append("variant_pic", varpic);
    formData.append("variant_quantity", varquantity);
    formData.append("variant_price_min", varminprice);
    formData.append("variant_price_max", varmaxprice);
    formData.append("variant_taxrate", vartaxrate);
    formData.append("variant_description", vardescription);

    PublicFetch.post(`${CRM_BASE_URL_SELLING}/variant`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("success", res);
        if (res.data.data) {
          setVarientId(res.data.data.variant_id);
          setSuccessPopup(true);
          addForm.resetFields();
          close_modal(successPopup, 1000);

          // res?.data?.data.variants.forEach((item, index) => {

          // });
          console.log("data 11222", res.data.data);
        }
      })
      .catch((err) => {
        console.log("error", err);
        setError(true);
      });
  };

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "ACTION",
      width: "14%",
      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center align-items-center gap-3">
            <div
              onClick={() => handleEditClick(index)}
              className="actionEdit m-0 p-0"
            >
              <FaEdit />
            </div>
            <Link to={ROUTES.PRODUCTDETAIL}>
              {/* <div
                // onClick={() => setProductView(true)}
                className="actionView m-0 p-0"
              >
                <MdPageview />
              </div> */}
            </Link>
            <div className="actionView m-0 p-0">
              <MdDelete />
            </div>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "ATTRIBUTE NAME",
      dataIndex: "variant_attr_attribute_id",
      width: "14%",
      key: "ATTRIBUTE NAME",
      align: "center",
    },
    {
      title: "ATTRIBUTE VALUE",
      dataIndex: "variant_attr_value",
      width: "14%",
      key: "ATTRIBUTE VALUE",
      align: "center",
    },
  ];
  const [attribute, setAttribute] = useState("");
  const data = [
    {
      action: "action",
      name: "color",
      value: "Red",
      key: "1",
    },
  ];
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

  const AddVarientAttribute = (data) => {
    console.log("hey all", data);
    PublicFetch.post(`${CRM_BASE_URL_SELLING}/variantAttr`, {
      variant_attr_variant_id: varientId,
      variant_attr_attribute_id: data?.attribute,
      variant_attr_value: data?.value,
    })
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          setSuccessPopup(true);
          close_modal1(successPopup, 1200);
          console.log("success", res.data.data);
          attForm.resetFields();
          getvarientAttr();
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleEditClick = (data) => {
    console.log("dataa again", data);
    if (data) {
      setAttributes(data?.variant_attr_attribute_id);
      setAttributeValues(data?.variant_attr_value);
      setVarientAttribute_id(data?.variant_attr_id);
      setVArientAttrVarient_id(data?.variant_attr_variant_id);
      editForm.setFieldsValue({
        Editattribute_id: data?.variant_attr_id,
        Editattribute: data.variant_attr_attribute_id,
        Editvalue: data.variant_attr_value,
      });
      // setClicktoOpen(false);
      setModalForEdit(true);
      // setEditattribute112(true);
    }
  };

  const UpdateAttribute = (value) => {
    console.log("hai how are u", value);
    const UpdatedData = {
      variant_attr_variant_id: varientattrVArient_id,
      variant_attr_attribute_id: attributes,
      variant_attr_value: attributeValue,
    };

    PublicFetch.patch(
      `${CRM_BASE_URL_SELLING}/variantAttr/${varientAttribute_id}`,
      UpdatedData
    )
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          setSuccessPopup(true);
          close_modal1(successPopup, 1200);
          getvarientAttr();
          editForm.resetFields();
          setEditattribute112(false);
          setClicktoOpen(true);
          setModalForEdit(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  console.log("happy", attributes, attributeValue, varientattrVArient_id);

  return (
    <div>
      <div className="container-fluid">
        {" "}
        <div className="">
          <div className="row mt-3">
            <div className="col-sm-5 ">
              <div className="bloc-tabs tabs-responsive">
                <button
                  id="button-tabs"
                  className={
                    toggleState === 1
                      ? "report-tabs active-report-tabs"
                      : "report-tabs"
                  }
                  onClick={() => toggleTab(1)}
                >
                  Add Variants Details
                </button>

                <button
                  id="button-tabs "
                  className={
                    toggleState === 2
                      ? "report-tabs active-report-tabs"
                      : "report-tabs"
                  }
                  onClick={() => toggleTab(2)}
                >
                  Add Variants Attributes
                </button>
              </div>
            </div>
            <div className="container shadow-sm ps-4 mx-2  py-3">
              <div className="report-content-tabs ">
                {/* { add varient detailes tab content starts} */}
                <div
                  className={
                    toggleState === 1 ? "content  active-content" : "content"
                  }
                >
                  <div className="container">
                    <div>
                      <h5 className="lead_text">Add Variant Details</h5>
                    </div>
                    <div className="row">
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
                          <div className="col-4 ">
                            <p>Name</p>
                            {/* <div>
                          <InputType
                            rules={{
                              required: true,
                              message:
                                "Please Enter Name Minimum No of letter 3",
                            }}
                          />
                        </div> */}
                            <Form.Item
                              name="varientname"
                              rules={[
                                {
                                  required: true,
                                  pattern: new RegExp("^[A-Za-z0-9 ]+$"),

                                  message: "Please enter a Valid Varient Name",
                                },

                                {
                                  whitespace: true,
                                },
                                {
                                  min: 2,
                                },
                                {
                                  max: 100,
                                },
                              ]}
                              onChange={(e) => setvarname(e.target.value)}
                            >
                              <InputType />
                            </Form.Item>
                          </div>
                          <div className="col-4 ">
                            <p>Variant Code</p>
                            {/* <div>
                          <InputType
                            rules={{
                              required: true,
                              message:
                                "Please Enter Name Minimum No of letter 3",
                            }}
                          />
                        </div> */}
                            <Form.Item
                              name="varcode"
                              rules={[
                                {
                                  required: true,

                                  message: "Please enter Valid Varient Code",
                                },

                                {
                                  whitespace: true,
                                },
                              ]}
                              onChange={(e) => setvarcode(e.target.value)}
                            >
                              <InputType />
                            </Form.Item>
                          </div>
                          {/* <div className="col-4 mt-3">
                        <label>Variant Code</label>
                        <div>
                          <SelectBox>
                            <Select.Option>xcddssd</Select.Option>
                          </SelectBox>
                        </div>
                      </div> */}
                          <div className="col-4 ">
                            <p>Quantity</p>
                            <div>
                              {/* <InputType
                            rules={{
                              required: true,
                              message:
                                "Please Enter Name Minimum No of letter 3",
                            }}
                          /> */}
                              <Form.Item
                                name="varqty"
                                rules={[
                                  {
                                    required: true,

                                    message: "Please enter  Varient Quantity",
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
                                onChange={(e) => setvarquantity(e.target.value)}
                              >
                                <InputType />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-6">
                            <p>Unit</p>
                            <div>
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
                          </div>
                          <div className="col-6 mt-2">
                            <label>Tax Rate</label>
                            <div>
                              {/* <InputType
                            rules={{
                              required: true,
                              message: "",
                            }}
                          /> */}
                              <Form.Item
                                name="vartaxrate"
                                rules={[
                                  {
                                    required: true,

                                    message: "Please enter  Varient Tax Rate",
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
                                onChange={(e) => setvartaxrate(e.target.value)}
                              >
                                <InputType />
                              </Form.Item>
                            </div>
                          </div>

                          <div className="col-6">
                            <p>Minimum Price</p>
                            <div>
                              {/* <InputType
                            rules={{
                              required: true,
                              message: "Please Enter Minimum price",
                            }}
                          /> */}
                              <Form.Item
                                name="varminprice"
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
                                onChange={(e) => setvarminprice(e.target.value)}
                              >
                                <InputType />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-6">
                            <p>Maximum Price</p>
                            <div>
                              {/* <InputType
                            rules={{
                              required: true,
                              message: "Please Enter Maximum Price",
                            }}
                          /> */}
                              <Form.Item
                                name="varmaxprice"
                                rules={[
                                  {
                                    required: true,
                                    pattern: new RegExp("^[A-Za-z0-9 ]+$"),

                                    message: "Please enter Maximum Price",
                                  },

                                  {
                                    whitespace: true,
                                  },
                                  {
                                    min: 3,
                                  },
                                ]}
                                onChange={(e) => setvarmaxprice(e.target.value)}
                              >
                                <InputType />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-4 d-flex justify-content-center ">
                            <div>
                              {/* <label className="my-1">Display Picture</label>
                          <FileUpload /> */}
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
                                    console.log(
                                      "Before upload file size",
                                      file.file.size
                                    );

                                    if (
                                      file.file.size > 1000 &&
                                      file.file.size < 50000
                                    ) {
                                      setvarpic(file?.file?.originFileObj);
                                      console.log(
                                        "image grater than 1 kb and less than 50 kb"
                                      );
                                    } else {
                                      console.log("hgrtryyryr");
                                    }
                                  }}
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-8">
                            <p>Description</p>
                            <div>
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
                                onChange={(e) =>
                                  setvardescription(e.target.value)
                                }
                              >
                                <TextArea />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-12 d-flex justify-content-center mt-4">
                            {/* <label>Tax Rate</label> */}
                            <div>
                              <Button
                                // onClick={() => {
                                //   setSuccessPopup(true);
                                //   setError(true);
                                // }}
                                btnType="save"
                              >
                                save
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
                {/* {add varient details ends} */}
                {/* { Add Varient Attributes tab content starts} */}
                <div
                  className={
                    toggleState === 2 ? "content  active-content" : "content"
                  }
                >
                  <div className="container">
                    <div className="row mt-5">
                      {ClicktoOpen ? (
                        <Form
                          form={attForm}
                          onFinish={(value) => {
                            AddVarientAttribute(value);
                            console.log("hai this is test", value);
                          }}
                        >
                          <div className="row">
                            <div className="col-6">
                              <label>Attributes</label>
                              <div>
                                <Form.Item
                                  name="attribute"
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Please Select a Valid Attribute Name",
                                    },
                                    // {
                                    //   min: 2,
                                    //   message:
                                    //     "Name must be at least 2 characters",
                                    // },
                                    // {
                                    //   max: 100,
                                    //   message:
                                    //     "Name cannot be longer than 100 characters",
                                    // },
                                  ]}
                                >
                                  <SelectBox
                                    placeholder={"--Please Select--"}
                                    onChange={(e) => {
                                      console.log("selected attribute iss", e);
                                      setAttribute(e);
                                    }}
                                  >
                                    {/* <Select.Option>{attribute}</Select.Option> */}
                                    {prattributes &&
                                      prattributes.length > 0 &&
                                      prattributes?.map((item, index) => {
                                        return (
                                          <Select.Option
                                            key={item.attribute_id}
                                            value={item.attribute_id}
                                          >
                                            {item.attribute_name}
                                          </Select.Option>
                                        );
                                      })}
                                  </SelectBox>
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-6">
                              <label>Attributes value</label>
                              <div>
                                <Form.Item
                                  name="value"
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Please enter a Valid Attribute value",
                                    },
                                    // {
                                    //   min: 2,
                                    //   message:
                                    //     "Name must be at least 2 characters",
                                    // },
                                    // {
                                    //   max: 100,
                                    //   message:
                                    //     "Name cannot be longer than 100 characters",
                                    // },
                                  ]}
                                >
                                  <InputType />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-12 d-flex justify-content-center mt-5">
                              {/* <label>Tax Rate</label> */}
                              <div>
                                <Button btnType="save" type="submit">
                                  save
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Form>
                      ) : (
                        ""
                      )}

                      <div className="col-12 mt-3">
                        <TableData columns={columns} data={varientattr} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* {addd varients attributes ends} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomModel
        show={ModelForedit}
        onHide={() => setModalForEdit(false)}
        Adding_contents
      >
        <div>
          <Form
            form={editForm}
            onFinish={(value) => {
              console.log("edit value", value);
              UpdateAttribute(value);
            }}
          >
            <div className="row pt-5">
              <div className="">
                <h4>Edit Attribute</h4>
              </div>
              <div className="col-6">
                <label>Edit Attributes</label>

                <div>
                  <Form.Item
                    name="Editattribute"
                    rules={[
                      {
                        required: true,
                        message: "Please Select a Valid Attribute Name",
                      },
                      // {
                      //   min: 2,
                      //   message: "Name must be at least 2 characters",
                      // },
                      // {
                      //   max: 100,
                      //   message: "Name cannot be longer than 100 characters",
                      // },
                    ]}
                  >
                    <SelectBox
                      value={attributes}
                      placeholder={"--Please Select--"}
                      onChange={(e) => {
                        console.log("selected attribute iss", e);
                        setAttributes(e);
                      }}
                    >
                      {/* <Select.Option>{attribute}</Select.Option> */}
                      {prattributes &&
                        prattributes.length > 0 &&
                        prattributes?.map((item, index) => {
                          return (
                            <Select.Option
                              key={item.attribute_id}
                              value={item.attribute_id}
                            >
                              {item.attribute_name}
                            </Select.Option>
                          );
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>
              </div>
              <div className="col-6">
                <label>Edit Attributes value</label>
                <div>
                  <Form.Item
                    name="Editvalue"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a Valid Attribute value",
                      },
                      // {
                      //   min: 2,
                      //   message: "Name must be at least 2 characters",
                      // },
                      // {
                      //   max: 100,
                      //   message: "Name cannot be longer than 100 characters",
                      // },
                    ]}
                  >
                    <InputType
                      value={attributeValue}
                      onChange={(e) => setAttributeValues(e.target.value)}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-center mt-5">
                {/* <label>Tax Rate</label> */}
                <div>
                  <Button btnType="save" type="submit">
                    save
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </CustomModel>
      <ProductVariantsEditModal
        show={modalOpportunity}
        onHide={() => setModalOpportunity(false)}
        style="width:1250px"
        // prid={productid}
      />
      {/* {modal for success popups} */}
      <CustomModel
        size={"sm"}
        success
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
      />
      {error ? <ErrorMsg code="500" /> : ""}
    </div>
  );
}

export default Varients;
