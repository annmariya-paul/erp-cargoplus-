import "./invoicetemp2style.scss";

function Invoicetemplate2({
  invoice_details1,
  invoice_details2,
  invoice_table_header,
  invoice_table_data,
  amount_in_words,
  sub_total,
  total,
  permanent_made,
  balance_due,
  invoice_no,
  Invoice_type,
  invoice_number,
  billto,
}) {
  return (
    <>
      <div>
        <div>
          <table className="invoice_header2">
            <thead className="invoice_header border-0">
              <div className="d-flex justify-content-center">
                <h1 className="header_invoicename">PROFORMA INVOICE</h1>
              </div>

              <tr className="invoice_header">
                <div className="d-flex ">
                  <div className=" col-3">
                    <div className="header__address_content">
                      <label className="label_color1"> Invoice To</label>
                      <div className="address_width font_weight ">
                        <br />
                        Customer Name
                        <br />
                        Customer Address
                        <br />
                        Customer Email
                      </div>
                    </div>
                  </div>
                  <div className="col-3 ">
                    <div className="header__address_content">
                      <label className="label_color1"> Delivery To</label>
                      <div className="address_width font_weight ">
                        <br />
                        Customer Name
                        <br />
                        Customer Address
                        <br />
                        Customer Email
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="">
                      <div className="header__address_content">
                        <div className="address_width font_weight ">
                          <br /> <br />
                          Invoice Date
                          <br />
                          Invoice No
                          <br />
                          Customer Email
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </tr>
            </thead>
            <br />

            <tbody>
              {/* listing table start */}
              <table className="details_tablenew2 " cellSpacing={0}>
                <thead className="invoice_header2 ">
                  {invoice_table_header}
                  <th scope="col" className="font_weight_qt  p-3">
                    #
                  </th>
                  <th
                    scope="col"
                    className="font_weight_qt  task_width text_align_words"
                  >
                    TASKS
                  </th>
                  <th scope="col" className="font_weight_qt   text_align_words">
                    COST
                  </th>
                  <th scope="col" className="font_weight_qt  text_align_words">
                    TAX TYPE
                  </th>
                  <th scope="col" className="font_weight_qt  text_align_words">
                    TAX AMOUNT
                  </th>
                  <th scope="col" className="font_weight_qt text_align_number">
                    TOTAL AMOUNT
                  </th>
                </thead>
                <tbody>
                  {invoice_table_data}

                  <tr>
                    <td className=" p-3">1 </td>
                    <td className=" text_align_words">servicenme </td>
                    <td className=" text_align_words"> servnme dcd </td>
                    <td className=" text_align_words"> servnme </td>
                    <td className=" text_align_words"> ferfre </td>
                    <td className="text_align_words">sdferf </td>
                  </tr>

                  <tr className="">
                    <td className=" p-3">2 </td>
                    <td className=" text_align_words">servicenme </td>
                    <td className=" text_align_words"> servnme dcd </td>
                    <td className=" text_align_words"> servnme </td>
                    <td className=" text_align_words"> ferfre </td>
                    <td className="text_align_words">sdferf </td>
                  </tr>

                  <tr>
                    <td className=" p-3"> </td>
                    <td className=" text_align_words"> </td>
                    <td className=" text_align_words"> </td>
                    <td className=" text_align_words"> </td>
                    <td className=" text_align_words"> total-3233 </td>
                    <td className="text_align_words"> 38932</td>
                  </tr>
                </tbody>
              </table>
              {/* listing table end */}
            </tbody>
            <footer>
                
                <div className="py-3">
                    <h6>Country of Origin</h6>
                    <p>Lorem ipsum, or lipsum as it is sometimes known, 
                    is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown ...</p>
                </div>
                <table>
                   <tbody>
                    <tr>
                        <td>Signature</td>
                        <td>-----------------</td>
                        <td>Storage</td>
                        <td>-----------------</td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Name</td>
                        <td>-----------------</td>
                        <td>Date</td>
                        <td>-----------------</td>
                    </tr>
                   </tbody>
                </table>
            </footer>
          </table>
        </div>
      </div>
    </>
  );
}
export default Invoicetemplate2;
