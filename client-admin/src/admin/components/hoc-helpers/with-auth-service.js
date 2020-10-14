import React from "react";
import { serverHost } from "../../../config";
import AuthService from "../../../services/auth-service";

export default function withAuthService(Wrapper) {
  return function (bindMethodsToProps) {
    return function (props) {
      const { params = [] } = props;
      const authService = new AuthService(serverHost);
      const methods = bindMethodsToProps(authService);
      return <Wrapper {...methods} params={params} {...props}/>;
    };
  };
}