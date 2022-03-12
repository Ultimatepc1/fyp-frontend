import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { checkLogin, loginApi } from "../api/auth";
import Loader from '../components/common/loader';
import MuiErrorModal from '../components/common/muiErrorModal';
import ReactGA from 'react-ga';
import isEmail from 'validator/lib/isEmail';

import Copyright from '../components/common/copyright';

const theme = createTheme();

export default function SignIn(props) {

  const location = useLocation();
  const history = useHistory();
  const [login, setLogin] = React.useState({ email: "", password: "", remember: true });
  const [state, setState] = React.useState({ loading: false, error: false, success: false });
  const [error, setError] = React.useState();
  const [validations, setValidations] = React.useState({
    email: false,
    emailText: "",
    password: false,
    passwordText: ""
  })
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    console.log(data);
    console.log(data.get('email'));
    console.log(data.get('password'));
    console.log('state -----')
    console.log(login.email);
    console.log(login.password);
    if (validations.email || validations.password) {
      return;
    }
    setState(prevState => ({ ...prevState, loading: true }))
    var apiData = await loginApi(login.email, login.password, login.remember)
    console.log(apiData)
    if (apiData.error) {
      // set Error
      console.log("----")

      if (apiData.error.response) {
        if (apiData.error.response.data) {
          await setError(apiData.error.response.data);
        } else {
          if (apiData.error.message) {
            await setError({ "message": apiData.error.message, "data": "Error" });
          }
        }
      } else if (apiData.error.message) {
        await setError({ "message": apiData.error.message, "data": "Error" });
      } else {
        await setError({ "message": "Some error occured", "data": "Error" });
      }
      await setState(prevState => ({ ...prevState, loading: false, error: true }))
    } else if (apiData.result) {
      console.log(apiData.result);
      let result = apiData.result;
      if (result.userId) {
        localStorage.setItem('userId', result.userId);
      }
      if (result.token) {
        localStorage.setItem('token', result.token)
      }
      if (result.userId && result.token) {
        localStorage.setItem('isLoggedIn', true)
        await setState(prevState => ({ ...prevState, loading: false, success: true }))
        history.push({
          pathname: '/'
        })
      } else {
        await setError({ "message": "Some error occured", "data": "Error" });
        await setState(prevState => ({ ...prevState, loading: false, error: true }));
      }
    }

  };

  const handleEmailChange = (event) => {
    const data = event.target.value;
    if (data == "" || data == undefined) {
      setValidations(prevState => ({ ...prevState, email: true, emailText: "Required" }))
    } else if (isEmail(data)) {
      setValidations(prevState => ({ ...prevState, email: false, emailText: "" }))
    } else {
      setValidations(prevState => ({ ...prevState, email: true, emailText: "Enter a valid email" }))
    }
    setLogin(prevState => ({ ...prevState, email: data }));
  };
  const handlePasswordChange = (event) => {
    const data = event.target.value;
    if (data == "" || data == undefined) {
      setValidations(prevState => ({ ...prevState, password: true, passwordText: "Required" }))
    } else if (data.length < 5) {
      setValidations(prevState => ({ ...prevState, password: true, passwordText: "Password should be atleast 5 characters" }))
    } else {
      setValidations(prevState => ({ ...prevState, password: false, passwordText: "" }))
    }
    setLogin(prevState => ({ ...prevState, password: data }));
  };
  const handleRememberChange = () => {
    setLogin(prevState => ({ ...prevState, remember: !login.remember }));
  };

  const setFromSignUp = () => {
    if (location.state) {
      if (location.state.email && location.state.password) {
        setLogin(prevState => ({ ...prevState, email: location.state.email, password: location.state.password }))
      } else if (location.state.email) {
        setLogin(prevState => ({ ...prevState, email: location.state.email }));
      } else if (location.state.password) {
        setLogin(prevState => ({ ...prevState, password: location.state.password }));
      }
    }
  }

  const submitErrorFunc = () => {
    setState(prevState => ({ ...prevState, loading: false, error: false }))
  }

  React.useEffect(() => {
    ReactGA.initialize('UA-222140218-1', {
      debug: true
    });
    ReactGA.pageview(window.location.pathname + window.location.search);
    try {
      let temp = checkLogin();
      if (!temp) {
        props.changeLogin(false)
        localStorage.clear()
      } else {
        props.changeLogin(true)
        history.replace({
          pathname: 'landing'
        });;
      }
    } catch (e) {
      console.log('login page error in useffect')
      console.log(e)
    }
    // do stuff here...
    setFromSignUp();
  }, [])

  return (
    <div>
      {state.error &&
        <MuiErrorModal open={true} message={error.message} data={error.data} dissmisible={true} ok={true} okFunc={submitErrorFunc} />
      }
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          {state.loading ? <Loader /> :
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleEmailChange}
                  value={login.email}
                  error={validations.email}
                  helperText={validations.emailText}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handlePasswordChange}
                  value={login.password}
                  error={validations.password}
                  helperText={validations.passwordText}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      checked={login.remember}
                      onChange={handleRememberChange}
                    />
                  }
                  label="Remember me"
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  type="submit"
                // onClick={() => handleSubmit()}
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          }
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}