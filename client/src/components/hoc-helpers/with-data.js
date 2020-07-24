import React, { useState, useEffect } from "react";

export default function withData(Wrapper) {
  return function ({getData, params, onError = p => p, ...props}) {
    const [data, setData] = useState(null);
    useEffect(() => {
        getData(...params)
            .then(data => {
              setData(data);
              console.log(data);
            })
            .catch(e => {onError(e); console.log(e)});
    }, []);
    return data == null ? <div>Loading</div> : <Wrapper data={data} {...props}/>
  };
}
