import React from "react";
import { serverHost } from "../../../config";
import MonumentService from "../../../services/monument-service";


export default function withMonumentService(Wrapper) {
  return function (bindMethodsToProps) {
    return function (props) {
      const { params = [] } = props;
      let monumentService = new MonumentService(serverHost, "uk-UA");
      return <Wrapper {...bindMethodsToProps(monumentService)} params={params} {...props} />;
    };
  };
}