import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUIData,
  getUIProperty,
  setUIData,
  setUIProperty,
} from "../redux/slices/uiSlice";
import { getApiResource } from "../redux/slices/apiSlice";
import colors from "../styles/colors";

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

  // Redux variables
  const prices = useSelector((state) => getApiResource(state, "prices"));
  const storage = useSelector((state) => getUIProperty(state, "storage"));
  const discount = useSelector((state) => getUIProperty(state, "discount"));
  const duration = useSelector((state) => getUIProperty(state, "duration"));

  const summaryData = useSelector((state) => getUIData(state, "summaryData"));

  useEffect(() => {
    // Set the default Values
    dispatch(setUIProperty({ name: "duration", value: 12 }));
    dispatch(setUIProperty({ name: "storage", value: 5 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      setUIData({
        name: "summaryData",
        value: { totalPrice: calculateTotalPrice(duration, storage, prices) },
      })
    );
  }, [duration, storage, prices, dispatch]);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "80%",
        alignItems: "center",
      }}
    >
      <div className="receipt">
        <div className="receipt-list">
          <Typography variant="h6">Selected Subsciption: </Typography>

          <Typography
            style={{ marginBottom: "1%", color: colors.hover }}
            variant="h5"
            align="center"
          >
            {`${duration} Months ${storage} GB`}
          </Typography>

          <Typography variant="h6">Total price: </Typography>

          <Typography
            style={{ marginBottom: "1%", color: colors.hover }}
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
        </div>
      </div>
    </div>
  );
};

export default TotalPrice;
