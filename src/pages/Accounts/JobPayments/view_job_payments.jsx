import React from "react";
import moment from "moment";
import { FiEdit } from "react-icons/fi";
import { format } from "date-fns";
import Button from "../../../components/button/button";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../routes";
import { ACCOUNTS, GENERAL_SETTING_BASE_URL } from "../../../api/bootapi";
import { useState } from "react";
import PublicFetch from "../../../utils/PublicFetch";
import { useEffect } from "react";

export default function ViewJobPayment() {
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

  // {function to fetch one Job Payment data - Ann - 13/3/23}
  const getOneJobPayment = () => {
    PublicFetch.get(`${ACCOUNTS}/job-payments/${id}`)
      .then((res) => {
        console.log("single brand value", res);

        if (res.data.success) {
          console.log("success job pay", res.data);
          setJobPayData(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  useEffect(() => {
    getOneJobPayment();
    CurrencyData();
  }, []);

  return (
    <>
      <div className=" container-fluid view_quotation  p-3 px-4">
        <div className="row">
          <div className="col-10">
            <h5 className="lead_text">View Job Payment</h5>
          </div>
          <div className="col-2 d-flex justify-content-end">
            <Button
              btnType="add_borderless"
              className="edit_button"
              onClick={() => {
                // handleviewtoedit();
                navigate(`${ROUTES.EDIT_JOBPAYMENT}`);
              }}
            >
              Edit
              <FiEdit />
            </Button>
          </div>
        </div>
        <div className=" row mt-3">
          <div className="col-6 d-flex">
            <div className="col-4 boldhd">Voucher No</div>
            <div className="col-1">:</div>
            <div className="col-7">
              <p className="modal-view-data">
                {jobPayData?.job_pay_voucher_no}
              </p>
            </div>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Voucher Date</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
              {moment(jobPayData?.job_pay_voucher_date).format("DD-MM-YYYY")}
            </p>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Job No</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
              {jobPayData?.fms_v1_jobs.job_number}
            </p>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Lead</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
              {jobPayData?.crm_v1_leads.lead_customer_name}
            </p>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Currency</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
              {jobPayData?.generalsettings_v1_currency.currency_name}
            </p>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Exchange Rate</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
              {jobPayData?.job_pay_exchange_rate}
            </p>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Job Amount</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">{jobPayData?.job_pay_job_amount}</p>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Advance Amount</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
              {jobPayData?.job_pay_advance_amount_fx}
            </p>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Advance in ({currencyDefault})</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">
              {" "}
              {jobPayData?.job_pay_advance_amount_lx}
            </p>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Remarks</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">{jobPayData?.job_pay_remarks}</p>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Attachments</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">{jobPayData?.job_pay_docs}</p>
          </div>
        </div>
      </div>
    </>
  );
}
