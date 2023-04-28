import "./dashboard.module.scss";
import React, { useState } from "react";
import Card from "../../components/dashboard/card";
import styles from "./dashboard.module.scss";
import { IoArrowUpOutline } from "react-icons/io5";
import BarChart from "../../components/dashboard/charts/bar-chart";
import FunnelChart from "../../components/dashboard/charts/funnel-chart";
import GeoChart from "../../components/dashboard/charts/geo-chart";
import PieChart from "../../components/dashboard/charts/pie-chart";
// import { Table } from "antd";
import { CRM_BASE_URL, CRM_BASE_URL_FMS } from "../../api/bootapi";
import PublicFetch from "../../utils/PublicFetch";
import { useEffect } from "react";
import TableData from "../../components/table/table_data";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

function Dashboard() {
  const navigate = useNavigate();
  const [leadCount, setLeadCount] = useState();
  const [quotationCount, setQuotationCount] = useState();
  const [jobcount, setJobCount] = useState();
  const [invoiceCount, setInvoiceCount] = useState();
  const [searchInvoice, setSearchInvoice] = useState();
  console.log("count", leadCount);

  //  const GetLeadData = () => {
  //    PublicFetch.get(
  //      `${CRM_BASE_URL}/lead?startIndex=0&noOfItems=10`
  //    )
  //      .then((res) => {
  //        if (res?.data?.success) {
  //          setLeadCount(res?.data?.data?.totalCount);
  //        } else {
  //          console.log("Failed to load data");
  //        }
  //      })
  //      .catch((err) => {
  //        console.log("Errror while getting data", err);
  //      });
  //  };

  const getAllQuotation = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/quotation?startIndex=0&noOfItems=10`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setQuotationCount(res.data.data.totalCount);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const getAllJobs = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/job?startIndex=0&noOfItems=10`)
      .then((res) => {
        if (res.data.success) {
          setJobCount(res.data.data.totalCount);
        } else {
          console.log("Failed to load data");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getAllInvoice = (name) => {
    PublicFetch.get(
      `${CRM_BASE_URL_FMS}/invoice?startIndex=0&noOfItems=100&search=${name}`
    )
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success of res", res?.data?.data?.length);
          setInvoiceCount(res?.data?.data?.invoiceCount);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  useEffect(() => {
    //  GetLeadData();
    getAllQuotation();
    getAllJobs();
    getAllInvoice(searchInvoice);
    setInvoiceCount();
  }, [searchInvoice]);

  const tableColumns = [
    {
      title: "Deal Name",
      dataIndex: "dealName",
      key: "dealName",
    },
    {
      title: "Stage",
      dataIndex: "stage",
      key: "stage",
      render: (text) => {
        if (text === "Closed Lost") {
          return <div style={{ background: "#ed7670" }}>{text}</div>;
        } else if (text === "Closed Won") {
          return <div style={{ background: "#8effd1" }}>{text}</div>;
        } else {
          return <div>{text}</div>;
        }
      },
    },
    {
      title: "Expected Revenue",
      dataIndex: "expectedRevenue",
      key: "expectedRevenue",
      render: (text) => {
        return <div className="text-end">{text}</div>;
      },
    },
  ];

  const tableDataSource = [
    {
      key: 1,
      dealName: "Chemel",
      stage: "Value Proposition",
      expectedRevenue: "$400",
    },
    {
      key: 2,
      dealName: "Chemel",
      stage: "Closed Won",
      expectedRevenue: "$400",
    },
    {
      key: 4,
      dealName: "Chemel",
      stage: "Value Proposition",
      expectedRevenue: "$400",
    },
    {
      key: 3,
      dealName: "Chemel",
      stage: "Closed Lost",
      expectedRevenue: "$400",
    },
    {
      key: 5,
      dealName: "Chemel",
      stage: "Value Proposition",
      expectedRevenue: "$400",
    },
    {
      key: 6,
      dealName: "Chemel",
      stage: "Value Proposition",
      expectedRevenue: "$400",
    },
    {
      key: 7,
      dealName: "Chemel",
      stage: "Value Proposition",
      expectedRevenue: "$400",
    },
    {
      key: 8,
      dealName: "Chemel",
      stage: "Value Proposition",
      expectedRevenue: "$400",
    },
  ];

  return (
    <div className={`container-lg-fluid container-2xl`}>
      <div className="row">
        <div className="col-12 col-xl-12 col-lg-12">
          <div className={`${styles.summaryWrapper}`}>
            <Card className={`${styles.cartItem}`}>
              <div>
                <div className={`text-center ${styles.cardTitle}`}>
                  Quotations
                </div>
                <div
                  onClick={() => {
                    navigate(`${ROUTES.QUATATIONS}`);
                  }}
                  className={`text-center ${styles.cardSubText}`}
                >
                  {quotationCount}
                </div>
              </div>
            </Card>
            <Card className={`${styles.cartItem}`}>
              <div>
                <div className={`text-center ${styles.cardTitle}`}>Jobs</div>
                <div
                  onClick={() => {
                    navigate(`${ROUTES.LIST_JOB}`);
                  }}
                  className={`text-center ${styles.cardSubText}`}
                >
                  {jobcount}
                </div>
              </div>
            </Card>
            <Card className={`${styles.cartItem}`}>
              <div>
                <div className={`text-center ${styles.cardTitle}`}>
                  Invoices
                </div>
                <div
                  onClick={() => {
                    navigate(`${ROUTES.INVOICE_LIST}`);
                  }}
                  className={`text-center ${styles.cardSubText}`}
                >
                  {invoiceCount}
                </div>
              </div>
            </Card>
            <Card className={`${styles.cartItem}`}>
              <div>
                <div className={`text-center ${styles.cardRevenueTitle}`}>
                  Sales Revenue
                </div>
                <div className={`text-center ${styles.cardRevenueSubText}`}>
                  <div className="d-flex align-items-center gap-1 justify-content-center">
                    <IoArrowUpOutline />
                    100M
                  </div>
                </div>
                <div className={`text-center ${styles.cardRevenueFooter}`}>
                  Actual Revenue | Target Revenue
                </div>
                <div className={`text-center ${styles.cardRevenueFooter}`}>
                  4.09M | 139.50K
                </div>
              </div>
            </Card>
          </div>

          <div className="container-fluid p-0 m-0">
            <div className="row">
              <div className="col-12 col-xl-4 col-lg-6 col-md-12 mt-2">
                <div
                  style={{ height: "450px" }}
                  className="card rounded shadow-sm p-3"
                >
                  <FunnelChart />
                </div>
              </div>
              <div className="col-12 col-xl-4 col-lg-6 col-md-12 mt-2">
                <div
                  style={{ height: "450px" }}
                  className="card rounded shadow-sm p-3"
                >
                  <GeoChart />
                </div>
              </div>
              <div className="col-12 col-xl-4 col-lg-6 col-md-12 mt-2">
                <div
                  style={{ height: "450px" }}
                  className="card rounded shadow-sm"
                >
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center pt-3">
                      <label>Agent Wise Cost</label>
                    </div>
                  </div>
                  <BarChart />
                </div>
              </div>
              <div className="col-12 col-xl-4 col-lg-6 col-md-12 mt-2">
                <div
                  style={{ height: "450px" }}
                  className="card rounded shadow-sm px-1"
                >
                  <TableData
                    data={tableDataSource}
                    columns={tableColumns}
                    bordered
                    pagination={false}
                    // custom_table_css="table_height"
                  />
                </div>
              </div>
              <div className="col-12 col-xl-4 col-lg-6 col-md-12 mt-2">
                <div
                  style={{ height: "450px" }}
                  className="card rounded shadow-sm"
                >
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center pt-3">
                      <label>job by Agent</label>
                    </div>
                  </div>
                  <BarChart />
                </div>
              </div>
              <div className="col-12 col-xl-4 col-lg-6 col-md-12 mt-2">
                <div
                  style={{ height: "450px" }}
                  className="card rounded shadow-sm"
                >
                  <PieChart />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-xl-4 col-lg-5 col-md-12">
            <div className="col-12 col-xl-12 col-lg-12 ">
              <div style={{ height: "450px" }}>
                <div
                  className="card-rounded shadow-sm"
                  style={{ height: "450px" }}
                >
                  <BarChart />
                </div>
              </div>
              <div className="mt-4" style={{ height: "450px" }}>
                <div
                  className="card-rounded shadow-sm"
                  style={{ height: "450px" }}
                >
                  <PieChart />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
