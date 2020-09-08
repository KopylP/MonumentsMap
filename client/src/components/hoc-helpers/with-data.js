import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { usePromise } from "../../hooks/hooks";

export default function withData(Wrapper, paramsFromRoute = []) {
  return function (props) {
    const { getData, onError = (p) => p } = props;
    const routeParams = useParams();
    let { params } = props;
    // const [data, setData] = useState(null);
    const [unauthorized, setUnauthorized] = useState(false);
    const updateData = () => {
      //TODO remove this method
    };

    if (paramsFromRoute.length > 0) {
      params = paramsFromRoute.map(
        (paramFromRoute) => routeParams[paramFromRoute]
      );
    }

    const [data, error, pending] = usePromise(getData, null, params);

    useEffect(() => {
      if (error && error.response && error.response.status === 401) {
        setUnauthorized(true);
      }
    }, [error]);

    return (
      <React.Fragment>
        {data == null && !unauthorized ? (
          <div
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 999,
            }}
          >
            Loading
          </div>
        ) : null}
        {unauthorized ? <Redirect to="/admin/login" /> : null}
        {data && !unauthorized ? (
          <Wrapper data={data} onUpdate={updateData} {...props} />
        ) : null}
      </React.Fragment>
    );
  };
}
