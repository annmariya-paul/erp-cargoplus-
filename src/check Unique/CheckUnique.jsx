import React, { useEffect } from "react";
import PublicFetch from "../utils/PublicFetch";

function CheckUnique({ value, type }) {
  return new Promise((resolve, reject) => {
    PublicFetch.get(
      `${process.env.REACT_APP_BASE_URL}/misc?type=${type}&value=${value}`
    )
      .then((res) => {
        console.log("Response 1123", res);
        if (res.data.success) {
          
          console.log("Success", res.data.data);
            // uniqueCode(false);
            resolve(res.data.data.exist)

        } else {
          resolve(false)
        }
      })
      .catch((err) => {
        console.log("Error", err);
        resolve(false)
      });
  })
}

export default CheckUnique;
