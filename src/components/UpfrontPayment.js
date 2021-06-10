import React, { useState } from "react";
import { Checkbox, Tooltip, Typography } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import { Space } from "../styles/genericStyles";

const UpfrontPayment = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Space>
      <Typography>Upfront payment:</Typography>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        name="checkedB"
        color="primary"
      />
      <Tooltip placement="top" title="10% discount">
        <HelpIcon />
      </Tooltip>
    </Space>
  );
};

export default UpfrontPayment;
