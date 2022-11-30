import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function ProductEditModal({ show, prid, onHide }) {
  const { id } = useParams();
  console.log("ID is in productDetails", id);
  console.log("ID is in prid", prid);
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
  const [addForm] = Form.useForm();
  const [prcode, setPrcode] = useState();
  const [prcategory, setPrCategory] = useState();
  const [prbrand, setPrBrand] = useState();
  const [prunit, setPrUnit] = useState();
  const [prattributes, setPrAttributes] = useState();
  const [setProductDescription, setPrDescription] = useState();
  const [primage, setPrImage] = useState();
  //  const [newvalue, setNewvalue] = useState();
  const [img, setImg] = useState([]);
  console.log("set image", img);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  console.log("set image", img);
  const newValues = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };
  const [toggleState, setToggleState] = useState(1);
  const [State, setState] = useState("null");
  const [treeLine, setTreeLine] = useState(true);
  const [showLeafIcon, setShowLeafIcon] = useState(false);
  const [unitTable, setunitTable] = useState("");
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const [TreeData, setTreeData] = useState();

  const [categoryTree, setCategoryTree] = useState([]);
  const [allprList, setAllPrList] = useState(); //state for all products

  // Start API call for get one product
  const GetAllProductData = () => {
    // console.log("Entered");
    PublicFetch.get(`${CRM_BASE_URL_SELLING}/product/${id}`)
      .then((res) => {
        if (res?.data?.success) {
          setAllPrList(res.data.data);
          setPrName(res?.data?.data?.product_name);
          setPrcode(res?.data?.data?.product_code);
          setPrCategory(res?.data?.data?.product_category_id);
          setPrBrand(res?.data?.data?.product_brand_id);
          setPrUnit(res?.data?.data?.product_unit_id);
          setPrAttributes(res?.data?.data?.product_attributes);
          setPrDescription(res?.data?.data?.product_description);

          setPrImage(res?.data?.data?.product_pic);
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
  console.log("RRRRRRRRRRrr", prid);
  const GetAllProductDatatwo = () => {
    console.log("Entered two GetAllProductDatatwo ");
    PublicFetch.get(`${CRM_BASE_URL_SELLING}/product/${prid}`)
      .then((res) => {
        console.log(" product iss", res);
        if (res?.data?.success) {
          setAllPrList(res.data.data);
          setPrName(res?.data?.data?.product_name);
          setPrcode(res?.data?.data?.product_code);
          setPrCategory(res?.data?.data?.product_category_id);
          setPrBrand(res?.data?.data?.product_brand_id);
          setPrUnit(res?.data?.data?.product_unit_id);
          setPrAttributes(res?.data?.data?.product_attributes);
          setPrDescription(res?.data?.data?.product_description);

          setPrImage(res?.data?.data?.product_pic);
        } else {
          console.log("FAILED T LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

  useEffect(() => {
    GetAllProductDatatwo();
  }, [prid]);

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
      setAttributes(allattributes.data.data);
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
       setPrCategory(parseInt(value))
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
          GetAllProductData()
          // navigate(ROUTES.PRODUCT );
        }, time);
      }
    };
    
    const OnSubmitedit = () => {
      const formData = new FormData();
      formData.append("product_name",prname);
      formData.append("product_code",prcode);
      formData.append("product_category_id",prcategory );
      formData.append("product_brand_id", prbrand);
      formData.append("product_unit_id", prunit);
      formData.append("product_pic", primage);
      formData.append("product_attributes", prattributes);
      formData.append("product_description",setProductDescription );
  
       PublicFetch.patch(`${CRM_BASE_URL_SELLING}/product/${id}`, formData, {
        "Content-Type": "Multipart/form-Data",
      })
        .then((res) => {
          console.log("data is successfully saved", res.data.success);
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

  return (
    <>
      <CustomModel
        Adding_contents
        show={show}
        onHide={onHide}
        header="Edit Product"
        size={`xl`}
        width={"800px"}
        // footer={[
        //   <Button
        //     onClick={() => {
        //       setSuccessPopup(true);
        //       setError(true);
        //     }}
        //     btnType="save"
        //   >
        //     Save
        //   </Button>,
        //   // <Button
        //   //   onClick={() => {
        //   //     setShowProductEditModal(false);
        //   //   }}
        //   //   className="cancel_button p-2"
        //   // >
        //   //   cancel
        //   // </Button>,
        //   ,
        // ]}
        // {...props}
      >
        <div className="container">
          <div style={{ borderRadius: "8px" }} className="card border-0  ">
            <div className="container ">
              <div className="my-3 d-none">
                <h5 className="lead_text">Basic Info</h5>
              </div>
              <Form
                name="addForm"
                form={addForm}
                onFinish={(value) => {
                  console.log("values111333", value);
                  // setDescription(value.description);
                  // setBrand(value.brand);
                  // OnSubmit();
                  OnSubmitedit()
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
              >
                <div className="row ">
                  <div className="col-4">
                    <p>Name</p>
                    <div>
                      {/* <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),

                          message: "Please enter a Valid Product Name",
                        },

                        {
                          whitespace: true,
                        },
                        {
                          min: 2,
                          message: "Product Name must be atleast 2 characters",
                        },
                        {
                          max: 100,
                          message:
                            "Product Name is too big please enter valid name",
                        },
                      ]}
                      // onChange={(e) => setPrName(e.target.value)}
                    > */}
                      <input
                        type="text"
                        value={prname}
                        onChange={(e) => {
                          setPrName(e.target.value);
                        }}
                        className="input_type_style w-100"
                      />
                      {/* </Form.Item> */}
                    </div>
                  </div>
                  <div className="col-4">
                    <p>Code</p>
                    <div>
                      <input
                        type="text"
                        value={prcode}
                        onChange={(e) => {
                          setPrcode(e.target.value);
                        }}
                        className="input_type_style w-100"
                      />
                    </div>
                  </div>
                  <div className="col-4 ">
                    <p>Category</p>
                    <div>
                      {/* <Select
                        style={{
                          backgroundColor: "whitesmoke",
                          borderRadius: "5px",
                        }}
                        bordered={false}
                        className="w-100 "
                      >
                        <Select.Option>Watch</Select.Option>
                      </Select> */}
                              <TreeSelect
                        className="tree"
                        name="tree"
                        style={{ width: "100%" }}
                        // value={category}
                        // value={State}
                        value={prcategory }
                        dropdownStyle={{
                          maxHeight: 400,
                          overflow: "auto",
                        }}
                        // treeData={treeData}
                        treeData={categoryTree}
                        // treeData={treeData.map((d, i) => {
                        //   console.log("values....", d);

                        //   return {
                        //     title: d.title,
                        //     value: d.value,
                        //     match: d.match,
                        //     key: d.key,
                        //     children: d.children,
                        //   };
                        // })}
                     
                        treeDefaultExpandAll
                        onChange={onChangetree}
                        onSelect={onSelect}
                        
                      />
                    
                    </div>
                  </div>
                  <div className="col-6 mt-2">
                    <p>Brand</p>
                    <div>
                      {/* <Select
                      style={{
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",
                      }}
                      bordered={false}
                      className="w-100 "
                    >
                      <Select.Option>Watch</Select.Option>
                    </Select> */}
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
                    </div>
                  </div>
                  <div className="col-6 mt-2">
                    <p>Unit</p>
                    <div>
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
                    </div>
                  </div>
                  <div className="col-6 mt-2">
                    <p>Attributes</p>
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
                        <Checkbox.Group onChange={newValues}>
                          <div className="row p-2">
                           
                         
                          {/* <Row>
                            <Col> */}
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
                                  // <>
                                  // <label htmlFor={item?.attribute_id}>{item?.attribute_name}</label>
                                  // <Checkbox id={item?.attribute_id} />
                                  // </>
                                })}
                                 </div>
                            {/* </Col>
                          </Row> */}
                        </Checkbox.Group>
                        {/* <label style={{ color: "gray" }} className="my-2 ">
                        <Checkbox className="me-2" />
                        color
                      </label>
                      <label style={{ color: "gray" }} className="my-2">
                        <Checkbox className="me-2" />
                        warrenty
                      </label>
                      <label style={{ color: "gray" }} className="my-2">
                        <Checkbox className="me-2" />
                        Size
                      </label>
                      <label style={{ color: "gray" }} className="my-2">
                        <Checkbox className="me-2" />
                        weight
                      </label>
                      <label style={{ color: "gray" }} className="my-2">
                        <Checkbox className="me-2" />
                        weight
                      </label>
                      <label style={{ color: "gray" }} className="my-2">
                        <Checkbox className="me-2" />
                        weight
                      </label> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-6 mt-2">
                    <p>Display Picture</p>
                    <FileUpload
                      multiple
                      listType="picture"
                      accept=".png,.jpeg"
                      onPreview={handlePreview}
                      beforeUpload={false}
                      onChange={(file) => {
                        console.log("Before upload", file.file);
                        console.log("Before upload file size", file.file.size);

                        if (file.file.size > 2000 && file.file.size < 50000) {
                          setImg(file.file.originFileObj);
                          console.log(
                            "image grater than 2 kb and less than 50 kb"
                          );
                        } else {
                          console.log("Error in image upload");
                        }
                      }}
                    />
                  </div>
                  <div className="col-6 mt-2">
                    <p>Description</p>
                    <div>
                      <textarea
                        style={{ height: "100px" }}
                        value={setProductDescription}
                        onChange={(e) => {
                          setProductDescription(e.target.value);
                        }}
                        className="input_type_style w-100"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-center pt-2">
                  <Button
                    btnType="save"
                    // onClick={() => {
                    //   setSuccessPopup(true);
                    //   setError(true);
                    // }}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </div>
          </div>
          {error ? <ErrorMsg code="500" /> : ""}
        </div>
      </CustomModel>
      {/* <CustomModel
        size={`sm`}
        success
        // show={modalShow}
        // onHide={() => setModalShow(false)}
        footer={false}
      /> */}
       <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
    </>
  );
}
