import React, { useState } from "react";
import { Form, Input, Select, DatePicker, Checkbox } from "antd";
import MyPagination from "../../../components/Pagination/MyPagination";
import Button from "../../../components/button/button";
import TableData from "../../../components/table/table_data";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import Custom_model from "../../../components/custom_modal/custom_model";
import FileUpload from "../../../components/fileupload/fileUploader";
import InputType from "../../../components/Input Type textbox/InputType";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import { TreeSelect } from "antd";
import moment from "moment";
import { FiEdit } from "react-icons/fi";


export default function Purchase() {
  const [pageSize, setPageSize] = useState("25");
  const [purchase, setpurchase] = useState("");
  const [current, setCurrent] = useState(1);
  const [modalpurchase, setModalpurchase] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [purchaseEditPopup, setPurchaseEditPopup] = useState(false);


  const [adForm] = Form.useForm();
  const [editForm] = Form.useForm();


  const [po_no, setPo_no] = useState("");
  const [purchasedate, setPurchasedate] = useState("");
  const [due_date, setDue_date] = useState("");
  const [img, setImg] = useState([]);
  const [imgSizeError, setImgSizeError] = useState(false);
  const [remarks, setremarks] = useState("");
  const newDate = new Date();
  const [selectedDate, setSelectedDate] = useState();
  const [showViewModal, setShowViewModal] = useState(false);


  const [editpurchasebillno, seteditpurchasebillno] = useState("");
  const [editpurchasedate, seteditpurchasedate] = useState("");
  const [editpurchaseduedate, seteditpurchaseduedate] = useState("");
  const [editpurchasepono, seteditpurchasepono] = useState("");
  const [editpurchasestatus, seteditpurchasestatus] = useState("");
  const [editpurchasetotalamount, seteditpurchasetotalamount] = useState("");
  const [editpurchasevendor, seteditpurchasevendor] = useState("");

  const [viewpurchasemode, setViewpurchasemode] = useState({
    po_no: "",
    date: "",
    vendor: "",
    bill_no: "",
    total_amount: "",
    due_date: "",
    status: "",
  });

  const handleupdate = () => {};

  const handleEditclick = (e) => {
    setPurchaseEditPopup(true);
  };
  const handleViewClick = (e) => {
    setShowViewModal(true);
  };

  const handleviewtoedit = (i) => {
    setPurchaseEditPopup(true);
  };

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "30%",
      render: (data, index) => {
        console.log("table index", index);
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
              <MdPageview style={{ marginLeft: 15, marginRight: 15 }} />
            </div>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "Po No",
      dataIndex: "po_no",
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
      title: "DATE",
      dataIndex: "date",
      key: "freight_type_prefix",

      onFilter: (value, record) => {
        return String(record.freight_type_prefix)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },

    {
      title: "VENDOR",
      dataIndex: "vendor",
      key: "freight_type_prefix",

      onFilter: (value, record) => {
        return String(record.freight_type_prefix)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "BILL NO",
      dataIndex: "bill_no",
      key: "freight_type_prefix",

      onFilter: (value, record) => {
        return String(record.freight_type_prefix)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "TOTAL AMOUNT",
      dataIndex: "total_amount",
      key: "freight_type_prefix",

      onFilter: (value, record) => {
        return String(record.freight_type_prefix)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },

    {
      title: "DUE DATE",
      dataIndex: "due_date",
      key: "freight_type_prefix",

      onFilter: (value, record) => {
        return String(record.freight_type_prefix)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "freight_type_prefix",

      onFilter: (value, record) => {
        return String(record.freight_type_prefix)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
  ];
  const data = [
    {
      po_no: "1009",
      date: "02/03/2023",
      vendor: "hi",
      bill_no: "12233",
      total_amount: "343212",
      due_date: "12/12/2023",
      status: "ss",
    },
  ];

  return (
    <div>
      <div className="container-fluid container_fms pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Purchase</h5>
          </div>
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search"
              style={{ margin: "5px", borderRadius: "5px" }}
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
              total={parseInt(purchase?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
            />
          </div>

          <div className="col-4 ">
            <Button
              btnType="add"
              onClick={() => {
                setModalpurchase(true);
              }}
            >
              Add Purchase
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={data}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
          <MyPagination
            total={parseInt(purchase?.length)}
            current={current}
            showSizeChanger={true}
            pageSize={pageSize}
          />
        </div>
      </div>

      {/* add purchase */}

      <Custom_model
        show={modalpurchase}
        onHide={() => setModalpurchase(false)}
        header="Add Fright"
        footer={false}
        // {...props}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Add Purchase</h5>
            </div>
            <Form
              form={adForm}
              //   onFinish={(data) => {
              //     console.log("valuezzzzzzz", data);
              //     createvendortype()
              //   }}
              //   onFinishFailed={(error) => {
              //     console.log(error);
              //   }}
            >
              <div className="row my-4">
                <div className="col-4">
                  <label>PO No</label>
                  <Form.Item name="PO No">
                    <InputType
                      value={po_no}
                      // onChange={(e) => {
                      //   setServiceName(e.target.value);
                      //   setuniqueCode(false);
                      // }}
                    />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Purchase Date</label>
                  <Form.Item name="purchase date" className="mt-2">
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      defaultValue={moment(newDate)}
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e);
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Due Date</label>
                  <Form.Item name="purchase date" className="mt-2">
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      defaultValue={moment(newDate)}
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e);
                      }}
                    />
                  </Form.Item>
                </div>

                <div className="col-4">
                  <label>Vendor</label>
                  <Form.Item className="mt-2" name="vendor">
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
                      //   treeData={categoryTree}
                      placeholder="Please select"
                      treeDefaultExpandAll
                      //   onChange={onChangetree}
                      //   onSelect={onSelect}
                    />
                  </Form.Item>
                </div>

                <div className="col-4">
                  <label>Payment Mode</label>
                  <Form.Item className="mt-2" name="vendor">
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
                      //   treeData={categoryTree}
                      placeholder="Please select"
                      treeDefaultExpandAll
                      //   onChange={onChangetree}
                      //   onSelect={onSelect}
                    />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Credit Days</label>
                  <Form.Item className="mt-2" name="category">
                    <InputType value={due_date} />
                  </Form.Item>
                </div>

                <div
                  className="col-sm-4 pt-3 "
                  //  key={index.id}
                >
                  <label>Taxable</label>
                  <div className="">
                    {/* <Form.Item name="category_parent_id"  className="mt-2"> */}

                    <Checkbox
                    // name={index.name}
                    // value={index.id}
                    // onChange={(e) =>
                    //   handleSubModuleChange(e.target.checked, index.id)
                    // }
                    // checked={checkSubmodule(index.id)}
                    >
                      {/* {index.name} */}
                    </Checkbox>
                    {/* </Form.Item> */}
                  </div>
                </div>

                <div className="col-4">
                  <label>Tax No</label>
                  <Form.Item className="mt-2" name="category">
                    <InputType value={due_date} />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Bill No</label>
                  <Form.Item className="mt-2" name="category">
                    <InputType value={due_date} />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Amount</label>
                  <Form.Item className="mt-2" name="category">
                    <InputType value={due_date} />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Tax Amount</label>
                  <Form.Item className="mt-2" name="category">
                    <InputType value={due_date} />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Total Amount</label>
                  <Form.Item className="mt-2" name="category">
                    <InputType value={due_date} />
                  </Form.Item>
                </div>

                {/* <div className="row"> */}
                <div className="col-8 ">
                  <label> Remarks</label>
                  <div>
                    <Form.Item
                      className="mt-2"
                      name="remarks"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid  Name",
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
                        value={remarks}
                        //   onChange={(e) => {
                        //     setvendordescription(e.target.value);
                        //   }}
                      />
                    </Form.Item>
                  </div>
                </div>
                {/* </div> */}

                <div className="col-4">
                  <label>Attachments</label>
                  <Form.Item name="new" className="mt-2">
                    <FileUpload
                      multiple
                      listType="picture"
                      accept=".png,.jpg,.jpeg"
                      height={100}
                      // onPreview={handlePreview}
                      beforeUpload={false}
                      onChange={(file) => {
                        console.log("Before upload", file.file);
                        console.log("Before upload file size", file.file.size);

                        if (file.file.size > 1000 && file.file.size < 500000) {
                          setImg(file.file.originFileObj);
                          setImgSizeError(false);
                          console.log(
                            "Image must be greater than 1 kb and less than 500 kb"
                          );
                        } else {
                          console.log("failed beacuse of large size");
                          setImgSizeError(true);
                        }
                      }}
                    />
                  </Form.Item>
                  {imgSizeError ? (
                    <div>
                      <label style={{ color: "red" }}>
                        Please Select Image Size under 500kb
                      </label>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="row justify-content-center ">
                  <div className="col-auto">
                    <Button btnType="save">Save</Button>
                  </div>
                </div>
              </div>
            </Form>
          </>
        }
      >
        <Custom_model
          size={"sm"}
          show={successPopup}
          //   onHide={() => setSuccessPopup(false)}
          // success
        />
      </Custom_model>

      {/* view modal */}

      <Custom_model
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        View_list
        list_content={
          <div className="container-fluid p-3">
            <div className="row">
              <div className="col-9">
                <h5 className="lead_text">Purchase</h5>
              </div>
              <div className="col-3">
                <Button
                  btnType="add_borderless"
                  className="edit_button"
                  onClick={() => {
                    handleviewtoedit(viewpurchasemode);
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
                <p> Po No</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  1009
                  {/* {viewpaymentmode.name} */}
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p> Date</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  02/03/2023
                  {/* {viewpaymentmode.description} */}
                </p>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-4">
                <p> Vendor</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  hi
                  {/* {viewpaymentmode.name} */}
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p> Bill No</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  12233
                  {/* {viewpaymentmode.name} */}
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p> Total Amount</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  343212
                  {/* {viewpaymentmode.name} */}
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p>Due date</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  12/12/2023
                  {/* {viewpaymentmode.name} */}
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p>Status</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  ss
                  {/* {viewpaymentmode.name} */}
                </p>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center mt-5">
              <Button className="save_button">Print</Button>
            </div>
          </div>
        }
      />

      {/* Edit modal */}

      <Custom_model
        show={purchaseEditPopup}
        onHide={() => setPurchaseEditPopup(false)}
        View_list
        list_content={
          <div>
            <div className="container-fluid px-4 my-3">
              <div>
                <h5 className="lead_text">Edit Purchase</h5>
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
                    <label>Po No</label>
                    <Form.Item name="po_no">
                      <InputType
                        className="input_type_style w-100"
                        value={editpurchasepono}
                        onChange={(e) => {
                          seteditpurchasepono(e.target.value);
                          //   setErrormsg("");
                        }}
                      />
                    </Form.Item>
                  </div>
                  {/* <div className="col-12">
                    <label>Date</label>
                    <Form.Item 
                    name="date"
                    >
                     <InputType
                     value={editpurchasedate}
                     onChange={(e)=>{
                      seteditpurchasedate(e.target.value)
                     }}
                     />
                    </Form.Item>
                  </div> */}
                  <div className="col-12">
                    <label>Date</label>
                    <Form.Item name="date" className="mt-2">
                      <DatePicker
                        format={"DD-MM-YYYY"}
                        defaultValue={moment(newDate)}
                        value={selectedDate}
                        onChange={(e) => {
                          setSelectedDate(e);
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-12">
                    <label>Vendor</label>
                    <Form.Item name="vendor">
                      <InputType
                        value={editpurchasevendor}
                        onChange={(e) => {
                          seteditpurchasevendor(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-12">
                    <label>Bill No</label>
                    <Form.Item name="bill_no">
                      <InputType
                        value={editpurchasebillno}
                        onChange={(e) => {
                          seteditpurchasebillno(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-12">
                    <label>Total Amount</label>
                    <Form.Item name="date">
                      <InputType
                        value={editpurchasetotalamount}
                        onChange={(e) => {
                          seteditpurchasetotalamount(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-12">
                    <label>Due Date</label>
                    <Form.Item name="due date" className="mt-2">
                      <DatePicker
                        format={"DD-MM-YYYY"}
                        defaultValue={moment(newDate)}
                        value={selectedDate}
                        onChange={(e) => {
                          setSelectedDate(e);
                        }}
                      />
                    </Form.Item>
                  </div>

                  {/* <div className="col-12">
                    <label>Due Date</label>
                    <Form.Item 
                    name="due_date"
                    >
                     <InputType
                     value={editpurchaseduedate}
                     onChange={(e)=>{
                      seteditpurchaseduedate(e.target.value)
                     }}
                     />
                    </Form.Item>
                  </div> */}
                  <div className="col-12">
                    <label>Status</label>
                    <Form.Item name="status">
                      <InputType
                        value={editpurchasestatus}
                        onChange={(e) => {
                          seteditpurchasestatus(e.target.value);
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
    </div>
  );
}
