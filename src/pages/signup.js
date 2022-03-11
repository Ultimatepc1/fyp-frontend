import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { GroupAdd, Visibility, VisibilityOff } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { checkLogin, signUp } from '../api/auth';
import Loader from '../components/common/loader';
import MuiErrorModal from '../components/common/muiErrorModal';
import { useHistory } from "react-router-dom";
import Copyright from '../components/common/copyright';
import ReactGA from 'react-ga';

const theme = createTheme();

export default function SignUp(props) {

    const history = useHistory();
    const [signup, setSignup] = React.useState({ email: "", password: "", name: "" });
    const [state, setState] = React.useState({ loading: false, error: false, success: false });
    const [error, setError] = React.useState();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const handleSubmit = async (event) => {
        // console.log('submit called')
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        console.log(data);
        console.log(data.get('email'));
        console.log(data.get('password'));
        console.log(data.get('name'));
        console.log('state -----')
        console.log(signup.email);
        console.log(signup.password);
        console.log(signup.name);
        setState(prevState => ({ ...prevState, loading: true }))
        var apiData = await signUp(signup.name, signup.email, signup.password)
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
        } else if (apiData.userId) {
            console.log(apiData.userId);
            await setState(prevState => ({ ...prevState, loading: false, success: true }))
            history.replace({
                pathname: 'login',
                state: {
                    email: signup.email,
                    password: signup.password
                }
            });
        }
    };

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
                    pathname: 'home'
                });;
            }
        } catch (e) {
            console.log('signup page error in useffect')
            console.log(e)
        }

    }, [])

    const submitErrorFunc = () => {
        setState(prevState => ({ ...prevState, loading: false, error: false }))
    }

    const handleEmailChange = (event) => {
        const data = event.target.value;
        setSignup(prevState => ({ ...prevState, email: data }));
    };
    const handlePasswordChange = (event) => {
        const data = event.target.value;
        setSignup(prevState => ({ ...prevState, password: data }));
    };
    const handleNameChange = (event) => {
        const data = event.target.value;
        setSignup(prevState => ({ ...prevState, name: data }));
    };

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
                                <GroupAdd />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign Up
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    onChange={handleNameChange}
                                    value={signup.name}
                                />
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
                                    value={signup.email}
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
                                    value={signup.password}
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
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    type="submit"
                                // onClick={() => handleSubmit()}
                                >
                                    Sign Up
                                </Button>
                                <Box sx={{
                                    display: 'flex',
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Link href="/signup" variant="body2">
                                        {"Already have an account? Log In"}
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                    }
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        </div>
    );
}