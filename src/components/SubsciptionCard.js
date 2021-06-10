import { CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";
import { BodyWithPadding, StyledCard } from "../styles/genericStyles";

const SubscriptionCard = ({ text, value, selectedValue, setSelectedValue }) => {
  return (
    <Grid item xs={3}>
      <StyledCard
        elevation={10}
        selected={selectedValue === value}
        onClick={() => setSelectedValue(value)}
      >
        <BodyWithPadding padding="10% 0% 10% 5%">
          <CardContent>
            <Typography variant="h3" style={{ color: "white" }} component="p">
              {`${value} ${text}`}
            </Typography>
          </CardContent>
        </BodyWithPadding>
      </StyledCard>
    </Grid>
  );
};

export default SubscriptionCard;
