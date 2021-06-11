import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiPOST } from "../../redux/slices/apiSlice";
import {
  getUIData,
  getUIProperty,
  setUIData,
} from "../../redux/slices/uiSlice";
import colors from "../../styles/colors";
import {
  GreenCheckbox,
  StyledButton,
  BodyWithPadding,
} from "../../styles/genericStyles";

const Step3 = () => {
  const dispatch = useDispatch();

  const [completed, setCompleted] = useState(false);

  const duration =
    useSelector((state) => getUIProperty(state, "duration")) || 12;
  const storage = useSelector((state) => getUIProperty(state, "storage")) || 5;
  const discount = useSelector((state) => getUIProperty(state, "discount"));
  const creditCardData = useSelector((state) =>
    getUIProperty(state, "creditCardData")
  );
  const summaryData = useSelector((state) => getUIData(state, "summaryData"));

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      summaryData.email &&
        summaryData.email.match(/^\S+@\S+\.\S+$/) &&
        summaryData.accept
    );
  }, [summaryData]);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    dispatch(
      setUIData({
        name: "summaryData",
        value: { [name]: checked || value },
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      apiPOST({
        url: "https://httpbin.org/",
        path: "post",
        data: { ...summaryData, storage, discount, duration, creditCardData },
      })
    ).then(() => setCompleted(true));
  };

  return (
    <Grid
      style={{ margin: "16px 0px 16px 0px", padding: "5%" }}
      container
      justify="center"
      align="center"
    >
      <Grid item>
        {!completed ? (
          <Card style={{ width: "500px" }}>
            <BodyWithPadding padding="5%">
              <CardHeader
                style={{ color: colors.hover }}
                title="Subscription Summary"
              />
              <CardContent>
                <div style={{ marginBottom: "16px" }}>
                  <Typography align="left" variant="h6">
                    Final price:{" "}
                    {discount
                      ? summaryData.totalPrice * 0.9
                      : summaryData.totalPrice}{" "}
                    $
                  </Typography>
                  <Typography align="left" variant="h6">
                    Subscription: {`${duration} Months ${storage} GB`}
                  </Typography>
                </div>
                <form style={{ display: "flex", flexDirection: "column" }}>
                  <FormControl>
                    <TextField
                      id="input-with-icon-textfield"
                      variant="outlined"
                      name="email"
                      placeholder="Email"
                      label="Email"
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <Typography variant="inherit">
                      Accept terms and conditions
                      <GreenCheckbox
                        checked={(summaryData || {}).checked}
                        onChange={handleChange}
                        name="accept"
                        color="primary"
                      />
                    </Typography>
                  </FormControl>
                </form>
              </CardContent>

              <FormControl>
                <StyledButton
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                >
                  Submit
                </StyledButton>
              </FormControl>
            </BodyWithPadding>
          </Card>
        ) : (
          <Typography style={{ color: colors.green }} variant="h5">
            Subscription succesfully completed
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Step3;
