import { FormControl, TextField, withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useDispatch, useSelector } from "react-redux";
import { getUIData, setUIData, setUIProperty } from "../redux/slices/uiSlice";

const ValidationTextField = withStyles({
  root: {
    "& > *": {
      margin: "16px",
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
  },
})(TextField);

const formatCard = (card) => {
  let formatedCard = card
    .replace(/[a-zA-Z]/g, "")
    .replace(/ /g, "")
    .match(/.{1,4}/g);

  return (formatedCard || []).join(" ");
};

const formatExpiry = (expiry) => {
  let formatedExpiry = expiry
    .replace(/[a-zA-Z]/g, "")
    .split("/")
    .join("");
  if (formatedExpiry.length <= 4 && formatedExpiry.length > 0)
    return formatedExpiry.match(/.{1,2}/g).join("/");
};

const formatCVC = (CVC) => CVC.replace(/[a-zA-Z]/g, "");

const CreditCard = () => {
  const dispatch = useDispatch();
  const creditCardData = useSelector((state) =>
    getUIData(state, "creditCardData")
  );

  useEffect(() => {
    if (
      creditCardData.number?.length === 19 &&
      creditCardData.cvc?.length === 3 &&
      creditCardData.expiry?.length === 5 &&
      creditCardData.name
    )
      dispatch(
        setUIProperty({
          name: "creditCardValid",
          value: true,
        })
      );
    else {
      dispatch(
        setUIProperty({
          name: "creditCardValid",
          value: false,
        })
      );
    }
  }, [creditCardData, dispatch]);

  const handleInputFocus = (e) => {
    dispatch(
      setUIData({
        name: "creditCardData",
        value: { focus: e.target.name },
      })
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formatedValue = value;
    if (name === "number") {
      formatedValue = formatCard(value);
    } else if (name === "expiry") {
      formatedValue = formatExpiry(value);
    } else if (name === "cvc") {
      formatedValue = formatCVC(value);
    }

    dispatch(
      setUIData({
        name: "creditCardData",
        value: { [name]: formatedValue || "" },
      })
    );
  };

  return (
    <div style={{ marginTop: "16px" }} id="PaymentForm">
      <Cards
        focused={creditCardData.focus || ""}
        cvc={creditCardData.cvc || ""}
        expiry={creditCardData.expiry || ""}
        name={creditCardData.name || ""}
        number={creditCardData.number || ""}
      />
      <form style={{ marginTop: "32px" }}>
        <FormControl>
          <ValidationTextField
            type="tel"
            name="number"
            value={creditCardData.number}
            inputProps={{ maxLength: 19 }}
            label="Card Number"
            required
            variant="outlined"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            autoComplete="cc-number"
            placeholder="xxxx xxxx xxxx xxxx"
          />
          <ValidationTextField
            type="text"
            name="name"
            value={creditCardData.name}
            label="Name"
            inputProps={{ maxLength: 20 }}
            required
            variant="outlined"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="Name"
          />
        </FormControl>
        <FormControl>
          <ValidationTextField
            style={{ width: 120 }}
            type="tel"
            name="cvc"
            value={creditCardData.cvc}
            inputProps={{ maxLength: 3 }}
            label="CVC"
            required
            variant="outlined"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="xxx"
          />
          <ValidationTextField
            style={{ width: 120 }}
            type="tel"
            name="expiry"
            value={creditCardData.expiry}
            inputProps={{ maxLength: 5 }}
            label="Expiry"
            required
            variant="outlined"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="xx/xx"
          />
        </FormControl>
      </form>
    </div>
  );
};

export default CreditCard;
