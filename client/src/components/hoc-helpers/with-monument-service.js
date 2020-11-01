import React, { useContext } from "react";
import AppContext from "../../context/app-context";

const withMonumentService = () => (Wrapper) => {
  return function (props) {
    const { monumentService } = useContext(AppContext);
    return <Wrapper monumentService={monumentService} {...props} />;
  };
};
export default withMonumentService;
