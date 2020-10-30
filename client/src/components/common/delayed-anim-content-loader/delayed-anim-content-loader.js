import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
export default function DelayedAnimContentContainer(props) {
  const { delay } = props;
  const [animate, setAnimate] = useState(false);
  const unmount = React.createRef(false);

  useEffect(() => {
    setTimeout(() => {
      if (!unmount.current) {
        setAnimate(true);
      }
    }, delay);
    return () => (unmount.current = true);
  }, []);
  return <ContentLoader animate={animate} {...props} />;
}
