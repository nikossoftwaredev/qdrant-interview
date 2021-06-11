import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { StyledButton } from "../styles/genericStyles";
import Typography from "@material-ui/core/Typography";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import { useSelector } from "react-redux";
import { getUIProperty } from "../redux/slices/uiSlice";
import colors from "../styles/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  StyledButton: {
    marginRight: theme.spacing(1),
    "&:hover": {
      background: colors.selected,
    },
    background: colors.default,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const steps = [
  {
    text: "Select subscription parameters",
    component: <Step1 />,
  },
  {
    text: "Payment data",
    component: <Step2 />,
  },
  {
    text: "Confirmation",
    component: <Step3 />,
  },
];

const PaymentSteps = () => {
  const isCreditCardValid =
    useSelector((state) => getUIProperty(state, "creditCardValid")) || false;

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{step.text}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <StyledButton
              onClick={handleReset}
              className={classes.StyledButton}
            >
              Reset
            </StyledButton>
          </div>
        ) : (
          <div>
            {steps[activeStep].component}
            <div>
              <StyledButton
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.StyledButton}
              >
                Back
              </StyledButton>

              {activeStep !== steps.length - 1 && (
                <StyledButton
                  variant="contained"
                  disabled={!isCreditCardValid && activeStep === 1}
                  onClick={handleNext}
                  className={classes.StyledButton}
                >
                  Next
                </StyledButton>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSteps;
