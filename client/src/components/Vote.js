import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import isEmpty from 'is-empty';
import { vote } from '../fetch';
import { useSelector } from 'react-redux';
import { apiURL } from '../config';
import { useNotify } from 'react-admin';
import axios from 'axios';

export default function VoteDialog() {
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const user = useSelector(store => store.user.user);
  const notify = useNotify();

  const handleClickOpen = () => {
    setOpen(true);
    setErrors({});
    setData({});
  }

  const handleClose = () => {
    setLoading(false);
    setOpen(false);
    setErrors({});
    setData({});
  };

  const handleData = (e) => {
    const { name, value } = e.target;
 
    setLoading(false);
    setData({...data, [name]: value });
  };

  const handleVote = async () => {
    setLoading(true);
    const { id } = user.votationCenter;

    const { response, error } = await axios.post(`${apiURL}/votation-centers/vote/${id}`, data)
      .then(res => ({ response: res.data }))
      .catch(error => ({ error: error.message.data }));

    if (!isEmpty(error)) {
      setErrors(error);
    }
    if (!isEmpty(response)) {
      handleClose();
      notify('¡Votante registrado!');
    }
  };

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
            error={errors.personId && true}
            margin="normal"
            fullWidth
            id="personId"
            label="Cédula de identidad"
            name="personId"
            onChange={handleData}
            required
            helperText={errors.personId && errors.personId}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleVote} color="secondary" autoFocus disabled={loading}>
            Registrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
