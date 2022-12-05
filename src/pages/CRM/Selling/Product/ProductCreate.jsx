import { Select } from "antd";
import { Checkbox, Col, Row } from "antd";
import React, { useState, useEffect } from "react";
import Button from "../../../../components/button/button";
import CustomModel from "../../../../components/custom_modal/custom_model";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import FileUpload from "../../../../components/fileupload/fileUploader";
import { useNavigate } from "react-router-dom";
import { Form } from "antd";
import { TreeSelect } from "antd";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import InputType from "../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../components/Select Box/SelectBox";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
import { ROUTES } from "../../../../routes";
import "./product.scss"
function ProductCreate() {
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [addForm] = Form.useForm();
  const navigate = useNavigate();
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

  const [brands, setBrands] = useState();
  const [name, setName] = useState();
  const [code, setCode] = useState(false);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState();
  const [unit, setUnit] = useState("");
  const [attributes, setAttributes] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState(null);
  const [img, setImg] = useState([]);
  console.log("set image", img);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  console.log("set image", img);
  const [allunit, setAllunit] = useState();
  const [brandid,setBrandid]= useState()
  const [productattribute,setProductAttribute ]= useState([])
  
  const newValues = (checkedValues) => {
    console.log("checked = ", checkedValues);
    setProductAttribute(checkedValues)
  };

  const treeData = [
    {
      title: "Parent Node-1",
      value: "Parent-1",

      children: [
        {
          title: "01 Node1",
          value: "0-0-1",

          children: [
            {
              title: "Child Node1.1",
              value: "0-0-1-1",
            },
          ],
        },
        {
          title: "Child Node2",
          value: "0-0-2",
          key: "0-0-2",
        },
      ],
    },
    {
      title: " Parent Node2",
      value: "0-1",
      key: "0-1",
    },
  ];

  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  const valueMap = {};
  function loops(list, parent) {
    return (list || []).map(({ children, value }) => {
      const node = (valueMap[value] = {
        parent,
        value,
      });
      node.children = loops(children, node);
      return node;
    });
  }

  // loops(treeData);

  function getPath(value) {
    const path = [];
    let current = valueMap[value];
    while (current) {
      path.unshift(current.value);
      current = current.parent;
    }
    return path;
  }
  const onChangetree = (value) => {
   
    console.log("Change", value);
    setState(parseInt(value));
  };

 

  const onSelect = (value) => {
    console.log("Select the category :", value);
  };

  const getallbrand = async () => {
    try {
      const allbrands = await PublicFetch.get(`${CRM_BASE_URL_SELLING}/brand`);
      console.log("all brands are", allbrands.data.data);
    
      setBrands(allbrands.data.data);
    } catch (err) {
      console.log("error while getting the brands: ", err);
    }
  };

  useEffect(() => {
    getallbrand();
    getallunits();
  }, []);

  //API for getall units
  const getallunits = async () => {
    try {
      const allunits = await PublicFetch.get(`${CRM_BASE_URL_SELLING}/unit`);
     
      setAllunit(allunits?.data?.data);
     
    } catch (err) {
      console.log("error to getting all units", err);
    }
  };

  

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


//category displays in tree structure
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


  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.PRODUCT );
      }, time);
    }
  };

  //API for get all category
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
    getCategorydata()
  }, []);


  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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

  const OnSubmit = () => {
    const formData = new FormData();
    formData.append("product_name",name);
    formData.append("product_code",code);
    formData.append("product_category_id",State );
    formData.append("product_brand_id", brand);
    formData.append("product_unit_id", unit);
    formData.append("product_pic", img);
    formData.append("product_attributes", productattribute);
    formData.append("product_description", description);

     PublicFetch.post(`${CRM_BASE_URL_SELLING}/product`, formData, {
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

  console.log("data in catt", State);

  return (
    <div>
      <div className="container-fluid mt-3">
        <div>
          <h4 className="lead_text">Products</h4>
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
              form={addForm}
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
                  <p>Name</p>
                  <div>
                    {/* <input type="text" className="input_type_style w-100" /> */}
                    <Form.Item
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
                      
                    >
                      <InputType  onChange={(e) => setName(e.target.value)}/>
                    </Form.Item>
                  </div>
                </div>
                <div className="col-4">
                  <p>Code</p>
                  <div>
                    {/* <input type={"text"} className="input_type_style w-100" /> */}

                    <Form.Item
                      name="code"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),

                          message: "Please enter a Valid Product Code",
                        },

                        {
                          whitespace: true,
                        },

                        {
                          min: 2,
                          message: "Product Code must be atleast 2 characters",
                        },
                        {
                          max: 20,
                          message:
                            "Product Code is too big please enter valid name",
                        },
                      ]}
                      onChange={(e) => setCode(e.target.value)}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-4 ">
                  <p>Category</p>
                  <div>
                   
                    <Form.Item
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
                </div>
                <div className="col-6 mt-2">
                  <p>Brand</p>
                  <div>
                    
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
                        onChange={(e) =>{ 
                          console.log("select the brandss",e )
                          setBrand(parseInt(e))}}
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
                </div>
                <div className="col-6 mt-2">
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
                         console.log("selected unit iss",e ) 
                        setUnit(parseInt(e))}}
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
                <div className="col-6 mt-2 px-4">
                  <p>Attributes</p>

                  {/* <Form.Item
                    name="attribute"
                    rules={[
                      {
                        required: true,
                    

                        message: "Please Select Attributes ",
                      },
                    ]}> */}

                  {/*                    
                    <Checkbox.Group
                      style={{
                        width: "100%",
                      }}
                      onChange={(e) => setAttributes(parseInt(e))}
                    >
                     
                             
                        
                      <Row>
                        <Col span={8}>
                        {attributes &&
                            attributes.length > 0 &&
                            attributes.map((item, index) => {
                              return(
                                <Checkbox value={item?.attribute_id}>{item?.attribute_name}</Checkbox>
                              )
                          // <>
                          // <label htmlFor={item?.attribute_id}>{item?.attribute_name}</label>
                          // <Checkbox id={item?.attribute_id} />
                          // </>    
                            })}
                        </Col>
                      </Row>
                    </Checkbox.Group> */}
                  <Checkbox.Group
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

                  <div
                  
                  >
                    <div
                    
                    ></div>
                  </div>
                
                </div>

                <div className="col-6 mt-2">
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
                      accept=".png,.jpeg,.jpg"
                      onPreview={handlePreview}
                      beforeUpload={false}
                      onChange={(file) => {
                        console.log("Before upload", file.file);
                        console.log("Before upload file size", file.file.size);

                        if (file.file.size > 2000 && file.file.size < 50000) {
                          setImg(file.file.originFileObj);
                          console.log("selet imggg",file.file.originFileObj )
                          console.log(
                            "image grater than 2 kb and less than 50 kb"
                          );
                        } else {
                          console.log("Error in image upload");
                        }
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-6 mt-2">
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
                      onChange={(e) => setDescription(e.target.value)}
                    >
                      <TextArea />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-center pt-5">
                  <Button
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

export default ProductCreate;
