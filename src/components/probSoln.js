import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Card, CardContent } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProbSoln(props) {

  return (
    <div>
        <br/>
        <Card style={{backgroundColor:"#F3F7F7"}}>
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html:  props.content }}></div>
          </CardContent>
        </Card>
    </div>
  );
}