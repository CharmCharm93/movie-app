import * as yup from "yup";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { Button, Grid, TextField } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

function Login() {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="500px"
      >
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit((data) => {
              // console.log(data);
              auth.login(data.username);
              navigate("/movies");
            })}
          >
            <Grid
              container
              rowSpacing={2}
              direction="column"
              justifyContent="space-evenly"
              alignItems="stretch"
            >
              <Grid item>
                <TextField
                  id="outlined-helperText"
                  label="Username"
                  defaultValue="DuyenCao"
                  autoComplete="off"
                  {...register("username", { required: true })}
                />
                <p style={{ color: "red" }}>{errors.username?.message}</p>
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password", { required: true })}
                />
                <p style={{ color: "red" }}>{errors.password?.message}</p>
              </Grid>

              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </Box>
    </>
  );
}

export default Login;
