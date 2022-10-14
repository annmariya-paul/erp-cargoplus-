import "./table.scss";
import TableData from "../../../../components/table/table_data";
function ContactTable() {
  const columns = [
    {
      title: "#",
      dataIndex: "serialno",
      key: "key",
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "key",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "key",
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "key",
    },
    {
      title: "MOBILE",
      dataIndex: "mobile",
      key: "key",
    },
    {
      title: "DESIGNATION",
      dataIndex: "designation",
      key: "key",
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
        data={data}
        columns={columns}
        custom_table_css="contact_table"
      />
    </div>
  );
}

export default ContactTable;
