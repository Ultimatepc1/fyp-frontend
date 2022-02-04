import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

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

export default function MuiErrorModal(props) {
  const [open, setOpen] = React.useState(props.open);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open} timeout={2000}>
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h1">
                {props.data || "Error"}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {props.message || "Some error occured"}
            </Typography>
            </Box>
        </Fade>
      </Modal>
    </div>
  );
}
