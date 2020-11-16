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
import { useDispatch, useSelector } from 'react-redux';
import { setErrors } from '../actions';

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
  const classes = useStyles();
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const errors = useSelector(store => store.errors.form);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(data));
  };

  const handleData = (e) => {
    const { name, value } = e.target;

    setData({...data, [name]: value });
    dispatch(setErrors({...errors, [name]: ''}));
  }

  return (
    <Auth title='Iniciar sesión'>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          error={errors.login && true}
          margin="normal"
          fullWidth
          id="login"
          label="Login"
          name="login"
          onChange={handleData}
          required
          helperText={errors.login && errors.login}
        />
        <TextField
          variant="outlined"
          error={errors.password && true}
          margin="normal"
          fullWidth
          id="password"
          label="Contraseña"
          name="password"
          type="password"
          onChange={handleData}
          required
          helperText={errors.password && errors.password}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          startIcon={<ExitToAppIcon />}  
          fullWidth
        >
          Acceder
        </Button>
      </form>
    </Auth>
  );
};

export default Login;
