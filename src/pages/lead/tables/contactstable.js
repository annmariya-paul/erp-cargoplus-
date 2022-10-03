import "./table.css"
function ContactTable() {
  return (
    <div class="table-responsive">
      <table className="table table-borderless ">
        <thead className="thead">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Mobile</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Testname</td>
            <td>test@gmail.com</td>
            <td>1234567890</td>
            <td>0987654321</td>
            <td>employee</td>
          </tr>
          <tr>
            <td>2</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ContactTable;
