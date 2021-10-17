import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import LockOutLineIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon";
export default function Auth() {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = () => {};
  const switchMode = () => {
    setIsSignup((isSignup) => !isSignup);
    setShowPass(false);
  };

  const handleShowPassword = () => {
    setShowPass(!showPass);
  };

  const googlefailure = (res) => {
    console.log(res);
  };
  const googleSuccess = () => {
    alert("Google Sign In was unsuccessful. Try again later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label={"First Name"}
                  handleChange={handleChange}
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              isPass
              name="password"
              type={showPass ? "text" : "password"}
              label="Password"
              handleChange={handleChange}
              showPass={showPass}
              handleShowPassword={handleShowPassword}
            />

            {isSignup && (
              <Input
                isPass
                name="confirmPassword"
                type={showPass ? "text" : "password"}
                label="Repeat Password"
                handleChange={handleChange}
                showPass={showPass}
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="555505495341-d32koq2a3focq7c2lg77jmgaus5ebhsr.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                variant="contained"
                startIcon={<Icon />}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googlefailure}
            cookiePolicy={"single_host_origin"}
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode} variant="outlined" color="secondary">
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
