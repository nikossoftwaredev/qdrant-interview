import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PaymentSteps from "../components/PaymentSteps";
import TotalPrice from "../components/TotalPrice";
import { apiGET } from "../redux/slices/apiSlice";
import { BodyWithPadding } from "../styles/genericStyles";

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
      <TotalPrice />
      <PaymentSteps />
    </BodyWithPadding>
  );
};

export default PaymentPage;
