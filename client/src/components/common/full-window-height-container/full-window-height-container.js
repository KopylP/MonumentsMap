import React, { useState } from "react";

export default function FullWindowHeightContainer({
  children,
  style = {},
  className = "",
}) {
  const [height, setHeight] = useState(window.innerHeight);
  const handleResize = () => {
    setHeight(window.innerHeight);
  };

  useState(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize");
    };
  }, []);

  const child = React.Children.only(children);

  return (
    <div style={{ height, ...style }} className={className}>
      {child}
    </div>
  );
}
