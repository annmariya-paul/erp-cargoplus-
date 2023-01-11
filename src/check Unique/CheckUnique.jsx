import React, { useEffect } from "react";
import PublicFetch from "../utils/PublicFetch";

async function CheckUnique({ value, type, uniqueCode }) {
  PublicFetch.get(
    `${process.env.REACT_APP_BASE_URL}/misc?type=${type}&value=${value}`
  )
    .then((res) => {
      console.log("Response 1123", res);
      if (res.data.success) {
        console.log("Success", res.data.data);
        if (res.data.data.exist) {
          console.log("hai guys");
          uniqueCode(true);
        } else {
          uniqueCode(false);
        }
      }
    })
    .catch((err) => {
      console.log("Error", err);
    });
}

export default CheckUnique;
