import React, { useEffect, useState } from "react";
import "./leadReport.styles.scss";
import TableData from "../../../../components/table/table_data";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";

export default function LeadReport() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="lead_container">
          <div className="row">
            <div className="col-3 ">
              <div className="bloc-tabs tabs-responsive">
                {" "}
                <button
                  id="button-tabs"
                  className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(1)}
                >
                  Generated
                </button>
                <button
                  id="button-tabs"
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(2)}
                >
                  Converted
                </button>
              </div>
            </div>
            <div className="row  justify-content-md-end">
              {" "}
              <Leadlist_Icons />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
