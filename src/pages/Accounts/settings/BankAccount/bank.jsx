import React, { useEffect, useState } from "react";
import { MdPageview } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import { Form, Input, Select, DatePicker } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import MyPagination from "../../../../components/Pagination/MyPagination";
import Button from "../../../../components/button/button";
import TableData from "../../../../components/table/table_data";
import CustomModel from "../../../../components/custom_modal/custom_model";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import InputType from "../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../components/Select Box/SelectBox";
import { Checkbox } from "antd";
import { ACCOUNTS, CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
function Bank(){

    const [addForm] = Form.useForm();
    const [error, setError] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false);
    const [searchedText, setSearchedText] = useState("");
    const [modalvendor, setModalvendor] = useState(false);
    const [pageSize, setPageSize] = useState("25");
    const [current, setCurrent] = useState(1);
    const [showViewModal, setShowViewModal] = useState(false)
    const [vendorEditPopup, setVendorEditPopup] = useState(false);
    const [editForm] = Form.useForm();
    const [serialNo, setserialNo] = useState(1);
    const [allbankdetails,setAllbankdetails] =useState()

    const [bankaccname,setbankaccname]= useState("")
    const [bankaccno,setbankaccno]= useState("")
    const [bankname,setbankname]= useState("")
    const [bankbrnch,setbankbrnch]= useState("")
    const [bankibanno,setbankibanno]= useState("")
    const [defaultbank,setdefaultbank] =useState(0)

    const [editbankaccname,seteditbankaccname]= useState("")
    const [editbankaccno,seteditbankaccno]= useState("")
    const [editbankname,seteditbankname]= useState("")
    const [editbankbrnch,seteditbankbrnch]= useState("")
    const [editbankibanno,seteditbankibanno]= useState("")
    const [editdefaultbank,seteditdefaultbank] =useState()

    const [editbankid,seteditbankid]=useState()

    const [viewbankdetails, setviewbankdetails] = useState({
      id: "",
      viewbankaccname: "",
      viewbankaccno: "",
      viewbankname: "",
      viewbankbrnch: "",
      viewbankibano: "",
      viewbankdefault:""
    });

    const handleViewClick = (item) => {
      console.log("view all bankdetails", item);
      setviewbankdetails({
        ...viewbankdetails,
        id: item.bank_id,
        viewbankaccname: item.bank_account_name,
        viewbankaccno: item.bank_account_number,
        viewbankbrnch: item.bank_branch,
        viewbankname:item.bank_name,
        viewbankibano:item.bank_iban_no,
        viewbankdefault:item.bank_default
      });
      setShowViewModal(true);
    };
  

    const handleChecked = (e, key) => {
      console.log("isChecked", e);
      if (e.target.checked) {
        console.log("suceccss checked", e.target.checked);
        setdefaultbank(1);
      }
    };
    const handleCheckededit = (e, key) => {
      console.log("isChecked", e);
      if (e.target.checked) {
        console.log("suceccss checked", e.target.checked);
        seteditdefaultbank(1);
      } else {
        seteditdefaultbank(0)
      }
    };


    const handleEditclick = (e) => {
      console.log("editing id iss", e);
      seteditbankid(e.bank_id)
      seteditbankaccname(e.bank_account_name)
      seteditbankaccno(e.bank_account_number)
      seteditbankbrnch(e.bank_branch)
      seteditbankname(e.bank_name)
      seteditbankibanno(e.bank_iban_no)
      seteditdefaultbank(e.bank_default)

      editForm.setFieldsValue({
        // unitid: e.unit_id,
        editaccname:e.bank_account_name,
        editbank_name:e.bank_name,
        editbnk_branch:e.bank_branch,
        editacc_no:e.bank_account_number,
        editiban_no:e.bank_iban_no,
        editdefaultbnk:e.bank_default
      });
      setVendorEditPopup(true);
      // setuniqueCode(false);
  
    };
    const handleviewtoedit = (e) => {
      console.log("editing view iss", e);
      seteditbankid(e.id)
      seteditbankaccname(e.viewbankaccname)
      seteditbankaccno(e.viewbankaccno)
      seteditbankbrnch(e.viewbankbrnch)
      seteditbankname(e.viewbankname)
      seteditbankibanno(e.viewbankibano)
      seteditdefaultbank(e.viewbankdefault)

      editForm.setFieldsValue({
        editaccname:e.viewbankaccname,
        editbank_name:e.viewbankname,
        editbnk_branch:e.viewbankbrnch,
        editacc_no:e.viewbankaccno,
        editiban_no:e.viewbankibano,
        editdefaultbnk:e.viewbankdefault
      });
      setVendorEditPopup(true);
  
    };

    const handleupdate = async () => {
      try {
        const updated = await PublicFetch.patch(
          `${ACCOUNTS}/bank/${editbankid}`,
          {
            bank_account_name: editbankaccname,
            bank_account_number: editbankaccno,
            bank_name: editbankname,
            bank_branch:editbankbrnch,
            bank_iban_no:editbankibanno,
            bank_default:editdefaultbank
          }
        );
        console.log("successfully updated ", updated);
        if (updated.data.success) {
          setSuccessPopup(true)
          setVendorEditPopup(false);
          getallbanks()
    
          close_modal(successPopup,1000 );
        } 
      } catch (err) {
        console.log("error to update bankdetails");
      }
    };



    const close_modal = (mShow, time) => {
      if (!mShow) {
        setTimeout(() => {
          setSuccessPopup(false);
        }, time);
      }
    };
    
    const createbankdetails = async () => {
      try {
        const addbankdetails = await PublicFetch.post(
          `${ACCOUNTS}/bank`,
          {
            bank_account_name: bankaccname,
            bank_account_number: bankaccno,
            bank_name: bankname,
            bank_branch:bankbrnch,
            bank_iban_no:bankibanno,
            bank_default:defaultbank
          }
        );
        console.log("bankdetails added successfully", addbankdetails);
        if (addbankdetails.data.success) {
          setSuccessPopup(true);
          getallbanks()
          addForm.resetFields();
          setModalvendor(false);
          close_modal(successPopup, 1000);
        } 
        else if (addbankdetails.data.success === false) {
          // alert(addcarrier.data.data);
        }
      } catch (err) {
        console.log("err to add the bankdetails", err);
      }
    };

    const getData = (current, pageSize) => {
      return allbankdetails?.slice((current - 1) * pageSize, current * pageSize);
    };
  

    const getallbanks = async () => {
      try {
        const allbanks = await PublicFetch.get(
          `${ACCOUNTS}/bank`
        );
        console.log("getting all bank details", allbanks.data.data);
        setAllbankdetails(allbanks.data.data)
      
      } catch (err) {
        console.log("error to fetching  bank details", err);
      }
    };


    useEffect(() => {
      getallbanks();
    }, []);
  


    const columns = [
        {
          title: "Sl. No.",
          key: "index",
          render: (value, item, index) => serialNo + index,
          align: "center",
        },
     
        {
          title: "NAME ",
          dataIndex: "bank_account_name",
          key: "vendor_name",
          // filteredValue: [searchedText],
          // onFilter: (value, record) => {
          //   return String(record.vendor_name)
          //     .toLowerCase()
          //     .includes(value.toLowerCase());
          // },
          align: "left",
        },
        {
          title: "BANK NAME",
          dataIndex: "bank_name",
          key: "bank_name",
          filteredValue: [searchedText],
          onFilter: (value, record) => {
            return String(record.bank_name)
              .toLowerCase()
              .includes(value.toLowerCase()) ||
              String(record.bank_branch)
              .toLowerCase()
              .includes(value.toLowerCase())  ||
              String(record.bank_account_name)
              .toLowerCase()
              .includes(value.toLowerCase())

          },
          align: "left",
        },
        {
          title: "BRANCH",
          dataIndex: "bank_branch",
          key: "freight_type_prefix",
    
          onFilter: (value, record) => {
            return String(record.freight_type_prefix)
              .toLowerCase()
              .includes(value.toLowerCase());
          },
          align: "left",
        },
        // {
        //   title: "COUNTRY",
        //   dataIndex: "vendor_country",
        //   key: "freight_type_prefix",
    
        //   onFilter: (value, record) => {
        //     return String(record.freight_type_prefix)
        //       .toLowerCase()
        //       .includes(value.toLowerCase());
        //   },
        //   align: "center",
        // },
        {
          title: "ACTION",
          dataIndex: "action",
          key: "key",
          width: "30%",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center gap-2">
                <div
                  className="editIcon m-0"
                  onClick={() => {
                    handleEditclick(index)
                  }}
                >
                  <FaEdit />
                </div>
                <div
                  className="viewIcon m-0"
                  onClick={() => {
                    // handleViewClick(index)
                    handleViewClick(index)
                }}
                >
                  <MdPageview style={{ marginLeft: 15, marginRight: 15 }} />
                </div>
                <div className="deleteIcon m-0">
                  <FaTrash />
                </div>
              </div>
            );
          },
          align: "center",
        },
      ];
      // console.log()
    
      const data = [
        {
          name: "abcc",
          bank_name: "Federal ",
          bank_branch: "Korraty",
          vendor_country: "1",
        },
        
     
      ];

      const columnsKeys = columns.map((column) => column.key);

      const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
      const filteredColumns = columns.filter((column) =>
        selectedColumns.includes(column.key)
      );
      console.log("filtered columns::", filteredColumns);
      const onChange1 = (checkedValues) => {
        setSelectedColumns(checkedValues);
      };
    
      //for Xlsx data
      const UnitHeads = [
        [
          "Slno",
         
          "NAME",
          "BANK NAME",
          "BRANCH",
       
        ],
      ];
      //for pdf download
      const data12 = allbankdetails?.map((item, index) => [
        index + serialNo,
        item.bank_account_name,
        item.bank_name,
        item.bank_branch,
      
       
      ]);

    return(
        <>

<div className="container-fluid container_fms pt-3">
        <div className="row flex-wrap align-items-center ">
          <div className="col-4">
            <h5 className="lead_text">Bank Details</h5>
          </div>
          <div className="col-sm-4">
            <Input.Search
             className="inputSearch"
              placeholder="Search"
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
          {/* <Leadlist_Icons /> */}
          <div className="col-4 d-flex justify-content-end">
            {data12 && (
              <Leadlist_Icons
                datas={data12}
                columns={filteredColumns}
                items={data12}
                xlheading={UnitHeads}
                filename="data.csv"
              />
            )}
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
            //    total={parseInt(totalvendor?.length)}
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
                setModalvendor(true);
              }}
            >
              New Bank
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
            //  total={parseInt(totalvendor?.length)}
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
            <div className="row px-4 ">
              <h5 className="lead_text">New Bank</h5>
            </div>
            <Form
              form={addForm}
              onFinish={(data) => {
                console.log("valuezzzzzzz", data);
                // createvendor();
                createbankdetails()
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row px-4">
                <div className="col-6 pt-1">
                  <label> Name</label>
                  <div>
                    <Form.Item
                      name="bnkaccname"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid  Name",
                        },
                      ]}
                    >
                      <InputType
                        value={bankaccname}
                        onChange={(e) => {
                          setbankaccname(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="col-6 pt-1">
                  <label>Bank Name</label>
                  <div>
                    <Form.Item
                      name="bank_name"
                      rules={[
                        {
                          required: true,
                          // pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid Bank Name",
                        },
                      ]}
                    >
                    <InputType
                        value={bankname}
                        onChange={(e) => {
                          setbankname(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>

                
              </div>

              <div className="row px-4">
              <div className="col-6 pt-1">
                  <label>Branch</label>
                  <div>
                    <Form.Item
                      name="vendortype"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a Valid branch",
                        },
                      ]}
                    >
                      <InputType 
                       value={bankbrnch}
                       onChange={(e)=>{
                        setbankbrnch(e.target.value)
                       }}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-6 pt-1">
                  <label> Account No</label>
                  <div>
                    <Form.Item
                      name="acc_no"
                      rules={[
                        {
                          required: true,
                          // pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid account no",
                        },
                      ]}
                    >
                      <InputType
                        value={bankaccno}
                        onChange={(e) => {
                          setbankaccno(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>

              

              
              </div>
              <div className="row px-4">
              <div className="col-6 pt-1">
                  <label> IBAN No</label>
                  <div>
                    <Form.Item
                      name="iban_no"
                      rules={[
                        {
                          required: true,

                          message: "Please enter a Valid Iban no",
                        },

                        // {
                        //   min: 3,
                        //   message: "Name must be atleast 3 characters",
                        // },
                        // {
                        //   max: 100,
                        //   message: " Name cannot be longer than 100 characters",
                        // },
                      ]}
                    >
                      <InputType
                        value={bankibanno}
                        onChange={(e) => {
                          setbankibanno(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-6 pt-3">
                      <label>Default Bank</label>
                      <div>
                        <Form.Item
                          name="currencyDefault"
                        
                        >
                          <Checkbox
                            // value={currencyDefault}
                            onChange={handleChecked}
                            checked={defaultbank == 1 ? true : false}
                          ></Checkbox>
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
        // width={0}
        View_list
        list_content={
          <div className="container px-5">
            <div className="row">
              <div className="col-9">
                <h5 className="lead_text">Bank</h5>
              </div>
              <div className="col-3">
                <Button
                  btnType="add_borderless"
                  className="edit_button"
                  onClick={() => {
                    // handleviewtoedit(viewvendortype);
                    // setShowModalEdit(true);
                    // handleviewtoedit(viewvendor);
                    handleviewtoedit(viewbankdetails)
                    // setVendorEditPopup(true)
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
                <p> Name</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">{viewbankdetails.viewbankaccname}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-4">
                <p> Bank Name</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  {viewbankdetails.viewbankname}
                </p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-4">
                <p> Bank Branch</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">{viewbankdetails.viewbankbrnch}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-4">
                <p>Bank Account No</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">{viewbankdetails.viewbankaccno}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-4">
                <p>BankIBAN No</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">{viewbankdetails.viewbankibano}</p>
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
            <div className="row px-3 ">
              <h5 className="lead_text">Edit Bank </h5>
              </div>
              <div className="row px-4">
              <Form
              form={editForm}
              onFinish={(data) => {
                console.log("valuezzzzzzz", data);
                // createvendor();
                handleupdate()
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row px-4">
                <div className="col-6 pt-1">
                  <label> Name</label>
                  <div>
                    <Form.Item
                      name="editaccname"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a   Name",
                        },
                      ]}
                    >
                      <InputType
                        value={editbankaccname}
                        onChange={(e) => {
                          seteditbankaccname(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="col-6 pt-1">
                  <label>Bank Name</label>
                  <div>
                    <Form.Item
                      name="editbank_name"
                      rules={[
                        {
                          required: true,
                          // pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid bank name",
                        },
                      ]}
                    >
                    <InputType
                        value={editbankname}
                        onChange={(e) => {
                          seteditbankname(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>

                
              </div>

              <div className="row px-4">
              <div className="col-6 pt-1">
                  <label>Branch</label>
                  <div>
                    <Form.Item
                      name="editbnk_branch"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a Valid branch",
                        },
                      ]}
                    >
                      <InputType
                        value={editbankbrnch}
                        onChange={(e) => {
                          seteditbankbrnch(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-6 pt-1">
                  <label> Account No</label>
                  <div>
                    <Form.Item
                      name="editacc_no"
                      rules={[
                        {
                          required: true,
                          // pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid account no",
                        },
                      ]}
                    >
                      <InputType
                        value={editbankaccno}
                        onChange={(e) => {
                          seteditbankaccno(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>

             
              </div>
              <div className="row px-4">
              <div className="col-6 pt-1">
                  <label> IBAN No</label>
                  <div>
                    <Form.Item
                      name="editiban_no"
                      rules={[
                        {
                          required: true,

                          message: "Please enter a Valid Iban no",
                        },

                        // {
                        //   min: 3,
                        //   message: "Name must be atleast 3 characters",
                        // },
                        // {
                        //   max: 100,
                        //   message: " Name cannot be longer than 100 characters",
                        // },
                      ]}
                    >
                      <InputType
                        value={editbankibanno}
                        onChange={(e) => {
                          seteditbankibanno(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-6 pt-3">
                      <label>Default Bank</label>
                      <div>
                        <Form.Item
                          name="editdefaultbnk"
                        
                        >
                          <Checkbox
                            // value={currencyDefault}
                            onChange={handleCheckededit}
                            checked={editdefaultbank == 1 ? true : false}
                          ></Checkbox>
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
  
     
    )
}
export default Bank;