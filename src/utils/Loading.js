import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const Loading = (props) => {
  const { loading } = props;
  
  return (
    <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
      <CircularProgress sx={{ color: "white" }} />
    </Backdrop>
  );
};

export default Loading;
