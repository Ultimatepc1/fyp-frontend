import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Divider, Backdrop } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useHistory } from "react-router-dom";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '7px',
  boxShadow: 24,
  p: 4,
};

export default function MuiErrorModal(props) {
  const [open, setOpen] = React.useState(props.open);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const history = useHistory();

  const getData = () => {
    if (props.data) {
      let temp = props.data
      if (typeof temp == "string") {
        return temp;
      } else if (temp instanceof Array) {
        return "Validation Error"
      }
    }

    return "Error";
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={props.dissmisable ? handleClose : () => { }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} timeout={2000}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h1">
              {getData()}
            </Typography>
            <Divider /><br />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {props.message || "Some error occured"}
            </Typography>
            <br />
            <Box component={"div"} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              {props.back && <Button variant="contained" onClick={() => history.goBack()}>Back</Button>}
              {props.ok &&
                <Button
                  variant="contained"
                  onClick={() => {
                    if(typeof(props.okFunc) === 'function') {
                      props.okFunc();
                    }
                    handleClose();
                  }
                  }>
                  Okay
                </Button>
              }
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
