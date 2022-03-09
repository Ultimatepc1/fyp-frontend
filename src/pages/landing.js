import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { Divider } from '@mui/material';
import Copyright from '../components/common/copyright';
import { checkLogin } from '../api/auth';

const theme = createTheme();

function Landing(props) {

    React.useEffect(() => {
        let temp = checkLogin();
        console.log('temp in ')
        console.log(temp);
    },[])

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <CssBaseline />
                <div className='home'>
                    <Divider />
                    <Paper
                        elevation={4}
                        sx={{
                            position: 'relative',
                            backgroundColor: 'grey.600',
                            color: '#fff',
                            mb: 4,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            // backgroundImage: `url(${post.image})`,
                            backgroundImage: `url("https://miro.medium.com/max/1400/1*6NAaG1qc0fB5IHwyD7NE3w.jpeg")`,                        // height: "100%"
                        }}
                    >
                        {/* Increase the priority of the hero background image */}
                        {<img style={{ display: 'none' }} src={"https://miro.medium.com/max/1400/1*6NAaG1qc0fB5IHwyD7NE3w.jpeg"} alt={"API Image"} />}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                right: 0,
                                left: 0,
                                backgroundColor: 'rgba(0,0,0,.3)',
                            }}
                        />
                        <Grid container spacing={4}>

                            <Grid item md={6}>
                                <Stack
                                    direction={{ xs: 'row', sm: 'column' }}
                                    spacing={{ xs: 1, sm: 2, md: 4 }}
                                >
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            p: { xs: 3, md: 6 },
                                            pr: { md: 0 },
                                        }}
                                    ></Box>
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            p: { xs: 3, md: 6 },
                                            pr: { md: 0 },
                                        }}
                                    >
                                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                            {"Api Development Learning Platform"}
                                        </Typography>
                                        <Typography variant="h5" color="inherit" paragraph>
                                            {"Our Platform aims for user to learn api development via learning by doing approach"}
                                        </Typography>
                                        {/* <Link variant="subtitle1" href="#">
                            {post.linkText}
                        </Link> */}
                                    </Box>
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            p: { xs: 3, md: 6 },
                                            pr: { md: 0 },
                                        }}
                                    ></Box>
                                </Stack>
                            </Grid>
                        </Grid>

                    </Paper>
                </div>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default Landing;