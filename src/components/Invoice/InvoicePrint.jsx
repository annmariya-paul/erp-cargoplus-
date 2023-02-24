import React, { useEffect, useState } from "react";
import { GENERAL_SETTING_BASE_URL } from "../../api/bootapi";
import PublicFetch from "../../utils/PublicFetch";
import "./invoiceStyle.scss";

function InvoicePrint({
  invoice_details1,
  invoice_details2,
  invoice_table_header,
  invoice_table_data,
  amount_in_words,
  sub_total,
  total,
  permanent_made,
  balance_due,
}) {
  const [companyInfodata, setCompanyInfodata] = useState();

  const companyinfo = () => {
    PublicFetch.get(`${GENERAL_SETTING_BASE_URL}/company`)
      .then((res) => {
        console.log("Response of company info", res);
        if (res.data.success) {
          console.log("SuccessFull of company info", res.data.data);
          setCompanyInfodata(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  useEffect(() => {
    companyinfo();
  }, []);
  return (
    <div>
      <div>
        {/* div to set page border on all pages */}
        <div id="pageborder"></div>
        {/* page border div ends */}
        <table className="invoice_header">
          {companyInfodata &&
            companyInfodata.length > 0 &&
            companyInfodata.map((item, index) => {
              return (
                <thead className="invoice_header">
                  <tr className="invoice_header">
                    <div className="header">
                      <div className="header__address_wrapper">
                        <div className="header__address_logo">
                          <img
                            src={`${process.env.REACT_APP_BASE_URL}/${item.company_logo}`}
                            alt=""
                          />
                        </div>
                        <div className="header__address_content">
                          <h3>{item.company_name}</h3>
                          <div>
                            {item.company_address} <br />
                            Deej Al Farwaniyah 8500 <br />
                            {item.company_country}
                            <br />
                            Phone :{item.company_phone}
                            <br />
                            {item.company_email}
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
              );
            })}

          <div className="invoice_details">
            <div className="invoice_details__col invoice_details__col_1">
              <table>
                <tbody>{invoice_details1}</tbody>
              </table>
            </div>
            <div className="invoice_details__col invoice_details__col_2">
              <table>
                <tbody>{invoice_details2}</tbody>
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
              <thead className="invoice_header">{invoice_table_header}</thead>
              <tbody>
                {invoice_table_data}
                {/* {Array.from(new Array(200)).map((item, index) => {
                  return (
                    <tr className="invoice_header">
                      <td>body</td>
                      <td>Delivery order dee</td>
                      <td style={{ textAlign: "right" }}>500</td>
                    </tr>
                  );
                })} */}
              </tbody>
            </table>
            {/* listing table end */}
          </tbody>
          <footer className="invoice_header">
            <div className="sub_total_wrapper">
              <div className="sub_total_wrapper__col sub_total_wrapper__col_1">
                <div style={{ width: "100%" }}>
                  <div>Total In Words</div>
                  <div className="sub_total_words">{amount_in_words}</div>
                </div>
              </div>
              <div className="sub_total_wrapper__col sub_total_wrapper__col_2">
                <div style={{ width: "100%" }}>
                  <table className="invoice_header">
                    <tbody className="invoice_header">
                      <tr className="invoice_header">
                        <td>Sub Total</td>
                        <td>{sub_total}</td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td>{total}</td>
                      </tr>
                      <tr>
                        <td>Permanent Made</td>
                        <td>{permanent_made}</td>
                      </tr>
                      <tr>
                        <td>Balance Due</td>
                        <td>{balance_due}</td>
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
