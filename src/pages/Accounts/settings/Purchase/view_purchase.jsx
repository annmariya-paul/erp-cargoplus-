import { Form } from "antd";
import Button from "../../../../components/button/button";
import { FiEdit } from "react-icons/fi";
import { ROUTES } from "../../../../routes";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PublicFetch from "../../../../utils/PublicFetch";
import { ACCOUNTS, CRM_BASE_URL_PURCHASING } from "../../../../api/bootapi";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import "../Purchase/purchase.scss";
export default function View_purchase() {
  const { id } = useParams();
  const [addform] = Form.useForm();
  const [viewpurchasemode, setViewpurchasemode] = useState();
  console.log("viewpurchasemode", viewpurchasemode);
  const handleView = (data) => {};

  const getsinglePurchase = () => {
    PublicFetch.get(`${ACCOUNTS}/purchase/${id}`)
      .then((res) => {
        console.log("resr", res);
        if (res.data.success) {
          setViewpurchasemode(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    if (id) {
      getsinglePurchase();
    }
  }, [id]);

  return (
    <div>
      <div className="container-fluid">
        <div
          style={{ borderRadius: "8px" }}
          className="card border-0 content-tabs px-2"
        >
          <div className="container my-3">
            <Form name="addForm" form={addform}>
              <div className="row">
                <div className="col-9">
                  <h5 className="lead_text">Purchase</h5>
                </div>
                <div className="col-3">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active-link" : "link"
                    }
                    to={`${ROUTES.EDIT_PURCHASE}/${viewpurchasemode?.purchase_id}`}
                  >
                    <Button btnType="add_borderless" className="edit_button">
                      Edit
                      <FiEdit
                        style={{ marginBottom: "4px", marginInline: "3px" }}
                      />
                    </Button>
                  </NavLink>
                </div>
              </div>
              <div className="row ms-4 mb-3 mt-2 ">
                {/* <div className="container-fluid"> */}
                <div className="content-tabs-new row justify-content px-4">
                  {/* <div className="row mt-5"> */}
                  <div className="row mt-3 mb-3">
                    <h5 className="lead_text">Basic Info</h5>
                  </div>

                  <div className="col-xl-4 col-sm-12 d-flex mt-2">
                    <div className="col-4">
                      <p> Po No</p>
                    </div>
                    <div className="col-1">:</div>
                    <div className="col-7 ">
                      <p className="modal-view-data">
                        {viewpurchasemode?.purchase_po_no}
                      </p>
                    </div>
                  </div>

                  <div className="col-xl-4 col-sm-12 d-flex mt-2">
                    <div className="col-4">
                      {" "}
                      <p> Date</p>
                    </div>
                    <div className="col-1">:</div>
                    <div className="col-7">
                      <p className="modal-view-data">
                        {moment(
                          viewpurchasemode?.purchase_purchase_date
                        ).format("DD-MM-YYYY")}
                      </p>
                    </div>{" "}
                  </div>

                  <div className="col-xl-4 col-sm-12 d-flex mt-2">
                    <div className="col-4">
                      <p>Due Date</p>
                    </div>
                    <div className="col-1">:</div>
                    <div className="col-7 ">
                      <p className="modal-view-data">
                        {moment(viewpurchasemode?.purchase_due_date).format(
                          "DD-MM-YYYY"
                        )}
                      </p>
                    </div>{" "}
                  </div>
                </div>
              </div>
              <div className="row  mt-3 px-1 ">
                <div className="col-md-6 col-12 mt-2">
                  <div className="content-tabs-new row justify-content mx-1 mb-3">
                    <div className="row mt-3 mb-3">
                      <h5 className="lead_text">Vendor details</h5>
                    </div>

                    <div className="col-6 d-flex">
                      <div className="col-4">
                        {" "}
                        <p> Vendor</p>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <p className="modal-view-data">
                          {viewpurchasemode?.crm_v1_vendors?.vendor_name}
                        </p>
                      </div>{" "}
                    </div>

                    <div className="col-6 d-flex">
                      <div className="col-4">
                        {" "}
                        <p>Payment Mode</p>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <p className="modal-view-data">
                          {
                            viewpurchasemode?.accounts_v1_payment_modes
                              ?.pay_mode_name
                          }
                        </p>
                      </div>{" "}
                    </div>

                    <div className="col-6 d-flex">
                      <div className="col-4">
                        {" "}
                        <p> Credit Days</p>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <p className="modal-view-data">
                          {viewpurchasemode?.purchase_credit_days}
                        </p>
                      </div>{" "}
                    </div>

                    <div className="col-6 d-flex">
                      <div className="col-4">
                        {" "}
                        <p> Taxable</p>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <p className="modal-view-data">
                          {viewpurchasemode?.purchase_taxable}
                        </p>
                      </div>{" "}
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-4">
                        <p> Tax No</p>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <p className="modal-view-data">
                          {viewpurchasemode?.purchase_tax_no}
                        </p>
                      </div>{" "}
                    </div>

                    <div className="col-6 d-flex">
                      <div className="col-4">
                        {" "}
                        <p> Bill No</p>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <p className="modal-view-data">
                          {viewpurchasemode?.purchase_bill_no}
                        </p>
                      </div>{" "}
                    </div>
                  </div>
                </div>

                <div className=" col-md-6 col-12 mt-2 ">
                  <div className="purchase_payment content-tabs-new row justify-content mx-1 mb-3 me-0">
                    <div className="row mt-3 mb-3">
                      <h5 className="lead_text">Payment</h5>
                    </div>

                    <div className="col-6 d-flex">
                      <div className="col-4">
                        {" "}
                        <p> Amount</p>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <p className="modal-view-data">
                          {viewpurchasemode?.purchase_amount}
                        </p>
                      </div>{" "}
                    </div>

                    <div className="col-6 d-flex">
                      <div className="col-4">
                        {" "}
                        <p>Tax Amount</p>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <p className="modal-view-data">
                          {viewpurchasemode?.purchase_tax_amount}
                        </p>
                      </div>{" "}
                    </div>

                    <div className="col-6 d-flex">
                      <div className="col-4">
                        {" "}
                        <p>Total Amount</p>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <p className="modal-view-data">
                          {viewpurchasemode?.purchase_total_amount}
                        </p>
                      </div>
                    </div>
                    {/* <br/><br/><br/> */}
                  </div>
                </div>
              </div>

              <div className="row mt-1 px-1 mb-0">
                <div className="col-md-6 col-12 ">
                  <div className="content-tabs-new row justify-content mx-1 mb-3">
                    <div className="row mt-3 mb-3">
                      <h5 className="lead_text">Attachments</h5>
                    </div>

                    <div className="col-6 d-flex">
                      <div className="col-4">
                        {" "}
                        <p>Remarks</p>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <p className="modal-view-data">
                          {viewpurchasemode?.purchase_remarks}
                        </p>
                      </div>
                    </div>

                    <div className="col-6 d-flex">
                      <div className="col-4">
                        {" "}
                        <p>Attachments</p>{" "}
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <p className="modal-view-data">
                          {viewpurchasemode?.purchase_docs}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-center mt-5">
                <Button className="save_button">Print</Button>
              </div>
              {/* </div> */}
              {/* </div> */}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
