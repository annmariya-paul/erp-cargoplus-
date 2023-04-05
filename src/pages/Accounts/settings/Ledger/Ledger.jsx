import { Input, Select } from "antd";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import Button from "../../../../components/button/button";
import MyPagination from "../../../../components/Pagination/MyPagination";
import TableData from "../../../../components/table/table_data";

function Ledger() {
  const [searchedText, setSearchedText] = useState("");
  const [totalledger, setTotalLedger] = useState();
  const [numOfItems, setNumOfItems] = useState("25");
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState("25");
  const [slno, setSlno] = useState(1);

  const columns = [
    {
      title: "Slno",
      dataIndex: "slno",
      key: "slno",
      width: "2%",
      render: (data, index, no) => {
        return (
          <div>
            <lable>{slno + no}</lable>
          </div>
        );
      },
    },
    {
      title: "CATEGORY NAME",
      dataIndex: "expense_category_name",
      key: "expense_category_name",
      width: "8%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.expense_category_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.expense_category_description)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
      // align: "center",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "expense_category_description",
      key: "expense_category_description",
      width: "15%",
      //   filteredValue: [searchSource],
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "ACTION",
      width: "5%",
      render: (data, index) => {
        console.log("mere index", index);
        return (
          <div className="d-flex editcolor justify-content-center gap-4 align-items-center">
            {/* <div className="editcolor "> */}
            <FaEdit
              fontSize={17}
              onClick={() => {
                // expEdit(index);
                // setUniqueEditName(false);
              }} // handleEditedclick(index);
            />
            <div
              className="viewIcon m-0"
              //   onClick={() => handleViewClick(index)}
            >
              <MdPageview style={{ marginLeft: 15, marginRight: 15 }} />
            </div>

            {/* </div> */}
            {/* <div className="editcolor">
              <MdDelete />
            </div> */}
          </div>
        );
      },
      align: "center",
    },
  ];

  const data = [];

  return (
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-4">
          <h5 className="lead-text">Ledger</h5>
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
        <div className="col-4 d-flex justify-content-end"></div>
      </div>
      <div className="row my-3 ">
        <div className="col-4 px-3">
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

        <div className="col-4 d-flex   align-items-center justify-content-center">
          {totalledger?.length > 0 && (
            <MyPagination
              total={parseInt(totalledger?.length)}
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
        {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 col-12"></div> */}
        <div className="col-4 d-flex justify-content-end">
          {/* <div className=""> */}
          {/* <Link style={{ color: "white" }}> */}
          <Button
            onClick={() => {
              //   setAddPopup(true);
              //   setUniqueName(false);
              // setInvoice_id(index.invoice_id);
              //   AddForm.resetFields();
            }}
            btnType="save"
          >
            New Ledger
          </Button>
          {/* </Link> */}
        </div>
        <div className="col-12">
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
        </div>
      </div>
    </div>
  );
}

export default Ledger;
