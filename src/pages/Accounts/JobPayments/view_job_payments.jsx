import React from "react";
import { FiEdit } from "react-icons/fi";
import Button from "../../../components/button/button";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../routes";


export default function ViewJobPayment() {
    const navigate = useNavigate();
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
              <p className="modal-view-data">001</p>
            </div>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Voucher Date</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">01-01-2023</p>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Job No</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">J01</p>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Lead</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">Test</p>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Currency</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">Dinar</p>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Exchange Rate</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">80.81</p>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Job Amount</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">1001</p>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Currency</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">Dinar</p>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Advance Amount</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">Dinar</p>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Advance in ()</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">Dinar</p>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Remarks</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data">Test Test</p>
          </div>
        </div>
        <div className="col-6 d-flex">
          <div className="col-4 boldhd">Attachments</div>
          <div className="col-1">:</div>
          <div className="col-7">
            <p className="modal-view-data"></p>
          </div>
        </div>
      </div>
    </>
  );
}
