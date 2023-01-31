import React, { useEffect, useState } from "react";
import { Checkbox, Form } from "antd";
import Button from "../../../components/button/button";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../routes";
import PublicFetch from "../../../utils/PublicFetch";
import { CRM_BASE_URL } from "../../../api/bootapi";

function QuotationAssign() {
  const { id } = useParams();
  console.log("id::params", id);
  const navigate = useNavigate();
  const [addForm] = Form.useForm();
  const [allAgents, setAllAgents] = useState();
  const [successPopup, setSuccessPopup] = useState();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(`${ROUTES.QUATATIONS}`);
      }, time);
    }
  };
  const _id = 1;
  const AllEnquires = () => {
    PublicFetch.get(`${CRM_BASE_URL}/opportunity/${_id}`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success", res.data.data);
          setAllAgents(res.data.data.assigned_employees);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    AllEnquires();
  }, [_id]);

  return (
    <div>
      <div className="container-fluid">
        <div>
          <h5 className="lead_text">Assign Quotation Agents</h5>
        </div>
        <div className="card border-0 content-tabs  my-3 px-4">
          <div className="container my-3">
            <div className="my-3">
              <h6 className="lead_text">Assign to Quotation</h6>
            </div>
            <Form
              name="addForm"
              form={addForm}
              onFinish={(value) => {
                console.log("Form Values", value);
              }}
            >
              <div className="row my-5">
                {allAgents &&
                  allAgents.length > 0 &&
                  allAgents.map((item, index) => {
                    return (
                      <div className="col-6">
                        <Form.Item name="employees">
                          <Checkbox
                            key={item.employee_id}
                            value={item.employee_id}
                          >
                            {item.employee_name}
                          </Checkbox>
                        </Form.Item>
                      </div>
                    );
                  })}

                <div className="col-12 d-flex justify-content-center align-item-center gap-3 mt-5">
                  <Button type={"submit"} className="save_button">
                    Save
                  </Button>
                  <Button
                    className="cancel_button"
                    onClick={() => {
                      navigate(`${ROUTES.QUATATIONS}`);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuotationAssign;
