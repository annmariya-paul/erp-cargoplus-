import React from "react";
import "./invoiceStyle.scss";

function InvoicePrint() {
  return (
    <div>
      <div>
        {/* div to set page border on all pages */}
        <div id="pageborder"></div>
        {/* page border div ends */}
        <table className="invoice_header">
          <thead className="invoice_header">
            <tr className="invoice_header">
              <div className="header">
                <div className="header__address_wrapper">
                  <div className="header__address_logo">
                    {/* <img src={logo} alt="" /> */}
                  </div>
                  <div className="header__address_content">
                    <h3>Cargo Plus Middle East Co Will</h3>
                    <div>
                      Office #7, Ground floor, Marakaz, Alia <br />
                      Deej <br />
                      Deej Al Farwaniyah 8500 <br />
                      Kuwait <br />
                      Phone : +965-2224444 <br />
                      www.cargoplus.me
                    </div>
                  </div>
                </div>
                <div className="header__invoice">
                  <h1>Invoice</h1>
                  <div>
                    Invoice# <span>1234567890</span>
                  </div>
                </div>
              </div>
            </tr>
          </thead>
          <div className="invoice_details">
            <div className="invoice_details__col invoice_details__col_1">
              <table>
                <tbody>
                  <tr>
                    <td>Invoice date</td>
                    <td>: 29 Aug 2022</td>
                  </tr>
                  <tr>
                    <td>Terms</td>
                    <td>: Due on receipt</td>
                  </tr>
                  <tr>
                    <td>Due Date</td>
                    <td>: 29 Aug 2022</td>
                  </tr>
                  <tr>
                    <td>Chargeable Weight</td>
                    <td>: 1856 KG</td>
                  </tr>
                  <tr>
                    <td>Carrier</td>
                    <td>: TK</td>
                  </tr>
                  <tr>
                    <td>Mode</td>
                    <td>: CLEARANCE</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="invoice_details__col invoice_details__col_2">
              <table>
                <tbody>
                  <tr>
                    <td>Project Name</td>
                    <td>: AFT-234567</td>
                  </tr>
                  <tr>
                    <td>AWB/BL</td>
                    <td>: 123 456 7890</td>
                  </tr>
                  <tr>
                    <td>Origin</td>
                    <td>: SPAIN</td>
                  </tr>
                  <tr>
                    <td>Destination</td>
                    <td>: KUWAIT</td>
                  </tr>
                  <tr>
                    <td>Shipper</td>
                    <td>: SOSA INGREDIENTS, SL.L</td>
                  </tr>
                  <tr>
                    <td>Consignee</td>
                    <td>
                      : FRANCE MIDDLE EAST CO abce asdf df akll e eidk ald
                    </td>
                  </tr>
                  <tr>
                    <td>No of pieces</td>
                    <td>: 7</td>
                  </tr>
                  <tr>
                    <td>Gross weight</td>
                    <td>: 1800</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="billto">Bill To</div>
          <div className="billto_details">
            <div>France and Middle East</div>
          </div>
          <tbody>
            {/* listing table start */}
            <table className="details_table invoice_header" cellSpacing={0}>
              <thead className="invoice_header">
                <tr className="invoice_header">
                  <th className="invoice_header">#</th>
                  <th className="invoice_header">Task & description</th>
                  <th className="invoice_header" id="amount">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from(new Array(200)).map((item, index) => {
                  return (
                    <tr className="invoice_header">
                      <td>body</td>
                      <td>Delivery order dee</td>
                      <td style={{ textAlign: "right" }}>500</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* listing table end */}
          </tbody>
          <footer className="invoice_header">
            <div className="sub_total_wrapper">
              <div className="sub_total_wrapper__col sub_total_wrapper__col_1">
                <div style={{ width: "100%" }}>
                  <div>Total In Words</div>
                  <div className="sub_total_words">
                    Kuwait Dinar One Thousand Four Hundred Ninety and One
                    Hundred Fifty Fils
                  </div>
                </div>
              </div>
              <div className="sub_total_wrapper__col sub_total_wrapper__col_2">
                <div style={{ width: "100%" }}>
                  <table className="invoice_header">
                    <tbody className="invoice_header">
                      <tr className="invoice_header">
                        <td>Sub Total</td>
                        <td>1490</td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td>1490</td>
                      </tr>
                      <tr>
                        <td>Permanent Made</td>
                        <td>1490</td>
                      </tr>
                      <tr>
                        <td>Balance Due</td>
                        <td>1490</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </footer>
        </table>
      </div>
    </div>
  );
}

export default InvoicePrint;
