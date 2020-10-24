import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import { useMutation } from 'react-admin';
import { useSelector } from 'react-redux';

export default function VoteDialog() {
  const [open, setOpen] = React.useState(false);
  const user = useSelector(store => store.user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [vote, { loading }] = useMutation({
    type: 'update',
    resource: 'votation-centers',
    payload: { id: user.id, data: {} }
  });

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Registrar voto
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Está seguro de registrar un voto?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Está a punto de registrar un voto para su centro de votación.
            Esta acción no puede ser deshecha.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={() => {
            vote();
            handleClose();
          }} color="primary" autoFocus>
            Registrar voto
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}