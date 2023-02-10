import "../Quotations/create quotation/quotation.scss";
import React, { useState, useRef, useEffect } from "react";

import Button from "../../../components/button/button";
import { FiEdit } from "react-icons/fi";
import TableData from "../../../components/table/table_data";

import { Collapse } from "antd";
import html2canvas from "html2canvas";

import { BorderOutlined } from "@ant-design/icons";
import PublicFetch from "../../../utils/PublicFetch";
import {ROUTES} from "../../../routes"

import { CRM_BASE_URL_FMS } from "../../../api/bootapi";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

const onChange = (key) => {
  console.log(key);
};

const progress = [
  {
    title: "TASKS",
    dataIndex: "quotation_details_service_id",
    key: "quotation_details_service_id",
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
    dataIndex: "quotation_details_tax_type",
    key: "quotation_details_tax_type",
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
const { Panel } = Collapse;
const data = [
  {
    tasks: "Data",
    cost: "4223",
    taxtype: "test",
    taxamount: "xyz",

    totalamount: "1000",

    key: "1",
  },
  {
    tasks: "Test",
    cost: "4545",
    taxtype: "test",
    taxamount: "xyz",
    totalamount: "2000",
    key: "2",
  },
];
export default function ViewJob() {
  const { id } = useParams();
  console.log("id :::::", id);
  const printRef = useRef(null);
  const [allqoutation, setAllQuotations] = useState();

  const navigate = useNavigate();

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

  function setPageSize() {
    const page = document.querySelector(".print-page");
    page.style.width = "210mm";
    page.style.height = "297mm";
    page.style.margin = "10mm";
  }
  const handlePrint = () => {
    setPageSize();
    window.print();
  };

  // const handleviewtoedit = () => {
  //   navigate(`${}`);
  // };

  return (
    <>
      <div className="print-page container-fluid view_quotation  p-3 px-4">
        <div className="print-header">Header</div>
        <div className="row">
          <div className="col-6">
            <h5 className="lead_text">View Job</h5>
          </div>
          <div className="col-6 d-flex justify-content-end mt-2">
            <div className="col-2">
              <Button
                btnType="add_borderless"
                className="edit_button"
                onClick={handlePrint}
              >
                Print
              </Button>
            </div>
            <div className="col-2 ">
              <Button
                btnType="add_borderless"
                className="edit_button"
                onClick={() => {
                  // handleviewtoedit();
                  navigate(`${ROUTES.EDIT_JOB}/${id}`);
                }}
              >
                Edit
                <FiEdit />
              </Button>
            </div>
          </div>
        </div>
        <div className=" row mt-3">
          <div className="col-6 d-flex">
            <div className="col-4">Job No</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">{allqoutation?.quotation_no}</p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Job Date</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">{allqoutation?.quotation_date1}</p>
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
                {allqoutation?.quotation_exchange_rate}
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

          <div className="mt-3">
            <Collapse
              defaultActiveKey={["1"]}
              onChange={onChange}
              expandIconPosition={"end"}
            >
              <Panel header="TASK DETAILS" key="1">
                <div>
                  {" "}
                  <TableData
                    columns={progress}
                    data={allqoutation?.fms_v1_quotation_details}
                    bordered
                  />
                </div>
                <div className="d-flex justify-content-end mt-4 mx-3 ">
                  <div className="col-lg-2 col-sm-4 col-xs-3 d-flex justify-content-end mt-3 me-2">
                    <p style={{ fontWeight: 500 }}>Grand Total : </p>
                  </div>
                  {/* <div className="col-1">:</div> */}
                  <div className="col-lg-2 col-sm-2 col-xs-2 mt-3">
                    <p>{allqoutation?.quotation_grand_total}</p>
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>
        <div className="print-footer">Footer</div>
      </div>
    </>
  );
}
