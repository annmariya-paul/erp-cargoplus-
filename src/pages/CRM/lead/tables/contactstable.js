import "./table.scss";
import TableData from "../../../../components/table/table_data";
import { useEffect, useState } from "react";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import { message } from "antd";
function ContactTable() {
  const [contactTable, setContactTable] = useState();

  const getcontacttable = () => {
    PublicFetch.get(`${CRM_BASE_URL}/lead/1/contact`)
      .then((res) => {
        if (res.data.success) {
          setContactTable(res.data.data);
        } else {
          message.error("Failed to fetch data");
        }
      })
      .catch((err) => {
        message.error("Error While Getting Data");
      });
  };

  useEffect(() => {
    getcontacttable();
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "contact_id",
      key: "contact_id",
    },
    {
      title: "NAME",
      dataIndex: "contact_person_name",
      key: "contact_email",
    },
    {
      title: "EMAIL",
      dataIndex: "contact_email",
      key: "contact_email",
    },
    {
      title: "PHONE",
      dataIndex: "contact_phone_1",
      key: "contact_phone_1",
    },
    {
      title: "MOBILE",
      dataIndex: "contact_phone_2",
      key: "contact_phone_2",
    },
    {
      title: "DESIGNATION",
      dataIndex: "contact_designation",
      key: "contact_designation",
    },
  ];

  const data = [
    {
      serialno: "1",
      name: "Test",
      email: "test@gmail.com",
      phone: "8989898956",
      mobile: "3434466753",
      designation: "Manager",
      key: "1",
    },
    {
      serialno: "1",
      name: "Testhr",
      email: "hrtest@gmail.com",
      phone: "8989898956",
      mobile: "3434466753",
      designation: "HR",
      key: "2",
    },
  ];
  return (
    <div className="datatable">
      <TableData
        data={contactTable}
        columns={columns}
        custom_table_css="contact_table"
      />
    </div>
  );
}

export default ContactTable;
