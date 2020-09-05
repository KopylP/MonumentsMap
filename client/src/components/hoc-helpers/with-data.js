import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

export default function withData(Wrapper) {
  return function (props) {
    const { getData, params, onError = (p) => p } = props;
    const [data, setData] = useState(null);
    const [unauthorized, setUnauthorized] = useState(false);
    console.log("withData", props);
    const updateData = () => {
      setData(null);
      update();
    };

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
        { data && !unauthorized ? <Wrapper data={data} onUpdate={updateData} {...props}/>: null }
      </React.Fragment>
    );
  };
}
