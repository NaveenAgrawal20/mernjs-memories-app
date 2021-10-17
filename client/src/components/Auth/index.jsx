import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutLineIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./style";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {signin,signup} from '../../actions/auth';

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Auth() {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    if(isSignup){
      dispatch(signup(formData,history));
    }else{
      dispatch(signin(formData,history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignup((isSignup) => !isSignup);
    setShowPass(false);
  };

  const handleShowPassword = () => {
    setShowPass(!showPass);
  };
  
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googlefailure = (error) => {
    console.error(error);
    console.log("Google Sign In was unsuccessful. Try again later");
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
            cookiePolicy="single_host_origin"
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
