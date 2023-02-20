import { useState,useEffect } from "react";
import { CRM_BASE_URL_FMS, GENERAL_SETTING_BASE_URL } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

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
   
    const [alljobs, setAllJobs] = useState();


    const getSingleJob = () => {
        PublicFetch.get(`${CRM_BASE_URL_FMS}/job/${id}`)
          .then((res) => {
            console.log("response of job", res);
            if (res.data.success) {
              console.log("Success of job", res.data.data);
    
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
                job_exchange_rate: res.data.data.job_exchange_rate,
                job_grand_total: res.data.data.job_grand_total,
                job_gross_wt: res.data.data.job_gross_wt,
                job_chargeable_wt: res.data.data.job_chargeable_wt,
                job_carrier: res.data.data.job_carrier,
                job_carrier1: res.data.data.fms_v1_carrier.carrier_name,
                job_consignee: res.data.data.job_consignee,
                job_consignee1: res.data.data.crm_v1_leads.lead_customer_name,
                // job_currency: res.data.data.job_currency,
                // job_currency1:
                //   res.data.data.generalsettings_v1_currency.currency_name,
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


console.log("all jobs", alljobs)

    return(
        <>

<div className=" print-page container">
<div className="row  quotation_border">

           
<div className="d-flex justify-content-start align-items-center gap-3 mt-4 m-0 p-0 border-bottom">

<div className="">
     <img src={`${process.env.REACT_APP_BASE_URL}/${companylogo}`}
      height={"200px"}
      width={"190px"}
      className="imgquotation"
      />
</div>

  <div className="">
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


<div className=" row mt-3">
          <div className="col-6 d-flex">
            <div className="col-4">Job No</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">{alljobs?.job_no}</p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Job Date</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">{alljobs?.job_date1}</p>
            </div>
          </div>
          <div className="col-6 d-flex">
            <div className="col-4">Quotation No</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data"></p>
            </div>
          </div>
        

          <div className="col-6 d-flex">
            <div className="col-4">Consignee</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {alljobs?.job_consignee1}
              </p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Shipper</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {alljobs?.job_shipper}
              </p>
            </div>
          </div>

        

          <div className="col-6 d-flex">
            <div className="col-4">Freight type</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {alljobs?.job_freight_type1}
              </p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Cargo Type</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {alljobs?.job_cargo_type}
              </p>
            </div>
          </div>
        
           <div className="col-6 d-flex">
            <div className="col-4">AWB/BL No</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {alljobs?.job_awb_bl_no}
              </p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Mode</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">{alljobs?.job_mode}</p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Origin</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {alljobs?.job_origin_id1}
              </p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Destination</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {alljobs?.job_destination_id1}
              </p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Carrier</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {alljobs?.job_carrier1}
              </p>
            </div>
          </div>

        

          <div className="col-6 d-flex">
            <div className="col-4">Payment Terms</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {alljobs?.job_payment_terms1}
              </p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">No of pieces </div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {alljobs?.job_no_of_pieces}
              </p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">UOM</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">{alljobs?.job_uom1}</p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Gross wt </div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {alljobs?.job_gross_wt}
              </p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Chargeable wt </div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {alljobs?.job_chargeable_wt}
              </p>
            </div>
          </div>

          {/* <div className="col-6 d-flex">
            <div className="col-4">Currency </div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {alljobs?.job_currency1}
              </p>
            </div>
          </div> */}
          <div className="col-6 d-flex">
            <div className="col-4">Exchange Rate </div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {alljobs?.job_exchange_rate}
              </p>
            </div>
          </div>
        

          
        </div>
</div>

</div>
        </>
    )
}
export default Jobinvoice