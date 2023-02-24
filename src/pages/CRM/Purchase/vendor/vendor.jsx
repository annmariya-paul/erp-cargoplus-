import React, { useEffect, useState } from "react";
import CustomModel from "../../../../components/custom_modal/custom_model";
import MyPagination from "../../../../components/Pagination/MyPagination";
import TableData from "../../../../components/table/table_data";
import { MdPageview } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Form,Input,Select,DatePicker} from "antd";
import { FaEdit,FaTrash } from "react-icons/fa";
import InputType from "../../../../components/Input Type textbox/InputType";
import Button from "../../../../components/button/button";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import SelectBox from "../../../../components/Select Box/SelectBox";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL_PURCHASING, GENERAL_SETTING_BASE_URL } from "../../../../api/bootapi";

function Vendor(){
  const [addForm] = Form.useForm();
  const [error, setError] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [modalvendor, setModalvendor] = useState(false);
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);
  const [showViewModal, setShowViewModal] = useState(false);

  const [allvendor,setAllvendor]= useState("")
  const[allCountries,setAllCountries]= useState("")
  const [vendorEditPopup, setVendorEditPopup] = useState(false);
  const [editForm] = Form.useForm();
  const [countryis, setCountryis] = useState();
  const [vendortypes,setvendortypes] = useState("")

  const[vendorname,setvendorname] = useState("")
  const[vendorOrganisation,setvendorOrganisation] = useState("")
  const[vendoremail,setvendoremail] = useState("")
  const[vendorcontact,setvendorcontact] = useState("")
  const[vendorcity,setvendorcity] = useState("")
  const[vendoraddress,setvendoraddress] = useState("")
  const[vendortyp,setvendortyp] = useState("")
  const [vendortaxno,setvendortaxno] = useState("")
  const [vendordescription,setvendordescription] = useState("")

  const[editvendorname,seteditvendorname] = useState("")
  const[editvendorOrganisation,seteditvendorOrganisation] = useState("")
  const[editvendoremail,seteditvendoremail] = useState("")
  const[editvendorcontact,seteditvendorcontact] = useState("")
  const[editvendorcity,seteditvendorcity] = useState("")
  const[editvendoraddress,seteditvendoraddress] = useState("")
  const[editvendortyp,seteditvendortyp] = useState("")
  const[editvendortaxno,seteditvendortaxno] = useState("")
  const[editvendordescription,seteditvendordescription] = useState("")
  const[editcountry,seteditcountry]= useState("")
  const[editvendorid,seteditvendorid]=useState("")



  const [viewvendor, setViewvendor] = useState({
    id: "",
    vendor_name: "",
    vendor_organisation: "",
    vendor_type: "",
    vendor_email: "",
    vendor_contact: "",
    vendor_country: "",
    vendor_city: "",
    vendor_taxno: "",
    vendor_address: "",
    vendor_description: "",
  });

  const handleViewClick = (item) => {
    console.log("view a vendor", item);
    setViewvendor({
      ...viewvendor,
      id: item.vender_id,
      vendor_name: item.vendor_name,
      vendor_email:item.vendor_email ,
      vendor_contact:item.vendor_contact,
      vendor_city:item.vendor_city,
      vendor_country:item.vendor_country,
      vendor_organisation:item.vendor_org_type,
      vendor_type:item.vendor_type_id,
      vendor_description:item.vendor_description,
      vendor_taxno:item.vender_taxno,
      vendor_address:item.vendor_address
    });
    setShowViewModal(true);
  };



  const handleChange = (e) => {
    setCountryis(e);
  };



  const getCountry = () => {
    PublicFetch.get(`${GENERAL_SETTING_BASE_URL}/country`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setAllCountries(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };


  const handleEditclick = (e) => {
    console.log("editing id iss", e);
    seteditvendorid(e.vender_id)
    seteditvendorname(e.vendor_name)
    seteditvendoremail(e.vendor_email)
    seteditvendorcity(e.vendor_city)
    seteditvendoraddress(e.vendor_address)
    seteditvendorcontact(e.vendor_contact)
    seteditvendordescription(e.vendor_description)
    seteditvendortaxno(e.vender_taxno)

    seteditvendorOrganisation(e.vendor_Organisation)
    seteditcountry(e.vendor_country_id)
    seteditvendortyp(e.vendor_type_id)
    
    editForm.setFieldsValue({
      vendor_name:e.vendor_name,
      vendor_Organisation:e.vendor_Organisation,
      vendor_email:e.vendor_email,
      vendor_contact:e.vendor_contact,
      vendor_city:e.vendor_city,
      vendor_taxno:e.vender_taxno,
      vendor_address:e.vendor_address,
      vendor_description:e.vendor_description,

      vendor_country:e.vendor_country_id,
      vendor_type:e.vendor_type_id,
      
      // vendortypename: e.vendor_type_name,
      // vendortypedesc: e.vendor_type_desc,
    });
    setVendorEditPopup(true);
  };


  const handleupdate = async () => {
    try {
      const updated = await PublicFetch.patch(
        `${CRM_BASE_URL_PURCHASING}/vendors/${editvendorid}`,
        {
      name:editvendorname,
      org_type:editvendorOrganisation,
      vendor_type:editvendortyp,
      email:editvendoremail,
      contact:editvendorcontact,
      country_id:editcountry,
      city:editvendorcity,
      address:editvendoraddress,
      description:editvendordescription,
      tax_no:editvendortaxno
        }
      );
      console.log("successfully updated ", updated);
      if (updated.data.success) {
        setSuccessPopup(true)
        setVendorEditPopup(false);
        getallvendors();
        close_modal(successPopup,1000 );
      } 
    } catch (err) {
      console.log("error to update vendor");
    }
  };


  const getallvendortype = async () => {
    try {
      const allvendortypes = await PublicFetch.get(
        `${CRM_BASE_URL_PURCHASING}/vendorTypes`
      );
      console.log("getting all vendorTypes", allvendortypes);
      setvendortypes(allvendortypes.data.data);
    } catch (err) {
      console.log("error to fetching  vendortypes", err);
    }
  };

  const getData = (current, pageSize) => {
    return allvendor?.slice((current - 1) * pageSize, current * pageSize);
  };

  const getallvendors = async () => {
    try {
      const allvendor = await PublicFetch.get(
        `${CRM_BASE_URL_PURCHASING}/vendors`
      );
      console.log("getting all vendorss", allvendor.data.data);
      // setAllvendor(allvendor.data.data)
      let arry=[]
      allvendor.data.data.map((i,indx)=>{
        arry.push({
          vendor_name:i.vendor_name,
          vendor_email:i.vendor_email,
          vendor_org_type:i.vendor_org_type,
          vendor_country:i.countries.country_name,
          vendor_country_id:i.vendor_country_id,
          vendor_contact:i.vendor_contact,
          vendor_city:i.vendor_city,
          vendor_address:i.vendor_address,
          vendor_description:i.vendor_desc,
          vendor_type_id:i.vendor_type_id,
          vender_id:i.vendor_id,
          vender_taxno:i.vendor_tax_no,
        

        })
       
      })
      console.log("arryss",arry)
    setAllvendor(arry)

      // setvendortypes(allvendortypes.data.data);
    } catch (err) {
      console.log("error to fetching  vendor", err);
    }
  };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        // navigate(ROUTES.ATTRIBUTES);
      }, time);
    }
  };

  const createvendor =async()=>{
    try{
    const addvendor = await PublicFetch.post(
    `${CRM_BASE_URL_PURCHASING}/vendors`,{
      name:vendorname,
      org_type:vendorOrganisation,
      vendor_type:vendortyp,
      email:vendoremail,
      contact:vendorcontact,
      country_id:countryis,
      city:vendorcity,
      address:vendoraddress,
      description:vendordescription,
      tax_no:vendortaxno

     })
    console.log("vendors added successfully",addvendor)
    if(addvendor.data.success){
      setSuccessPopup(true);
     getallvendors()
      addForm.resetFields();
      setModalvendor(false);
      close_modal(successPopup,1000 );
    }
    }
    catch(err){ 
    console.log("err to add the vendors",err)
    }
  
    }




  useEffect(() => {
    getallvendortype()
    getallvendors()
    getCountry()
  }, []);


  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "30%",
      render: (data, index) => {
        console.log("index is :",index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
           
              <div
                className="editIcon m-0"
                onClick={() => {handleEditclick(index) } }
              >
                <FaEdit />
              </div>
              <div
              className="viewIcon m-0"
              onClick={() => handleViewClick(index) }
            >
              <MdPageview   style={{marginLeft:15,marginRight:15}}/>
            </div>
            <div className="deleteIcon m-0">
              <FaTrash />
            </div>
            
          </div>
        );
      },
      align: "center",
    },
    {
      title: "VENDOR ",
      dataIndex: "vendor_name",
      key: "freight_type_name",
    //   filteredValue: [searchedText],
    //   onFilter: (value, record) => {
    //     return String(record.freight_type_name  || nameSearch)
    //       .toLowerCase()
    //       .includes(value.toLowerCase());
    //   },
      align: "center",
    },
    {
      title: "EMAIL",
      dataIndex: "vendor_email",
      key: "freight_type_prefix",
     
      onFilter: (value, record) => {
        return String(record.freight_type_prefix)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "ORGANISATION TYPE",
      dataIndex: "vendor_org_type",
      key: "freight_type_prefix",
     
      onFilter: (value, record) => {
        return String(record.freight_type_prefix)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "COUNTRY",
      dataIndex: "vendor_country",
      key: "freight_type_prefix",
     
      onFilter: (value, record) => {
        return String(record.freight_type_prefix)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    }

  ];
// console.log()

    const data = [
    {
      vendor_name: "Fright X",
      vendor_type:"testemail.com",
      // vendor_email:"testemail.com",
      vendor_organisation: "organisation",
      vendor_country: "1",
    },
    {
      vendor_name: "Fright X",
      vendor_type:"testemail.com",
      // vendor_email:"testemail.com",
      vendor_organisation: "organisation",
      vendor_country: "1",
    },
  ];
    return (

        <>
          <div className="container-fluid container_fms pt-3">
            <div className="row flex-wrap ">
              <div className="col">
                <h5 className="lead_text">Vendor</h5>
              </div>
              {/* <Leadlist_Icons /> */}
            </div>
            <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
              <div className="col-4">
                <Input.Search
                  placeholder="Search by Freight type Name"
                  style={{ margin: "5px", borderRadius: "5px" }}
                  value={searchedText}
                  onChange={(e) => {
                    setSearchedText(e.target.value ? [e.target.value] : []);
                  }}
                  onSearch={(value) => {
                    setSearchedText(value);
                  }}
                />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-4 ">
                <Select
                  bordered={false}
                  className="page_size_style"
                  value={pageSize}
                  onChange={(e) => setPageSize(e)}
                >
                  <Select.Option value="25">
                    Show
                    <span className="vertical ms-1">|</span>
                    <span className="sizes ms-1">25</span>
                  </Select.Option>
                  <Select.Option value="50">
                    Show
                    <span className="vertical ms-1">|</span>
                    <span className="sizes ms-1"> 50</span>
                  </Select.Option>
                  <Select.Option value="100">
                    Show
                    <span className="vertical ms-1">|</span>
                    <span className="sizes ms-1">100</span>
                  </Select.Option>
                </Select>
              </div>
    
              <div className="col-4 d-flex  align-items-center justify-content-center">
            
                  <MyPagination
                  //  total={parseInt(vendortypes?.length)}
                    current={current}
                    showSizeChanger={true}
                    pageSize={pageSize}
                    onChange={(current, pageSize) => {
                      setCurrent(current);
                      setPageSize(pageSize);
                    }}
                  />
                </div>
    
              <div className="col-4 ">
                <Button
                  btnType="add"
                  onClick={() => {
                   setModalvendor(true)
                  }}
                >
                  Add Vendor 
                </Button>
              </div>
            </div>
            <div className="datatable">
              
              <TableData
                data={getData(current, pageSize)}
                // data={data}
                columns={columns}
                custom_table_css="table_lead_list"
              />
            </div>
            <div className="d-flex py-2 justify-content-center">
              <MyPagination
                  
                  //  total={parseInt(vendortypes?.length)}
                    current={current}
                    showSizeChanger={true}
                    pageSize={pageSize}
                    onChange={(current, pageSize) => {
                      setCurrent(current);
                      setPageSize(pageSize);
                    }}
                  />
            </div>
          </div>
    
          <CustomModel
            show={modalvendor}
            onHide={() => setModalvendor(false)}
            footer={false}
            // {...props}
            width={700}
            View_list
            list_content={
              <>
                <div className="row px-5">
                  <h5 className="lead_text">Add Vendor</h5>
                </div>
                <Form
                  form={addForm}
                  onFinish={(data) => {
                    console.log("valuezzzzzzz", data);
                    createvendor()
                  }}
                  onFinishFailed={(error) => {
                    console.log(error);
                  }}
                >
                  <div className="row py-1">
                    <div className="col-4 pt-1">
                      <label> Name</label>
                      <div>
                        <Form.Item
                          name="vendorname"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                          // onChange={(e) => setFrighttypename(e.target.value)}
                        >
                         
                          <InputType
                          value={vendorname}
                          onChange={(e) => {
                            setvendorname(e.target.value);
                            
                          }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-4 pt-1">
                      <label> Organisation Type</label>
                      <div>
                        <Form.Item
                          name="vendorOrganisation"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                         
                        >
                           <SelectBox
                          value={vendorOrganisation}
                          onChange={(e) => {
                            setvendorOrganisation(e);
                            // setOrganizationDisable(e);
                          }}
                        >
                          <Select.Option value="ORG">Organisation</Select.Option>
                          <Select.Option value="IND">Indivdual</Select.Option>
                        </SelectBox>
                         
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-4 pt-1">
                      <label>Type</label>
                      <div>
                        <Form.Item
                          name="vendortype"
                          // rules={[
                          //   {
                          //     required: true,
                          //     pattern: new RegExp("^[A-Za-z ]+$"),
                          //     message: "Please enter a Valid vendortype Name",
                          //   },
    
                          //   {
                          //     min: 3,
                          //     message: "Name must be atleast 3 characters",
                          //   },
                          //   {
                          //     max: 100,
                          //     message: " Name cannot be longer than 100 characters",
                          //   },
                          // ]}
                         
                        >
                         
                         <SelectBox
                                  showSearch={true}
                                  allowClear
                                  value={vendortyp}
                                  optionFilterProp="children"
                                  onChange={(e)=>{
                                    setvendortyp(e)
                                  }}
                                  // onChange={handleChange}
                                >
                                  {vendortypes &&
                                    vendortypes.length > 0 &&
                                    vendortypes.map((item, index) => {
                                      
                                      return (
                                        <Select.Option
                                          key={item.vendor_type_id}
                                          id={item.vendor_type_id}
                                          value={item.vendor_type_id}
                                        >
                                          {item.vendor_type_name}
                                        </Select.Option>
                                      );
                                    })}
                                </SelectBox>
                        </Form.Item>
                      </div>
                    </div>
                   
                  </div>


                  <div className="row py-4">
                    <div className="col-4 pt-1">
                      <label> Email</label>
                      <div>
                        <Form.Item
                          name="vendoremail"
                          // rules={[
                          //   {
                          //     required: true,
                          //     pattern: new RegExp("^[A-Za-z ]+$"),
                          //     message: "Please enter a Valid vendortype Name",
                          //   },
    
                          //   {
                          //     min: 3,
                          //     message: "Name must be atleast 3 characters",
                          //   },
                          //   {
                          //     max: 100,
                          //     message: " Name cannot be longer than 100 characters",
                          //   },
                          // ]}
                          // onChange={(e) => setFrighttypename(e.target.value)}
                        >
                         
                          <InputType
                          value={vendoremail}
                          onChange={(e) => {
                            setvendoremail(e.target.value);
                            
                          }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-4 pt-1">
                      <label> Contact</label>
                      <div>
                        <Form.Item
                          name="vendorcontact"
                          // rules={[
                          //   {
                          //     required: true,
                          //     pattern: new RegExp("^[A-Za-z ]+$"),
                          //     message: "Please enter a Valid vendortype Name",
                          //   },
    
                          //   {
                          //     min: 3,
                          //     message: "Name must be atleast 3 characters",
                          //   },
                          //   {
                          //     max: 100,
                          //     message: " Name cannot be longer than 100 characters",
                          //   },
                          // ]}
                         
                        >
                         
                          <InputType
                          value={vendorcontact}
                          onChange={(e) => {
                            setvendorcontact(e.target.value);
                            
                          }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-4 pt-1">
                      <label>Country</label>
                      <div>
                        <Form.Item
                          name="vendorcountry"
                          // rules={[
                          //   {
                          //     required: true,
                          //     pattern: new RegExp("^[A-Za-z ]+$"),
                          //     message: "Please enter a Valid vendortype Name",
                          //   },
    
                          //   {
                          //     min: 3,
                          //     message: "Name must be atleast 3 characters",
                          //   },
                          //   {
                          //     max: 100,
                          //     message: " Name cannot be longer than 100 characters",
                          //   },
                          // ]}
                         
                        >
                         
                         <SelectBox
                                  showSearch={true}
                                  allowClear
                                  // value={countryis}
                                  optionFilterProp="children"
                                  onChange={handleChange}
                                >
                                  {allCountries &&
                                    allCountries.length > 0 &&
                                    allCountries.map((item, index) => {
                                      return (
                                        <Select.Option
                                          key={item.country_id}
                                          id={item.country_id}
                                          value={item.country_id}
                                        >
                                          {item.country_name}
                                        </Select.Option>
                                      );
                                    })}
                                </SelectBox>
                        </Form.Item>
                      </div>
                    </div>
                   
                  </div>


                 <div className="row">
                 <div className="col-4 pt-1">
                      <label>City</label>
                      <div>
                        <Form.Item
                          name="vendorcity"
                          rules={[
                            {
                              required: true,
                              // pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                         
                        >
                         
                          <InputType
                          value={vendorcity}
                          onChange={(e) => {
                            setvendorcity(e.target.value);
                            
                          }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-4 pt-1">
                      <label>Tax No</label>
                      <div>
                        <Form.Item
                          name="vendortaxno"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                         
                        >
                         
                          <InputType
                          value={vendortaxno}
                          onChange={(e) => {
                            setvendortaxno(e.target.value);
                            
                          }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    
                 </div>

<div className="row">
<div className="col-12 ">
                      <label>  Address</label>
                      <div>
                        <Form.Item
                          name="vendoraddress"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                         
                        >
                         
                          <TextArea
                          value={vendoraddress}
                          onChange={(e) => {
                            setvendoraddress(e.target.value);
                            
                          }}
                          />
                        </Form.Item>
                      </div>
                    </div>
</div>

<div className="row">
<div className="col-12 ">
                      <label>  Description</label>
                      <div>
                        <Form.Item
                          name="vendordescription"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                         
                        >
                         
                          <TextArea
                          value={vendordescription}
                          onChange={(e) => {
                            setvendordescription(e.target.value);
                            
                          }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    </div>


                  <div className="row justify-content-center ">
                    <div className="col-auto">
                     
                      <Button btnType="save">Save</Button>
                    </div>
                  </div>
                </Form>
              </>
            }
          >
            <CustomModel
              size={"sm"}
              show={successPopup}
              onHide={() => setSuccessPopup(false)}
              success
            />
          </CustomModel>
    
          <CustomModel
            show={showViewModal}
            onHide={() => setShowViewModal(false)}
            width={650}
            View_list
            list_content={
              <div className="container px-5">
                <div className="row">
                  <div className="col-9">
                    <h5 className="lead_text">Vendor</h5>
                  </div>
                  <div className="col-3">
                    <Button
                      btnType="add_borderless"
                      className="edit_button"
                      onClick={() => {
                        // handleviewtoedit(viewvendortype);
                        // setShowModalEdit(true);
                        setShowViewModal(false);
                      }}
                    >
                      Edit
                      <FiEdit
                        style={{ marginBottom: "4px", marginInline: "3px" }}
                      />
                    </Button>
                  </div>
                </div>


                <div className="row mt-3">
                  <div className="col-4">
                    <p> Vendor Name</p>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-6 justify-content-start">
                    <p className="modal-view-data">{viewvendor.vendor_name }</p>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-4">
                    <p> Organisation Type</p>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-6 justify-content-start">
                    <p className="modal-view-data">{viewvendor.vendor_organisation }</p>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-4">
                    <p> Type</p>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-6 justify-content-start">
                    <p className="modal-view-data">{viewvendor.vendor_type }</p>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-4">
                    <p>Email</p>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-6 justify-content-start">
                    <p className="modal-view-data">{viewvendor.vendor_email }</p>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-4">
                    <p> Contact </p>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-6 justify-content-start">
                    <p className="modal-view-data">{viewvendor.vendor_contact } </p>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-4">
                    <p>Tax No</p>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-6 justify-content-start">
                    <p className="modal-view-data">{viewvendor.vendor_taxno }</p>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-4">
                    <p> Country</p>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-6 justify-content-start">
                    <p className="modal-view-data">{viewvendor.vendor_country}</p>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-4">
                    <p> Vendortype Description</p>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-6 justify-content-start">
                    <p className="modal-view-data">
                      {viewvendor.vendor_description}
                    </p>
                  </div>
                </div>
              </div>
            }
          />

          {/* edit vendor */}
          <CustomModel
            show={vendorEditPopup}
            onHide={() => setVendorEditPopup(false)}
            width={700}
            View_list
            list_content={
              <div>
                <div className="row px-5 ">
             
                    <h5 className="lead_text">Edit Vendor </h5>
                  
                  <div className="row ">
                    <Form
                      form={editForm}
                      onFinish={(values) => {
                        console.log("values iss", values);
                        // handleupdate()
                        handleupdate()
                      }}
                      onFinishFailed={(error) => {
                        console.log(error);
                      }}
                    >
                        <div className="row py-1">
                    <div className="col-4 pt-1">
                      <label> Name</label>
                      <div>
                        <Form.Item
                          name="vendor_name"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                          // onChange={(e) => setFrighttypename(e.target.value)}
                        >
                         
                          <InputType
                          value={editvendorname}
                          onChange={(e) => {
                            seteditvendorname(e.target.value);
                            
                          }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-4 pt-1">
                      <label> Organisation Type</label>
                      <div>
                        <Form.Item
                          name="vendor_Organisation"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                         
                        >
                           <SelectBox
                          value={editvendorOrganisation}
                          onChange={(e) => {
                            seteditvendorOrganisation(e);
                            // setOrganizationDisable(e);
                          }}
                        >
                          <Select.Option value="ORG">Organisation</Select.Option>
                          <Select.Option value="IND">Indivdual</Select.Option>
                        </SelectBox>
                         
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-4 pt-1">
                      <label>Type</label>
                      <div>
                        <Form.Item
                          name="vendor_type"
                          // rules={[
                          //   {
                          //     required: true,
                          //     pattern: new RegExp("^[A-Za-z ]+$"),
                          //     message: "Please enter a Valid vendortype Name",
                          //   },
    
                          //   {
                          //     min: 3,
                          //     message: "Name must be atleast 3 characters",
                          //   },
                          //   {
                          //     max: 100,
                          //     message: " Name cannot be longer than 100 characters",
                          //   },
                          // ]}
                         
                        >
                         
                         <SelectBox
                                  showSearch={true}
                                  allowClear
                                  value={editvendortyp}
                                  optionFilterProp="children"
                                  onChange={(e)=>{
                                    seteditvendortyp(e)
                                  }}
                                  // onChange={handleChange}
                                >
                                  {vendortypes &&
                                    vendortypes.length > 0 &&
                                    vendortypes.map((item, index) => {
                                      
                                      return (
                                        <Select.Option
                                          key={item.vendor_type_id}
                                          id={item.vendor_type_id}
                                          value={item.vendor_type_id}
                                        >
                                          {item.vendor_type_name}
                                        </Select.Option>
                                      );
                                    })}
                                </SelectBox>
                        </Form.Item>
                      </div>
                    </div>
                   
                  </div>


                  <div className="row py-4">
                    <div className="col-4 pt-1">
                      <label> Email</label>
                      <div>
                        <Form.Item
                          name="vendor_email"
                          // rules={[
                          //   {
                          //     required: true,
                          //     pattern: new RegExp("^[A-Za-z ]+$"),
                          //     message: "Please enter a Valid vendortype Name",
                          //   },
    
                          //   {
                          //     min: 3,
                          //     message: "Name must be atleast 3 characters",
                          //   },
                          //   {
                          //     max: 100,
                          //     message: " Name cannot be longer than 100 characters",
                          //   },
                          // ]}
                          // onChange={(e) => setFrighttypename(e.target.value)}
                        >
                         
                          <InputType
                          value={editvendoremail}
                          onChange={(e) => {
                            seteditvendoremail(e.target.value);
                            
                          }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-4 pt-1">
                      <label> Contact</label>
                      <div>
                        <Form.Item
                          name="vendor_contact"
                          // rules={[
                          //   {
                          //     required: true,
                          //     pattern: new RegExp("^[A-Za-z ]+$"),
                          //     message: "Please enter a Valid vendortype Name",
                          //   },
    
                          //   {
                          //     min: 3,
                          //     message: "Name must be atleast 3 characters",
                          //   },
                          //   {
                          //     max: 100,
                          //     message: " Name cannot be longer than 100 characters",
                          //   },
                          // ]}
                         
                        >
                         
                          <InputType
                          value={editvendorcontact}
                          onChange={(e) => {
                            seteditvendorcontact(e.target.value);
                            
                          }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-4 pt-1">
                      <label>Country</label>
                      <div>
                        <Form.Item
                          name="vendor_country"
                          // rules={[
                          //   {
                          //     required: true,
                          //     pattern: new RegExp("^[A-Za-z ]+$"),
                          //     message: "Please enter a Valid vendortype Name",
                          //   },
    
                          //   {
                          //     min: 3,
                          //     message: "Name must be atleast 3 characters",
                          //   },
                          //   {
                          //     max: 100,
                          //     message: " Name cannot be longer than 100 characters",
                          //   },
                          // ]}
                         
                        >
                         
                         <SelectBox
                                  showSearch={true}
                                  allowClear
                                  // value={countryis}
                                  value={editcountry}
                                  optionFilterProp="children"
                                  // onChange={handleChange}
                                  onChange={(e)=>{
                                    seteditcountry(e)
                                  }}
                                >
                                  {allCountries &&
                                    allCountries.length > 0 &&
                                    allCountries.map((item, index) => {
                                      return (
                                        <Select.Option
                                          key={item.country_id}
                                          id={item.country_id}
                                          value={item.country_id}
                                        >
                                          {item.country_name}
                                        </Select.Option>
                                      );
                                    })}
                                </SelectBox>
                        </Form.Item>
                      </div>
                    </div>
                   
                  </div>


                 <div className="row">
                 <div className="col-4 pt-1">
                      <label>City</label>
                      <div>
                        <Form.Item
                          name="vendor_city"
                          rules={[
                            {
                              required: true,
                              // pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                         
                        >
                         
                          <InputType
                          value={editvendorcity}
                          onChange={(e) => {
                            seteditvendorcity(e.target.value);
                            
                          }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-4 pt-1">
                      <label>Tax No</label>
                      <div>
                        <Form.Item
                          name="vendor_taxno"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                         
                        >
                         
                          <InputType
                          value={editvendortaxno}
                          onChange={(e) => {
                            seteditvendortaxno(e.target.value);
                            
                          }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    
                 </div>

<div className="row">
<div className="col-12 ">
                      <label>  Address</label>
                      <div>
                        <Form.Item
                          name="vendor_address"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                         
                        >
                         
                          <TextArea
                          value={editvendoraddress}
                          onChange={(e) => {
                            seteditvendoraddress(e.target.value);
                            
                          }}
                          />
                        </Form.Item>
                      </div>
                    </div>
</div>

<div className="row">
<div className="col-12 ">
                      <label>  Description</label>
                      <div>
                        <Form.Item
                          name="vendor_description"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z ]+$"),
                              message: "Please enter a Valid vendortype Name",
                            },
    
                            {
                              min: 3,
                              message: "Name must be atleast 3 characters",
                            },
                            {
                              max: 100,
                              message: " Name cannot be longer than 100 characters",
                            },
                          ]}
                         
                        >
                         
                          <TextArea
                          value={editvendordescription}
                          onChange={(e) => {
                            seteditvendordescription(e.target.value);
                            
                          }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    </div>
                      
    
                      <div className="col-12 d-flex justify-content-center ">
                        <Button className="save_button">Save</Button>
                      </div>
                    </Form>
                  </div>
                  {/* {error ? (
                    <div className="">
                      <ErrorMsg code={"400"} />
                    </div>
                  ) : (
                    ""
                  )} */}
                </div>
              </div>
            }
          />
          <CustomModel
            size={"sm"}
            show={successPopup}
            onHide={() => setSuccessPopup(false)}
            success
          />
          {/* {error ? <ErrorMsg code={"500"} /> : " "} */}
        </>
      );
}
export default Vendor;