import "./table.scss";
import React, { useState, useEffect } from "react";
import TableData from "../../../../components/table/table_data";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import { message } from "antd";



function AddressTable() {


 
  const [value, setValue] = useState();

  const getAllAddress = async () => {
    try {
      const allAddress = await PublicFetch.get(
        `${CRM_BASE_URL}/lead/1/address`
      );
      if (allAddress.data.success) {
        
        setValue(allAddress.data.data);
        console.log("hello data",allAddress.data.data)
      } else {
        message.error("fetch data error");
      }
      console.log("All leads res : ", allAddress);
    } catch (err) {
      console.log("error while getting all leads: ", err);
    }
  };

  useEffect(() => {
    getAllAddress();
  }, []);






  const columns = [
    {
      title: "#",
      dataIndex: "serialno",
      key: "serialno",
    },
    {
      title: "TITLE",
      dataIndex: "address_title",
      key: "address_title",
    },
    {
      title: "ADDRESS",
      dataIndex: "address_content",
      key: "address_content",
    },
    {
      title: "PIN",
      dataIndex: "address_pin",
      key: "address_pin",
    },
    {
      title: "CONTACT",
      dataIndex: "address_contact",
      key: "address_contact",
    }
  ];

  // const data = [
  //   {
  //     serialno: "1",
  //     address_title: {title},
  //     address_content: {address_data},
  //     address_pin: {pincode},
  //     address_contact:{value},
  //     key: "1",
  //   },
   
  // ];
  return (
    <div className="datatable">
      <TableData
        data={value}
        columns={columns}
        custom_table_css="addresstable"
      />
    </div>
  );
}

export default AddressTable;
