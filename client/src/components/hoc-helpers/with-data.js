import React, { useState, useEffect } from "react";

export default function withData(Wrapper) {
  return function (props) {
    const { getData, params, onError = (p) => p } = props;
    const [data, setData] = useState(null);
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
          console.log(e);
        });
    };

    useEffect(() => {
      update();
    }, []);
    return data == null ? (
      <div style={{position: "fixed", top: 0, bottom: 0, left: 0, right: 0, zIndex: 999}}>Loading</div>
    ) : (
      <Wrapper data={data} onUpdate={updateData} {...props} />
    );
  };
}
