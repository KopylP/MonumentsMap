import React, { useEffect, useState } from "react";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import { showErrorSnackbar } from "../helpers/snackbar-helpers";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

export default function withAsyncLoadingData(Wrapper) {
  return function (LoadingComponent) {
    return function (props) {
      const [data, setData] = useState(null);
      const { params = null, getData } = props;
      const makeCancelable = useCancelablePromise();
      const { enqueueSnackbar } = useSnackbar();
      const { t } = useTranslation();
      
      useEffect(() => {
        if(Array.isArray(params)) {
          makeCancelable(getData(...params))
            .then(data => {
              setData(data);
            })
            .catch(() => {
              showErrorSnackbar(enqueueSnackbar, t("Network error"));
            });
        }
      }, []);
      
      return (
        <React.Fragment>
          {data == null ? <LoadingComponent /> : <Wrapper data={data} {...props}/>}
        </React.Fragment>
      );
    };
  };
}
