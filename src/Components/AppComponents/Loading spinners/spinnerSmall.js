import React from "react";

// Third party imports ///////////
import { ColorRing } from "react-loader-spinner";

const SpinnerSmall = () => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex justify-center item-center flex-col bg-black bg-opacity-20">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{
          height: "80px",
          width: "80px",
          justifyContent: "center",
        }}
        wrapperClass="blocks-wrapper"
        colors={["#fcb05e", "#f47e60", "#3f71dc", "#034be6", "#F78F1E"]}
      />
    </div>
  );
};

export default SpinnerSmall;
