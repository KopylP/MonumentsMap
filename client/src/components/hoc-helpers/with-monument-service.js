import React, { useContext } from "react";
import AppContext from "../../context/app-context";

export default function withMonumentService(Wrapper) {
  return function (bindMethodsToProps) {
    return function (props) {
      const { params = [] } = props;
      console.log("withMonumentService", props);
      const { monumentService } = useContext(AppContext);
      const { getData } = bindMethodsToProps(monumentService);
      return <Wrapper getData={getData} params={params} {...props} />;
    };
  };
}
