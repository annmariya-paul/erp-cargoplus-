import { useEffect, useState } from "react";
import "./invoicetemp2style.scss";
import PublicFetch from "../../../utils/PublicFetch";
import { GENERAL_SETTING_BASE_URL } from "../../../api/bootapi";

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
    // allCurrency();
    // getallbanks();
  }, []);

  return (
    <>
      <div>
        <div>
        <div id="pageborder1st"></div>
          <table className="invoice_header2">
          {companyInfodata &&
            companyInfodata.length > 0 &&
            companyInfodata?.map((item, index) => {
              return (
            <thead className="invoice_header border-0">

              {/* <div className="d-flex justify-content-center">
                <h1 className="header_invoicename"> INVOICE</h1>
              </div> */}


             
                  <tr className="invoice_header">
                    <div className="header_invoice1">
                      <div className="header__address_wrapper">
                        <div className="header__address_logo_temp2">
                          <img
                            src={`${process.env.REACT_APP_BASE_URL}/${item.company_logo}`}
                            alt=""
                          />
                        </div>
                      </div>

                    
                      <div className="header__invoice">
                        <h1 className="h1font_size">{Invoice_type} INVOICE </h1>
                        <div>
                         

                          <span>{invoice_number}</span>
                        </div>
                      </div>
                     
                    </div>
                  </tr>

                  

                  <tr className="invoice_header">
                    <div className="d-flex    ">
                      <div className=" col-8">
                        <div className="header__address_content">
                          <h2 className="cmpny_heading_color">
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
                      {/* <div className="col-2 ">
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
                      </div> */}
                    </div>
                  </tr>
                  <br></br>


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
                       Consignee
                        <br />
                   
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="">
                      <div className="header__address_content">
                        <div className="address_width font_weight ">
                          <br /> <br />
                          Invoice No
                          <br />
                          Invoice Date
                          <br />
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </tr>
            </thead>
              );
            })}

<br/>
            <div className="invoice_detailsnew2">
              <div className="invoice_details__col invoice_details__col_2">
                <table>
                  <tbody>
                    <tr>
                      <td className="font_weight"> Project Name </td>
                      <td className=""> : </td>
                      <td className=""> Jnewtst-00023 </td>
                    </tr>
                    <tr>
                      <td className="font_weight">AWB/BL </td>
                      <td className=""> : </td>
                      <td className=""> usdfu213 </td>
                    </tr>
                    <tr>
                      <td className="font_weight"> Origin </td>
                      <td className=""> : </td>
                      <td className=""> Cochin Sea </td>
                    </tr>

                    <tr>
                      <td className="font_weight"> Destination </td>
                      <td className=""> : </td>
                      <td className=""> Cochin Sea </td>
                    </tr>
                    <tr>
                      <td className="font_weight"> Shipper </td>
                      <td className=""> : </td>
                      <td className=""> Test Test </td>
                    </tr>
                    <tr>
                      <td className="font_weight"> Terms </td>
                      <td className=""> : </td>
                      <td className=""> testondone </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="invoice_details__col invoice_details__col_2">
                <table>
                  <tbody>
                    <tr>
                      <td className="font_weight"> No of Pieces  </td>
                      <td className=""> : </td>
                      <td className="">2</td>
                    </tr>
                    <tr>
                      <td className="font_weight">Gross weight </td>
                      <td className=""> : </td>
                      <td className=""> 234 </td>
                    </tr>
                    <tr>
                      <td className="font_weight"> Chargable weight </td>
                      <td className=""> : </td>
                      <td className=""> 23 </td>
                    </tr>

                    <tr>
                      <td className="font_weight"> Carrier </td>
                      <td className=""> : </td>
                      <td className=""> tested </td>
                    </tr>
                    <tr>
                      <td className="font_weight"> Mode </td>
                      <td className=""> : </td>
                      <td className=""> testmode </td>
                    </tr>
                    <tr>
                      <td className="font_weight"> Terms </td>
                      <td className=""> : </td>
                      <td className=""> modeterms </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* <div className="invoice_details__col invoice_details__col_2">
                <table>
                  <tbody>
                  <tr>
                      <td className="font_weight"> Gross weight </td>
                      <td className=""> : </td>
                      <td className=""> ejnd Sea </td>
                    </tr>
                    <tr>
                      <td className="font_weight"> No of Pieces </td>
                      <td className=""> : </td>
                      <td className=""> ejnd Sea </td>
                    </tr>
                  <tr>
                      <td className="font_weight"> chargable weight </td>
                      <td className=""> : </td>
                      <td className=""> ejnd Sea </td>
                    </tr>
                    <tr>
                      <td className="font_weight"> Carrrier </td>
                      <td className=""> : </td>
                      <td className=""> ejnd Sea </td>
                    </tr>
                    <tr>
                      <td className="font_weight"> Mode </td>
                      <td className=""> : </td>
                      <td className=""> ejnd Sea </td>
                    </tr>
                    </tbody>
                </table>
              </div> */}
            </div>
            <br/>

            <tbody> 
              {/* listing table start */}
              <table className="details_tablenewtmp2 invoice_header2 " cellSpacing={0}>
                <thead className="invoice_header2 ">
                  {invoice_table_header}
                  <th
                    scope="col"
                    className="font_weight_qt  p-3 invoiceth_widthslno border_white"
                  >
                    SL.No
                  </th>
                  <th
                    scope="col"
                    className="font_weight_qt  task_width text_align_words invoiceth_widthdescrip"
                  >
                    TASKS & DESCRIPTION
                  </th>

                  <th
                    scope="col"
                    className="font_weight_qt text_align_number invoiceth_widthslno"
                  >
                    AMOUNT
                  </th>
                </thead>
                <tbody>
                  {invoice_table_data}

                  <tr>
                    <td className=" p-3">1 </td>
                    <td className=" ">servicenme </td>

                    <td className="text_align_words">983.00 </td>
                  </tr>

                  <tr className="">
                    <td className=" p-3">2 </td>
                    <td className=" ">servicenme </td>

                    <td className="text_align_words">8399.00 </td>
                  </tr>

                  {/* <tr>
                    <td className=" p-3"> </td>
                    <td className=" text_align_words"> </td>
                    <td className=" text_align_words"> </td>
                    <td className=" text_align_words"> </td>
                    <td className=" text_align_words"> total-3233 </td>
                    <td className="text_align_words"> 38932</td>
                  </tr> */}
                </tbody>
              </table>
              {/* listing table end */}
            </tbody>
            <footer>
            <div className="sub_total_wrappernew1">
                <div className="sub_total_wrapper__col sub_total_wrapper__col_1">
                  <div style={{ width: "100%" }}>
                    <div className="invoicetemp2_total_fontsize">Total In Words</div>
                    <div className="sub_total_words">
                 One thousand only
                    </div>
                  </div>
                </div>

                <div className="sub_total_wrapper__col sub_total_wrapper__col_2">
                <div style={{ width: "100%" }}>
                  <table className="invoice_header">
                    <tbody className="invoice_header">
                    
                      <tr className="">
                        <td style={{ fontWeight: 600 }} className="px-1">Total</td>
                        <td style={{ fontWeight: 600 }} className="px-1">1000.00</td>
                      </tr>
                     
                    </tbody>
                  </table>
                </div>
              </div>

               
              </div>

              {/* <div className="py-3">
                <h6>Country of Origin</h6>
                <p>
                  Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                  used in laying out print, graphic or web designs. The passage
                  is attributed to an unknown ...
                </p>
              </div> */}
              {/* <table>
                <tbody>
                  <tr>
                    <td>Signature</td>
                    <td>-----------------</td>
                    <td>Storage</td>
                    <td>-----------------</td>
                  </tr>
                  <br />
                  <tr>
                    <td>Name</td>
                    <td>-----------------</td>
                    <td>Date</td>
                    <td>-----------------</td>
                  </tr>
                </tbody>
              </table> */}
            </footer>
          </table>
        </div>
      </div>
    </>
  );
}
export default Invoicetemplate2;
