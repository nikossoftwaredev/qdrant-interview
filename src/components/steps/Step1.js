import React from "react";
import SubscriptionCardList from "../SubscriptionCardList";
import UpfrontPayment from "../UpfrontPayment";

const duration = {
  title: "Duration",
  text: "Months",
  defaultValue: 12,
  values: [3, 6, 12],
};
const gigabyte = {
  title: "Amount of gigabytes in a cloud",
  text: "GB",
  defaultValue: 5,
  values: [5, 10, 50],
};

const Step1 = () => {
  return (
    <div>
      <SubscriptionCardList cards={duration} valueName="duration" />
      <SubscriptionCardList cards={gigabyte} valueName="storage" />
      <UpfrontPayment />
    </div>
  );
};

export default Step1;
