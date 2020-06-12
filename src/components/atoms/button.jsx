import * as React from "react";
import Button from "@material-ui/core/Button";

const MaterialButton = ({ value, ...props }) => {
  return <Button {...props}>{value}</Button>;
};

MaterialButton.defaultProps = {
  color: "primary",
  size: "small",
  value: "NOT SET",
};

export default MaterialButton;
