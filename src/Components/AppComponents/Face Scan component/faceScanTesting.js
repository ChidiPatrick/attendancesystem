import React, { useEffect } from "react";

import faceIO from "@faceio/fiojs";

function FaceScanTesting() {
  // let faceio;
  // useEffect(() => {
  //   faceio = new faceIO("fioa59dc");
  // }, []);

  const onBorderNewUser = async () => {
    const faceio = new faceIO("fioa59dc");
    try {
      const res = await faceio.enroll({
        locale: "auto",
        permissionTimeout: 20000,
        payload: {
          email: "okaforpat@gmail.com",
        },
      });
    } catch (err) {}
  };
  let response;
  const authenticateUser = async () => {
    try {
      const faceio = new faceIO("fioa59dc");
      const res = await faceio.authenticate({
        locale: "auto",
        permissionTimeout: 20000,
        payload: {
          email: "okaforpat@gmail.com",
        },
      });
      response = res;
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" w-screen h-screen">
      <h1>Welcome</h1>
      <button className="bg-lp-secondary p-2 " onClick={authenticateUser}>
        Enroll
      </button>
    </div>
  );
}

export default FaceScanTesting;
