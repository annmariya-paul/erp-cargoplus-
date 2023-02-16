import { useEffect, useState } from "react";
import { CRM_BASE_URL_FMS, GENERAL_SETTING_BASE_URL } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import "./quotation.scss"
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

function Quotationinvoice(){

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


    const getSingleQuotation = () => {
        PublicFetch.get(`${CRM_BASE_URL_FMS}/quotation/${id}`)
          .then((res) => {
            console.log("response of quotation", res);
            if (res.data.success) {
              console.log("Success of quotation", res.data.data);
    
              let temp = "";
              let validity = moment(res.data.data.quotation_validity).format(
                "DD-MM-YYYY"
              );
              let date = moment(res.data.data.quotation_date).format("DD-MM-YYYY");
              temp = {
                quotation_id: res.data.data.quotation_id,
                quotation_no: res.data.data.quotation_no,
                quotation_cargo_type: res.data.data.quotation_cargo_type,
                quotation_mode: res.data.data.quotation_mode,
                quotation_no_of_pieces: res.data.data.quotation_no_of_pieces,
                quotation_shipper: res.data.data.quotation_shipper,
                quotation_validity: res.data.data.quotation_validity,
                quotation_validity1: validity,
                quotation_date: res.data.data.quotation_date,
                quotation_date1: date,
                quotation_exchange_rate: res.data.data.quotation_exchange_rate,
                quotation_grand_total: res.data.data.quotation_grand_total,
                quotation_gross_wt: res.data.data.quotation_gross_wt,
                quotation_chargeable_wt: res.data.data.quotation_chargeable_wt,
                quotation_carrier: res.data.data.quotation_carrier,
                quotation_carrier1: res.data.data.fms_v1_carrier.carrier_name,
                quotation_consignee: res.data.data.quotation_consignee,
                quotation_consignee1: res.data.data.crm_v1_leads.lead_customer_name,
                quotation_currency: res.data.data.quotation_currency,
                quotation_currency1:
                  res.data.data.generalsettings_v1_currency.currency_name,
                quotation_destination_id: res.data.data.quotation_destination_id,
                quotation_destination_id1:
                  res.data.data
                    .fms_v1_locations_fms_v1_quotation_quotation_destination_idTofms_v1_locations
                    .location_name,
                quotation_freight_type: res.data.data.quotation_freight_type,
                quotation_freight_type1:
                  res.data.data.fms_v1_freight_types.freight_type_name,
                quotation_origin_id: res.data.data.quotation_origin_id,
                quotation_origin_id1:
                  res.data.data
                    .fms_v1_locations_fms_v1_quotation_quotation_origin_idTofms_v1_locations
                    .location_name,
                quotation_payment_terms: res.data.data.quotation_payment_terms,
                quotation_payment_terms1:
                  res.data.data.fms_v1_payment_terms.payment_term_name,
                quotation_uom: res.data.data.quotation_uom,
                quotation_uom1: res.data.data.crm_v1_units.unit_name,
                fms_v1_quotation_details: res.data.data.fms_v1_quotation_details,
                fms_v1_enquiry_quotations: res.data.data.fms_v1_enquiry_quotations,
                quotation_docs: res.data.data.quotation_docs,
              };
              console.log("datas", temp);
              let temp11 = [];
    
              res.data.data.fms_v1_quotation_details.forEach((item, index) => {
                temp11.push({
                  quotation_details_cost: item.quotation_details_cost.toFixed(2),
                  quotation_details_id: item.quotation_details_id,
                  quotation_details_quotation_id:
                    item.quotation_details_quotation_id,
                  quotation_details_service_id: item.quotation_details_service_id,
                  quotation_details_status: item.quotation_details_status,
                  quotation_details_tax_amount: item.quotation_details_tax_amount.toFixed(2),
                  quotation_details_tax_type: item.quotation_details_tax_type,
                  quotation_details_total: item.quotation_details_total.toFixed(2),
                  service_name: item.crm_v1_services?.service_name,
                  tax_type_name: item.fms_v1_tax_types?.tax_type_name,
                });
                setTableData(temp11);
              });
    
              setAllQuotations(temp);
            }
          })
          .catch((err) => {
            console.log("Error", err);
          });
      };

      useEffect(() => {
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
    
      useEffect(() => {
        getallcmpny();
      }, []);

    return(
        <>
        
        <div className="container">
        <div className="row  quotation_border">

           
        <div className="row mt-4 border-bottom">
       
        <div className="col-3">
             <img src={`${process.env.REACT_APP_BASE_URL}/${companylogo}`}
            //   height={"150px"}
            //   width={"150px"}
              className="imgquotation"
              />
        </div>
      
          <div className="col-7 ">
          <h5 className=" ">{companyname} </h5>
         
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

        <div className=" row mt-4 py-5">
          <div className="col-6 d-flex">
            <div className="col-4">Quotation No</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">{allqoutation?.quotation_no}</p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Quotation Date</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">{allqoutation?.quotation_date1}</p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Quotation validity </div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {allqoutation?.quotation_validity1}
              </p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Consignee</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {allqoutation?.quotation_consignee1}
              </p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Shipper</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {allqoutation?.quotation_shipper}
              </p>
            </div>
          </div>

         

          <div className="col-6 d-flex">
            <div className="col-4">Freight type</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {allqoutation?.quotation_freight_type1}
              </p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Cargo Type</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {allqoutation?.quotation_cargo_type}
              </p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Mode</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">{allqoutation?.quotation_mode}</p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Origin</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {allqoutation?.quotation_origin_id1}
              </p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Destination</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {allqoutation?.quotation_destination_id1}
              </p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Carrier</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {allqoutation?.quotation_carrier1}
              </p>
            </div>
          </div>

         

          <div className="col-6 d-flex">
            <div className="col-4">Payment Terms</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {allqoutation?.quotation_payment_terms1}
              </p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">No of pieces </div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {allqoutation?.quotation_no_of_pieces}
              </p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">UOM</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">{allqoutation?.quotation_uom1}</p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Gross wt </div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {allqoutation?.quotation_gross_wt}
              </p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Chargeable wt </div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {allqoutation?.quotation_chargeable_wt}
              </p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Currency </div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {allqoutation?.quotation_currency1}
              </p>
            </div>
          </div>
          <div className="col-6 d-flex">
            <div className="col-4">Exchange Rate </div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">
                {allqoutation?.quotation_exchange_rate.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="col-6 d-flex">
            <div className="col-4">Attachments </div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">{allqoutation?.quotation_docs}</p>
            </div>
          </div>
</div>
        </div>
        </div>
        </>
    )
}
export default Quotationinvoice;