import { CRM_BASE_URL } from "../api/bootapi";
import PublicFetch from "../utils/PublicFetch";
import { useState, useEffect } from "react";

function TestPage() {
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

  useEffect(() => {
    getAllLeads();
  }, []);

  return <div>TestPage</div>;
}

export default TestPage;
