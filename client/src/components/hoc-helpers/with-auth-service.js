import React from "react";
import AuthService from "../../services/auth-service";
import { serverHost } from "../../config";

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