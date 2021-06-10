import { Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUIProperty, setUIData } from "../redux/slices/uiSlice";
import { getApiResource } from "../redux/slices/apiSlice";

const calculateTotalPrice = (duration = 12, storage = 5, prices) => {
  if (prices && prices.subscription_plans) {
    const plan = prices.subscription_plans.find(
      (plan) => plan.duration_months === duration
    );
    if (plan) {
      const costPerGB = plan.price_usd_per_gb;
      return storage * costPerGB;
    }
  }

  return 0;
};

const TotalPrice = () => {
  const dispatch = useDispatch();
  const duration =
    useSelector((state) => getUIProperty(state, "duration")) || 12;
  const storage = useSelector((state) => getUIProperty(state, "storage")) || 5;
  const discount = useSelector((state) => getUIProperty(state, "discount"));
  const summaryData = useSelector(
    (state) => getUIProperty(state, "summaryData") || {}
  );

  // Prices from api
  const prices = useSelector((state) => getApiResource(state, "prices"));

  useEffect(() => {
    dispatch(
      setUIData({
        name: "summaryData",
        value: { totalPrice: calculateTotalPrice(duration, storage, prices) },
      })
    );
  }, [duration, storage, prices, dispatch]);

  return (
    <div style={{ width: "100%", position: "sticky" }}>
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid container item xs={6}>
          <Grid item xs={6}>
            <Typography variant="h5">Total price: </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              style={{ marginBottom: "1%" }}
              variant="h5"
              align="center"
            >
              {discount ? (
                <>
                  <del
                    style={{ color: "red" }}
                  >{`${summaryData?.totalPrice} $`}</del>
                  &nbsp;
                  {` ${summaryData?.totalPrice * 0.9} $`}
                </>
              ) : (
                <>{`${summaryData?.totalPrice} $`}</>
              )}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Grid item xs={6}>
            <Typography variant="h5">Selected Subsciption: </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              style={{ marginBottom: "1%" }}
              variant="h5"
              align="center"
            >
              {`${duration} Months ${storage} GB`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default TotalPrice;
