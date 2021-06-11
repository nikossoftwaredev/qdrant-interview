import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { getUIProperty } from "../redux/slices/uiSlice";
import SubscriptionCard from "./SubsciptionCard";
import { BodyWithPadding } from "../styles/genericStyles";

const SubscriptionCardList = ({ cards, valueName }) => {
  const selectedValue = useSelector((state) => getUIProperty(state, valueName));

  return (
    <div style={{ marginBottom: "16px", background: "white" }}>
      <BodyWithPadding padding="3%">
        <Typography style={{ marginBottom: "3%" }} variant="h5" align="center">
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
      </BodyWithPadding>
    </div>
  );
};

export default SubscriptionCardList;
