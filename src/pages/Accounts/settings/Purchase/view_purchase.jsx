import React from "react";
import { Form } from "antd";
import Button from "../../../../components/button/button";
import { FiEdit } from "react-icons/fi";
import { ROUTES } from "../../../../routes";
import { NavLink } from "react-router-dom";

export default function View_purchase() {
  const [addform] = Form.useForm();

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
                to={ROUTES.EDIT_PURCHASE}
              >
                  <Button
                    btnType="add_borderless"
                    className="edit_button"
                    //   onClick={() => {
                    //     handleviewtoedit(viewpurchasemode);
                    // setShowModalEdit(true);
                    // setShowViewModal(false);
                    //   }}
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
                    1009
                    {/* {viewpaymentmode.name} */}
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
                    02/03/2023
                    {/* {viewpaymentmode.description} */}
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
                    12/12/2023
                    {/* {viewpaymentmode.description} */}
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
                    Hiii
                    {/* {viewpaymentmode.name} */}
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
                    cod
                    {/* {viewpaymentmode.description} */}
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
                    7{/* {viewpaymentmode.description} */}
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
                    yes
                    {/* {viewpaymentmode.description} */}
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
                    2032023
                    {/* {viewpaymentmode.description} */}
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
                    12233
                    {/* {viewpaymentmode.name} */}
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
                    343212
                    {/* {viewpaymentmode.name} */}
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
                    22323
                    {/* {viewpaymentmode.description} */}
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
                    232023
                    {/* {viewpaymentmode.description} */}
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
                    02/03/2023 ciode njmosdj jno
                    {/* {viewpaymentmode.description} */}
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
                    {/* {viewpaymentmode.description} */}
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
                    ss
                    {/* {viewpaymentmode.name} */}
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
