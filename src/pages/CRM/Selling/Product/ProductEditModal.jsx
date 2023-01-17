import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { Checkbox, Col, Row } from "antd";
import { Input, Select } from "antd";
import { FaEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete, MdPageview } from "react-icons/md";
import { Link } from "react-router-dom";
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import { Form } from "antd";
import Button from "../../../../components/button/button";
import { TreeSelect } from "antd";

import ErrorMsg from "../../../../components/error/ErrorMessage";
import FileUpload from "../../../../components/fileupload/fileUploader";
import logo from "../../../../components/img/logo192.png";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import MyPagination from "../../../../components/Pagination/MyPagination";
import TableData from "../../../../components/table/table_data";
import { ROUTES } from "../../../../routes";
import Item from "antd/lib/list/Item";
import SelectBox from "../../../../components/Select Box/SelectBox";
import CustomModel from "../../../../components/custom_modal/custom_model";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import { set } from "react-hook-form";

export default function ProductEditModal({ show, prid, onHide, fun_call }) {
  const { id } = useParams();
  console.log("ID is in productDetails", id);
  console.log("ID is in  propss  prid", prid);
  const [form] = Form.useForm();

  //  const [showProductEditModal, setShowProductEditModal] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [showProductEditModal, setShowProductEditModal] = useState(false);
  const [prname, setPrName] = useState();
  const [newvalue, setNewvalue] = useState();
  const [brand, setBrand] = useState();
  const [unit, setUnit] = useState("");
  const [attributes, setAttributes] = useState();
  const [allunit, setAllunit] = useState();
  const [brands, setBrands] = useState();
  const [editForm] = Form.useForm();
  const [prcode, setPrcode] = useState("");
  const [prcategory, setPrCategory] = useState();
  const [prbrand, setPrBrand] = useState();
  const [prunit, setPrUnit] = useState();

  const [prattributes, setPrAttributes] = useState();
  const [prDescription, setPrDescription] = useState("");
  const [primage, setPrImage] = useState();
  const [imageSize, setImageSize] = useState(false);
  //  const [newvalue, setNewvalue] = useState();
  const [img, setImg] = useState([]);
  console.log("set image", img);

  const [prattribtearray, setprattribtearray] = useState([]);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  console.log("Attibutes : ", attributes);
  console.log("set image", img);
  // console.log("State : ", typeof prattributes)
  const newValues = (checkedValues) => {
    console.log("checked iss= ", checkedValues);
    setprattribtearray(checkedValues.target.value);
  };

  // const onChange = (e) => {
  //   console.log('checked = ', e.target.checked);
  //   setChecked(e.target.checked);
  // };

  const [toggleState, setToggleState] = useState(1);
  const [State, setState] = useState("null");
  const [treeLine, setTreeLine] = useState(true);
  const [showLeafIcon, setShowLeafIcon] = useState(false);
  const [prev, setprev] = useState();
  const [unitTable, setunitTable] = useState("");
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const [TreeData, setTreeData] = useState();

  const [categoryTree, setCategoryTree] = useState([]);
  const [allprList, setAllPrList] = useState(); //state for all products

  // getting one edit product data

  // Start API call for get one product
  const GetAllProductData = () => {
    console.log("Entered pro");
    PublicFetch.get(`${CRM_BASE_URL_SELLING}/product/${prid}`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("Entered Result came", res?.data);
          setAllPrList(res.data.data);
          setPrName(res?.data?.data?.product_name);
          setPrcode(res?.data?.data?.product_code);
          setPrCategory(res?.data?.data?.product_category_id);
          setPrBrand(res?.data?.data?.product_brand_id);
          setPrUnit(res?.data?.data?.product_unit_id);

          console.log("prattributess aree", res?.data?.data);
          setPrAttributes(res?.data?.data?.crm_v1_attributes);
          // setPrAttributes(attributes)

          setprev(res?.data?.data?.product_attributes);
          setPrDescription(res?.data?.data?.product_description);
          setPrImage(res?.data?.data?.product_pic);
           editForm.setFieldsValue({
             productname: res?.data?.data?.product_name,
             productcode: res?.data?.data?.product_code,
             productcategory: res?.data?.data?.product_category_id,
             productbrand: res?.data?.data?.product_brand_id,
             productunit: res?.data?.data?.product_unit_id,

             productattributes: res?.data?.data?.product_attributes,

             productdescription: res?.data?.data?.product_description,
             productimg: res?.data?.data?.product_pic,
           });
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
  }, [id, prid, show]);

  console.log("RRRRRRRRRRrr", prid);

  // { function to get each product data}
  const GetAllProductDatatwo = () => {
    console.log("Entered two GetAllProductDatatwo ");
    PublicFetch.get(`${CRM_BASE_URL_SELLING}/product/${prid}`)
      .then((res) => {
        if (res?.data?.success) {
          setAllPrList(res.data.data);
          console.log(" product iss", res?.data?.data);
          setPrName(res?.data?.data?.product_name);
          setPrcode(res?.data?.data?.product_code);
          setPrCategory(res?.data?.data?.product_category_id);
          setPrBrand(res?.data?.data?.product_brand_id);
          setPrUnit(res?.data?.data?.product_unit_id);

          console.log(
            "pro attributess aree",
            res?.data?.data?.product_attributes
          );
          let prarray = [];
          res?.data?.data?.crm_v1_attributes.forEach((item, index) => {
            prarray.push({
              label: item?.attribute_name,
              value: item?.attribute_id,
            });
            console.log("atrribute value:...", prarray);
          });
          setprattribtearray(prarray);

          //         let temparray = []
          //  let temp2 = res?.data?.data?.product_attributes.split("");
          //         let Arr = temp2.filter((item, index) => {
          //           let data = parseInt(item);

          //           console.log("data", data);
          //           if (!isNaN(data)) {
          //             console.log("datataa", data);
          //             temparray.push(data)
          //             console.log("jncjdcnjd",temparray)
          //             setprattribtearray(temparray)
          //             return data;

          //           }

          //         });

          // setPrAttributes([attributes])
          setPrAttributes(res?.data?.data?.crm_v1_attributes);
          setprev(res?.data?.data?.product_attributes);

          setPrDescription(res?.data?.data?.product_description);
          setPrImage(res?.data?.data?.product_pic);
          editForm.setFieldsValue({
            productname: res?.data?.data?.product_name,
            productcode: res?.data?.data?.product_code,
            productcategory: res?.data?.data?.product_category_id,
            productbrand: res?.data?.data?.product_brand_id,
            productunit: res?.data?.data?.product_unit_id,

            productattributes: res?.data?.data?.product_attributes,

            productdescription: res?.data?.data?.product_description,
            productimg: res?.data?.data?.product_pic,
          });
        } else {
          console.log("FAILED T LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

  console.log("attributee aryy", attributes);

  // useEffect(() => {
  //   GetAllProductDatatwo();
  // }, [prid]);

  console.log("previous", prev);
  console.log("prevvaluess are", prattribtearray);

  const getallbrand = async () => {
    try {
      const allbrands = await PublicFetch.get(`${CRM_BASE_URL_SELLING}/brand`);
      console.log("all brands are", allbrands.data.data);
      setBrands(allbrands.data.data);
      // setbrandName()
    } catch (err) {
      console.log("error while getting the brands: ", err);
    }
  };

  useEffect(() => {
    getallbrand();
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

  const getallattributes = async () => {
    try {
      const allattributes = await PublicFetch.get(
        `${CRM_BASE_URL_SELLING}/attribute`
      );
      console.log("getting all attributes", allattributes.data.data);
      // setAttributes(allattributes.data.data);
      let tmp = [];
      allattributes.data.data.forEach((item, index) => {
        tmp.push({
          label: item?.attribute_name,
          value: item?.attribute_id,
        });
      });
      setAttributes(tmp);
    } catch (err) {
      console.log("error to fetching  attributes", err);
    }
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

  useEffect(() => {
    getallattributes();
    getCategorydata();
  }, []);

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
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onChangetree = (value) => {
    // console.log("Change", getPath(value));
    // setState({ value });
    console.log("Change", value);
    // setState(parseInt(value));
    setPrCategory(parseInt(value));
  };

  // const onSelect = (value) => {
  //   console.log("Select:", getPath(value));
  // };

  const onSelect = (value) => {
    console.log("Select the category :", value);
  };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        GetAllProductData();
        // navigate(ROUTES.PRODUCT );
      }, time);
    }
  };

  const OnSubmitedit = () => {
    const formData = new FormData();
    formData.append("product_name", prname.trim(" "));
    formData.append("product_code", prcode);
    formData.append("product_category_id", prcategory);
    formData.append("product_brand_id", prbrand);
    formData.append("product_unit_id", prunit);
    if (img) {
      formData.append("product_pic", img);
    }
    formData.append("product_attributes", prattribtearray);
    formData.append("product_description", prDescription);

    if (prid) {
      PublicFetch.patch(
        `${CRM_BASE_URL_SELLING}/product/${parseInt(prid)}`,
        formData,
        {
          "Content-Type": "Multipart/form-Data",
        }
      )
        .then((res) => {
          console.log("data is successfully saved", res.data.success);
          if (res.data.data) {
            GetAllProductData();
            // GetAllProductDatatwo();
            setSuccessPopup(true);
            editForm.resetFields();
            close_modal(successPopup, 1200);
            onHide();
            fun_call();
          }
        })
        .catch((err) => {
          console.log("error", err);
          setError(true);
        });
    } else if (id) {
      PublicFetch.patch(
        `${CRM_BASE_URL_SELLING}/product/${parseInt(id)}`,
        formData,
        {
          "Content-Type": "Multipart/form-Data",
        }
      )
        .then((res) => {
          console.log("data is successfully saved", res.data.success);
          if (res.data.data) {
            GetAllProductData();
            // GetAllProductDatatwo();
            setSuccessPopup(true);
            editForm.resetFields();
            close_modal(successPopup, 1200);
            onHide();
            fun_call();
          }
        })
        .catch((err) => {
          console.log("error", err);
          setError(true);
        });
    }
  };

  const isAttributeChecked = (id) => {
    console.log("Checking : ", prattributes);
    console.log("Checking Id : ", id);
    let isChecked = false;
    if (
      prattributes &&
      Array.isArray(prattributes) &&
      prattributes.length > 0
    ) {
      isChecked = prattributes.some((item, index) => {
        console.log("Checking", item);
        return item.attribute_id === id;
      });
    }
    return isChecked;
  };

  const handleAttributeChange = (checked, value) => {
    let tmp = prattributes;
    if (checked) {
      if (tmp) {
        tmp.push({
          attribute_id: value,
        });
      } else {
        tmp = [{ attribute_id: value }];
      }
      setPrAttributes([...tmp]);
    } else {
      tmp = prattributes.filter((item, index) => {
        return item?.attribute_id !== value;
      });
      setPrAttributes([...tmp]);
    }
  };

  return (
    <>
      <CustomModel
        bodyStyle={{ height: 620, overflowY: "auto" }}
        Adding_contents
        show={show}
        onHide={onHide}
        header="Edit Product"
        size={`xl`}
        width={"800px"}
      >
        <div className="container-fluid">
          <div style={{ borderRadius: "8px" }} className="card border-0 ">
            <div className="container ">
              <Form
                name="editForm"
                form={editForm}
                onFinish={(value) => {
                  console.log("values111333", value);
                  // setDescription(value.description);
                  // setBrand(value.brand);
                  // OnSubmit();
                  OnSubmitedit();
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
              >
                <div className="row mt-2">
                  <div className="col-4">
                    <label>Name</label>
                    <Form.Item
                      name="productname"
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
                        value={prname}
                        onChange={(e) => {
                          setPrName(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-4">
                    <label>Code</label>
                    <Form.Item
                      name="productcode"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid Product code",
                        },
                        {
                          min: 2,
                          message: "Product Name must be at least 2 characters",
                        },
                        {
                          max: 20,
                          message:
                            "Product Code cannot be longer than 20 characters",
                        },
                      ]}
                    >
                      <InputType
                        value={prcode}
                        onChange={(e) => {
                          setPrcode(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-4">
                    <label>Category</label>
                    <div>
                      <Form.Item
                        className="mt-2"
                        name="productcategory"
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
                          // value={category}
                          value={prcategory}
                          dropdownStyle={{
                            maxHeight: 400,
                            overflow: "auto",
                          }}
                          // treeData={treeData}
                          treeData={categoryTree}
                          treeDefaultExpandAll
                          onChange={onChangetree}
                          onSelect={onSelect}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-6">
                    <label>Brand</label>
                    <Form.Item
                      name="productbrand"
                      rules={[
                        {
                          required: true,
                          message: "Please Select a Brand",
                        },
                      ]}
                    >
                      <SelectBox
                        value={prbrand}
                        onChange={(e) => setPrBrand(parseInt(e))}
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
                  <div className="col-6">
                    <label>Unit</label>
                    <Form.Item
                      name="productunit"
                      rules={[
                        {
                          required: true,
                          message: "Please Select a unit",
                        },
                      ]}
                    >
                      <SelectBox
                        value={prunit}
                        onChange={(e) => setPrUnit(parseInt(e))}
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
                  <div className="col-6">
                    <label className="mb-2">Attributes</label>
                    <div
                      style={{
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "whitesmoke",
                          borderRadius: "5px",
                          height: "200px",
                          overflow: "scroll",
                        }}
                        // className="card border-0 px-4 py-2"
                      >
                        <Form.Item
                          name="productattributes"
                          rules={[
                            {
                              required: true,
                              message: "Please Select Attributes",
                            },
                          ]}
                        >
                          {/* <Checkbox.Group className="px-3"
                          checked={prattribtearray}
                          // value={prattributes}
                          onChange={newValues}>
                            <div className="row p-2">
                              {attributes &&
                                attributes.length > 0 &&
                                attributes.map((item, index) => {
                                  return (
                                    <div className="col-xl-6 col-lg-6 col-12 py-1">
                                      <Checkbox value={item?.attribute_id}>
                                        {item?.attribute_name}
                                      </Checkbox>
                                    </div>
                                  );
                                })}
                            </div>
                          </Checkbox.Group> */}
                          {/* <Checkbox.Group
                            className="px-3"
                            options={attributes}
                            // defaultValue={prattributes}
                            // defaultValue={[1]}
                            // onChange={newValues}
                          ></Checkbox.Group> */}
                          <div className="d-flex flex-wrap gap-2">
                            {attributes &&
                              attributes?.length > 0 &&
                              attributes.map((item, index) => {
                                return (
                                  <div>
                                    <label htmlFor={item.value}>
                                      {item.label}
                                    </label>{" "}
                                    <Checkbox
                                      checked={isAttributeChecked(item?.value)}
                                      id={item.value}
                                      value={item.value}
                                      onChange={(e) =>
                                        handleAttributeChange(
                                          e.target.checked,
                                          item?.value
                                        )
                                      }
                                    />{" "}
                                  </div>
                                );
                              })}
                          </div>
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <label className="mb-2">Display Picture</label>

                    <Form.Item name="productimg">
                      <FileUpload
                        multiple
                        listType="picture"
                        accept=".png,.jpeg"
                        onPreview={handlePreview}
                        beforeUpload={false}
                        onChange={(file) => {
                          console.log("Before upload", file.file);
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
                          } else {
                            setImageSize(true);
                            console.log(
                              "Error in image upload, upload image size between 1 kb and  500 kb"
                            );
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
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/${primage}`}
                      height="40px"
                      width={"40px"}
                    />
                  </div>
                  <div className="col-6">
                    <label>Description</label>
                    <Form.Item
                      name="productdescription"
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
                        value={prDescription}
                        onChange={(e) => {
                          setPrDescription(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <Button btnType="save">Save</Button>
                </div>
              </Form>
            </div>
          </div>
          {error ? <ErrorMsg code="500" /> : ""}
        </div>
      </CustomModel>

      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
    </>
  );
}
