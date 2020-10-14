import React, { useEffect, useState } from "react";
import { useQuery } from "../../../hooks/hooks";

export default function withQueryParameters(...parameters) {
  return (Wrapper, ErrorComponent = () => <div>Error</div>) => {
    return (props) => {
      const params = useQuery();
      const [loading, setLoading] = useState(false);
      const [validParams, setValidParams] = useState(true);
      const [queryParams, setQueryParams] = useState({});


      useEffect(() => {
        for (let paramName of parameters) {
          if (!params.has(paramName)) {
            setValidParams(false);
            break;
          }
        }
        setLoading(false);

        if(validParams) {
          const qParams = {};
          for(let paramName of parameters) {
            qParams[paramName] = params.get(paramName);
          }
          setQueryParams(qParams);
        }
      }, []);

      return (
        <React.Fragment>
          {!loading && validParams && <Wrapper {...props} {...queryParams}/>}
          {!loading && !validParams && <ErrorComponent {...props} {...queryParams}/>}
        </React.Fragment>
      );
    };
  };
}
