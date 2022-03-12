import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { LockReset, Visibility, VisibilityOff } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { checkLogin, editPasswordApi } from '../api/auth';
import Loader from '../components/common/loader';
import MuiErrorModal from '../components/common/muiErrorModal';
import { useHistory } from "react-router-dom";
import Copyright from '../components/common/copyright';
import ReactGA from 'react-ga';

const theme = createTheme();

export default function EditPassword(props) {

    const history = useHistory();
    const [editPassword, setEditPassword] = React.useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
    const [state, setState] = React.useState({ loading: false, error: false, success: false });
    const [error, setError] = React.useState();
    const [validations, setValidations] = React.useState({
        oldPassword: false,
        oldPasswordText: "",
        newPassword: false,
        newPasswordText: "",
        confirmPassword: false,
        confirmPasswordText: ""
    })
    const [showPassword, setShowPassword] = React.useState({ old: false, new: false, confirm: false });

    const handleClickShowPassword = (i) => {
        if (i == 0) {
            setShowPassword(prevState => ({ ...prevState, old: !showPassword.old }));
        } else if (i == 1) {
            setShowPassword(prevState => ({ ...prevState, new: !showPassword.new }));
        } else if (i == 2) {
            setShowPassword(prevState => ({ ...prevState, confirm: !showPassword.confirm }));
        }
    }
    const handleMouseDownPassword = () => (i) => {
        if (i == 0) {
            setShowPassword(prevState => ({ ...prevState, old: !showPassword.old }));
        } else if (i == 1) {
            setShowPassword(prevState => ({ ...prevState, new: !showPassword.new }));
        } else if (i == 2) {
            setShowPassword(prevState => ({ ...prevState, confirm: !showPassword.confirm }));
        }
    }

    useEffect(() => {
        ReactGA.initialize('UA-222140218-1', {
            debug: false, gaOptions: {
                userId: localStorage.getItem('userId')
            }
        });
        ReactGA.pageview(window.location.pathname + window.location.search);
        try {
            let temp = checkLogin();
            if (!temp) {
                props.changeLogin(false)
                localStorage.clear()
                history.replace({
                    pathname: 'login'
                });
            } else {
                props.changeLogin(true)
            }
        } catch (e) {
            console.log('edit password page error in useffect')
            console.log(e)
        }
    }, []);

    const handleSubmit = async (event) => {
        // console.log('submit called')
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        console.log(data);
        console.log(data.get('oldPassword'));
        console.log(data.get('newPassword'));
        console.log(data.get('confirmPassword'));
        console.log('state -----')
        console.log(editPassword.oldPassword);
        console.log(editPassword.newPassword);
        console.log(editPassword.confirmPassword);

        if (editPassword.newPassword != editPassword.confirmPassword) {
            setValidations(prevState => ({
                ...prevState,
                confirmPassword: true,
                confirmPasswordText: "Passwords must match"
            }))
            return;
        }
        if (validations.oldPassword || validations.newPassword || validations.confirmPassword) {
            return;
        }

        setState(prevState => ({ ...prevState, loading: true }))
        let temp = checkLogin();
        if (!temp) {
            localStorage.clear()
            history.replace({
                pathname: 'login'
            });
        }
        let token = localStorage.getItem('token')
        var apiData = await editPasswordApi(editPassword.oldPassword, editPassword.newPassword, token);
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
            if (!apiData.result.token) {
                await setError({ "message": "Some error occured", "data": "Error" });
                await setState(prevState => ({ ...prevState, loading: false, error: true }))
            } else {
                localStorage.setItem('token', apiData.result.token)
                await setState(prevState => ({ ...prevState, loading: false, success: true }))
            }
        }
    };

    const submitErrorFunc = () => {
        setState(prevState => ({ ...prevState, loading: false, error: false }))
    }

    const submitSuccessFunc = () => {
        setState(prevState => ({ ...prevState, loading: false, success: false }))
    }
    const handleOldPasswordChange = (event) => {
        const data = event.target.value;
        if (data == "" || data == undefined) {
            setValidations(prevState => ({
                ...prevState,
                oldPassword: true,
                oldPasswordText: "Required"
            }))
        } else if (data.length < 5) {
            setValidations(prevState => ({
                ...prevState,
                oldPassword: true,
                oldPasswordText: "Password should be atleast 5 characters"
            }))
        } else {
            setValidations(prevState => ({ ...prevState, oldPassword: false, oldPasswordText: "" }))
        }
        setEditPassword(prevState => ({ ...prevState, oldPassword: data }));
    };
    const handleNewPasswordChange = (event) => {
        const data = event.target.value;
        if (data == "" || data == undefined) {
            setValidations(prevState => ({
                ...prevState,
                newPassword: true,
                newPasswordText: "Required"
            }))
        } else if (data.length < 5) {
            setValidations(prevState => ({
                ...prevState,
                newPassword: true,
                newPasswordText: "Password should be atleast 5 characters"
            }))
        } else {
            setValidations(prevState => ({ ...prevState, newPassword: false, newPasswordText: "" }))
        }
        setEditPassword(prevState => ({ ...prevState, newPassword: data }));
    };
    const handleConfirmPasswordChange = (event) => {
        const data = event.target.value;
        if (data == "" || data == undefined) {
            setValidations(prevState => ({
                ...prevState,
                confirmPassword: true,
                confirmPasswordText: "Required"
            }))
        } else if (data.length < 5) {
            setValidations(prevState => ({
                ...prevState,
                confirmPassword: true,
                confirmPasswordText: "Password should be atleast 5 characters"
            }))
        } else {
            setValidations(prevState => ({ ...prevState, confirmPassword: false, confirmPasswordText: "" }))
        }
        setEditPassword(prevState => ({ ...prevState, confirmPassword: data }));
    };

    return (
        <div>
            {state.error &&
                <MuiErrorModal open={true} message={error.message} data={error.data} dissmisible={true} ok={true} okFunc={submitErrorFunc} />
            }
            {state.success &&
                <MuiErrorModal
                    open={true}
                    message={"Your password was changed successfully"}
                    data={"Success"}
                    dissmisible={true}
                    ok={true}
                    okFunc={submitSuccessFunc}
                />
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
                            <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
                                <LockReset />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Edit Password
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="oldPassword"
                                    label="Old Password"
                                    id="oldPassword"
                                    autoComplete="current-password"
                                    onChange={handleOldPasswordChange}
                                    value={editPassword.oldPassword}
                                    error={validations.oldPassword}
                                    helperText={validations.oldPasswordText}
                                    type={showPassword.old ? "text" : "password"}
                                    InputProps={{ // <-- This is where the toggle button is added.
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => handleClickShowPassword(0)}
                                                    onMouseDown={() => handleMouseDownPassword(0)}
                                                >
                                                    {showPassword.old ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="newPassword"
                                    label="New Password"
                                    id="newPassword"
                                    autoComplete="new-password"
                                    onChange={handleNewPasswordChange}
                                    value={editPassword.newPassword}
                                    error={validations.newPassword}
                                    helperText={validations.newPasswordText}
                                    type={showPassword.new ? "text" : "password"}
                                    InputProps={{ // <-- This is where the toggle button is added.
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => handleClickShowPassword(1)}
                                                    onMouseDown={() => handleMouseDownPassword(1)}
                                                >
                                                    {showPassword.new ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    onChange={handleConfirmPasswordChange}
                                    value={editPassword.confirmPassword}
                                    error={validations.confirmPassword}
                                    helperText={validations.confirmPasswordText}
                                    type={showPassword.confirm ? "text" : "password"}
                                    InputProps={{ // <-- This is where the toggle button is added.
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => handleClickShowPassword(2)}
                                                    onMouseDown={() => handleMouseDownPassword(2)}
                                                >
                                                    {showPassword.confirm ? <Visibility /> : <VisibilityOff />}
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
                                    Change Password
                                </Button>
                            </Box>
                        </Box>
                    }
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        </div>
    );
}