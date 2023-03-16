import { Select } from "antd";
import { Checkbox, Col, Row } from "antd";
import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import Button from "../../../components/button/button";
import { DatePicker } from "antd";
import CustomModel from "../../../components/custom_modal/custom_model";
import ErrorMsg from "../../../components/error/ErrorMessage";

import FileUpload from "../../../components/fileupload/fileUploader";

import { useNavigate,useParams  } from "react-router-dom";
import { Form } from "antd";
import { TreeSelect } from "antd";
import TextArea from "../../../components/ InputType TextArea/TextArea";

import InputType from "../../../components/Input Type textbox/InputType";

import SelectBox from "../../../components/Select Box/SelectBox";

import { ROUTES } from "../../../routes";


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

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <>
    {/* <div className=" container-fluid view_quotation  p-3 px-4">
      <div className="row"> */}
    <div className="container-fluid">
      <div className="row justify-content-md-center mb-2">
        {/* <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
          <h5 className="lead_text">View Job</h5>
        </div> */}
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
                    <Button
                      btnType="add_borderless"
                      className="edit_button rounded"
                      onClick={() => {
                        // handleviewtoedit();
                        navigate(`${ROUTES.EDIT_CREDIT_NOTES}/${id}`);
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
               
                <div className="col-xl-12 col-sm-12 d-flex">
                  <div className="col-4 boldhd">Voucher No</div>
                  <div className="col-1">:</div>

                  <div className="col-7">
                    <p className="modal-view-data">0004</p>
                  </div>
                </div>

                <div className="col-xl-12 col-sm-12 d-flex">
                  <div className="col-4 boldhd"> Date</div>
                  <div className="col-1">:</div>

                  <div className="col-7">
                    <p className="modal-view-data">
                     12-3-23
                    </p>
                  </div>
                </div>

                <div className="col-xl-12 col-sm-12 d-flex">
                  <div className="col-4 boldhd">Customer</div>
                  <div className="col-1">:</div>

                  <div className="col-7">
                    <p className="modal-view-data">
                 Arun
                    </p>
                  </div>
                </div>
                <div className="col-xl-12 col-sm-12 d-flex">
                  <div className="col-4 boldhd">Invoice No</div>
                  <div className="col-1">:</div>

                  <div className="col-7">
                    <p className="modal-view-data">001</p>
                  </div>
                </div>
                <div className="col-xl-12 col-sm-12 d-flex">
                  <div className="col-4 boldhd">Invoice Amount</div>
                  <div className="col-1">:</div>

                  <div className="col-7">
                    <p className="modal-view-data">
                     10000
                    </p>
                  </div>
                </div>

                <div className="col-xl-12 col-sm-12 d-flex">
                  <div className="col-4 boldhd">Due Date</div>
                  <div className="col-1">:</div>

                  <div className="col-7">
                    <p className="modal-view-data">22-3-2023</p>
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
