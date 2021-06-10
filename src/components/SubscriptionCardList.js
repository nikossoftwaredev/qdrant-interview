import { Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import SubscriptionCard from "./SubsciptionCard";

const SubscriptionCardList = ({ cards }) => {
  const [selectedValue, setSelectedValue] = useState(cards.defaultValue);
  return (
    <div style={{ marginBottom: "3%" }}>
      <Typography style={{ marginBottom: "1%" }} variant="h3" align="center">
        {cards.title}
      </Typography>
      <Grid spacing={3} container justify="center" align="center">
        {cards.values.map((value) => (
          <SubscriptionCard
            text={cards.text}
            value={value}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
        ))}
      </Grid>
    </div>
  );
};

export default SubscriptionCardList;
