import React from "react";
import { Link } from "react-router-dom";
import '../../assets/scss/_courseListSubItem.scss';

import supportive from '../../assets/images/supportive.png';
import workedOut from '../../assets/images/worked_out.png';
import completion from '../../assets/images/completion.png';
import conventional from '../../assets/images/conventional.png';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Chip from '@mui/material/Chip';
// import gtag, { install } from 'ga-gtag';
// install('G-NPTP41JQB3');
import ReactGA from 'react-ga';
// ReactGA.initialize('UA-222140218-1', { debug: false, gaOptions: {
//     userId: localStorage.getItem('userId')
//   } });
// ReactGA.pageview(window.location.pathname + window.location.search);
// gtag('config', 'G-NPTP41JQB3', {
//     'page_title' : 'courseSubListItem',
//     'page_path': 'fyp-frontend\src\components\common\courseSubListItem.js'
//   });


export default function CourseListSubItem(props) {

    return (
        <div id="cards_landscape_wrap-2">
            <div className="container courseListSubItem">
                <div className="">
                    <div className="subTitle">
                        <h2 data-aos="fade-down" >{props.value.title}</h2>
                    </div><br /><br />

                    <Grid container spacing={3}
                        // sx={{
                        //     display: 'flex',
                        //     width: '100%',
                        //     alignItems: 'center',
                        //     justifyContent: 'center'
                        // }} 
                        alignItems="center"
                        justifyContent="center"
                    >

                        <Grid item xs={12} md={4} lg={2} >
                            <Link to={`/supportive/${props.value.supportive}`}
                                // onClick={() => gtag('event', 'supportive_clicked', {
                                //     supportive: 'supportive clicked',
                                // })}
                                onClick={() => {
                                    let userid = localStorage.getItem('userId');
                                    ReactGA.event({
                                        category: 'User',
                                        label: `UserId ${userid}`,
                                        action: 'supportive button clicked',
                                        value: 1
                                    })
                                }
                                }

                            >
                                <Card sx={{ maxHeight: 150, maxWidth: 150 }} data-aos="zoom-in-right" >
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            width="100"
                                            image={supportive}
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
                            <Link to={`/workedout/${props.value.workedout}`}
                                // onClick={() => gtag('event', 'workedout_clicked', {
                                //         workedout: 'workedout clicked',
                                //     })}
                                onClick={() => {
                                    let userid = localStorage.getItem('userId');
                                    ReactGA.event({
                                        category: 'User',
                                        label: `UserId ${userid}`,
                                        action: 'workedout button clicked',
                                        value: 1
                                    })
                                }
                                }
                            >
                                <Card sx={{ maxHeight: 150, maxWidth: 150 }} data-aos="zoom-in-right">
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            width="100"
                                            image={workedOut}
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
                            <Link to={`/problems/${props.value.completion_one}`}
                                onClick={() => {
                                    let userid = localStorage.getItem('userId');
                                    ReactGA.event({
                                        category: 'User',
                                        label: `UserId ${userid}`,
                                        action: 'completion one button clicked',
                                        value: 1
                                    })
                                }
                                }
                            >
                                <Card sx={{ maxHeight: 150, maxWidth: 150 }} data-aos="zoom-out-up">
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            width="100"
                                            image={completion}
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
                            <Link to={`/problems/${props.value.completion_two}`}
                                onClick={() => {
                                    let userid = localStorage.getItem('userId');
                                    ReactGA.event({
                                        category: 'User',
                                        label: `UserId ${userid}`,
                                        action: 'completion two button clicked',
                                        value: 1
                                    })
                                }
                                }

                            >
                                <Card sx={{ maxHeight: 150, maxWidth: 150 }} data-aos="zoom-in-left">
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            width="100"
                                            image={completion}
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
                            <Link to={`/problems/${props.value.conventional}`}
                                onClick={() => {
                                    let userid = localStorage.getItem('userId');
                                    ReactGA.event({
                                        category: 'User',
                                        label: `UserId ${userid}`,
                                        action: 'conventional button clicked',
                                        value: 1
                                    })
                                }
                                }
                            >
                                <Card sx={{ maxHeight: 150, maxWidth: 150 }} data-aos="zoom-in-left">
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            width="100"
                                            image={conventional}
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
            </div>
        </div>
    );
}