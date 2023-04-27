import React, { useEffect, useState } from "react";
// import { ACCOUNTS, GENERAL_SETTING_BASE_URL } from "../../api/bootapi";
// import PublicFetch from "../../utils/PublicFetch";
import "./invoicetemp1style.scss";
import PublicFetch from "../../../utils/PublicFetch";
import { GENERAL_SETTING_BASE_URL } from "../../../api/bootapi";

function Invoicetemp1({
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
  const [companyInfodata, setCompanyInfodata] = useState();
  const [defaultCurrency, setDefaultCurrency] = useState();
  const [defaultbank, setdefaultbank] = useState();

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

  //   const allCurrency = () => {
  //     PublicFetch.get(`${GENERAL_SETTING_BASE_URL}/currency`)
  //       .then((res) => {
  //         console.log("Response", res);
  //         if (res.data.success) {
  //           console.log("success of cuurency", res.data.data);
  //           res?.data?.data?.forEach((item, index) => {
  //             if (item.currency_is_default === 1) {
  //               console.log("default currency", item);
  //               setDefaultCurrency(item);
  //             }
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("Error", err);
  //       });
  //   };

  //   const getallbanks = async () => {
  //     try {
  //       const allbanks = await PublicFetch.get(
  //         `${ACCOUNTS}/bank`
  //       );
  //       console.log("getting all bank details", allbanks.data.data);
  //       // setAllbankdetails(allbanks.data.data)
  //       allbanks?.data?.data?.forEach((item, index) => {
  //         if (item.bank_default === 1) {
  //           console.log("default bankk", item);
  //           setdefaultbank(item)
  //           // setDefaultCurrency(item);
  //         }
  //       });

  //     } catch (err) {
  //       console.log("error to fetching  bank details", err);
  //     }
  //   };

  useEffect(() => {
    companyinfo();
    // allCurrency();
    // getallbanks();
  }, []);

  return (
    <div>
      <div>
        <div id="pageborder1st"></div>

        <table className="invoice_header">
          {companyInfodata &&
            companyInfodata.length > 0 &&
            companyInfodata?.map((item, index) => {
              return (
                <thead className="invoice_header border-0">
                  <tr className="invoice_header">
                    <div className="header_invoice1">
                      <div className="header__address_wrapper">
                        <div className="header__address_logo">
                          <img
                            src={`${process.env.REACT_APP_BASE_URL}/${item.company_logo}`}
                            alt=""
                          />
                        </div>
                      </div>

                      {/* {invoice_no && ( */}
                      <div className="header__invoice">
                        <h1 className="h1font_size">{Invoice_type} INVOICE </h1>
                        <div>
                          {/* {Invoice_type} */}

                          <span>{invoice_number}</span>
                        </div>
                      </div>
                      {/* )} */}
                    </div>
                  </tr>

                  {/* <tr className="invoice_header">
                    <div className="header_invoice1">

                      <div className="header__address_wrapper">
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

                      <div className="header__invoice">
                        <div className="row">
                          <div className="col-6">
                            <label className="label_color">Qtn2338</label>
                           <h4 className="headingcolor">12/3/2023</h4>
                          </div>
                          <div className="col-6">
                          <label className="label_color">Qtn2338</label>
                          <h4 className="headingcolor">Number</h4>
                          </div>
                        </div>
                        
                        </div>
                      
                    </div>
                  </tr> */}

                  <tr className="invoice_header">
                    <div className="d-flex    ">
                      <div className=" col-8">
                        <div className="header__address_content">
                          <h2 className="label_color">
                            Cargo Plus Middle East Co WLL{" "}
                          </h2>
                          <div className="address_width font_weight ">
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
                      <div className="col-2 ">
                        <div className="">
                          <label className="label_color">Invoice No</label>
                          <h4 className="headingcolor">INV-00006</h4>
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="">
                          <label className="label_color">Invoice Date</label>
                          <h4 className="headingcolor">12/3/2023</h4>
                        </div>
                      </div>
                    </div>
                  </tr>
                  <br></br>
                  <tr className="invoice_header">
                    <div className="d-flex ">
                      <div className=" col-5">
                        <div className="header__address_content">
                          <table>
                            <thead></thead>
                            <tbody>
                              {invoice_details1}

                              <tr>
              <td className="font_weight"> Project Name </td>
              <td className=""> : </td>
              <td className=""> Jnewtst-00023 </td>
            </tr>
            <tr>
              <td className="font_weight"> AWB/BL</td>
              <td className=""> : </td>
              <td className=""> usdfu213</td>
            </tr>
            <tr>
              <td className="font_weight"> Origin </td>
              <td className=""> : </td>
              <td className=""> JCochin Sea </td>
            </tr>

                              {/* <tr>
                                <td className="font_weight"> Destination</td>
                                <td className=""> : </td>
                                <td className=""> Cochin Sea </td>
                              </tr> */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className=" col-3"></div>
                      <div className="col-2 ">
                        <div className="">
                          <label className="label_color">Payment To</label>
                          <h4 className="headingcolor">testcust</h4>
                        </div>
                      </div>

                      {/* <div className="col-2">
                        <div className="">
                          <label className="label_color">Consignee</label>
                          <h4 className="headingcolor">Teshet</h4>
                        </div>
                      </div> */}
                    </div>
                  </tr>

                  <tr className="invoice_header">
                    <div className="d-flex ">
                      <div className=" col-5">
                        <div className="header__address_content">
                          <table>
                            <thead></thead>
                            <tbody>
                              {invoice_details2}
                              <tr>
                                <td className="font_weight"> Destination</td>
                                <td className=""> : </td>
                                <td className=""> Jnewtst-00023 </td>
                              </tr>
                              <tr>
                                <td className="font_weight"> No: of Pieces</td>
                                <td className=""> : </td>
                                <td className=""> usdfu213</td>
                              </tr>
                              <tr>
                                <td className="font_weight"> Gross Weight </td>
                                <td className=""> : </td>
                                <td className=""> JCochin Sea </td>
                              </tr>
                              <tr>
                                <td className="font_weight"> Chargble </td>
                                <td className=""> : </td>
                                <td className=""> 223 </td>
                              </tr>
                              <tr>
                                <td className="font_weight"> Terms</td>
                                <td className=""> : </td>
                                <td className=""> djjksc</td>
                              </tr>
                              <tr>
                                <td className="font_weight"> Carrier </td>
                                <td className=""> : </td>
                                <td className=""> ejnd Sea </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className=" col-3"></div>
                      <div className="col-2 ">
                        <div className="">
                          <label className="label_color">shipper</label>
                          <h4 className="headingcolor">Test One</h4>
                        </div>
                        <div className="pt-4">
                          <div className="">
                            <label className="label_color">Consignee</label>
                            <h4 className="headingcolor">Teshet</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </tr>
                </thead>
              );
            })}

          <div className="invoice_detailsnew1">
            <div className="invoice_details__col invoice_details__col_1">
              <table>
                <tbody></tbody>
              </table>
            </div>
            <div className="invoice_details__col invoice_details__col_2">
              <table>
                <tbody>{/* {invoice_details2} */}</tbody>
              </table>
            </div>
          </div>
          {/* {billto && ( */}
          <>
            <tbody>
              {/* listing table start */}
              <table
                className="details_tablenew1 invoice_header"
                cellSpacing={0}
              >
                <thead className="invoice_header ">
                  {invoice_table_header}
                  <th
                    scope="col"
                    className="font_weight_qt border_right p-3 invoiceth_widthslno"
                  >
                    SL.No
                  </th>
                  <th
                    scope="col"
                    className="font_weight_qt border_right task_width text_align_words invoiceth_widthdescrip"
                  >
                    TASKS & DESCRIPTION
                  </th>

                  <th
                    scope="col"
                    className="font_weight_qt text_align_number invoiceth_widthslno"
                  >
                    {" "}
                    AMOUNT
                  </th>
                </thead>
                <tbody>
                  {invoice_table_data}

                  <tr>
                    <td className="border_right p-3">1 </td>
                    <td className="border_right ">servicenme </td>

                    <td className="text_align_words">100.00 </td>
                  </tr>

                  <tr className="alternative_color">
                    <td className="border_right p-3">2 </td>
                    <td className="border_right ">Shippemenet </td>

                    <td className="text_align_words">200.00 </td>
                  </tr>
                  <tr>
                    <td className="border_right p-3">3 </td>
                    <td className="border_right ">servicenme </td>

                    <td className="text_align_words">300.00 </td>
                  </tr>
                  <tr className="alternative_color">
                    <td className="border_right p-3">4 </td>
                    <td className="border_right ">servicenme </td>

                    <td className="text_align_words">400 .00</td>
                  </tr>

                  {/* <tr className="">
                    <td className="border_right p-3"> </td>
                    <td className="border_right text_align_words d-flex justify-content-center align-items-center">
                      {" "}
                      Sub Total{" "}
                    </td>
                    <td className="text_align_words">1000.00 </td>
                  </tr> */}

                  {/* <tr className="">
                    <td className="border_right p-3 py-2"> </td>
                    <td className="border_right text_align_words d-flex justify-content-center align-items-center">
                    
                      Tax 
                    </td>
                    <td className="text_align_words">45.00 </td>
                  </tr> */}
                </tbody>
              </table>
              {/* listing table end */}
            </tbody>
            <footer className="">
              <div className="sub_total_wrappernew1">
                <div className="sub_total_wrapper__col sub_total_wrapper__col_1">
                  <div style={{ width: "100%" }}>
                    <div className="total_color">Total In Words</div>
                    <div className="sub_total_words">One thousand only</div>
                  </div>
                </div>

                <div className="sub_total_wrapper__col sub_total_wrapper__col_2">
                  <div style={{ width: "100%" }}>
                    <table className="invoice_header">
                      <tbody className="invoice_header">
                        <tr className="total_bgcolor">
                          <td style={{ fontWeight: 600 }} className="px-1">
                            Total
                          </td>
                          <td style={{ fontWeight: 600 }} className="px-1">
                            1000.00
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* <div className="sub_total_wrapper__col sub_total_wrapper__col_2">
                  <div style={{ width: "100%" }}>
                    <table className="invoice_header">
                      <tbody className="invoice_header">

                  

                        <div className="row">
                          <div className="col-6"></div>

                          <div className="col-6 ">
                            <div className="total_bgcolor">
                              <td
                                className=""
                                style={{
                                  fontWeight: 600,
                                  fontSize: 18,
                                  paddingRight: 90,
                                }}
                              >
                                Total
                              </td>
                              <td style={{ fontWeight: 600 }}>289393.00</td>
                            </div>
                          </div>
                        </div>
                      </tbody>
                    </table>
                  </div>
                </div> */}
              </div>

              {/* <div>
           <p>Thanks For your Business</p>
           </div> */}
            </footer>
          </>
          {/* )} */}
        </table>
      </div>
    </div>
  );
}

export default Invoicetemp1;
