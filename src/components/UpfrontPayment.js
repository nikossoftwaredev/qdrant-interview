import React from "react";
import { Tooltip, Typography } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import { Space, GreenCheckbox } from "../styles/genericStyles";
import { useDispatch, useSelector } from "react-redux";
import { getUIProperty, setUIProperty } from "../redux/slices/uiSlice";

const UpfrontPayment = () => {
  const dispatch = useDispatch();

  const checked =
    useSelector((state) => getUIProperty(state, "discount")) || false;

  const handleChange = (event) => {
    dispatch(setUIProperty({ name: "discount", value: event.target.checked }));
  };

  return (
    <Space>
      <Typography variant="h5">Upfront payment:</Typography>
      <GreenCheckbox
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
