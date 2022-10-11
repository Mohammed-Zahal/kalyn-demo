/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../apollo/Queries/mutation";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "../../redux/slice/auth";
import { useRouter } from "next/router";
import { RootState } from "../../redux/types";
function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      console.log(data);
      dispatch(updateToken(data.generateCustomerToken.token));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const theme = createTheme();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    login({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
  };
  const handleChange = (event: any) => {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const token = useSelector((state: RootState) => state.auth.data.token);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token, router]);

  return (
    <ThemeProvider theme={theme}>
      <Container className="" component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Enter Your Mail"
              name="email"
              autoComplete="text"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: "white", backgroundColor: "red" }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
