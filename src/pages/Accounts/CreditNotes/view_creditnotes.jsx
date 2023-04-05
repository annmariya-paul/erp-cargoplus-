import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import Button from "../../../components/button/button";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "antd";
import { ROUTES } from "../../../routes";
import PublicFetch from "../../../utils/PublicFetch";
import { ACCOUNTS } from "../../../api/bootapi";
import { NavLink } from "react-router-dom";
function CreditnotesView() {
  const { id } = useParams();
  console.log("id :::::", id);
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [addForm] = Form.useForm();
  const navigate = useNavigate();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.PRODUCT);
      }, time);
    }
  };
  const [viewcreditnote, setviewcreditnote] = useState();
  console.log("viewcreditnote", viewcreditnote);
  const getsingleCreditnote = () => {
    PublicFetch.get(`${ACCOUNTS}/credit-note/${id}`)
      .then((res) => {
        console.log("rer", res);
        if (res.data.success) {
          setviewcreditnote(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  useEffect(() => {
    if (id) {
      getsingleCreditnote();
    }
  }, [id]);

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-md-center mb-2">
          <div className="content-tabs ">
            <div className="container-fluid ">
              <div className="row  mt-3 ">
                <div className="col-xl-6 col-lg-2 col-md-3 col-sm-12 ">
                  <h4 className="lead_text">View Credit Notes</h4>
                </div>
                <div className="col-xl-6 col-md-12">
                  <div className="row justify-content-end mx-2 py-3">
                    <div className="col-xl-2 col-lg-2 col-md-3 col-sm-12  mb-3 ">
                      <Button
                        btnType="add_borderless"
                        className="edit_button rounded"
                        // onClick={handlePrint}
                      >
                        Print
                      </Button>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-3 col-sm-12 mb-3 ">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "active-link" : "link"
                        }
                        to={`${ROUTES.EDIT_CREDIT_NOTES}/${viewcreditnote?.credit_note_id}`}
                      >
                        <Button
                          btnType="add_borderless"
                          className="edit_button rounded"
                        >
                          Edit
                          <FiEdit />
                        </Button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row ms-1 mb-3 ">
                <div className="content-tabs-new row justify-content px-4">
                  <div className="col-xl-12 col-sm-12 d-flex">
                    <div className="col-4 boldhd">Voucher No</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {viewcreditnote?.credit_note_voucher_no}
                      </p>
                    </div>
                  </div>

                  <div className="col-xl-12 col-sm-12 d-flex">
                    <div className="col-4 boldhd"> Date</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {viewcreditnote?.credit_note_date}
                      </p>
                    </div>
                  </div>

                  <div className="col-xl-12 col-sm-12 d-flex">
                    <div className="col-4 boldhd">Customer</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {viewcreditnote?.credit_note_lead_id}
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-12 col-sm-12 d-flex">
                    <div className="col-4 boldhd">Invoice No</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {
                          viewcreditnote?.accounts_v1_credit_note_invoices
                            ?.invoice_no
                        }
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-12 col-sm-12 d-flex">
                    <div className="col-4 boldhd">Invoice Amount</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {viewcreditnote?.credit_note_amount}
                      </p>
                    </div>
                  </div>

                  <div className="col-xl-12 col-sm-12 d-flex">
                    <div className="col-4 boldhd">Due Amount</div>
                    <div className="col-1">:</div>

                    <div className="col-7">
                      <p className="modal-view-data">
                        {viewcreditnote?.credit_due_amount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreditnotesView;
