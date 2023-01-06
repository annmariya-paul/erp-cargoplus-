import "./quotation.scss";
import React, { useState } from "react";
import Button from "../../../../components/button/button";
import { FiEdit } from "react-icons/fi";

export default function ViewQuotation(){
    return (
      <>
        <div className="container-fluid view_quotation p-3 px-4">
          <div className="row">
            <div className="col-9">
              <h5 className="lead_text">View Quotation</h5>
            </div>
            <div className="col-3 d-flex justify-content-end">
              <Button
                btnType="add_borderless"
                className="edit_button"
                onClick={() => {
                  //   handleviewtoedit(viewattributes);
                }}
              >
                Edit
                <FiEdit style={{ marginBottom: "4px", marginInline: "3px" }} />
              </Button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-4">
              <label>Freight type</label>
            </div>
            <div className="col-1">:</div>
            <div className="col-6 justify-content-start">
              <p className="modal-view-data">Air</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-4">
              <label>Chargable weight</label>
            </div>
            <div className="col-1">:</div>
            <div className="col-7 justify-content-start">
              <p className="modal-view-data">50</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-4">
              <label>Carrier</label>
            </div>
            <div className="col-1">:</div>
            <div className="col-6 justify-content-start">
              <p className="modal-view-data">Test</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-4">
              <label>Mode</label>
            </div>
            <div className="col-1">:</div>
            <div className="col-6 justify-content-start">
              <p className="modal-view-data">Test mode</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-4">
              <label>Project name</label>
            </div>
            <div className="col-1">:</div>
            <div className="col-6 justify-content-start">
              <p className="modal-view-data">Test Project</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-4">
              <label>Country origin</label>
            </div>
            <div className="col-1">:</div>
            <div className="col-6 justify-content-start">
              <p className="modal-view-data">America</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-4">
              <label>Country destination</label>
            </div>
            <div className="col-1">:</div>
            <div className="col-6 justify-content-start">
              <p className="modal-view-data">India</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-4">
              <label>Shipper</label>
            </div>
            <div className="col-1">:</div>
            <div className="col-6 justify-content-start">
              <p className="modal-view-data">Airline</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-4">
              <label>Consignee</label>
            </div>
            <div className="col-1">:</div>
            <div className="col-6 justify-content-start">
              <p className="modal-view-data">testing</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-4">
              <label>Number of pieces</label>
            </div>
            <div className="col-1">:</div>
            <div className="col-6 justify-content-start">
              <p className="modal-view-data">3</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-4">
              <label>Gross weight</label>
            </div>
            <div className="col-1">:</div>
            <div className="col-6 justify-content-start">
              <p className="modal-view-data">100</p>
            </div>
          </div>
        </div>
      </>
    );
}