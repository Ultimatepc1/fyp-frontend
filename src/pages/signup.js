import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { GroupAdd } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signUp } from '../api/auth';
import Loader from '../components/common/loader';
import MuiErrorModal from '../components/common/muiErrorModal';
import { useHistory } from "react-router-dom";
import Copyright from '../components/common/copyright';

const theme = createTheme();

export default function SignUp(props) {

    const history = useHistory();
    const [login, setLogin] = React.useState({ email: "", password: "", name: "" });
    const [state, setState] = React.useState({ loading: false, error: false, success: false });
    const [error, setError] = React.useState();

    const handleSubmit = async (event) => {
        // console.log('submit called')
        setState(prevState => ({ ...prevState, loading: true }))
        var apiData = await signUp(login.name, login.email, login.password)
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
                state:{
                    email: login.email,
                    password: login.password
                }
            });
        }
    };

    const submitErrorFunc = () => {
        setState(prevState => ({ ...prevState, loading: false, error: false }))
    }

    const handleEmailChange = (event) => {
        const data = event.target.value;
        setLogin(prevState => ({ ...prevState, email: data }));
    };
    const handlePasswordChange = (event) => {
        const data = event.target.value;
        setLogin(prevState => ({ ...prevState, password: data }));
    };
    const handleNameChange = (event) => {
        const data = event.target.value;
        setLogin(prevState => ({ ...prevState, name: data }));
    };

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
                                <GroupAdd />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign Up
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    name="ename"
                                    autoComplete="name"
                                    autoFocus
                                    onChange={handleNameChange}
                                    value={login.name}
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
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => handleSubmit()}
                                >
                                    Sign Up
                                </Button>
                                <Box sx={{
                                    display: 'flex',
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Link href="/login" variant="body2">
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