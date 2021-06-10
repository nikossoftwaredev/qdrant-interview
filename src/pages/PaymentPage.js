import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PaymentSteps from "../components/PaymentSteps";
import { apiGET } from "../redux/slices/apiSlice";

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
    <div>
      <PaymentSteps />
    </div>
  );
};

export default PaymentPage;
