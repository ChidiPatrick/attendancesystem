import React from "react";

// Third party imports ///////////
import { ColorRing } from "react-loader-spinner";

const SpinnerSmall = () => {
  return (
    <div
      className={
        "absolute top-0 left-0 w-[100%] h-[100%] flex justify-center item-center flex-col bg-black bg-opacity-20"
      }
    >
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{
          height: "80px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        wrapperClass="blocks-wrapper"
        colors={["#F78F1E", "#f18e24", "#3f71dc", "#034be6", "#F78F1E"]}
      />
    </div>
  );
};

export default SpinnerSmall;
