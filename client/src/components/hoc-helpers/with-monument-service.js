import React, { useContext } from "react";
import AppContext from "../../context/app-context";
import MonumentService from "../../services/monument-service";
import { serverHost } from "../../config";

export default function withMonumentService(Wrapper) {
  return function (bindMethodsToProps) {
    return function (props) {
      const { params = [] } = props;
      const appContext = useContext(AppContext);
      let monumentService;
      if(appContext && appContext.monumentService) {
        monumentService = appContext.monumentService;
      } else {
        monumentService = new MonumentService(serverHost, "uk-UA");
      }
      return <Wrapper {...bindMethodsToProps(monumentService)} params={params} {...props} />;
    };
  };
}