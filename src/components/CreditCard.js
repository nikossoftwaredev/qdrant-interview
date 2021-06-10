import { FormControl, TextField, withStyles } from "@material-ui/core";
import React from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useDispatch, useSelector } from "react-redux";
import { getUIProperty, setUIProperty } from "../redux/slices/uiSlice";

const ValidationTextField = withStyles({
  root: {
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
  },
})(TextField);

const formatCard = (card) => {
  let formatedCard = card.replace(/ /g, "").match(/.{1,4}/g);

  return (formatedCard || []).join(" ");
};

const formatExpiry = (expiry) => {
  let formatedExpiry = expiry.split("/").join("");
  if (formatedExpiry.length <= 4 && formatedExpiry.length > 0)
    return formatedExpiry.match(/.{1,2}/g).join("/");
};

const CreditCard = () => {
  const dispatch = useDispatch();
  const creditCardData =
    useSelector((state) => getUIProperty(state, "creditCardData")) || {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formatedValue = value;
    if (name === "number") {
      formatedValue = formatCard(value);
    } else if (name === "expiry") {
      formatedValue = formatExpiry(value);
    }

    dispatch(
      setUIProperty({
        name: "creditCardData",
        value: { [name]: formatedValue },
      })
    );
  };

  return (
    <div id="PaymentForm">
      <Cards
        cvc={creditCardData.cvc || ""}
        expiry={creditCardData.expiry || ""}
        name={creditCardData.name || ""}
        number={creditCardData.number || ""}
      />
      <form style={{ marginTop: "32px" }}>
        <FormControl>
          <ValidationTextField
            type="tel"
            inputProps={{ maxLength: 19 }}
            value={creditCardData.number}
            name="number"
            label="Card Number"
            required
            variant="outlined"
            onChange={handleInputChange}
            inputmode="numeric"
            pattern="[0-9\s]{13,19}"
            autoComplete="cc-number"
            placeholder="xxxx xxxx xxxx xxxx"
          />
          <ValidationTextField
            type="text"
            value={creditCardData.name}
            name="name"
            label="Name"
            required
            variant="outlined"
            onChange={handleInputChange}
            placeholder="Name"
          />
        </FormControl>
        <FormControl>
          <ValidationTextField
            type="tel"
            value={creditCardData.cvc}
            name="cvc"
            inputProps={{ maxLength: 3 }}
            label="CVC"
            required
            variant="outlined"
            onChange={handleInputChange}
            inputmode="numeric"
            placeholder="xxx"
          />
          <ValidationTextField
            type="tel"
            value={creditCardData.expiry}
            name="expiry"
            inputProps={{ maxLength: 5 }}
            label="Expiry"
            required
            variant="outlined"
            onChange={handleInputChange}
            inputmode="numeric"
            placeholder="xx/xx"
          />
        </FormControl>
      </form>
    </div>
  );
};

export default CreditCard;
