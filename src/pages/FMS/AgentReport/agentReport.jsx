import "./agentReport.scss";
import React, { useState,useEffect } from "react";
import { DatePicker, Input, Select } from "antd";
import TableData from "../../../components/table/table_data";
import SelectBox from "../../../components/Select Box/SelectBox";
import Button from "../../../components/button/button";
import { ACCOUNTS } from "../../../api/bootapi";
import PublicFetch from "../../../utils/PublicFetch";
import { FaFileExcel } from "react-icons/fa";

export default function AgentReport() {
  const [serialNo, setserialNo] = useState(1);
  const [allagents,setAllagents]= useState("")

  const getallagents = async () => {
    try {
      const allagents = await PublicFetch.get(
        `${process.env.REACT_APP_BASE_URL}/agents`
      );
      console.log("getting all agent details", allagents.data.data);
      setAllagents(allagents.data.data)
    
    } catch (err) {
      console.log("error to agent details", err);
    }
  };


  useEffect(() => {
    getallagents();
  }, []);



  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "8%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "JOB NO",
      dataIndex: "job_no",
      key: "job_no",
      width: "18%",
      //   filteredValue: [searchedText],
      //   onFilter: (value, record) => {
      //     return String(record.freight_type_name  || nameSearch)
      //       .toLowerCase()
      //       .includes(value.toLowerCase());
      //   },
      align: "center",
    },
    {
      title: "CUSTOMER",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "CURRENCY",
      dataIndex: "currency",
      key: "currency",
      width: "18%",
    },
    {
      title: "TOTAL COST (Fx)",
      dataIndex: "totalcost_fx",
      key: "totalcost_fx",
      align: "center",
      width: "16%",
    },
    {
      title: "TOTAL COST (Lx)",
      dataIndex: "totalcost_lx",
      key: "totalcost_lx",
      align: "center",
      width: "16%",
    },
  ];
  const data = [
    {
      job_no: "00111",
      customer: "Test",
      currency: "US Dollar",
      totalcost_fx: "7675",
      totalcost_lx: "9877",
    },
  ];



  return (
    <>
      <div className="container-fluid container_agent_report py-3">
        <div className="row flex-wrap">
          <h5 className="lead_text">Agent Report</h5>
        </div>
        <div className="row">
          <div className="col-sm-3 col-12">
            <p>Agent</p>
            {/* <Form.Item
                    name="job_no"
                    // onChange={(e) => setName(e.target.value)}
                  > */}
            <SelectBox
               showSearch={true}
               allowClear
              //  value={vendortyp}
               optionFilterProp="children"
              //  onChange={(e) => {
              //    setvendortyp(e);
              //  }}
            >
              {allagents && allagents.length>0 && 
              allagents.map((itm,indx)=>{
                console.log("agent namee",itm)
               return(
                
                <Select.Option
               key={itm.agent_id}
               id={itm.agent_id}
               value={itm.agent_id}
                >
                  {itm.crm_v1_vendors.vendor_name}
                </Select.Option>
               )
              })}
             
            </SelectBox>
            {/* </Form.Item> */}
          </div>
         
          <div className="col-sm-3 col-6">
            <p>
              Date From
            </p>
            <div className="mt-2">
              <DatePicker></DatePicker>
            </div>
          </div>

          {/* <div className="col-1 pt-3 d-flex justify-content-end">To</div> */}
          <div className="col-sm-3 col-6">
            <p>To</p>
            <div className="mt-2">
              <DatePicker></DatePicker>
            </div>
          </div>
          <div className="col-sm-3 d-flex mt-4 pt-3 px-2 justify-content-center gap-3">
            <div>
            <Button btnType="save" >Search</Button>
            </div>
            <div className="icon_margin">
            <li className="icon-border">
            <a className="icon icon_color" href="#">
              <FaFileExcel />
            </a>
          </li>
          </div>
          </div>
         
          {/* <div className="col-sm-1 mt-4  pt-3d-flex justify-content-center">
          <li className="icon-border">
            <a className="icon" href="#">
              <FaFileExcel />
            </a>
          </li>
          </div> */}
        </div>
      </div>
      <div className="container-fluid container_agent_report py-2">
        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={data}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
      </div>
    </>
  );
}
