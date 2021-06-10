import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { getUIProperty } from "../redux/slices/uiSlice";
import SubscriptionCard from "./SubsciptionCard";

const SubscriptionCardList = ({ cards, valueName }) => {
  const selectedValue =
    useSelector((state) => getUIProperty(state, valueName)) ||
    cards.defaultValue;

  return (
    <div style={{ marginBottom: "3%" }}>
      <Typography style={{ marginBottom: "1%" }} variant="h5" align="center">
        {cards.title}
      </Typography>
      <Grid spacing={3} container justify="center" align="center">
        {cards.values.map((value, idx) => (
          <SubscriptionCard
            key={idx}
            text={cards.text}
            value={value}
            selectedValue={selectedValue}
            valueName={valueName}
          />
        ))}
      </Grid>
    </div>
  );
};

export default SubscriptionCardList;
