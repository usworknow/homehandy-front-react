import { Step, StepLabel, Stepper, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DotIcon from '@material-ui/icons/FiberManualRecord';
import React from 'react';

const useStyles = makeStyles({
  root: {
    padding: '8px 0', 
    width: '100%'
  },
});

export default function HomeHandyStepper({steps, activeStep, setActiveStep, ...other}) {
  const classes = useStyles();
  const theme = useTheme()
  // function handleNext() {
  //   setActiveStep(activeStep + 1);
  // }

  // function handleBack() {
  //   setActiveStep(activeStep - 1);
  // }

  return (
      <Stepper alternativeLabel activeStep={activeStep} className={classes.root} {...other} >
        {steps.map(step => {
          return (
            <Step key={step.id} style={{padding: 0}}>
              <StepLabel icon={<DotIcon style={{color: step.id > activeStep ? theme.palette.grayscale.main : theme.palette.primary.main}} />}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    // <MobileStepper
    //   variant="dots"
    //   steps={stepCount}
    //   position="static"
    //   activeStep={activeStep}
    //   className={classes.root}
    //   nextButton={
    //     setActiveStep && <Button size="small" onClick={handleNext} disabled={activeStep === (stepCount - 1)}>
    //       Next
    //       <KeyboardArrowRight />
    //     </Button>
    //   }
    //   backButton={
    //     setActiveStep && <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
    //       <KeyboardArrowLeft />
    //       Back
    //     </Button>
    //   }
    // />
  );
}
