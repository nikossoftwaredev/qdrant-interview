import {
  CardContent,
  Grid,
  Typography,
  withWidth,
  isWidthUp,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { setUIProperty } from "../redux/slices/uiSlice";
import { BodyWithPadding, StyledCard } from "../styles/genericStyles";

const SubscriptionCard = ({ text, value, selectedValue, valueName, width }) => {
  const dispatch = useDispatch();

  return (
    <Grid item xs={6} md={3}>
      <StyledCard
        elevation={10}
        selected={selectedValue === value}
        onClick={() =>
          dispatch(setUIProperty({ name: valueName, value: value }))
        }
      >
        <BodyWithPadding padding="10% 0% 10% 0%">
          <CardContent>
            <Typography
              variant={isWidthUp("sm", width) ? "h3" : "h4"}
              style={{ color: "white" }}
              component="p"
            >
              {value}
            </Typography>
            <Typography
              variant={isWidthUp("sm", width) ? "h5" : "h6"}
              style={{ color: "white" }}
              component="p"
            >
              {text}
            </Typography>
          </CardContent>
        </BodyWithPadding>
      </StyledCard>
    </Grid>
  );
};

export default withWidth()(SubscriptionCard);
