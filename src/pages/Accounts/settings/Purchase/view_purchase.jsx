import { Form } from "antd";
import Button from "../../../../components/button/button";
import { FiEdit } from "react-icons/fi";
import { ROUTES } from "../../../../routes";
import { NavLink } from "react-router-dom";
import React, { useState,useEffect } from "react";

export default function View_purchase() {
  const [addform] = Form.useForm();
  const[viewpurchasemode,setViewpurchasemode]= useState({
    // id:"",
    // po_no: "",
    // vendor: "",
    // amount:"",
    // datepur:"",
    // tax_no:"",
    // bill_no:"",
    // tax_amount:"",
    // payment_mode:"",
    // credit_days:"",
    // attachments:"",
    // total_amount:"",
    // datedue:"",
    // status:"",
  });
  const handleviewtoedit = (i) => {
    console.log("iiii",i);
    setViewpurchasemode({
      ...viewpurchasemode

    })}
  

  return (
    <div>
      <div className="container-fluid">
        <div
          style={{ borderRadius: "8px" }}
          className="card border-0 content-tabs px-2"
        >
          <div className="container my-3">
            {/* <div>
              <h5 className="lead_text my-2">View Purchases</h5>
            </div> */}
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
              //   to={`${ROUTES.EDIT_PURCHASE}/${1}`
              // }
              >
                  <Button
                    btnType="add_borderless"
                    className="edit_button"
                      onClick={() => {
                        handleviewtoedit(viewpurchasemode);
                        console.log("hhhiv",handleviewtoedit);
                    // setShowModalEdit(true);
                    // setShowViewModal(false);
                      }}
                  >
                    Edit
                    <FiEdit
                      style={{ marginBottom: "4px", marginInline: "3px" }}
                    />
                  </Button>
                  </NavLink>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <p> Po No</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">
                    {viewpurchasemode.po_no}
                  </p>
                </div>
              </div>{" "}
              <div className="row mt-4">
                <div className="col-4">
                  <p> Date</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">
                    {viewpurchasemode.datepur}
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <p>Due Date</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">
                    {viewpurchasemode.datedue}
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <p> Vendor</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">
                    {viewpurchasemode.vendor}
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <p>Payment Mode</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">
                    {viewpurchasemode.payment_mode}
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <p> Credit Days</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">
                    {viewpurchasemode.credit_days}
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <p> Taxable</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">
                    {viewpurchasemode.taxable}
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <p> Tax No</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">
                    {viewpurchasemode.tax_no}
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <p> Bill No</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">
                    {viewpurchasemode.bill_no}
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <p> Amount</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">
                    {viewpurchasemode.amount}
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <p>Tax Amount</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">
                    {viewpurchasemode.tax_amount}
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <p>Total Amount</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">
                    {viewpurchasemode.total_amount}
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <p>Remarks</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">
                    {viewpurchasemode.remarks}
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <p>Attachments</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">
                    {viewpurchasemode.attachments}
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <p>Status</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">
                    {viewpurchasemode.status}
                  </p>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-center mt-5">
                <Button className="save_button">Print</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
