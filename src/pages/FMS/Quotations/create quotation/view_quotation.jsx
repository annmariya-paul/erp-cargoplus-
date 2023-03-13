import "./quotation.scss";
import React, { useState, useRef, useEffect } from "react";
import Button from "../../../../components/button/button";
import { FiEdit } from "react-icons/fi";
import TableData from "../../../../components/table/table_data";
import { Collapse } from "antd";
import html2canvas from "html2canvas";

import { BorderOutlined } from "@ant-design/icons";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../../routes";
const onChange = (key) => {
  console.log(key);
};

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
export default function ViewQuotation() {
  const { id } = useParams();
  console.log("id :::::", id);
  const printRef = useRef(null);
  const [allqoutation, setAllQuotations] = useState();
  const [tabledata, setTableData] = useState();
  const navigate = useNavigate();

  const getSingleQuotation = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/quotation/${id}`)
      .then((res) => {
        console.log("response of quotation", res);
        if (res.data.success) {
          console.log("Success of quotation", res.data.data);
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
            }
          );
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
  // const  handlePrint = () => {
  //   // window.print({printable: printRef.current, type: 'html'});
  //   window.print({printable: document.getElementById("myPrintableDiv"), type: 'html'});
  //   // window.print();
  // }
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
      {/* <div className=" container-fluid view_quotation  p-3 px-4"> */}
      {/* <div className="print-header">Header</div> */}
      <div className="container-fluid">
        <div className="row justify-content-md-center mb-2">
          {/* <div className="col-6">
            <h5 className="lead_text">View Quotation</h5>
          </div> */}
          <div className="content-tabs ">
            <div className="container-fluid ">
              <div className="row  mt-2 ">
                <div className="col-xl-6 col-lg-2 col-md-3 col-sm-12 ">
                  <h4 className="lead_text">View Quotation</h4>
                </div>
                <div className="col-xl-6 col-md-12">
                  <div className="row justify-content-end mx-2 py-3">
                    <div className="col-xl-2 col-lg-2 col-md-3 col-sm-12  mb-3 ">
                      {/* <div className="col-6 d-flex justify-content-end mt-2">
            <div className="col-2"> */}
                      <Button
                        btnType="add_borderless"
                        className="edit_button"
                        // onClick={handlePrint}
                        onClick={() => {
                          // handleviewtoedit();
                          // navigate(`${ROUTES.QUATATION_INVOICE}/${id}`);
                          window.open(
                            `http://localhost:3000/quatation_invoice/${id}`,
                            `_blank`
                          );
                        }}
                      >
                        Print
                      </Button>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-3 col-sm-12 mb-3 ">
                      <Button
                        btnType="add_borderless"
                        className="edit_button"
                        onClick={() => {
                          // handleviewtoedit();
                          navigate(`${ROUTES.EDIT_QUOTATION}/${id}`);
                        }}
                      >
                        Edit
                        <FiEdit />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ms-1 mb-3 ">
                <div className="content-tabs-new row justify-content px-4">
                  <div className="row mt-2 mb-3">
                    <h5 className="lead_text">Basic Info</h5>
                  </div>

                  <div className="col-xl-4 col-sm-12 d-flex">
                    {/* <div className=" row mt-3">
          <div className="col-6 d-flex"> */}
                    <div className="col-5">Quotation No</div>
                    <div className="col-1">:</div>

                    <div className="col-6">
                      <p className="modal-view-data">
                        {allqoutation?.quotation_no}
                      </p>
                    </div>
                  </div>

                  <div className="col-xl-4 col-sm-12 d-flex">
                    <div className="col-5">Quotation Date</div>
                    <div className="col-1">:</div>

                    <div className="col-6">
                      <p className="modal-view-data">
                        {moment(allqoutation?.quotation_date).format(
                          "DD-MM-YYYY"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="col-xl-4 col-sm-12 d-flex">
                    <div className="col-5">Quotation validity </div>
                    <div className="col-1">:</div>

                    <div className="col-6">
                      <p className="modal-view-data">
                        {moment(allqoutation?.quotation_validity).format(
                          "DD-MM-YYYY"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-4 col-sm-12 d-flex">
                    <div className="col-5">Freight type</div>
                    <div className="col-1">:</div>

                    <div className="col-6">
                      <p className="modal-view-data">
                        {allqoutation?.fms_v1_freight_types?.freight_type_name}
                      </p>
                    </div>
                  </div>

                  <div className="col-xl-4 col-sm-12 d-flex">
                    <div className="col-5">Consignee</div>
                    <div className="col-1">:</div>

                    <div className="col-6">
                      <p className="modal-view-data">
                        {allqoutation?.crm_v1_leads?.lead_customer_name}
                      </p>
                    </div>
                  </div>

                  <div className="col-xl-4 col-sm-12 d-flex">
                    <div className="col-5">Shipper</div>
                    <div className="col-1">:</div>

                    <div className="col-6">
                      <p className="modal-view-data">
                        {allqoutation?.quotation_shipper}
                      </p>
                    </div>
                  </div>

                  {/* <div className="col-6 d-flex">
            <div className="col-4">Origin Agent</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">{}</p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Destination Agent</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">Test</p>
            </div>
          </div> */}
                </div>
              </div>
            </div>

            <div className="row  mt-2 px-1">
              <div className="col-md-6 col-12 mt-1">
<<<<<<< HEAD
                <div className="content-tabs-new row justify-content ms-1 mb-2 me-2">
=======
                <div className="content-tabs-new  justify-content ms-1 mb-3 me-3">
>>>>>>> 8d50173de15bf5cb3102f4b0b728b95008bd6095
                  <div className="row mt-3 mb-3">
                    <h5 className="lead_text">Transportation</h5>
                  </div>

                  <div className="col-12 d-flex">
                    <div className="col-4">Mode</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {allqoutation?.quotation_mode}
                      </p>
                    </div>
                  </div>

                  <div className="col-12 d-flex">
                    <div className="col-4">Origin</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {
                          allqoutation
                            ?.fms_v1_locations_fms_v1_quotation_quotation_origin_idTofms_v1_locations
                            .location_name
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
                          allqoutation
                            ?.fms_v1_locations_fms_v1_quotation_quotation_destination_idTofms_v1_locations
                            .location_name
                        }
                      </p>
                    </div>
                  </div>

                  <div className="col-12 d-flex mb-4 pb-1">
                    <div className="col-4">Carrier</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {allqoutation?.fms_v1_carrier.carrier_name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

<<<<<<< HEAD
              <div className="col-md-6 col-12 mt-1">
                <div className="content-tabs-new row justify-content  mb-2 me-1">
                  <div className="row mt-3 mb-2">
                    <h5 className="lead_text">Shipment Details</h5>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-4">Cargo Type</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {allqoutation?.quotation_cargo_type}
                      </p>
=======
              <div className="row mt-2 px-1">
                <div className="col-md-6 col-12 ">
                  <div className="content-tabs-new px-2  ms-1 me-3">
                    <div className="row mt-2 mb-1">
                      <h5 className="lead_text">Payment Info</h5>
>>>>>>> 8d50173de15bf5cb3102f4b0b728b95008bd6095
                    </div>
                  </div>

                  <div className="col-12 d-flex">
                    <div className="col-4">No of pieces </div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {allqoutation?.quotation_no_of_pieces}
                      </p>
                    </div>
                  </div>

                  <div className="col-12 d-flex">
                    <div className="col-4">UOM</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {allqoutation?.crm_v1_units?.unit_name}
                      </p>
                    </div>
<<<<<<< HEAD
                  </div>
=======
                    <div className="col-12 d-flex ">
                      <div className="col-4">Exchange Rate </div>
                      <div className="col-1">:</div>
>>>>>>> 8d50173de15bf5cb3102f4b0b728b95008bd6095

                  <div className="col-12 d-flex">
                    <div className="col-4">Gross wt </div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {allqoutation?.quotation_gross_wt}
                      </p>
                    </div>
                  </div>

                  <div className="col-12 d-flex">
                    <div className="col-4">Chargeable wt </div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {allqoutation?.quotation_chargeable_wt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

<<<<<<< HEAD
            <div className="row mt-2 px-1 ">
              <div className="col-md-6 col-12 mt-1">
                <div className="content-tabs-new row justify-content ms-1 mb-3 me-2">
                  <div className="row mt-3 mb-2">
                    <h5 className="lead_text">Payment Info</h5>
                  </div>

                  <div className="col-12 d-flex">
                    <div className="col-4">Payment Terms</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {allqoutation?.fms_v1_payment_terms?.payment_term_name}
                      </p>
                    </div>
                  </div>

                  <div className="col-12 d-flex">
                    <div className="col-4">Currency</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {
                          allqoutation?.generalsettings_v1_currency
                            ?.currency_name
                        }
                      </p>
                    </div>
                  </div>
=======
                <div className="col-md-6 col-12 ">
                  <div className="content-tabs-new px-2  me-3 ms-1">
                    <div className="row mt-3 mb-2 ">
                      <h5 className="lead_text">Attachments</h5>
                    </div>
                     <div className="row mb-4 pb-4 ms-1 ">

                      <div className="col-3 boldhd ">Attachments </div>
                      <div className="col-1">:</div>

                      <div className="col-8">
                        <p className="modal-view-data">
                          {allqoutation?.quotation_docs}
                        </p>
                      </div>
                    </div>
                     
                  
>>>>>>> 8d50173de15bf5cb3102f4b0b728b95008bd6095

                  <div className="col-12 d-flex">
                    <div className="col-4">Exchange Rate</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {allqoutation?.quotation_exchange_rate.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

<<<<<<< HEAD
              <div className="col-md-6 col-12 mt-1">
                <div className="content-tabs-new row justify-content  mb-3 me-1">
                  <div className="row mt-3 mb-2">
                    <h5 className="lead_text">Attachments</h5>
                  </div>
                  <div className="col-12 d-flex pb-5 mb-4">
                    <div className="col-4">Attachments</div>
                    <div className="col-1">:</div>
=======
              <div className="row mt-2 me-4 mb-1 pt-0 ">
                <div className="content-tabs-tablenew  justify-content m-3 ">
>>>>>>> 8d50173de15bf5cb3102f4b0b728b95008bd6095

                    <div className="col-7">
                      <p className="modal-view-data">
                        {allqoutation?.quotation_docs}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-0 me-4 mb-1 pt-0 ">
              <div className="content-tabs-tablenew row justify-content ms-3 ">
                <div className="mt-2">
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
                          data={tabledata}
                          bordered
                          custom_table_css="table_job_list"
                        />
                      </div>
                      <div className="d-flex justify-content-end  mx-3 ">
                        <div className="col-lg-2 col-sm-4 col-xs-3 d-flex justify-content-end mt-3 me-2">
                          <p style={{ fontWeight: 500 }}>Grand Total : </p>
                        </div>
                        {/* <div className="col-1">:</div> */}
                        <div className="col-lg-2 col-sm-2 col-xs-2 mt-3">
                          <p>
                            {allqoutation?.quotation_grand_total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
