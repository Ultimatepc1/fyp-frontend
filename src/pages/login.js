import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { loginApi } from "../api/auth";
import Loader from '../components/common/loader';
import MuiErrorModal from '../components/common/muiErrorModal';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        mywebfyp.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn(props) {

  const location = useLocation();
  const history = useHistory();
  const [login, setLogin] = React.useState({ email: "", password: "", remember: true});
  const [state, setState] = React.useState({ loading: false, error: false, success: false });
  const [error, setError] = React.useState();

  const handleSubmit =async (event) => {
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
            if(result.userId){
              localStorage.setItem('userId', result.userId);
            }
            if(result.token){
              localStorage.setItem('token', result.token)
            }
            if(result.userId && result.token){
              await setState(prevState => ({ ...prevState, loading: false, success: true }))
              history.push({
                pathname: '/'
              })
            }else{
              await setError({ "message": "Some error occured", "data": "Error" });
              await setState(prevState => ({ ...prevState, loading: false, error: true }));
            }
        }
        
  };

  const handleEmailChange = (event) => {
    const data = event.target.value;
    setLogin(prevState => ({ ...prevState, email: data }));
  };
  const handlePasswordChange = (event) => {
    const data = event.target.value;
    setLogin(prevState => ({ ...prevState, password: data }));
  };
  const handleRememberChange = () => {
    setLogin(prevState => ({ ...prevState, remember: !login.remember }));
  };

  const setFromSignUp = () => {
    if(location.state){
      if(location.state.email && location.state.password){
        setLogin(prevState => ({...prevState, email: location.state.email , password: location.state.password}))
      }else if(location.state.email){
        setLogin(prevState => ({ ...prevState, email: location.state.email }));
      }else if(location.state.password){
        setLogin(prevState => ({ ...prevState, password: location.state.password }));
      }
    }
  }

  const submitErrorFunc = () => {
    setState(prevState => ({ ...prevState, loading: false, error: false }))
}

    React.useEffect(()=>{
      // do stuff here...
      setFromSignUp();

  }, [])
  return (
    <div>
            {state.error &&
                <MuiErrorModal open={true} message={error.message} data={error.data} dissmisible={true} ok={true} okFunc={submitErrorFunc}/>
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
          <Box component="form" noValidate sx={{ mt: 1 }}>
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
              value={login.password}
            />
            <FormControlLabel
              control={
              <Checkbox 
              value="remember" 
              color="primary" 
              checked={login.remember}
              onChange = {handleRememberChange}
              />
            }
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleSubmit()}
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