import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
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
import { getUIProperty, setUIData } from "../../redux/slices/uiSlice";
import colors from "../../styles/colors";

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
  const summaryData =
    useSelector((state) => getUIProperty(state, "summaryData")) || {};

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
    <Grid container justify="center" align="center">
      <Grid item>
        {!completed ? (
          <Card style={{ maxWidth: "700px" }}>
            <CardHeader title="Subscription Summary" />
            <CardContent>
              <div style={{ marginBottom: "16px" }}>
                <Typography align="left" variant="h6">
                  Final price:{" "}
                  {discount
                    ? summaryData.totalPrice * 0.9
                    : summaryData.totalPrice}
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
                    placeholder="email"
                    label="TextField"
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
                    Accept with terms and conditions{" "}
                    <Checkbox
                      checked={(summaryData || {}).checked}
                      onChange={handleChange}
                      name="accept"
                      color="primary"
                    />
                  </Typography>
                </FormControl>
                <FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                  >
                    Submit
                  </Button>
                </FormControl>
              </form>
            </CardContent>
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
