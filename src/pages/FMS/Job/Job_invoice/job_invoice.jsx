import { useState,useEffect } from "react";
import { CRM_BASE_URL_FMS, GENERAL_SETTING_BASE_URL } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import "./jobinvoice.scss"
import InvoicePrint from "../../../../components/Invoice/InvoicePrint";
import { camelize } from "../../../../utils/camelcaseconvert";
function Jobinvoice(){
    const { id } = useParams();
    console.log("id :::::", id);
    const [allqoutation, setAllQuotations] = useState();
    const [tabledata, setTableData] = useState();
  
    const [companyname,setCompanyname] = useState()
    const [companyaddress,setCompanyaddress]=useState()
    const [companyphone,setCompanyphone]= useState()
    const [companyemail,setCompanyemail]= useState()
    const [companycountry,setCompanycountry]= useState()
  
    const [companyzipcode,setcompanyzipcode]= useState()
    const [companylogo,setCompanylogo]= useState()
    const [cmpnyinfo,setcmpnyinfo]=useState()
    const [qtnno, setQtnno] = useState();
    const [tax, setTax] = useState();
    const [grandtotal, setGrandTotal] = useState();
    const [alljobs, setAllJobs] = useState();
    var converter = require('number-to-words');

    const getSingleJob = () => {
        PublicFetch.get(`${CRM_BASE_URL_FMS}/job/${id}`)
          .then((res) => {
            console.log("response of job", res);
            if (res.data.success) {
              console.log("Success of job", res.data.data);
              let newdatas = [];
              res.data.data.fms_v1_quotation_jobs.forEach((item, index) => {
                newdatas.push(item.fms_v1_quotation.quotation_no);
                setQtnno(newdatas);
                let servdata = [];
                res.data.data.fms_v1_job_task_expenses.forEach((item, index) => {
                  servdata.push({
                    quotation_details_service_id :item.crm_v1_services.service_name,
                    quotation_details_cost :item.job_task_expense_cost_amountfx,
                    quotation_details_tax_type :item.fms_v1_tax_types.tax_type_name,
                    quotation_details_tax_amount :item.job_task_expense_cost_taxfx,
                    quotation_details_total :item.job_task_expense_cost_subtotalfx,
                  }
                  
                  );
                  setTax(servdata);
                });
        
                setGrandTotal(item.fms_v1_quotation.quotation_grand_total.toFixed(2));
              });
              let temp = "";
            
             
              let date = moment(res.data.data.job_date).format("DD-MM-YYYY");
              temp = {
                job_id: res.data.data.job_id,
                job_no: res.data.data.job_number,
                job_cargo_type: res.data.data.job_cargo_type,
                job_mode: res.data.data.job_mode,
                job_no_of_pieces: res.data.data.job_no_of_pieces,
                job_shipper: res.data.data.job_shipper,
                // job_validity: res.data.data.job_validity,
                // job_validity1: validity,
                job_date: res.data.data.job_date,
                job_date1: date,
                job_exchange_rate: res.data.data.job_total_cost_exch,
                job_grand_total: res.data.data.job_grand_total,
                job_gross_wt: res.data.data.job_gross_wt,
                job_chargeable_wt: res.data.data.job_chargeable_wt,
                job_carrier: res.data.data.job_carrier,
                job_carrier1: res.data.data.fms_v1_carrier.carrier_name,
                job_consignee: res.data.data.job_consignee,
                job_consignee1: res.data.data.crm_v1_leads.lead_customer_name,

                job_currency: res.data.data.job_currency,
                job_currency1:
                  res.data.data.generalsettings_v1_currency.currency_name,
                job_destination_id: res.data.data.job_destination_id,
                job_destination_id1:
                  res.data.data
                    .fms_v1_locations_fms_v1_jobs_job_destination_idTofms_v1_locations
                    .location_name,
                // job_destination_id1:
                //   res.data.data
                //     .fms_v1_locations_fms_v1_job_job_destination_idTofms_v1_locations
                //     .location_name,
                job_awb_bl_no: res.data.data.job_awb_bl_no,
    
                job_freight_type: res.data.data.job_freight_type,
                job_freight_type1:
                  res.data.data.fms_v1_freight_types.freight_type_name,
                job_origin_id: res.data.data.job_origin_id,
                job_origin_id1:res.data.data
                    .fms_v1_locations_fms_v1_jobs_job_origin_idTofms_v1_locations
                      .location_name,
                job_payment_terms: res.data.data.job_payment_terms,
                job_payment_terms1:
                  res.data.data.fms_v1_payment_terms.payment_term_name,
                job_uom: res.data.data.job_uom,
                job_uom1: res.data.data.crm_v1_units.unit_name,
                fms_v1_job_details: res.data.data.fms_v1_job_details,
                fms_v1_enquiry_jobs: res.data.data.fms_v1_enquiry_jobs,
                job_docs: res.data.data.job_docs,
                // quotation_no:res.data.data.fms_v1_quotation_jobs.fms_v1_quotation.quotation_no,
                

              };
            
              
              console.log("datas", temp);
              setAllJobs(temp);
              close_modal(1200) 
              // close_modal(1200)
              // window.print()
            }
          })
          .catch((err) => {
            console.log("Error", err);
          });
      };
    
      useEffect(() => {
        if (id) {
          getSingleJob();
          getallcmpny()
        }
      }, [id]);

    const getallcmpny = async () => {
        try {
          const allcmpny = await PublicFetch.get(
            `${GENERAL_SETTING_BASE_URL}/company`
          );
        
          console.log(" cmpny details is", allcmpny.data.data);
          setcmpnyinfo(allcmpny.data.data)
          // setcmpnyupdate(allcmpny.data.data.length)
          console.log("dataa",allcmpny.data.data.length);
          let arry=[]
          allcmpny.data.data.forEach((i,indx)=>{
           arry.push(i)     
          })
          console.log("all cmpny are" ,arry)
          // setcmpnyupdate(arry)
    
          arry.map((itm,indx)=>{
            console.log("all cmpny maped",itm)
            // setcmpnyid(itm.company_id)
            setCompanyname(itm.company_name)
            setCompanyaddress(itm.company_address)
            setCompanyemail(itm.company_email)
            setCompanyphone(itm.company_phone)
            // setCountryis(itm.company_country)
            setcompanyzipcode(itm.company_zip_code)
            setCompanylogo(itm.company_logo)
            setCompanycountry(itm.company_country)
           
          })
          
       
        } catch (err) {
          console.log("error to fetching  compnyinfo", err);
        }
      };

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

      const close_modal = ( time) => {
        if (time) {
          setTimeout(() => {
          handlePrint()
            
          }, time);
        }
      };
    

      // useEffect(() => {

      //   close_modal(1200) 
      //   // handlePrint()

      // }, []);

console.log("all jobs", alljobs)

    return (
      <>
        <InvoicePrint
          invoice_no
          billto
          Invoice_type="JOB"
          invoice_number={alljobs?.job_no}
          invoice_details1={
            <>
              <tr className="p-2 ">
                <td>Job No </td>
                <td>: </td>
                <td className="quotation_p_name">{alljobs?.job_no}</td>
              </tr>
              <tr className="p-2">
                <td>Job Date </td>
                <td>: </td>
                <td className="quotation_p_name">{alljobs?.job_date1}</td>
              </tr>
              <tr className="p-2">
                <td>Quotation No </td>
                <td>: </td>
                <td className="quotation_p_name">{qtnno}</td>
              </tr>

              <tr className="p-2 ">
                <td>Freight type </td>
                <td>: </td>
                <td className="quotation_p_name">
                  {alljobs?.job_freight_type1}
                </td>
              </tr>
              <tr className="p-2">
                <td>Payment Terms </td>
                <td>: </td>
                <td className="quotation_p_name">
                  {" "}
                  {alljobs?.job_payment_terms1}
                </td>
              </tr>
              <tr className="p-2">
                <td>No of Pieces </td>
                <td>: </td>
                <td className="quotation_p_name">
                  {" "}
                  {alljobs?.job_no_of_pieces}
                </td>
              </tr>
              <tr className="p-2">
                <td>Chargeable wt </td>
                <td>: </td>
                <td className="quotation_p_name">
                  {alljobs?.job_chargeable_wt}
                </td>
              </tr>
              <tr className="p-2">
                <td>Gross wt </td>
                <td>: </td>
                <td className="quotation_p_name">{alljobs?.job_gross_wt}</td>
              </tr>
            </>
          }
          invoice_details2={
            <>
              <tr className="p-2 ">
                <td>Shipper </td>
                <td>: </td>
                <td className="quotation_p_name">{alljobs?.job_shipper}</td>
              </tr>
              <tr className="p-2">
                <td>Consignee </td>
                <td>: </td>
                <td className="quotation_p_name"> {alljobs?.job_consignee1}</td>
              </tr>
              <tr className="p-2">
                <td>Origin </td>
                <td>: </td>
                <td className="quotation_p_name"> {alljobs?.job_origin_id1}</td>
              </tr>
              <tr className="p-2">
                <td>Destination </td>
                <td>: </td>
                <td className="quotation_p_name">
                  {" "}
                  {alljobs?.job_destination_id1}
                </td>
              </tr>
              <tr className="p-2">
                <td>Cargo Type </td>
                <td>: </td>
                <td className="quotation_p_name"> {alljobs?.job_cargo_type}</td>
              </tr>
              <tr className="p-2">
                <td>Currency </td>
                <td>: </td>
                <td className="quotation_p_name"> {alljobs?.job_currency1}</td>
              </tr>
              <tr className="p-2">
                <td>Exchange Rate </td>
                <td>: </td>
                <td className="quotation_p_name">
                  {alljobs?.job_exchange_rate}
                </td>
              </tr>
              <tr className="p-2">
                <td>UOM </td>
                <td>: </td>
                <td className="quotation_p_name"> {alljobs?.job_uom1}</td>
              </tr>
            </>
          }
          invoice_table_header={
            <>
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
              <th scope="col" className="font_weight_qt text_align_number">
                TOTAL AMOUNT
              </th>
            </>
          }
          invoice_table_data={
            <>
              {tax &&
                tax.map((itm, indx) => (
                  <tr>
                    <td className="border_right">{indx + 1} </td>
                    <td className="border_right text_align_words">
                      {itm.quotation_details_service_id}{" "}
                    </td>
                    <td className="border_right text_align_number">
                      {itm.quotation_details_cost.toFixed(2)}{" "}
                    </td>
                    <td className="border_right text_align_words">
                      {itm.quotation_details_tax_type}{" "}
                    </td>
                    <td className="border_right text_align_number">
                      {itm.quotation_details_tax_amount.toFixed(2)}
                    </td>
                    <td className="text_align_number">
                      {itm.quotation_details_total.toFixed(2)}
                    </td>
                  </tr>
                ))}
            </>
          }
          amount_in_words={
            <>{grandtotal && <>{camelize(converter.toWords(grandtotal))}</>}</>
          }
          sub_total={grandtotal}
          total={grandtotal}
        />
      </>
    );
}
export default Jobinvoice