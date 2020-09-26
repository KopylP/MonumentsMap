import React, { useEffect, useState } from "react";
import useCancelablePromise from "@rodw95/use-cancelable-promise";

export default function withAsyncLoadingData(Wrapper) {
  return function (LoadingComponent) {
    return function (props) {
      const [data, setData] = useState(null);
      const { params = null, getData } = props;
      const makeCancelable = useCancelablePromise();
      
      useEffect(() => {
        if(Array.isArray(params)) {
          makeCancelable(getData(...params))
            .then(data => {
              setData(data);
            })
            .catch(); // TODO handle error
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
