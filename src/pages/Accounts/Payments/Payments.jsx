import React, { useState, useEffect } from "react";
// import "../../../CRM/lead/lead_list/leadlist.scss";
import { Modal, Form } from "antd";
import {
  FaFileExcel,
  FaFileCsv,
  FaFilePdf,
  FaBookOpen,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { TreeSelect } from "antd";
import FileUpload from "../../../components/fileupload/fileUploader";
// import { FormGroup } from "react-bootstrap";
// import { Form } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import Custom_model from "../../../components/custom_modal/custom_model";
import { useForm } from "react-hook-form";
import { AiFillPrinter } from "react-icons/ai";
import { MdFileCopy, MdPageview } from "react-icons/md";
import { Input, Select } from "antd";
import TableData from "../../../components/table/table_data";
import MyPagination from "../../../components/Pagination/MyPagination";
import CustomModel from "../../../components/custom_modal/custom_model";
import Button from "../../../components/button/button";
import "./Payments.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes/index";
import { ACCOUNTS, CRM_BASE_URL_SELLING } from "../../../api/bootapi";
import PublicFetch from "../../../utils/PublicFetch";
import { date } from "yup/lib/locale";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";
import { Table } from "antd";
import InputType from "../../../components/Input Type textbox/InputType";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import { EnvironmentFilled } from "@ant-design/icons";
import { UniqueErrorMsg } from "../../../ErrorMessages/UniqueErrorMessage";
import { useNavigate } from "react-router-dom";
import moment from "moment";

/*
Pagination to be added
*/

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function Payments(props) {
  const [editForm] = Form.useForm();
  const [serialNo, setserialNo] = useState(1);
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);
  const [searchedText, setSearchedText] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [SuccessPopup, setSuccessPopup] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [dataCategory, setDataCategory] = useState();
  const [DisplayDataa, setDisplayDataa] = useState();
  const [displayChild, setDisplayChild] = useState();
  const [displayName, setDisplayname] = useState({
    name: "",
  });
  const [nameSearch, setNamesearch] = useState();
  const [ViewingData, setViewingDAta] = useState();
  const [categoryId, setCategory] = useState();
  const [OldData, setOldData] = useState();
  const [CategoryImg, setCategoryImg] = useState();
  const [c_code, setCcode] = useState();
  const [cName, setCname] = useState();
  const [cPic, setCpic] = useState();
  const [cDescription, setCdescription] = useState("");
  const [cParent, setCparent] = useState();
  const [imageSize, setImageSize] = useState(false);
  const [uniqueCode, setuniqueCode] = useState(false);
  const [categoryCode, setCategoryCode] = useState();

  const navigate = useNavigate();
  const [State, setState] = useState("null");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentsTableData, setPaymentsTableData] = useState([]);

  const getData = (current, pageSize) => {
    //return CategoryList?.slice((current - 1) * pageSize, current * pageSize);
  };

  const [CategoryList, setCategoryList] = useState();
  const [CategoryTree, setCatgeoryTree] = useState();

  //api call function to get all payments
  const getAllPayments = async () => {
    try {
      const res = await PublicFetch.get(
        `${ACCOUNTS}/payment?startIndex=0&noOfItems=100`
      );
      console.log("here are the payments");
      console.log(res);
      if (res?.status == 200) {
        let tempData = [];
        res.data.data.forEach((item, index) => {
          let obj = {
            index: index,
            voucehr_no: item.payment_voucher_no,
            date: moment(new Date(item.payment_date)).format("DD/MM/YYYY"),
            lead: item.accounts_v1_payment_modes.pay_mode_name,
            amount: item.payment_amount,
            mode: item.crm_v1_leads.lead_customer_name,
            payment_id: item.payment_id,
          };
          tempData.push(obj);
        });
        setPaymentsTableData(tempData);
      }
    } catch (error) {
      console.log("error occured");
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPayments();
  }, []);

  const onChange = (value) => {
    console.log("Change", value);
    setCparent(value);
    setOldData({ ...OldData, cparent: value });
  };

  const onSelect = (value) => {
    console.log("Select:", value);
  };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const getDescendantValues = (record) => {
    const values = [];
    (function recurse(record) {
      values.push(record.category_name.toString().toLowerCase());
      record.children.forEach(recurse);
    })(record);
    return values;
  };

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "7%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },

    {
      title: "Voucher No.",
      dataIndex: "voucehr_no",
      key: "voucehr_no",
      width: "25%",
      align: "center",
      // filteredValue: [searchedText],
      //   onFilter: (value, record) => {
      //     // console.log("hai how are", record.children);

      //     return String(record.category_name || nameSearch)
      //       .toLowerCase()
      //       .includes(value.toLowerCase());
      //   },
    },
    // Table.EXPAND_COLUMN,
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "11%",
      align: "center",
      //   filteredValue: [searchCode],
      //   onFilter: (value, record) => {
      //     console.log("dfhasasswww12", record);
      //     return String(record.category_code)
      //       .toLowerCase()
      //       .includes(value.toLowerCase());
      //   },
    },
    {
      title: "Lead",
      dataIndex: "lead",
      key: "lead",
      width: "20%",
      align: "center",
      //   filteredValue: [searchStatus],
      //   onFilter: (value, record) => {
      //     return String(record.category_parent_id)
      //       .toLowerCase()
      //       .includes(value.toLowerCase());
      //   },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: "14%",
      align: "right",
    },
    {
      title: "Mode",
      dataIndex: "mode",
      key: "mode",
      width: "12%",
      //   render: (data, index) => {
      //     return (
      //       <div className=" d-flex justify-content-center align-items-center gap-3">
      //         <div
      //           className="actionEdit"
      //           onClick={() => handleEditPayment(index)}
      //         >
      //           <FaEdit />
      //         </div>
      //         <div
      //           className="actionEdit"
      //           onClick={() => handleViewCategory(index)}
      //         >
      //           <MdPageview />
      //         </div>
      //       </div>
      //     );
      //   },
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "24%",
      align: "center",
      render: (data, index) => {
        return (
          <div className=" d-flex justify-content-center align-items-center gap-3">
            <div
              className="actionEdit"
              onClick={() => handleEditPayment(index)}
            >
              <FaEdit />
            </div>
            <div
              className="actionEdit"
              onClick={() => handleViewPayment(index)}
            >
              <MdPageview />
            </div>
          </div>
        );
      },
    },
  ];
  //function to go to view Payment page
  const handleViewPayment = (e) => {
    console.log(ROUTES.VIEW_PAYMENTS_INDEX);
    navigate(`${ROUTES.VIEW_PAYMENTS_INDEX}/${e.payment_id}`);
  };

  // function to go to edit page
  const handleEditPayment = (e) => {
    console.log("here is the edit payment index", ROUTES.EDIT_PAYMENTS_INDEX);
    navigate(`${ROUTES.EDIT_PAYMENTS_INDEX}/${e.payment_id}`);
  };

  return (
    <div>
      <div className="container-fluid lead_list  my-3 py-3">
        <div>
          <div className="row flex-wrap">
            <div className="col">
              <h5 className="lead_text">Payments</h5>
            </div>
            <div className="col-auto" style={{}}>
              {/* <Leadlist_Icons /> */}
            </div>
          </div>
          <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
            <div className="col-4">
              <Input.Search
                placeholder="Search by Name"
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
            <div className="col-4">
              <Input.Search
                placeholder="Search by code"
                style={{ margin: "5px", borderRadius: "5px" }}
                value={searchCode}
                onChange={(e) => {
                  setSearchCode(e.target.value ? [e.target.value] : []);
                }}
                onSearch={(value) => {
                  setSearchCode(value);
                }}
              />
            </div>
          </div>
          <div className="row my-3">
            <div className="col-4  ">
              <Select
                bordered={false}
                className="page_size_style"
                value={pageSize}
                onChange={(e) => {
                  setCurrent(1);
                  setPageSize(e);
                }}
              >
                <Select.Option value="25">
                  Show
                  <span style={{ color: "lightgray" }} className="ms-1">
                    |
                  </span>
                  <span style={{ color: "#2f6b8f" }} className="ms-1">
                    25
                  </span>
                </Select.Option>
                <Select.Option value="50">
                  Show
                  <span style={{ color: "lightgray" }} className="ms-1">
                    |
                  </span>
                  <span style={{ color: "#2f6b8f" }} className="ms-1">
                    50
                  </span>
                </Select.Option>
                <Select.Option value="100">
                  Show
                  <span style={{ color: "lightgray" }} className="ms-1">
                    |
                  </span>
                  <span style={{ color: "#2f6b8f" }} className="ms-1">
                    100
                  </span>
                </Select.Option>
              </Select>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-center">
              <MyPagination
                total={CategoryList?.length}
                current={current}
                showSizeChanger={true}
                pageSize={pageSize}
                onChange={(current, pageSize) => {
                  setCurrent(current);
                  setPageSize(pageSize);
                }}
              />
            </div>
            <div className="col-4 d-flex justify-content-end" style={{}}>
              <Link to={ROUTES.ADD_PAYMENTS}>
                <Button btnType="add">Add Payment</Button>
              </Link>
            </div>
          </div>
          <div className="datatable">
            <TableData
              //data={getData(current, pageSize)}
              data={paymentsTableData}
              columns={columns}
              custom_table_css="table_lead_list"
              expandable
              expandIconColumnIndex={1}
            />
          </div>
          <div className="d-flex py-2 justify-content-center">
            <MyPagination
              total={CategoryList?.length}
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
      </div>
      {/* <CustomModel
        show={showViewModal}
        size="xl"
        onHide={() => setShowViewModal(false)}
        View_list
        list_content={
          <div className="container-fluid p-4">
            <div className="d-flex justify-content-between">
              <h5 className="lead_text">Category</h5>
              <div className="">
                <Button
                  onClick={() => {
                    handleEditPayment(ViewingData);
                  }}
                  btnType="add_borderless"
                  className="edit_button"
                >
                  Edit <FiEdit />
                
                </Button>
              </div>
            </div>

            <div className="col-12 d-flex justify-content-center mt-2">
              <img
                src={`${process.env.REACT_APP_BASE_URL}/${CategoryImg}`}
             
                style={{ height: "100px", width: "100px" }}
              />
            </div>

            <div className="row mt-4">
              <div className="col-5">
                <p className="modal_view_p_style">Voucer No</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">1</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">Date</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">7/3/2023</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">Lead</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">Lead 1</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">Amount</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">1234</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">Mode</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">Mode 1</p>
              </div>
            </div>
          </div>
        }
      /> */}
      {/* <CustomModel
        bodyStyle={{ height: 620, overflowY: "auto" }}
        width={700}
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        View_list
        list_content={
          <>
            <div className="px-2">
              <h5 className="lead_text">Edit Payments</h5>
            </div>
            <div className="container-fluid px-2 my-3">
              <Form
                form={editForm}
                onFinish={(values) => {
                  console.log("halo", values);
                  handleEditUpdation(OldData?.key);
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
              >
                <div className="row">
                  <div className="col-6">
                    <label>Category Name</label>
                    <Form.Item
                      name="category_name"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid Category Name",
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
                      <InputType onChange={(e) => setCname(e.target.value)} />
                    </Form.Item>
                  </div>

                  <div className="col-6">
                    <label>Category Code</label>
                    <Form.Item
                      name="category_code"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9]+$"),
                          message: "Please enter a Valid Category code",
                        },
                        {
                          min: 2,
                          message: "Code must be at least 2 characters",
                        },
                        {
                          max: 100,
                          message: "Code cannot be longer than 100 characters",
                        },
                      ]}
                    >
                      <InputType
                        onChange={(e) => {
                          setCcode(e.target.value);
                          setuniqueCode(false);
                        }}
                        onBlur={() => {
                          checkCategoryCodeis();
                        }}
                      />
                    </Form.Item>
                    {uniqueCode ? (
                      <label style={{ color: "red" }} className="mb-2">
                        Employee Code {UniqueErrorMsg.UniqueErrName}
                      </label>
                    ) : null}
                  </div>
                  <div className="col-6">
                    <label>Parent Category</label>
                    <div className="trdata">
                      <Form.Item>
                        <TreeSelect
                          className="tree"
                          name="tree"
                          style={{ width: "100%" }}
                          value={OldData?.cparent}
                          dropdownStyle={{
                            maxHeight: 400,
                            overflow: "auto",
                          }}
                          treeData={CategoryTree}
                          placeholder="Please select"
                          treeDefaultExpandAll
                          onChange={(e) => onChange(e)}
                          onSelect={onSelect}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="col-6">
                    <label>Description</label>
                    <Form.Item
                      name="category_description"
                      rules={[
                        {
                          min: 5,
                          message: "Description must be at least 5 characters",
                        },
                        {
                          max: 500,
                          message:
                            "Description cannot be longer than 500 characters",
                        },
                      ]}
                    >
                      <TextArea
                        onChange={(e) => setCdescription(e.target.value)}
                      />
                    </Form.Item>
                  </div>

                  <div className="col">
                    <label>category Image</label>
                    <Form.Item>
                      <FileUpload
                        beforeUpload={beforeUpload}
                        accept=".jpg,.png,.jpeg"
                        onChange={(file) => {
                          if (
                            file.file.size > 1000 &&
                            file.file.size < 500000
                          ) {
                            setCpic(file?.file?.originFileObj);
                            setImageSize(false);
                          } else {
                            setImageSize(true);
                            console.log(
                              "upload image size between 1 kb and  500 kb"
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
                    <div className="pb-3">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/${OldData?.cpic}`}
                        alt=""
                        height="40px"
                        width={"40px"}
                      />
                    </div>

                    <div className="row mt-3">
                      <div className="col-12 d-flex justify-content-center gap-2">
                        {/* <Button
                          style={{ backgroundColor: "white" }}
                          className="p-1 shadow-sm"
                        >
                          Cancel
                        </Button> */}
      {/* <Button
                          style={{
                            backgroundColor: "#0092ce",
                            color: "white",
                            borderRadius: "5px",
                          }}
                          className="p-2"
                          type="submit"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </>
        }
      />
      <CustomModel
        centered
        size={`sm`}
        success
        show={SuccessPopup}
        onHide={() => setSuccessPopup(false)}
      /> */}
    </div>
  );
}

export default Payments;
