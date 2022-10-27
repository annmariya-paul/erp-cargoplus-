// import { Button } from "antd";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import Button from "../../../../components/button/button";
import logo from "../../../../components/img/logo192.png";
import { ROUTES } from "../../../../routes";

function ProductDetails() {
  return (
    <div>
      <div className="container">
        <div>
          <div className="container ps-4 my-4 py-3 shadow-sm">
            <div className=" d-flex justify-content-between">
              <h5 className="lead_text">Products</h5>
              <div className="">
                <Link to={ROUTES.PRODUCTVARIENTS}>
                  <Button
                    style={{ backgroundColor: "white", color: "#0092ce" }}
                    className="d-flex justify-content-end"
                  >
                    <span
                      className="d-flex align-items-center justify-content-between gap-1  p-1 button_span"
                      style={{ fontSize: "14px" }}
                      // onClick={() => {
                      //   setShowProductEditModal(true);
                      //   setProductView(false);
                      // }}
                    >
                      {/* Edit <FiEdit fontSize={"12px"} /> */}
                      Add Variants
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-12 d-flex justify-content-center ">
                <img
                  src={logo}
                  alt={logo}
                  style={{ height: "70px", width: "70px" }}
                />
              </div>
              <div className="">
                <div className="row mt-4">
                  <div className="col-5">
                    <p style={{ color: "#000" }} className="modal_view_p_style">
                      Name
                    </p>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-6 justify-content-start">
                    <p className="modal_view_p_sub">Rolex</p>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-5">
                    <p style={{ color: "#000" }} className="modal_view_p_style">
                      Code
                    </p>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-6 justify-content-start">
                    <p className="modal_view_p_sub">HJKGF23456</p>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-5">
                    <p style={{ color: "#000" }} className="modal_view_p_style">
                      Category
                    </p>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-6 justify-content-start">
                    <p className="modal_view_p_sub">Watch</p>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-5">
                    <p style={{ color: "#000" }} className="modal_view_p_style">
                      Brand
                    </p>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-6 justify-content-start">
                    <p className="modal_view_p_sub">Rolex</p>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-5">
                    <p style={{ color: "#000" }} className="modal_view_p_style">
                      Unit
                    </p>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-6 justify-content-start">
                    <p className="modal_view_p_sub">HJKGF23456</p>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-5">
                    <p style={{ color: "#000" }} className="modal_view_p_style">
                      Attributes
                    </p>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-6 justify-content-start">
                    <p className="modal_view_p_sub">color</p>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-5">
                    <p style={{ color: "#000" }} className="modal_view_p_style">
                      Description
                    </p>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-6 justify-content-start">
                    <p className="modal_view_p_sub">
                      Lorem Ipsum has been the industry's standard dummy text
                      ever since the 1500s
                    </p>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-5">
                    <p style={{ color: "#000" }} className="modal_view_p_style">
                      Status
                    </p>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-6 justify-content-start">
                    <p className="modal_view_p_sub_active">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
