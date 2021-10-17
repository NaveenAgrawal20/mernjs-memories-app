import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/VisibilityOff";
import VisibilityOff from "@material-ui/icons/Visibility";
export default function Input(props) {
  return (
    <Grid item xs={12} sm={props.half ? 6 : 12}>
      <TextField
        name={props.name}
        label={props.label}
        onChange={props.handleChange}
        variant="outlined"
        required
        fullWidth
        type={props.type}
        InputProps={
          props.isPass
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={props.handleShowPassword}
                    >
                      {props.showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
}
