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
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";

export default function ProductEditModal({ show, prid, onHide }) {
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
  const [prcode, setPrcode] = useState();
  const [prcategory, setPrCategory] = useState();
  const [prbrand, setPrBrand] = useState();
  const [prunit, setPrUnit] = useState();
  const [prattributes, setPrAttributes] = useState();
  const [prDescription, setPrDescription] = useState();
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
          console.log("gethbhs",res?.data?.success)
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
        if (res?.data?.success) {
          setAllPrList(res.data.data);
          console.log(" product iss", res?.data?.data?.product_name);
          setPrName(res?.data?.data?.product_name);
          setPrcode(res?.data?.data?.product_code);
          setPrCategory(res?.data?.data?.product_category_id);
          setPrBrand(res?.data?.data?.product_brand_id);
          setPrUnit(res?.data?.data?.product_unit_id);
          setPrAttributes(res?.data?.data?.product_attributes);
          setPrDescription(res?.data?.data?.product_description);
          setPrImage(res?.data?.data?.product_pic);
          editForm.setFieldsValue({
            productname: res?.data?.data?.product_name,
            productcode: res?.data?.data?.product_code,
            productcategory:res?.data?.data?.product_category_id,
            productbrand:res?.data?.data?.product_brand_id,
            productunit:res?.data?.data?.product_unit_id,
            productattributes:res?.data?.data?.product_attributes,
            productdescription:res?.data?.data?.product_description,
            productimg:res?.data?.data?.product_pic
            
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
      formData.append("product_description",prDescription );
  
       PublicFetch.patch(`${CRM_BASE_URL_SELLING}/product/${prid}`, formData, {
        "Content-Type": "Multipart/form-Data",
      })
        .then((res) => {
          console.log("data is successfully saved", res.data.success);
          if (res.data.data) {
            setSuccessPopup(true);
            editForm.resetFields();
            close_modal(successPopup, 1000);
            onHide()
          
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
                name="editForm"
                form={editForm}
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
                    <label>Name</label>
                    <div>
                      <Form.Item
                      name="productname"
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
                    >
                    
                    <InputType value={prname}  onChange={(e) => {
                          setPrName(e.target.value);
                        }}/>

                      {/* <input
                        type="text"
                        value={prname}
                        onChange={(e) => {
                          setPrName(e.target.value);
                        }}
                        className="input_type_style w-100"
                      /> */}
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-4">
                    <label>Code</label>
                    <div>
                    <Form.Item
                      name="productcode"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid Product code",
                        },

                        {
                          whitespace: true,
                        },
                        {
                          min: 2,
                          message: "Product Name must be atleast 2 characters",
                        },
                        {
                          max: 20,
                          message:
                            "Product Name is too big please enter valid code",
                        },
                      ]}
                   
                    
                    >
                      <InputType  value={prcode}
                        onChange={(e) => {
                          setPrcode(e.target.value);
                        }}/>
                      </Form.Item>

                     
                    </div>
                  </div>
                  <div className="col-4 ">
                    <label className="py-1">Category</label>
                    <div>

                    <Form.Item
                      name="productcategory"
                      // rules={[
                      //   {
                      //     required: true,
                      //     // message: "Please enter a Valid Product category",
                      //   },

                      //   {
                      //     whitespace: true,
                      //   },
                      // ]}
                    >
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
                     
                        treeDefaultExpandAll
                        onChange={onChangetree}
                        onSelect={onSelect}
                        
                      />
                      </Form.Item>
                      
                           
                    
                    </div>
                  </div>
                  <div className="col-6 mt-2">
                    <label>Brand</label>
                    <div>
                    <Form.Item
                      name="productbrand"
                      // rules={[
                      //   {
                      //     required: true,
                      //     // message: "Please enter a Valid Product category",
                      //   },

                      //   // {
                      //   //   whitespace: true,
                      //   // },
                      // ]}
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
                   
                    </div>
                  </div>
                  <div className="col-6 mt-2">
                    <label>Unit</label>

                    <div>
                    <Form.Item
                      name="productunit"
                      // rules={[
                      //   {
                      //     required: true,
                      //     // message: "Please enter a Valid Product category",
                      //   },

                      //   {
                      //     whitespace: true,
                      //   },
                      // ]}
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
                  </div>
                  <div className="col-6 mt-2">
                    <label>Attributes</label>
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
                          message: "Please enter a Valid Product category",
                        },

                        {
                          whitespace: true,
                        },
                      ]}
                    >
                     
                        <Checkbox.Group onChange={newValues}>
                          <div className="row p-2">
                           
                         
                              {attributes &&
                                attributes.length > 0 &&
                                attributes.map((item, index) => {
                                  return (
                                    <div className="col-xl-6 col-lg-6 col-12 py-1">
                                     <Checkbox value={item?.attribute_id}  >
                                      {item?.attribute_name}
                                    </Checkbox>
                                    </div>
                                    
                                  );
                                  
                                })}
                                 </div>
                            
                        </Checkbox.Group>
                        </Form.Item>
                       
                      </div>
                    </div>

                  </div>
                  <div className="col-6 mt-2">
                    <p>Display Picture</p>

                    <Form.Item
                      name="productimg"
                    >
                     
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
                     </Form.Item>
                     <img
                        src={`${process.env.REACT_APP_BASE_URL}/${primage}`}
                        height="40px"
                        width={"40px"}
                      />
                  </div>
                  <div className="col-6 mt-2">
                    <p>Description</p>
                    <div>
                    <Form.Item
                      name="productdescription"
                    >
                      <TextArea   value={prDescription}
                        onChange={(e) => {
                          setPrDescription(e.target.value);
                        }}/>

                      </Form.Item>
                      {/* <textarea
                        style={{ height: "100px" }}
                        value={prDescription}
                        onChange={(e) => {
                          setPrDescription(e.target.value);
                        }}
                        className="input_type_style w-100"
                      /> */}
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
