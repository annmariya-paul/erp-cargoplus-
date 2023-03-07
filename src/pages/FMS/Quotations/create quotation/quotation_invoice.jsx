import { useEffect, useState } from "react";
import {
  CRM_BASE_URL_FMS,
  GENERAL_SETTING_BASE_URL,
} from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import "./quotation.scss";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import TableData from "../../../../components/table/table_data";
import InvoicePrint from "../../../../components/Invoice/InvoicePrint";
import { ROUTES } from "../../../../routes";
import { camelize } from "../../../../utils/camelcaseconvert";


function Quotationinvoice() {
  var converter = require("number-to-words");

  const { id } = useParams();
  console.log("id :::::", id);
  const [allqoutation, setAllQuotations] = useState();
  const [tabledata, setTableData] = useState();

  const [companyname, setCompanyname] = useState();
  const [companyaddress, setCompanyaddress] = useState();
  const [companyphone, setCompanyphone] = useState();
  const [companyemail, setCompanyemail] = useState();
  const [companycountry, setCompanycountry] = useState();

  const [companyzipcode, setcompanyzipcode] = useState();
  const [companylogo, setCompanylogo] = useState();
  const [cmpnyinfo, setcmpnyinfo] = useState();
  const [quotation, setQuotation] = useState();

  const navigate = useNavigate();
  const progress = [
    {
      title: "TASKS",
      dataIndex: "service_name",
      key: "service_name",
      align: "center",
      // render: (value, item, indx) => count + indx,
    },
    {
      title: "COST",
      dataIndex: "quotation_details_cost",
      key: "quotation_details_cost",
      align: "center",
    },
    {
      title: "TAX TYPE",
      dataIndex: "tax_type_name",
      key: "tax_type_name",
      align: "center",
    },
    {
      title: "TAX AMOUNT",
      dataIndex: "quotation_details_tax_amount",
      key: "quotation_details_tax_amount",
      width: "35%",
      align: "center",
      // render: (opportunity_update_next_date_contact) => {
      //   return (
      //     <label>
      //       {moment(opportunity_update_next_date_contact).format("DD-MM-YYYY")}
      //     </label>
      //   );
      // },
    },
    {
      title: "TOTAL AMOUNT",
      dataIndex: "quotation_details_total",
      key: "quotation_details_total",

      align: "center",
    },
  ];

  function setPageSize() {
    const page = document.querySelector(".print-page");
    // page.style.width = "210mm";
    // page.style.height = "297mm";
    // page.style.margin = "10mm";
    page.style.width = "21cm";
    page.style.height = "29.7cm";
    page.style.margin = "auto";
    page.style.padding ="2rem"
  }
  const handlePrint = () => {
    // setPageSize();
    window.print();
  };

  const getSingleQuotation = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/quotation/${id}`)
      .then((res) => {
        console.log("response of quotation", res);
        if (res.data.success) {
          console.log("Success of quotation", res.data.data.quotation);
          setAllQuotations(res.data.data.quotation);
          console.log("temp", res?.data?.data?.quotation);

          let temp11 = [];

          res.data.data.quotation.fms_v1_quotation_details.forEach(
            (item, index) => {
              temp11.push({
                quotation_details_cost: item.quotation_details_cost.toFixed(2),
                quotation_details_id: item.quotation_details_id,
                quotation_details_quotation_id:
                  item.quotation_details_quotation_id,
                quotation_details_service_id: item.quotation_details_service_id,
                quotation_details_status: item.quotation_details_status,
                quotation_details_tax_amount:
                  item.quotation_details_tax_amount.toFixed(2),
                quotation_details_tax_type: item.quotation_details_tax_type,
                quotation_details_total:
                  item.quotation_details_total.toFixed(2),
                service_name: item.crm_v1_services?.service_name,
                tax_type_name: item.fms_v1_tax_types?.tax_type_name,
              });
              setTableData(temp11);
              setQuotation(res.data.success);
            }
          );
          close_modal(1000);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    // handlePrint();
    getallcmpny();
    if (id) {
      getSingleQuotation();
    }
  }, [id]);

  const getallcmpny = async () => {
    try {
      const allcmpny = await PublicFetch.get(
        `${GENERAL_SETTING_BASE_URL}/company`
      );

      console.log(" cmpny details is", allcmpny.data.data);
      setcmpnyinfo(allcmpny.data.data);
      // setcmpnyupdate(allcmpny.data.data.length)
      console.log("dataa", allcmpny.data.data.length);
      let arry = [];
      allcmpny.data.data.forEach((i, indx) => {
        arry.push(i);
      });
      console.log("all cmpny are", arry);
      // setcmpnyupdate(arry)

      arry.map((itm, indx) => {
        console.log("all cmpny maped", itm);
        // setcmpnyid(itm.company_id)
        setCompanyname(itm.company_name);
        setCompanyaddress(itm.company_address);
        setCompanyemail(itm.company_email);
        setCompanyphone(itm.company_phone);
        // setCountryis(itm.company_country)
        setcompanyzipcode(itm.company_zip_code);
        setCompanylogo(itm.company_logo);
        setCompanycountry(itm.company_country);
      });
    } catch (err) {
      console.log("error to fetching  compnyinfo", err);
    }
  };

  const close_modal = (time) => {
    if (time) {
      setTimeout(() => {
        handlePrint();
        navigate(ROUTES.QUATATIONS)
      }, time);
    }
  };

  // useEffect(() => {
   
  // }, []);
  console.log("dataa iss", tabledata);

  return (
    <>

<InvoicePrint 
invoice_no
billto
Invoice_type="QUOTATION" 
invoice_number= {allqoutation?.quotation_no}
invoice_details1={ <>
  <tr className="p-2 ">
 <td>Quotation No </td>
 <td>: </td>
 <td className="quotation_p_name" > {allqoutation?.quotation_no}</td>
 </tr>
 <tr className="p-2">
 <td>Quotation Date </td>
 <td>: </td>
 <td className="quotation_p_name"> {moment(allqoutation?.quotation_date).format("DD-MM-YYYY")}</td>
 </tr>
 <tr className="p-2">
 <td>Validity Date</td>
 <td>: </td>
 <td className="quotation_p_name"> {moment(allqoutation?.quotation_validity).format("DD-MM-YYYY")}</td>
 </tr>


 <tr className="p-2 ">
 <td>Freight type </td>
 <td>: </td>
 <td className="quotation_p_name"> {allqoutation?.fms_v1_freight_types?.freight_type_name}</td>
 </tr>
 <tr className="p-2">
 <td>Payment Terms </td>
 <td>: </td>
 <td className="quotation_p_name">{allqoutation?.fms_v1_payment_terms?.payment_term_name}</td>
 </tr>
 <tr className="p-2">
 <td>No of Pieces </td>
 <td>: </td>
 <td className="quotation_p_name"> {allqoutation?.quotation_no_of_pieces}</td>
 </tr>
 <tr className="p-2">
 <td>Chargeable wt </td>
 <td>: </td>
 <td className="quotation_p_name"> {allqoutation?.quotation_chargeable_wt}</td>
 </tr>
 <tr className="p-2">
 <td>Gross wt </td>
 <td>: </td>
 <td className="quotation_p_name"> {allqoutation?.quotation_gross_wt}</td>
 </tr>

</> }

invoice_details2={
  <>
   <tr className="p-2 ">
 <td>Shipper </td>
 <td>: </td>
 <td className="quotation_p_name">{allqoutation?.quotation_shipper}</td>
 </tr>
 <tr className="p-2">
 <td>Consignee </td>
 <td>: </td>
 <td className="quotation_p_name">   {allqoutation?.crm_v1_leads?.lead_customer_name}</td>
 </tr>
 <tr className="p-2">
 <td>Origin </td>
 <td>: </td>
 <td className="quotation_p_name">{ allqoutation?.fms_v1_locations_fms_v1_quotation_quotation_origin_idTofms_v1_locations.location_name
                    }</td>
 </tr>
 <tr className="p-2">
 <td>Destination </td>
 <td>: </td>
 <td className="quotation_p_name"> {
                      allqoutation
                        ?.fms_v1_locations_fms_v1_quotation_quotation_destination_idTofms_v1_locations
                        .location_name
                    }</td>
 </tr>
 <tr className="p-2">
 <td>Cargo Type </td>
 <td>: </td>
 <td className="quotation_p_name">   {allqoutation?.quotation_cargo_type}</td>
 </tr>
 <tr className="p-2">
 <td>Currency </td>
 <td>: </td>
 <td className="quotation_p_name">  {allqoutation?.generalsettings_v1_currency?.currency_name}</td>
 </tr>
 <tr className="p-2">
 <td>Exchange Rate </td>
 <td>: </td>
 <td className="quotation_p_name"> {allqoutation?.quotation_exchange_rate.toFixed(2)}</td>
 </tr>
 <tr className="p-2">
 <td>UOM </td>
 <td>: </td>
 <td className="quotation_p_name"> {allqoutation?.crm_v1_units?.unit_name}</td>
 </tr>
  </>
}
invoice_table_header={
 
   <>
  <th scope="col"className="font_weight_qt border_right" >#</th>
  <th scope="col" className="font_weight_qt border_right task_width text_align_words">TASKS</th>
  <th scope="col" className="font_weight_qt  border_right text_align_number">COST</th>
  <th scope="col" className="font_weight_qt border_right text_align_words">TAX TYPE</th>
  <th scope="col" className="font_weight_qt border_right text_align_number">TAX AMOUNT</th>
  <th scope="col" className="font_weight_qt text_align_number">TOTAL AMOUNT</th>
  </>

}
invoice_table_data={
  <>
    {tabledata && tabledata.map((itm,indx)=> (
 
 <tr>
   <td  className="border_right">{indx+1} </td>
   <td className="border_right text_align_words">{itm.service_name} </td>
   <td className="border_right text_align_number"> {itm.quotation_details_cost} </td>
   <td className="border_right text_align_words"> {itm.tax_type_name} </td>
   <td className="border_right text_align_number"> {itm.quotation_details_tax_amount} </td>
   <td className="text_align_number">{itm.quotation_details_total} </td>
 </tr>


)) }
  </>
}
amount_in_words=   {
  <>
  {allqoutation && (
    <>
    {camelize(converter.toWords(allqoutation?.quotation_grand_total))}
    </>
  )}
  </>
}


sub_total= {allqoutation?.quotation_grand_total.toFixed(2)}
total= {allqoutation?.quotation_grand_total.toFixed(2)}


/>

      {/* <div className=" print-page container ">
      

        <div className="row   ">
          <table className="quotation_border">
            <thead>
             
              <div className="d-flex  justify-content-start align-items-center gap-3 mt-4 py-3 ">
                <div>
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/${companylogo}`}
                    height={"200px"}
                    width={"190px"}
                    className="imgquotation"
                  />
                </div>
                <div className="mt-4">
                  <h5 className="headcolorquot ">{companyname} </h5>
                  <div className="">
                    <label>{companyaddress} </label>
                  </div>
                  <div className="">
                    <label>{companycountry} </label>
                  </div>
                  <div className="">
                    <label>{companyphone} </label>
                  </div>
                  <div className="">
                    <label>{companyemail}</label>
                  </div>
                </div>
              </div>
            </thead>


            <div className=" row mt-4 m-0 p-0  quotation_border_bottom">
              <h5 className="headcolorquot d-flex justify-content-center  mb-4">
                QUOTATION
              </h5>
              <div className="col-6 d-flex">
                <div className="col-4">Quotation No</div>
                <div className="col-1">:</div>

                <div className="col-7">
                  <p className="modal-view-data quotation_p_name">
                    {allqoutation?.quotation_no}
                  </p>
                </div>
              </div>

              <div className="col-6 d-flex">
                <div className="col-4">Shipper</div>
                <div className="col-1">:</div>

                <div className="col-7">
                  <p className="modal-view-data quotation_p_name">
                    {allqoutation?.quotation_shipper}
                  </p>
                </div>
              </div>
              <div className="col-6 d-flex">
                <div className="col-4">Quotation Date</div>
                <div className="col-1">:</div>

                <div className="col-7">
                  <p className="modal-view-data  quotation_p_name">
                    {moment(allqoutation?.quotation_date).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>
              <div className="col-6 d-flex">
                <div className="col-4">Consignee</div>
                <div className="col-1">:</div>

                <div className="col-7">
                  <p className="modal-view-data quotation_p_name">
                    {allqoutation?.crm_v1_leads?.lead_customer_name}
                  </p>
                </div>
              </div>

              <div className="col-6 d-flex">
                <div className="col-4">Quotation validity </div>
                <div className="col-1">:</div>

                <div className="col-7">
                  <p className="modal-view-data quotation_p_name">
                    {moment(allqoutation?.quotation_validity).format(
                      "DD-MM-YYYY"
                    )}
                  </p>
                </div>
              </div>

              <div className="col-6 d-flex">
                <div className="col-4">Origin</div>
                <div className="col-1">:</div>

                <div className="col-7">
                  <p className="modal-view-data quotation_p_name">
                    {
                      allqoutation
                        ?.fms_v1_locations_fms_v1_quotation_quotation_origin_idTofms_v1_locations
                        .location_name
                    }
                  </p>
                </div>
              </div>

              <div className="col-6 d-flex">
                <div className="col-4">Freight type</div>
                <div className="col-1">:</div>

                <div className="col-7">
                  <p className="modal-view-data quotation_p_name">
                    {allqoutation?.fms_v1_freight_types?.freight_type_name}
                  </p>
                </div>
              </div>

              <div className="col-6 d-flex">
                <div className="col-4">Destination</div>
                <div className="col-1">:</div>

                <div className="col-7">
                  <p className="modal-view-data quotation_p_name">
                    {
                      allqoutation
                        ?.fms_v1_locations_fms_v1_quotation_quotation_destination_idTofms_v1_locations
                        .location_name
                    }
                  </p>
                </div>
              </div>

              <div className="col-6 d-flex">
                <div className="col-4">Payment Terms</div>
                <div className="col-1">:</div>

                <div className="col-7">
                  <p className="modal-view-data quotation_p_name">
                    {allqoutation?.fms_v1_payment_terms?.payment_term_name}
                  </p>
                </div>
              </div>

              <div className="col-6 d-flex">
                <div className="col-4">Cargo Type</div>
                <div className="col-1">:</div>

                <div className="col-7">
                  <p className="modal-view-data quotation_p_name">
                    {allqoutation?.quotation_cargo_type}
                  </p>
                </div>
              </div>

              <div className="col-6 d-flex">
                <div className="col-4">No of pieces </div>
                <div className="col-1">:</div>

                <div className="col-7">
                  <p className="modal-view-data quotation_p_name">
                    {allqoutation?.quotation_no_of_pieces}
                  </p>
                </div>
              </div>

              <div className="col-6 d-flex">
                <div className="col-4">Currency </div>
                <div className="col-1">:</div>

                <div className="col-7">
                  <p className="modal-view-data quotation_p_name">
                    {allqoutation?.generalsettings_v1_currency?.currency_name}
                  </p>
                </div>
              </div>

              <div className="col-6 d-flex">
                <div className="col-4">Chargeable wt </div>
                <div className="col-1">:</div>

                <div className="col-7">
                  <p className="modal-view-data quotation_p_name">
                    {allqoutation?.quotation_chargeable_wt}
                  </p>
                </div>
              </div>

              <div className="col-6 d-flex">
                <div className="col-4">Exchange Rate </div>
                <div className="col-1">:</div>

                <div className="col-7">
                  <p className="modal-view-data quotation_p_name">
                    {allqoutation?.quotation_exchange_rate.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="col-6 d-flex">
                <div className="col-4">Gross wt </div>
                <div className="col-1">:</div>

                <div className="col-7">
                  <p className="modal-view-data quotation_p_name">
                    {allqoutation?.quotation_gross_wt}
                  </p>
                </div>
              </div>

              <div className="col-6 d-flex">
                <div className="col-4">UOM</div>
                <div className="col-1">:</div>

                <div className="col-7">
                  <p className="modal-view-data quotation_p_name">
                    {allqoutation?.crm_v1_units?.unit_name}
                  </p>
                </div>
              </div>
            </div>




            <div className="row m-0 p-0 quotation_border_bottom">
              <p className="font_weight_qt">Bill To</p>
            </div>
            <div className="quotation_border_bottom">
              <h6 className="quotation_p_name p-1">France & Middle East</h6>
            </div>

            <div className="p-0 m-0">
             

              <table class="table   p-0 m-0 mb-0">
                <thead className="">
                  <tr className="tr_bgcolor">
                    <th scope="col" className="font_weight_qt border_right">
                      #
                    </th>
                    <th
                      scope="col"
                      className="font_weight_qt border_right task_width text_align_words"
                    >
                      TASKS
                    </th>
                    <th
                      scope="col"
                      className="font_weight_qt  border_right text_align_number"
                    >
                      COST
                    </th>
                    <th
                      scope="col"
                      className="font_weight_qt border_right text_align_words"
                    >
                      TAX TYPE
                    </th>
                    <th
                      scope="col"
                      className="font_weight_qt border_right text_align_number"
                    >
                      TAX AMOUNT
                    </th>
                    <th
                      scope="col"
                      className="font_weight_qt text_align_number"
                    >
                      TOTAL AMOUNT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tabledata &&
                    tabledata.map((itm, indx) => (
                      <tr>
                        <th scope="row" className="border_right">
                          {indx + 1}{" "}
                        </th>
                        <th className="border_right text_align_words">
                          {itm.service_name}{" "}
                        </th>
                        <th className="border_right text_align_number">
                          {itm.quotation_details_cost}{" "}
                        </th>
                        <th className="border_right text_align_words">
                          {itm.tax_type_name}{" "}
                        </th>
                        <th className="border_right text_align_number">
                          {itm.quotation_details_tax_amount}{" "}
                        </th>
                        <th className="text_align_number">
                          {itm.quotation_details_total}{" "}
                        </th>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>


            <div className="row mt-2 p-2 py-5">
              <div className="col-6">
                <p> Total in Words</p>
              </div>
              <div className="col-6  ">
                <div className="row">
                  <div className="col-4  "></div>
                  <div className="col-4  ">
                
                  </div>
                  <div className="col-4 ">
            
                  </div>
                </div>
              </div>
            </div>

            <div className="row  p-2">
              <div className="col-6">
                {allqoutation && (
                  <p className="font_weight_qt">
                    {converter.toWords(allqoutation?.quotation_grand_total)}{" "}
                  </p>
                )}
              </div>
              <div className="col-6  ">
                <div className="row">
                  <div className="col-4  "></div>
                  <div className="col-4  ">
                    <p className="quotation_p_name">Total</p>
                  </div>
                  <div className="col-4 ">
                    <p className="text_align_number d-flex justify-content-end">
                      <p>
                       
                        {
                          allqoutation?.generalsettings_v1_currency
                            ?.currency_code
                        }
                      </p>
                      &nbsp;
                      {allqoutation?.quotation_grand_total.toFixed(2)}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          

          </table>
        </div>
      </div> */}
    </>
  );
}
export default Quotationinvoice;
