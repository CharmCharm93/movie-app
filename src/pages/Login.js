import * as yup from "yup";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { Button, Grid, Modal, TextField, Typography } from "@mui/material";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "1px solid white",
  minWidth: "300px",
  borderRadius: 4,
  padding: 20,
  backgroundColor: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

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
  let location = useLocation();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Modal open={true} onClose={handleClose}>
        <Box style={style}>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit((data) => {
                // console.log(data);
                auth.login(data.username);
                navigate("/movies");

                if (!location.state.movieId) {
                  navigate("/");
                } else {
                  navigate(`/movies/${location.state.movieId}`);
                  // console.log(location);
                }
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
                  <Typography variant="h4">User Login</Typography>
                </Grid>
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
                    Go
                  </Button>
                </Grid>
              </Grid>
            </form>
          </FormProvider>
        </Box>
      </Modal>
    </>
  );
}

export default Login;
