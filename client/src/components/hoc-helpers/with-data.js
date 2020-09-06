import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";

export default function withData(Wrapper, paramsFromRoute = []) {
  return function (props) {
    const { getData, onError = (p) => p } = props;
    const routeParams = useParams();
    let { params } = props;
    const [data, setData] = useState(null);
    const [unauthorized, setUnauthorized] = useState(false);
    const updateData = () => {
      setData(null);
      update();
    };

    if (paramsFromRoute.length > 0) {
      params = paramsFromRoute.map(
        (paramFromRoute) => routeParams[paramFromRoute]
      );
    }

    const update = () => {
      getData(...params)
        .then((data) => {
          setData(data);
          console.log(data);
        })
        .catch((e) => {
          onError(e);
          if (e.response && e.response.status === 401) {
            setUnauthorized(true);
          }
        });
    };

    useEffect(() => {
      update();
    }, []);

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
