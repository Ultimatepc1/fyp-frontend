// import React,{useEffect,useState} from "react";
// import Sampleio from './sampleio';
// import { makeStyles } from "@mui/styles";
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import ImageListItemBar from '@mui/material/ImageListItemBar';





// export default function IOMapping(props){
//     const useStyles = makeStyles({
//         imageList: {
//           flexWrap: "nowrap"
//         },
//         image: {
//           maxWidth: 200
//         }
//       });

//     const classes = useStyles();

//     return (
//         <>
//             <ImageList className={classes.imageList}>
//                         {props.data.map((io) => (
//                             <ImageListItem className={classes.image}>
//                             {/* <ImageListItem className={classes.image}> */}
//                             {/* <img src={io.thumbnail.uri} /> */}
//                             {/* <ImageListItemBar title={io.thumbnail.name} /> */}
//                             {/* </ImageListItem> */}
//                             {/* <Sampleio data={io} key={io._id}/> */}
//                             <ImageListItemBar title={io.sample_input} position="below" />
//                             </ImageListItem>
//                         ))}
//             </ImageList>
//         </>
//     )
// } 


import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ProbSoln from './probSoln';
import { Fade, Slide } from '@mui/material'

export default function Solution(props) {

    return (
        <Stack spacing={2}>
            {/* <Typography>Page: {page}</Typography> */}
            <Card>
                {props.data.map((value) =>
                    <Slide
                        direction="left"
                        in={true}
                        appear={true}
                        style={{ transitionDelay: '800ms' }}
                        easing={{
                            // enter: "cubic-bezier(0, 1.5, .8, 1)",
                            enter: "cubic-bezier(0,.02,1,.94)",
                            exit: "linear"
                        }}>
                        <Fade
                            in={true}
                            appear={true}
                            style={{ transitionDelay: '800ms' }}
                        >
                            <CardContent key={value._id}>
                                {/* card content slide-left */}
                                <h3>{value.file_name}</h3>
                                <ProbSoln content={value.content} key={value._id} />
                            </CardContent>
                        </Fade>
                    </Slide>
                )}
            </Card>
            <br />

        </Stack>
    );
}
