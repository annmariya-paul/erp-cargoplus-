import { CRM_BASE_URL } from "../api/bootapi";
import PublicFetch from "../utils/PublicFetch";
import { useState, useEffect } from "react";
import VersionSettings from "../version_settings.config.json";
import TestCore from "../components/testComponets/TestCore/TestCore";
import TestV1 from "../components/testComponets/TestV1/TestV1";

function TestPage() {
  console.log("Crm base url", `${CRM_BASE_URL}/lead?startIndex=0&noOfItems=10`);
  const { version, version_name } = VersionSettings.crm;
  const getAllLeads = async () => {
    try {
      const allLeadsRes = await PublicFetch.get(
        `${CRM_BASE_URL}/lead?startIndex=0&noOfItems=10`
      );
      console.log("All leads res : ", allLeadsRes);
    } catch (err) {
      console.log("error while getting all leads: ", err);
    }
  };

  const inputOneChange = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    getAllLeads();
  }, []);

  return (
    <div>
      TestPage {version} - {version_name}
      <div>
        <TestCore inputOneChange={inputOneChange}>
          {VersionSettings.crm.version_name === "v1" ? <TestV1></TestV1> : null}
        </TestCore>
      </div>
    </div>
  );
}

export default TestPage;
