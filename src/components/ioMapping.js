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
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Sampleio from './sampleio';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Fade from '@mui/material/Fade'

export default function IOMapping(props) {
  const [page, setPage] = React.useState(1);
  const [io, setIO] = React.useState(props.data);
  const handleChange = (event, value) => {
    setPage(value);
  };

  

  return (
    <Stack spacing={2}>
      {/* <Typography>Page: {page}</Typography> */}
      <br/>
      <Card data-aos="zoom-in">
        <CardContent>
        <Pagination count={io.length} page={page} onChange={handleChange} />
        {/* </CardContent>
      </Card>
        <Card variant="outlined">
          <CardContent> */}
          <Sampleio data={io[page-1]}/>
          </CardContent>
        </Card>
        <br/>
      
    </Stack>
  );
}
