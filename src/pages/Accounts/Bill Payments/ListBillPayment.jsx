import { Input, Select } from "antd";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/button";
import Custom_model from "../../../components/custom_modal/custom_model";
import MyPagination from "../../../components/Pagination/MyPagination";
import TableData from "../../../components/table/table_data";
import { ROUTES } from "../../../routes";

function ListBillPayment() {
  const navigate = useNavigate();
  const [oppnew, setOppnew] = useState([]);
  const [numOfItems, setNumOfItems] = useState("25");
  const [current, setCurrent] = useState(1); // current page
  const [searchSource, setSearchSource] = useState(""); // search by text input
  const [totalCount, setTotalcount] = useState("");
  const [AllinvoiceData, setAllInvoiceData] = useState();
  const [invoiceData, setInvoiceData] = useState();

  const columns = [
    {
      title: "Sl no",
      dataIndex: "slno",
      key: "slno",
    },
    {
      title: "BILL NO",
      dataIndex: "bill_no",
      key: "bill_no",
    },
    {
      title: "CURRENCY",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      align: "right",
    },
    {
      title: "AMOUNT(KWD)",
      dataIndex: "amountlx",
      key: "amountlx",
      align: "right",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "ACTION",
      width: "15%",
      render: (data, index) => {
        console.log("mere index", index);
        return (
          <div className="d-flex justify-content-center gap-3">
            <div className="editcolor">
              <FaEdit
                fontSize={15}
                onClick={() => {
                  navigate(`${ROUTES.EDIT_BILL_PAYMENT}/${index.slno}`);
                }}
              />
            </div>
            <div className="editcolor">
              <MdPageview
                fontSize={18}
                // onClick={()=>viewprogressoppurtunity(index)}
                onClick={() => {
                  //   handleView(index);
                }}
              />
            </div>
            {/* <div className="editcolor">
              < />
            </div> */}
          </div>
        );
      },
      align: "center",
    },
  ];
  const data = [
    {
      slno: 1,
      bill_no: "BILL0001",
      currency: "Indian Rupee",
      amount: 1000,
      amountlx: 2000,
    },
  ];
  return (
    <div className="container-fluid">
      <div className="">
        <div className="row">
          <div className="col-12">
            <div className="container-fluid lead_list  my-3 py-3">
              {/* Bill payment listing section One */}

              <div>
                <div className="row flex-wrap">
                  <div className="col">
                    <h5 className="lead_text">Bill Payments</h5>
                  </div>
                  {/* {AllinvoiceData && (
                    <Leadlist_Icons
                      datas={data12}
                      columns={filteredColumns}
                      items={data12}
                      xlheading={Invoice_header}
                      filename="data.csv"
                      chechboxes={
                        <Checkbox.Group
                          onChange={onChange}
                          value={selectedColumns}
                        >
                          {columnsKeys.map((column) => (
                            <li>
                              <Checkbox value={column} key={column}>
                                {column}
                              </Checkbox>
                            </li>
                          ))}
                        </Checkbox.Group>
                      }
                      name="Invoice"
                    />
                  )} */}
                </div>
                <div className="row p-1" style={{ backgroundColor: "#f4f4f7" }}>
                  <div className="col-3">
                    <Input.Search
                      placeholder="Search by "
                      style={{ margin: "5px", borderRadius: "5px" }}
                      value={searchSource}
                      onChange={(e) => {
                        setSearchSource(e.target.value ? [e.target.value] : []);
                      }}
                      onSearch={(value) => {
                        setSearchSource(value);
                      }}
                    />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-4   px-3">
                    <Select
                      // defaultValue={"25"}
                      bordered={false}
                      className=" page_size_style"
                      value={numOfItems}
                      onChange={(e) => {
                        setNumOfItems(e);
                        setCurrent(1);
                      }}
                    >
                      <Select.Option value="25">
                        Show{" "}
                        <span style={{ color: "lightgray" }} className="ms-1">
                          |
                        </span>
                        <span style={{ color: "#2f6b8f" }} className="ms-2">
                          25
                        </span>{" "}
                      </Select.Option>
                      <Select.Option value="50">
                        {" "}
                        Show{" "}
                        <span style={{ color: "lightgray" }} className="ms-1">
                          |
                        </span>
                        <span style={{ color: "#2f6b8f" }} className="ms-2">
                          50
                        </span>{" "}
                      </Select.Option>
                      <Select.Option value="100">
                        {" "}
                        Show{" "}
                        <span style={{ color: "lightgray" }} className="ms-1">
                          |
                        </span>
                        <span style={{ color: "#2f6b8f" }} className="ms-2">
                          100
                        </span>{" "}
                      </Select.Option>
                    </Select>
                  </div>
                  <div className="col-4 d-flex align-items-center justify-content-center">
                    {invoiceData && (
                      <MyPagination
                        total={parseInt(invoiceData?.length)}
                        current={current}
                        pageSize={numOfItems}
                        onChange={(current, pageSize) => {
                          setCurrent(current);
                        }}
                      />
                    )}
                  </div>
                  {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 col-12"></div> */}
                  <div className="col-4 d-flex justify-content-end"></div>
                </div>
                <div className="datatable">
                  {/* {AllinvoiceData && ( */}
                  <TableData
                    data={data}
                    // data={allLeadList}
                    // data={OpportunityList}
                    columns={columns}
                    custom_table_css="table_lead_list"
                  />
                  {/* )} */}
                </div>
                <div className="d-flex py-2 justify-content-center">
                  {invoiceData && (
                    <MyPagination
                      total={parseInt(invoiceData?.length)}
                      current={current}
                      pageSize={numOfItems}
                      onChange={(current, pageSize) => {
                        setCurrent(current);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* <CustomModel
              show={cancelPopup}
              onHide={() => {
                setCancelPopup(false);
              }}
              centered
              View_list
              list_content={
                <div>
                  <div className="container">
                    <h4 style={{ color: "#0891d1" }}>Cancel Invoice</h4>
                    <Form
                      form={AddForm}
                      onFinish={(value) => {
                        console.log("On finishing", value);
                        cancelInvoice(value);
                      }}
                    >
                      <div className="row">
                        <div className="col-12">
                          <div className="col-12">
                            <div className="">
                              <div className="">
                                <label>Reason For Cancellation</label>
                                <Form.Item name={"cancel_reason"}>
                                  <TextArea />
                                </Form.Item>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 d-flex justify-content-center">
                            <Button btnType="save" type="submit">
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              }
            /> */}
            {/* <CustomModel
              success
              show={successPopup}
              onHide={() => {
                setSuccessPopup(false);
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListBillPayment;
