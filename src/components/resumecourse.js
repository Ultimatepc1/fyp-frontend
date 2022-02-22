import React from 'react'
import '../assets/scss/_supportive.scss'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DoneQues from '../api/mocks/doneQues';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import './../assets/scss/_courseListSubItem.scss';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));




const ResumeCourse = (props) => {
    return (



        <div className="" >
            <h1>Resume Course </h1><br /> 
            {/* <Grid container spacing={2}>
                {DoneQues.map((value) =>
                    <Grid item xs={3.5} >
                        <Item>
                            <CardContent sx={{ fontSize: 15, height: '100%', width: '100%' }}>
                                {value.cardName}<br /><br />
                                {value.cardDescription}
                            </CardContent>
                        </Item>
                    </Grid>
                )}

                <Grid item xs={1.5} sx={{ alignItems: 'center' }}>
                    <Link to={'./home'}>
                        <Item sx={{}}>
                            <CardContent sx={{ alignContent: 'center', fontSize: 15, height: '100%', width: '100%' }}>
                                Go to home
                            </CardContent>
                        </Item>
                    </Link>
                </Grid>
            </Grid>  */}
            <Grid container spacing={2} sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <Grid item xs={12} md={4} lg={2} >
                            <Link  >
                                <Card sx={{ maxHeight: 150, maxWidth: 150 }} data-aos="zoom-in-right" >
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            width="100"
                                            // image={supportive}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Resources
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Grid>


                        <Grid item xs={12} md={4} lg={2}>
                            <Link >
                                <Card sx={{ maxHeight: 150, maxWidth: 150 }} data-aos="zoom-in-right">
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            width="100"
                                            // image={workedOut}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Solved Examples
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Grid>


                        <Grid item xs={12} md={4} lg={2}>
                            <Link >
                                <Card sx={{ maxHeight: 150, maxWidth: 150 }} data-aos="zoom-out-up">
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            width="100"
                                            // image={completion}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Task 1
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Grid>


                        <Grid item xs={12} md={4} lg={2}>
                            <Link >
                                <Card sx={{ maxHeight: 150, maxWidth: 150 }} data-aos="zoom-in-left">
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            width="100"
                                            // image={completion}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Task 2
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Grid>


                        <Grid item xs={12} md={4} lg={2}>
                            <Link>
                                <Card sx={{ maxHeight: 150, maxWidth: 150 }} data-aos="zoom-in-left">
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            width="100"
                                            // image={conventional}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Task 3
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Grid>


                    </Grid>
        </div>
     )
}

export default ResumeCourse

