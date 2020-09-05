import React, { useContext } from "react";
import AppContext from "../../context/app-context";
import MonumentService from "../../services/monument-service";
import { serverHost } from "../../config";

export default function withMonumentService(Wrapper) {
  return function (bindMethodsToProps) {
    return function (props) {
      const { params = [] } = props;
      console.log("withMonumentService", props);
      const appContext = useContext(AppContext);
      let monumentService;
      if(appContext && appContext.monumentService) {
        monumentService = appContext.monumentService;
      } else {
        monumentService = new MonumentService(serverHost, "uk-UA");
      }
      const { getData } = bindMethodsToProps(monumentService);
      return <Wrapper getData={getData} params={params} {...props} />;
    };
  };
}