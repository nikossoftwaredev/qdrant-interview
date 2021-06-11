import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PaymentSteps from "../components/PaymentSteps";
import TotalPrice from "../components/TotalPrice";
import { apiGET } from "../redux/slices/apiSlice";
import { BodyWithPadding } from "../styles/genericStyles";
import Grid from "@material-ui/core/Grid";

const PaymentPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      apiGET({
        url: "https://cloud-storage-prices-moberries.herokuapp.com/",
        path: "prices",
      })
    );
  }, [dispatch]);

  return (
    <BodyWithPadding padding="1% 5% 1% 5%">
      <Grid container align="center" justify="center">
        <Grid item xs={12} md={8}>
          <PaymentSteps />
        </Grid>
        <Grid item xs={12} md={4}>
          <TotalPrice />
        </Grid>
      </Grid>
    </BodyWithPadding>
  );
};

export default PaymentPage;
