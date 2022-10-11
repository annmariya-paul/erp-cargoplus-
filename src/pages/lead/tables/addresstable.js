import "./table.css";
function AddressTable() {
  return (
    <div className="table-responsive">
      <table className="table table-borderless">
        <thead className="thead">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Address Line 2</th>
            <th>PIN</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Test</td>
            <td>Testtest </td>
            <td>000-000</td>
          </tr>
          <tr>
            <td>2</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AddressTable;
