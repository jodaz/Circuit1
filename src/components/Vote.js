import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import DoneIcon from '@material-ui/icons/Done';
import isEmpty from 'is-empty';
import { updateVotes } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { apiURL } from '../config';
import { useNotify } from 'react-admin';
import axios from 'axios';

export default function VoteDialog() {
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const user = useSelector(store => store.user.user);
  const dispatch = useDispatch();
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
      dispatch(updateVotes(response.votes));
      notify('¡Votante registrado!');
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        fullWidth={true}
      >
        Registrar voto
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          { (!loading) &&
            <DialogTitle id="alert-dialog-title">
              {"¿Está seguro de registrar un voto?"}
            </DialogTitle>
          }
          <DialogContent>
            { (!loading) ? (<>
            <DialogContentText id="alert-dialog-description">
              Esta acción no puede deshacerse.
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
          </>)
          : <CircularProgress />
          }
          </DialogContent>
          { !(loading) &&
            <DialogActions>
              <Button
                onClick={handleClose}
                color="secondary"
                startIcon={<BlockIcon />}
                fullWidth
              >
                Cancelar
              </Button>
              <Button
                onClick={handleVote}
                variant="contained"
                color="primary"
                autoFocus
                disabled={loading}
                startIcon={<DoneIcon />}
                fullWidth
              >
                Guardar
              </Button>
            </DialogActions>
          }
      </Dialog>
    </>
  );
}
