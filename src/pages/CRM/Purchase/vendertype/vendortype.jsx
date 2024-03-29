import React, { useEffect, useState } from "react";
import Button from "../../../../components/button/button";
import Custom_model from "../../../../components/custom_modal/custom_model";
import InputType from "../../../../components/Input Type textbox/InputType";
import { MdPageview } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Form, Input, Select, DatePicker } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import TableData from "../../../../components/table/table_data";
import MyPagination from "../../../../components/Pagination/MyPagination";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import PublicFetch from "../../../../utils/PublicFetch";
import {
  CRM_BASE_URL_PURCHASING,
  CRM_BASE_URL_SELLING,
} from "../../../../api/bootapi";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
function Vendortype() {
  const [addForm] = Form.useForm();
  const [error, setError] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [modalvendor, setModalvendor] = useState(false);
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);
  const [showViewModal, setShowViewModal] = useState(false);

  const [vendorEditPopup, setVendorEditPopup] = useState(false);
  const [editForm] = Form.useForm();
  const [vendortypename, setVendortypename] = useState("");
  const [vendordesc, setVendordesc] = useState("");
  const [vendortypes, setvendortypes] = useState();
  const [editvendortypename, seteditvendortypename] = useState("");
  const [editvendortypedesc, seteditvendortypedesc] = useState("");
  const [editvendortypeid, seteditvendortypeid] = useState("");
  const [serialNo, setserialNo] = useState(1);
  const [viewvendortype, setViewvendortype] = useState({
    id: "",
    vendortype_name: "",
    vendortype_desc: "",
  });

  const handleViewClick = (item) => {
    console.log("view all attributes", item);
    setViewvendortype({
      ...viewvendortype,
      id: item.vendor_type_id,
      vendortype_name: item.vendor_type_name,
      vendortype_desc: item.vendor_type_desc,
    });
    setShowViewModal(true);
  };

  const handleviewtoedit = (i) => {
    console.log("editing data iss", i);
    seteditvendortypeid(i.id);
    seteditvendortypename(i.vendortype_name);
    seteditvendortypedesc(i.vendortype_desc);
    editForm.setFieldsValue({
      // unitid: e.unit_id,
      vendortypename: i.vendortype_name,
      vendortypedesc: i.vendortype_desc,
    });
    setVendorEditPopup(true);
    // setuniqueCode(false);
  };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        // navigate(ROUTES.ATTRIBUTES);
      }, time);
    }
  };
  const createvendortype = async () => {
    try {
      const addvendortype = await PublicFetch.post(
        `${CRM_BASE_URL_PURCHASING}/vendorTypes`,
        {
          name: vendortypename,
          desc: vendordesc,
        }
      );
      console.log("vendorTypes added successfully", addvendortype);
      if (addvendortype.data.success) {
        setSuccessPopup(true);
        getallvendortype();
        addForm.resetFields();
        setModalvendor(false);
        close_modal(successPopup, 1000);
      }
    } catch (err) {
      console.log("err to add the vendortype", err);
    }
  };

  const getData = (current, pageSize) => {
    return vendortypes?.slice((current - 1) * pageSize, current * pageSize);
  };

  const handleEditclick = (e) => {
    console.log("editing id iss", e);
    seteditvendortypeid(e.vendor_type_id);
    seteditvendortypename(e.vendor_type_name);
    seteditvendortypedesc(e.vendor_type_desc);
    editForm.setFieldsValue({
      // unitid: e.unit_id,
      vendortypename: e.vendor_type_name,
      vendortypedesc: e.vendor_type_desc,
    });
    setVendorEditPopup(true);
    // setuniqueCode(false);
  };

  const handleupdate = async () => {
    try {
      const updated = await PublicFetch.patch(
        `${CRM_BASE_URL_PURCHASING}/vendorTypes/${editvendortypeid}`,
        {
          name: editvendortypename,
          desc: editvendortypedesc,
        }
      );
      console.log("successfully updated ", updated);
      if (updated.data.success) {
        setSuccessPopup(true);
        setVendorEditPopup(false);
        getallvendortype();

        close_modal(successPopup, 1000);
      }
    } catch (err) {
      console.log("error to update vendortype");
    }
  };


  const getFinalCount = (total) =>{
    const cutoff = Math.ceil(totalCount/ pageSize);
    console.log("FinalTest",cutoff,current)
    if(current === cutoff) return totalCount
    return total
    // console.log("TotalPageTest",current,totalCount)
    // console.log("TestCount",total)
  }
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
  useEffect(() => {
    getallvendortype();
  }, []);

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      render: (value, item, index) => serialNo + index,
      align: "center",
      width:"10%",
    },
    {
      title: " NAME",
      dataIndex: "vendor_type_name",
      key: "vendor_type_name",
      width:"27%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.vendor_type_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.vendor_type_desc)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
      align: "left",
    },
    {
      title: " DESCRIPTION",
      dataIndex: "vendor_type_desc",
      key: "freight_type_prefix",

      // onFilter: (value, record) => {
      //   return String(record.freight_type_prefix)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },
      align: "left",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "10%",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div
              className="editIcon m-0"
              onClick={() => {
                handleEditclick(index);
              }}
            >
              <FaEdit />
            </div>
            <div
              className="viewIcon m-0"
              onClick={() => handleViewClick(index)}
            >
              <MdPageview style={{ marginLeft: 5, marginRight: 5}} />
            </div>
            <div className="deleteIcon m-0">
              <FaTrash style={{ marginBottom: 2}}/>
            </div>
          </div>
        );
      },
      align: "center",
    },
  ];

  const columnsKeys = columns.map((column) => column.key);
  const [totalCount, setTotalcount] = useState();
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
      "DESCRIPTION",
      // "CUSTOMER",
      // "COST",
      // "EXPENSE",
      // "PROFIT/LOSS",
    ],
  ];
  //for pdf download
  const data12 = vendortypes?.map((item, index) => [
    index + serialNo,
    item.vendor_type_name,
    item.vendor_type_desc,
    // item.lead,
    // item.cost,
    // item.expense,
    // item.profit,
  ]);

  return (
    <>
      <div className="container-fluid container_fms pt-3">
        <div className="row flex-wrap align-items-center">
          <div className="col-4">
            <h5 className="lead_text">Vendor Types</h5>
          </div>
          <div className="col-4">
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
          <div className="col-4 d-flex justify-content-end">
            {data12 && (
              <Leadlist_Icons
                name={"vendortype"}
                datas={data12}
                columns={filteredColumns}
                items={data12}
                xlheading={UnitHeads}
                filename="data.csv"
              />
            )}
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        {/* <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}></div> */}
        <div className="row my-3">
        
          <div className="col-xl-4  ">
          <div className="d-flex justify-content-start align-items-center gap-3">
          { vendortypes?.length > 0 && (
            <div className="  ">
            <Select
              bordered={false}
              className="page_size_style"
              value={pageSize}
              onChange={(e) => setPageSize(e)}
            >
             <Select.Option value="25">
                 
                 <span style={{ color: "#2f6b8f" }} className="ms-1">
                   25
                 </span>
               </Select.Option>
               <Select.Option value="50">
                
                 <span style={{ color: "#2f6b8f" }} className="ms-1">
                   50
                 </span>
               </Select.Option>
               <Select.Option value="100">
                
                 <span style={{ color: "#2f6b8f" }} className="ms-1">
                   100
                 </span>{" "}
               </Select.Option>
            </Select>
          </div>
        )}
        </div>
        </div>
          {/* <div className=" col-xl-10 col-lg-9 col-md-8 col-sm-12  d-flex  align-items-center ">
            <label className="font_size" >Results: {current +1} -{ getFinalCount((1 * pageSize)*current)}  <span>of {totalCount} </span> </label>
            </div> */}

          <div className="col-4 d-flex py-2 justify-content-center">
         {vendortypes?.length > 0 && (

        
            <MyPagination
              total={parseInt(vendortypes?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
              onChange={(current, pageSize) => {
                setCurrent(current);
                setPageSize(pageSize);
              }}
            />
            )}
          </div>

          <div className="col-lg-4 col-lg-4 col-md-4 col-sm-12 col-4 d-flex justify-content-end ">
            <Button
              btnType="add"
              onClick={() => {
                setModalvendor(true);
              }}
            >
              New Vendor types
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            data={getData(current, pageSize)}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
        {vendortypes?.length > 0 && (
          <MyPagination
            total={parseInt(vendortypes?.length)}
            current={current}
            showSizeChanger={true}
            pageSize={pageSize}
            onChange={(current, pageSize) => {
              setCurrent(current);
              setPageSize(pageSize);
            }}
          />
        )}
        </div>
      </div>

      <Custom_model
        show={modalvendor}
        onHide={() => setModalvendor(false)}
        header="Add Fright"
        footer={false}
        // {...props}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">New Vendor Type</h5>
            </div>
            <Form
              form={addForm}
              onFinish={(data) => {
                console.log("valuezzzzzzz", data);
                createvendortype();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label className="mb-2">Name<span className="required">*</span></label>
                  <div>
                    <Form.Item
                      name="vendortypename"
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
                      <InputType className="mb-2"
                        value={vendortypename}
                        onChange={(e) => {
                          setVendortypename(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12 pt-1">
                  <label className="mb-2">Description</label>
                  <div>
                    <Form.Item name="freightprefix">
                      <TextArea
                        value={vendordesc}
                        onChange={(e) => {
                          setVendordesc(e.target.value);
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
        <Custom_model
          size={"sm"}
          show={successPopup}
          onHide={() => setSuccessPopup(false)}
          success
        />
      </Custom_model>

      <Custom_model
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        View_list
        list_content={
          <div className="container-fluid p-3">
            <div className="row">
              <div className="col-9">
                <h5 className="lead_text">Vendor Type</h5>
              </div>
              <div className="col-3">
                <Button
                  btnType="add_borderless"
                  className="edit_button"
                  onClick={() => {
                    handleviewtoedit(viewvendortype);
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
            <div className="row mt-4">
              <div className="col-4">
                <p> Vendortype Name</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  {viewvendortype.vendortype_name}
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p>Description</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  {viewvendortype.vendortype_desc}
                </p>
              </div>
            </div>
          </div>
        }
      />
      <Custom_model
        show={vendorEditPopup}
        onHide={() => setVendorEditPopup(false)}
        View_list
        list_content={
          <div>
            <div className="container-fluid px-4 my-2">
              <div>
                <h5 className="lead_text">Edit Vendor Type</h5>
              </div>
              <div className="row my-3 ">
                <Form
                  form={editForm}
                  onFinish={(values) => {
                    console.log("values iss", values);
                    handleupdate();
                  }}
                  onFinishFailed={(error) => {
                    console.log(error);
                  }}
                >
                  <div className="col-12">
                    <label className="mb-2">Name<span className="required">*</span></label>
                    <Form.Item
                      name="vendortypename"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid vendortypename",
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
                        className="input_type_style w-100 mb-2"
                        value={editvendortypename}
                        onChange={(e) => {
                          seteditvendortypename(e.target.value);
                          //   setErrormsg("");
                        }}
                      />
                    </Form.Item>
                    {/* {Errormsg ? (
                          <label style={{ color: "red" }}>{Errormsg}</label>
                        ) : (
                          ""
                        )} */}
                    {/* {uniqueeditCode ? (
                      <p
                        style={{ color: "red", marginTop: "-24px" }}
                        className="mb-2"
                      >
                        Freight type Name {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null} */}
                  </div>
                  <div className="col-12">
                    <label className="mb-2">Vendor Type Description</label>
                    <Form.Item name="vendortypedesc">
                      <TextArea
                        value={editvendortypedesc}
                        onChange={(e) => {
                          seteditvendortypedesc(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-12 d-flex justify-content-center mt-5">
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
      <Custom_model
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
      {/* {error ? <ErrorMsg code={"500"} /> : " "} */}
    </>
  );
}
export default Vendortype;
