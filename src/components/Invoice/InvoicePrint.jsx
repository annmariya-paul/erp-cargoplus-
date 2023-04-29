import React, { useEffect, useState } from "react";
import { ACCOUNTS, GENERAL_SETTING_BASE_URL } from "../../api/bootapi";
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
  invoice_no,
  Invoice_type,
  invoice_number,
  billto,
  settemp1,
}) {
  const [companyInfodata, setCompanyInfodata] = useState();
  const [defaultCurrency, setDefaultCurrency] = useState();
  const [defaultbank,setdefaultbank]= useState();
   
  // const [temp1,settemp1] =useState()

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

  const allCurrency = () => {
    PublicFetch.get(`${GENERAL_SETTING_BASE_URL}/currency`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("success of cuurency", res.data.data);
          res?.data?.data?.forEach((item, index) => {
            if (item.currency_is_default === 1) {
              console.log("default currency", item);
              setDefaultCurrency(item);
            }
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getallbanks = async () => {
    try {
      const allbanks = await PublicFetch.get(
        `${ACCOUNTS}/bank`
      );
      console.log("getting all bank details", allbanks.data.data);
      // setAllbankdetails(allbanks.data.data)
      allbanks?.data?.data?.forEach((item, index) => {
        if (item.bank_default === 1) {
          console.log("default bankk", item);
          setdefaultbank(item)
          // setDefaultCurrency(item);
        }
      });
    
    } catch (err) {
      console.log("error to fetching  bank details", err);
    }
  };

let template12 = "uploads/invoiceTemplate/template1.png"


  // function camelize(str) {
  //   return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
  //     return index === 0 ? word.toLowerCase() : word.toUpperCase();
  //   }).replace(/\s+/g, '');
  // }
//   const camalize = (str) => {
    
//      str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) =>{
//       console.log("camalize", m ,chr);
//       chr.toUpperCase()}).replace();
// }
// camalize("dfisfhssd")
// const capitalize = str => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)

  useEffect(() => {
    companyinfo();
    allCurrency();
    getallbanks();
    settemp1(template12)
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
            companyInfodata?.map((item, index) => {
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
                          <div className="address_width">
                            {item.company_address} 
                            <br />
                            {item.company_country}
                            <br />
                            Phone :{item.company_phone}
                            <br />
                            {item.company_email}
                          </div>
                        </div>
                      </div>
                      {invoice_no && (
                        <div className="header__invoice">
                          <h1>{Invoice_type}</h1>
                          <div>
                            {Invoice_type}# <span>{invoice_number}</span>
                          </div>
                        </div>
                      )}
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
          {billto && (
            <>
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
                  <div className="sub_total_words">
                    {defaultCurrency?.currency_name} {amount_in_words}
                  </div>
                </div>
              </div>
              <div className="sub_total_wrapper__col sub_total_wrapper__col_2">
                <div style={{ width: "100%" }}>
                  <table className="invoice_header">
                    <tbody className="invoice_header">
                      {/* <tr className="invoice_header">
                        <td>Sub Total</td>
                        <td>{sub_total}</td>
                      </tr> */}
                      <tr>
                        <td style={{ fontWeight: 600 }}>Total</td>
                        <td style={{ fontWeight: 600 }}>{defaultCurrency?.currency_code}  {total}</td>
                      </tr>
                      {/* <tr>
                        <td>Permanent Made</td>
                        <td>{permanent_made}</td>
                      </tr>
                      <tr>
                        <td>Balance Due</td>
                        <td>{balance_due}</td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>

             
            </div>
           
           <div>
           <p>Thanks For your Business</p>
           </div>
            <div className="row px-3">
            <p>Bank Details</p>
              <div className="invoice_details__colbank  ">
              <table>
              {/* {companyInfodata &&
            companyInfodata.length > 0 &&
            companyInfodata?.map((item, index) => { */}

           {companyInfodata&& companyInfodata.length > 0 && 
            companyInfodata?.map((item, index)=>{
               return(

                    <tbody className="">
                      
                      <tr>
                        <td style={{ fontWeight: 600 }}>Name</td>
                        <td>:</td>
                        <td >{item.company_name}  </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 600 }}>Bank Name</td>
                        <td>:</td>
                        <td >{defaultbank?.bank_name}  </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 600 }}>Branch</td>
                        <td>:</td>
                        <td >{defaultbank?.bank_branch}  </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 600 }}>Account No</td>
                        <td>:</td>
                        <td >{defaultbank?.bank_account_number}  </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 600 }}>IBAN No</td>
                        <td>:</td>
                        <td >{defaultbank?.bank_iban_no}  </td>
                      </tr>
                    </tbody>
                       )
                   })
                  }
                  </table>
              </div>
              {/* <div className="invoice_details__col invoice_details__col_2">
              <table>
                <tbody></tbody>
              </table>
            </div> */}
            </div>
          </footer>
          </>
)}
        </table>
      </div>
    </div>
  );
}

export default InvoicePrint;
