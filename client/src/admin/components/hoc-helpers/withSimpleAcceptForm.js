import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import errorNetworkSnackbar from "../../../components/helpers/error-network-snackbar";
import { useSnackbar } from "notistack";

export default function withSimpleAcceptForm(Wrapper, back = true) {
  return (props) => {
    const { goBack } = useHistory();
    const makeCancelable = useCancelablePromise();
    const [loading, setLoading] = useState(false);

    const { acceptFormMethod } = props;
    const { enqueueSnackbar } = useSnackbar();

    const handleRequest = (params, options) => {
      const onSuccess = (options && options.onSuccess) || ((p) => p);
      const onError = (options && options.onError) || ((p) => p);
      setLoading(true);
      makeCancelable(acceptFormMethod(...params))
        .then((e) => {
          enqueueSnackbar("Зміни збережено успішно!", { variant: "success" });
          setLoading(false);
          onSuccess();
          if (back) goBack();
        })
        .catch((e) => {
          console.log(e.response);
          setLoading(false);
          errorNetworkSnackbar(enqueueSnackbar, e.response);
          onError();
        });
    };

    const acceptForm = (params, options) => {
      handleRequest(params, options);
    };

    return <Wrapper acceptForm={acceptForm} {...props} loading={loading} />;
  };
}
