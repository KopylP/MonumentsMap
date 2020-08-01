import React from "react";

export default function WithLoadingData(Wrapper) {
  return function (LoadingComponent) {
    return function (props) {
      const { data = null } = props;
      return (
        <React.Fragment>
          {data == null ? <LoadingComponent /> : <Wrapper data={data} {...props}/>}
        </React.Fragment>
      );
    };
  };
}
