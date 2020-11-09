import React from 'react';
import {
  Button,
  TextField,
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
  const [fullName, setFullName] = React.useState('');
  const [personId, setPersonId] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const user = useSelector(store => store.user.user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [vote, { loading }] = useMutation({
    type: 'update',
    resource: 'votation-centers',
    payload: { id: user.votationCenter.id, data: {
      'full_name': fullName,
      'personId': personId
    }}
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
            Ingrese los datos del votante.

            Esta acción no puede ser deshecha.
          </DialogContentText>
          <TextField
            variant="outlined"
            error={errors.person_id && true}
            margin="normal"
            fullWidth
            id="personId"
            label="Cédula de identidad"
            name="personId"
            onChange={e => setPersonId(e.target.value)}
            required
            helperText={errors.person_id && 'Ingrese la cédula del votante'}
          />
          <TextField
            variant="outlined"
            error={errors.full_name && true}
            margin="normal"
            fullWidth
            id="fullName"
            label="Nombre completo"
            name="full_name"
            onChange={e => setFullName(e.target.value)}
            required
            helperText={errors.full_name && 'Ingrese el nombre completo'}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => {
            vote();
            handleClose();
          }} color="secondary" autoFocus>
            Registrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
