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
      <div>Loading</div>
    ) : (
      <Wrapper data={data} onUpdate={updateData} {...props} />
    );
  };
}
