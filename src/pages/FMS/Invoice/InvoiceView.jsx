import React, { useEffect } from "react";
import { DatePicker, Form, Popconfirm } from "antd";
import SelectBox from "../../../components/Select Box/SelectBox";
import InputType from "../../../components/Input Type textbox/InputType";
import { Collapse } from "antd";
import TableData from "../../../components/table/table_data";
import Button from "../../../components/button/button";
import { useNavigate, useParams } from "react-router-dom";
import PublicFetch from "../../../utils/PublicFetch";
import { CRM_BASE_URL_FMS } from "../../../api/bootapi";
import { useState } from "react";
import moment from "moment";
import Custom_model from "../../../components/custom_modal/custom_model";
import { ROUTES } from "../../../routes";
function InvoiceView() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("Id::::", id);
  const [addForm] = Form.useForm();
  const [jobData, setJobData] = useState();
  console.log("jobdata", jobData);
  const [TaskExpense, setTaskexpense] = useState();
  const [currency, setCurrency] = useState();
  const [exchangerate, setExchangeRate] = useState();
  const [grandTotal, setGrandTotal] = useState();
  const [successPopup, setSuccessPopup] = useState(false);
  let totadyDate = new Date();
  let date = moment(totadyDate);
  const [Invoice_Date, setInvoiceDate] = useState(date);

  const { Panel } = Collapse;

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.INVOICE_LIST);
      }, time);
    }
  };

  const progress = [
    {
      title: "TASKS",
      dataIndex: "job_task_expense_task_name",
      key: "job_task_expense_task_name",
      align: "left",
      width: "35%",
      // render: (value, item, indx) => count + indx,
    },
    {
      title: "TAX GROUP",
      dataIndex: "job_task_expense_tax_group_name",
      key: "job_task_expense_tax_group_name",
      align: "left",
    },
    {
      title: "COST",
      dataIndex: "job_task_expense_cost_amountfx",
      key: "job_task_expense_cost_amountfx",
      align: "right",
    },
    {
      title: "TAX AMOUNT",
      dataIndex: "job_task_expense_cost_taxfx",
      key: "job_task_expense_cost_taxfx",
      // width: "35%",
      align: "right",
    },
    {
      title: "TOTAL AMOUNT(KWD) ",
      dataIndex: "job_task_expense_cost_subtotalfx",
      key: "job_task_expense_cost_subtotalfx",

      align: "right",
    },
  ];

  const getOneJob = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/job/job-invoice/${id}`)
      .then((res) => {
        console.log("Response of job", res);
        if (res.data.success) {
          console.log("success of job", res.data.data);
          setJobData(res.data.data);
          let total = 0;

          let temp = [];
          res?.data?.data?.fms_v1_job_task_expenses?.forEach((item, index) => {
            temp.push({
              job_task_expense_agent_id: item.job_task_expense_agent_id,
              job_task_expense_cost_amountfx:
                item.job_task_expense_cost_amountfx,
              job_task_expense_cost_subtotalfx:
                item.job_task_expense_cost_subtotalfx,
              job_task_expense_cost_taxfx: item.job_task_expense_cost_taxfx,
              job_task_expense_id: item.job_task_expense_id,
              job_task_expense_job_id: item.job_task_expense_job_id,
              job_task_expense_task_id: item.job_task_expense_task_id,
              job_task_expense_tax_perc: item.job_task_expense_tax_perc,
              job_task_expense_task_name: item.crm_v1_services?.service_name,
              job_task_expense_tax_group_name:
                item.fms_v1_tax_groups?.tax_group_name,
            });
            total += item.job_task_expense_cost_subtotalfx;
          });
          setTaskexpense(temp);
          setGrandTotal(total);
          console.log("total amount .", total);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  let IsDate_confirm = moment(Invoice_Date).format("DD-MM-YYYY");

  const generateInvoice = () => {
    let date_of_invoice = moment(Invoice_Date);

    PublicFetch.post(`${CRM_BASE_URL_FMS}/invoice`, {
      invoice_date: date_of_invoice,
      invoice_job_id: parseInt(id),
      invoice_currency: jobData?.job_total_cost_curr,
      invoice_exchange_rate: jobData?.job_total_cost_exch,
      invoice_grand_total: grandTotal,
    })
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success of invoice", res.data.data);
          setSuccessPopup(true);
          close_modal(successPopup, 1200);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    if (id) {
      getOneJob();
    }
  }, [id]);
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-md-center mb-2">
          <div className="content-tabs">
            <div className="container-fluid ">
              <div className="row  mt-3 ">
                <div className="col-xl-6 col-lg-2 col-md-3 col-sm-12 ">
                  <h4 className="lead_text">Invoice Preview</h4>
                </div>
              </div>

              <div className="row  mb-3 ">
                <div className="col-md-6 col-12 mt-1">
                  <div className="content-tabs-new justify-content ">
                    <div className="row mt-2 mb-3">
                      <h5 className="lead_text">Basic Info</h5>
                    </div>

                    <div className="col-12 d-flex">
                      <div className="col-4">Freight type</div>
                      <div className="col-1">:</div>

                      <div className="col-7">
                        <p className="modal-view-data">
                          {jobData?.fms_v1_freight_types?.freight_type_name}
                        </p>
                      </div>
                    </div>

                    <div className="col-12 d-flex ">
                      <div className="col-4">Invoice Date</div>
                      <div className="col-1">:</div>

                      <div className="col-7">
                        <p className="modal-view-data">{IsDate_confirm}</p>
                      </div>
                    </div>
                    <div className="col-12 d-flex">
                      <div className="col-4">Customer</div>
                      <div className="col-1">:</div>

                      <div className="col-7">
                        <p className="modal-view-data">
                          {jobData?.crm_v1_customer?.customer_name}
                        </p>
                      </div>
                    </div>

                    <div className="col-12 d-flex">
                      <div className="col-4">Job No</div>
                      <div className="col-1">:</div>

                      <div className="col-7">
                        <p className="modal-view-data">{jobData?.job_number}</p>
                      </div>
                    </div>
                    <div className="col-12 d-flex">
                      <div className="col-4">Shipper</div>
                      <div className="col-1">:</div>

                      <div className="col-7">
                        <p className="modal-view-data">
                          {jobData?.job_shipper}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12 mt-1">
                  <div className="content-tabs-new  justify-content ms-1 mb-3 ">
                    <div className="row mt-2 mb-3">
                      <h5 className="lead_text">Transportation</h5>
                    </div>

                    <div className="col-12 d-flex">
                      <div className="col-4">Mode</div>
                      <div className="col-1">:</div>

                      <div className="col-7">
                        <p className="modal-view-data">{jobData?.job_mode}</p>
                      </div>
                    </div>
                    <div className="col-12 d-flex">
                      <div className="col-4">Origin</div>
                      <div className="col-1">:</div>

                      <div className="col-7">
                        <p className="modal-view-data">
                          {
                            jobData
                              ?.fms_v1_locations_fms_v1_jobs_job_origin_idTofms_v1_locations
                              ?.location_name
                          }
                        </p>
                      </div>
                    </div>
                    <div className="col-12 d-flex">
                      <div className="col-4">Destination</div>
                      <div className="col-1">:</div>

                      <div className="col-7">
                        <p className="modal-view-data">
                          {
                            jobData
                              ?.fms_v1_locations_fms_v1_jobs_job_destination_idTofms_v1_locations
                              ?.location_name
                          }
                        </p>
                      </div>
                    </div>

                    <div className="col-12 d-flex">
                      <div className="col-4">Carrier</div>
                      <div className="col-1">:</div>

                      <div className="col-7">
                        <p className="modal-view-data">
                          {jobData?.fms_v1_carrier?.carrier_name}
                        </p>
                      </div>
                    </div>

                    <div className="col-12 d-flex">
                      <div className="col-4">AWB/BL</div>
                      <div className="col-1">:</div>

                      <div className="col-7">
                        <p className="modal-view-data">
                          {jobData?.job_awb_bl_no}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row  mb-3">
              <div className="col-md-6 col-12 mt-1 ">
                <div className="content-tabs-new  justify-content  mb-2 ms-4">
                  <div className="row mt-1 mb-2 ">
                    <h5 className="lead_text">Shipment Details</h5>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-4">Cargo Type</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {jobData?.job_cargo_type}
                      </p>
                    </div>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-4">No of Pieces</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {jobData?.job_no_of_pieces}
                      </p>
                    </div>
                  </div>

                  <div className="col-12 d-flex">
                    <div className="col-4">UOM</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {jobData?.crm_v1_units?.unit_name}
                      </p>
                    </div>
                  </div>

                  <div className="col-12 d-flex">
                    <div className="col-4">Gross wt</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">{jobData?.job_gross_wt}</p>
                    </div>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-4">Chargeble wt</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {jobData?.job_chargeable_wt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-12 mt-1">
                <div className="content-tabs-new   ms-1 mb-2 me-3">
                  <div className="row mt-1 mb-2">
                    <h5 className="lead_text">Payment Info</h5>
                  </div>

                  <div className="col-12 d-flex">
                    <div className="col-4">Terms</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {jobData?.fms_v1_payment_terms?.payment_term_name}
                      </p>
                    </div>
                  </div>

                  <div className="col-12 d-flex">
                    <div className="col-4">Currency</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {jobData?.generalsettings_v1_currency?.currency_name}
                      </p>
                    </div>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-4">Exchange Rate</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {jobData?.job_total_cost_exch}
                      </p>
                    </div>
                  </div>
                  <div className="col-12 d-flex mb-4 pb-4">
                    <div className="col-4">Credit Days</div>
                    <div className="col-1">:</div>
                    <div className="col-7">
                      <p className="modal-view-data">
                        {jobData?.job_credit_days}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-0 me-4 mb-1 pt-0 ms-1 ">
              <div className="content-tabs-tablenew  justify-content m-3 ">
                <div className="mt-3">
                  <div>
                    <TableData columns={progress} data={TaskExpense} bordered />
                  </div>
                  <div className="d-flex justify-content-end gap-3 mt-3">
                    <label style={{ fontWeight: 600 }}>Total</label>{" "}
                    <lable style={{ fontWeight: 600 }}>:</lable>{" "}
                    <lable style={{ fontWeight: 600 }}>{grandTotal} </lable>
                  </div>
                </div>
              </div>
            </div>
            {/* </Form> */}
          </div>
        </div>
        <Custom_model
          success
          show={successPopup}
          onHide={() => {
            setSuccessPopup(false);
          }}
        />
      </div>
    </>
  );
}

export default InvoiceView;
