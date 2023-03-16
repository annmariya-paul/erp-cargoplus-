import { Input, Select,Checkbox } from "antd";
import React, { useState } from "react";
import moment from "moment";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes";
import Button from "../../../components/button/button";
import TableData from "../../../components/table/table_data";
import Custom_model from "../../../components/custom_modal/custom_model";
import { ACCOUNTS } from "../../../api/bootapi";
import { useEffect } from "react";
import PublicFetch from "../../../utils/PublicFetch";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";

export default function JobPayments() {
  const [serialNo, setserialNo] = useState(1);
  const [searchedText,setSearchedText] = useState();
  const [allJobPay,setAllJobPay] = useState();

  const [jobpaymentList, setJobpaymentList] = useState([]);

  const getAllJobPayments = () => {
    PublicFetch.get(`${ACCOUNTS}/job-payments?startIndex=0&noOfItems=10`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("success of job", res.data.data);
          setJobpaymentList(res.data.data)
          let temp = [];
          res.data.data.forEach((item, index) => {
            temp.push({
              job_pay_id:item.job_pay_id,
              job_pay_voucher_no: item.job_pay_voucher_no,
              job_pay_voucher_date:item.job_pay_voucher_date,
              job_no: item.fms_v1_jobs.job_number,
              job_pay_lead: item.crm_v1_leads.lead_customer_name,
              advance_amount: item.job_pay_advance_amount_fx.toFixed(2),
            });
          });
          setAllJobPay(temp);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(()=>{getAllJobPayments();},[])

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "8%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "VOUCHER NO",
      dataIndex: "job_pay_voucher_no",
      key: "job_pay_voucher_no",
      width: "13%",
    },
    {
      title: "VOUCHER DATE",
      dataIndex: "job_pay_voucher_date",
      key: "job_pay_voucher_date",
      width: "14%",
      render: (record) => {
        return (
          <div>{moment(record.job_pay_voucher_date).format("DD-MM-YYYY")}</div>
        );
      },
    },
    {
      title: "JOB NO",
      dataIndex: "job_no",
      width: "16%",
      key: "job_no",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.job_no).toLowerCase().includes(value.toLowerCase()) ||
          String(record.job_pay_lead)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.job_pay_voucher_no)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
    },
    {
      title: "LEAD",
      dataIndex: "job_pay_lead",
      key: "job_pay_lead",
    },
    {
      title: "ADVANCE AMOUNT",
      dataIndex: "advance_amount",
      key: "advance_amount",
      width: "15%",
      align: "right",
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      width: "15%",
      render: (data, index) => {
        return (
          <div className=" d-flex justify-content-center align-items-center gap-3">
            <Link to={`${ROUTES.EDIT_JOBPAYMENT}/${index.job_pay_id}`}>
              <div
                className="actionEdit"
                // onClick={() => handleEditCategoryPhase1(index)}
              >
                <FaEdit />
              </div>
            </Link>
            <Link to={`${ROUTES.VIEW_JOBPAYMENT}/${index.job_pay_id}`}>
              {" "}
              <div
                className="actionEdit"
                // onClick={() => handleViewCategory(index)}
              >
                <MdPageview />
              </div>
            </Link>

            <div className="actionDel">
              <FaTrash />
            </div>
          </div>
        );
      },
      align: "center",
    },
  ];

  const data = [
    {
      voucher_no: "001",
      voucher_date: "01-01-2023",
      job_no: "job001",
      lead: "Test name",
      advance_amount:"1000",
    },
  ];


  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
  const data12 = jobpaymentList?.map((item) => [
    item.action,
    item.opportunity_type,
    item.opportunity_from,
    item.opportunity_lead_id,
    item.opportunity_source,
    item.opportunity_party,
  ]);
  const OppHeads = [
    [
      "opportunity_id",
      "opportunity_type",
      "opportunity_source",
      "opportunity_validity",
      "opportunity_description",
      "opportunity_status",
      "opportunity_amount",
    ],
  ];
  const onChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };
  return (
    <>
      <div className="container-fluid container_fms pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Job Payments</h5>
          </div>
         
          <Leadlist_Icons
            datas={jobpaymentList}
            columns={columns}
            items={data12}
            xlheading={OppHeads}
            filename="data.csv"
            chechboxes={
              <Checkbox.Group onChange={onChange} value={selectedColumns}>
                {columnsKeys.map((column) => (
                  <li>
                    <Checkbox value={column} key={column}>
                      {column}
                    </Checkbox>
                  </li>
                ))}
              </Checkbox.Group>
            }
          />
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
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
        </div>
        <div className="row my-3">
          <div className="col-4 ">
            <Select
              bordered={false}
              className="page_size_style"
              //   value={pageSize}
              //   onChange={(e) => setPageSize(e)}
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
            {/* <MyPagination
              total={parseInt(paymentmode?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
            /> */}
          </div>

          <div className="col-4 ">
            <Link to={ROUTES.ADD_JOBPAYMENT}>
              <Button btnType="add">Add Job Payment</Button>
            </Link>
          </div>
        </div>
        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={allJobPay}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
          {/* <MyPagination
            total={parseInt(paymentmode?.length)}
            current={current}
            showSizeChanger={true}
            pageSize={pageSize}
          /> */}
        </div>
      </div>
    </>
  );
}
