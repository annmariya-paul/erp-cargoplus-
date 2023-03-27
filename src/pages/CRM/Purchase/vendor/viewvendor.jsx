import React, { useEffect, useState } from "react";
import CustomModel from "../../../../components/custom_modal/custom_model";
import MyPagination from "../../../../components/Pagination/MyPagination";
import TableData from "../../../../components/table/table_data";
import { MdPageview } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Form, Input, Select, DatePicker } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import InputType from "../../../../components/Input Type textbox/InputType";
import Button from "../../../../components/button/button";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import SelectBox from "../../../../components/Select Box/SelectBox";
import PublicFetch from "../../../../utils/PublicFetch";
import {ROUTES} from "../../../../routes";
import moment from "moment";
import Custom_model from "../../../../components/custom_modal/custom_model";
import { Link, useNavigate,useParams } from "react-router-dom";
import {
  CRM_BASE_URL_PURCHASING,
  GENERAL_SETTING_BASE_URL,
} from "../../../../api/bootapi";
import { vendor_Organisation } from "../../../../utils/SelectOptions";





export default function Viewvendor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobPayData, setJobPayData] = useState();
   const [currencyDefault, setCurrencyDefault] = useState();

   const CurrencyData = () => {
     PublicFetch.get(`${GENERAL_SETTING_BASE_URL}/currency`)
       .then((res) => {
         console.log("response", res);
         if (res.data.success) {
           console.log("success", res.data.data);
           let arr = [];
           res?.data?.data?.forEach((item, index) => {
             if (item.currency_is_default === 1) {
               arr = item?.currency_code;
               setCurrencyDefault(arr);
             }
           });
         }
       })
       .catch((err) => {
         console.log("Error", err);
       });
   };

//   // {function to fetch one Job Payment data - Ann - 13/3/23}
//   const getOneJobPayment = () => {
//     PublicFetch.get(`${ACCOUNTS}/job-payments/${id}`)
//       .then((res) => {
//         console.log("single brand value", res);

//         if (res.data.success) {
//           console.log("success job pay", res.data);
//           setJobPayData(res?.data?.data);
//         }
//       })
//       .catch((err) => {
//         console.log("Error", err);
//       });
//   };
//   useEffect(() => {
//     getOneJobPayment();
//     CurrencyData();
//   }, []);



const [allvendor,setAllvendor]=useState();

console.log("all vendor : ",allvendor?.vendor_name);
const getSinglevendor = () => {
    PublicFetch.get(`${CRM_BASE_URL_PURCHASING}/vendors/${id}`)
      .then((res) => {
        console.log("response of vendor", res);
        if (res.data.success) {
          console.log("Success of vendor", res.data.data);
          setAllvendor(res?.data?.data);

      
         
         
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };


  useEffect(() => {
    if (id) {
      getSinglevendor();
    }
  }, [id]);

  return (
    <>
      <div className=" container-fluid view_quotation  p-3">
        <div className="row">
          <div className="col-10">
            <h5 className="lead_text">View Vendor</h5>
          </div>
          <div className="col-2 d-flex justify-content-end">
            <Button
              btnType="add_borderless"
              className="edit_button"
              onClick={() => {
                // handleviewtoedit();
                navigate(`${ROUTES.UPDATE_VENDOR}/${id}`);
              }}
            >
              Edit
              <FiEdit />
            </Button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-6 d-flex">
            <div className="col-4 boldhd">Vendor Name</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">
             { allvendor?.vendor_name}              </p>
            </div>
          </div>
        </div>
        {/* <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd">Voucher Date</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
              {moment(jobPayData?.job_pay_voucher_date).format("DD-MM-YYYY")}
            </p>
          </div>
        </div>
        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd">Job No</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
              {jobPayData?.fms_v1_jobs.job_number}
            </p>
          </div>
        </div>
        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd">Lead</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
              {jobPayData?.crm_v1_leads.lead_customer_name}
            </p>
          </div>
        </div>
        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd">Currency</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
              {jobPayData?.generalsettings_v1_currency.currency_name}
            </p>
          </div>
        </div>
        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd">Exchange Rate</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
              {jobPayData?.job_pay_exchange_rate}
            </p>
          </div>
        </div>
        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd">Job Amount</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">{jobPayData?.job_pay_job_amount}</p>
          </div>
        </div>
        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd">Advance Amount</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
              {jobPayData?.job_pay_advance_amount_fx}
            </p>
          </div>
        </div>
        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd">Advance in ({currencyDefault})</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
              {" "}
              {jobPayData?.job_pay_advance_amount_lx}
            </p>
          </div>
        </div>
        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd">Remarks</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">{jobPayData?.job_pay_remarks}</p>
          </div>
        </div>
        <div className="col-sm-6 d-flex">
          <div className="col-4 boldhd">Attachments</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">{jobPayData?.job_pay_docs}</p>
          </div>
        </div> */}
      </div>
    </>
  );
}
