import React, { useState } from "react";
import Card from "../../components/dashboard/card";
import styles from "./dashboard.module.scss";
import { IoArrowUpOutline } from "react-icons/io5";
import BarChart from "../../components/dashboard/charts/bar-chart";
import FunnelChart from "../../components/dashboard/charts/funnel-chart";
import GeoChart from "../../components/dashboard/charts/geo-chart";
import PieChart from "../../components/dashboard/charts/pie-chart";
import { Table } from "antd";

function Dashboard() {
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
        <div className="col-12 col-lg-8">
          <div className={`${styles.summaryWrapper}`}>
            <Card className={`${styles.cartItem}`}>
              <div>
                <div className={`text-center ${styles.cardTitle}`}>Lead</div>
                <div className={`text-center ${styles.cardSubText}`}>100</div>
              </div>
            </Card>
            <Card className={`${styles.cartItem}`}>
              <div>
                <div className={`text-center ${styles.cardTitle}`}>
                  Quotations
                </div>
                <div className={`text-center ${styles.cardSubText}`}>100</div>
              </div>
            </Card>
            <Card className={`${styles.cartItem}`}>
              <div>
                <div className={`text-center ${styles.cardTitle}`}>Jobs</div>
                <div className={`text-center ${styles.cardSubText}`}>100</div>
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
          <div className="container-fluid">
            <div className="row mt-2">
              <div className="col-12 col-md-6">
                <div
                  style={{ height: "400px" }}
                  className="card rounded shadow-sm p-3"
                >
                  <FunnelChart />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div
                  style={{ height: "400px" }}
                  className="card rounded shadow-sm p-3"
                >
                  <GeoChart />
                </div>
              </div>
              <div className="col-12 col-md-6 mt-3">
                <div
                  style={{ height: "400px" }}
                  className="card rounded shadow-sm p-3"
                >
                  <Table
                    dataSource={tableDataSource}
                    columns={tableColumns}
                    bordered
                    pagination={false}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 mt-3">
                <div
                  style={{ height: "400px" }}
                  className="card rounded shadow-sm"
                >
                  <BarChart />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div style={{ height: "450px" }}>
            <div className="card-rounded shadow-sm" style={{ height: "450px" }}>
              <BarChart />
            </div>
          </div>
          <div className="mt-4" style={{ height: "450px" }}>
            <div className="card-rounded shadow-sm" style={{ height: "450px" }}>
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
