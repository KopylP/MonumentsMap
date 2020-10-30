import React, { useEffect, useState } from "react";

export default function DelayedAnimContentContainer(props) {
  const { delay, Component } = props;
  const [animate, setAnimate] = useState(false);
  const unmount = React.createRef(false);

  useEffect(() => {
    setTimeout(() => {
      if (!unmount) {
        setAnimate(true);
      }
    }, delay);
    return () => (unmount.current = true);
  }, []);
  return <Component animate={animate} {...props} />;
}
