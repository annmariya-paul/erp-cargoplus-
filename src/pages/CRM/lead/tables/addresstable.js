import "./table.scss";
import TableData from "../../../../components/table/table_data";
function AddressTable() {
  const columns = [
    {
      title: "#",
      dataIndex: "serialno",
      key: "key",
    },
    {
      title: "TITLE",
      dataIndex: "title",
      key: "key",
    },
    {
      title: "ADDRESS LINE 2",
      dataIndex: "addressline2",
      key: "key",
    },
    {
      title: "PIN",
      dataIndex: "pincode",
      key: "key",
    },
  ];

  const data = [
    {
      serialno: "1",
      title: "test",
      addressline2: "Reon technologies Koratty",
      pincode: "123 456",
      key: "1",
    },
    {
      serialno: "2",
      title: "test1",
      addressline2: "Reon technologies Koratty, thrissur",
      pincode: "223 456",
      key: "2",
    },
    {
      serialno: "3",
      title: "test1",
      addressline2: "Reon technologies Koratty, thrissur",
      pincode: "223 456",
      key: "3",
    },
  ];
  return (
    <div className="datatable">
      <TableData
        data={data}
        columns={columns}
        custom_table_css="addresstable"
      />
    </div>
  );
}

export default AddressTable;
