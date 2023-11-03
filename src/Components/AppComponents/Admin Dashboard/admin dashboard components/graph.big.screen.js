import React from "react";

function GraphBigScreen({ children }) {
  return (
    <div className="w-[80%] mx-auto h-screen  flex justify-center items-center">
      {children}
    </div>
  );
}

export default GraphBigScreen;
