import * as React from 'react';
import { useState } from 'react';
import {
  makeStyles,
  TextField,
  Button
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// Layout
import Auth from './Auth';
import { login } from '../actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const [errors, setErrors] = useState({});
  const classes = useStyles();
  const [responsibleId, setResponsibleId] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ 'responsible_id': responsibleId }));
  };

  return (
    <Auth title='Inicio de sesión'>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          error={errors.responsible_id && true}
          margin="normal"
          fullWidth
          id="login"
          label="Cédula de identidad"
          name="responsible_id"
          onChange={e => setResponsibleId(e.target.value)}
          required
          helperText={errors.responsible_id && 'Ingrese su correo electrónico'}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          startIcon={<ExitToAppIcon />}  
        >
          Acceder
        </Button>
      </form>
    </Auth>
  );
};

export default Login;
