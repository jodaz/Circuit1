import React from 'react';
import { Notification, Title } from 'react-admin';
import GradeIcon from '@material-ui/icons/Grade';
import {
  CssBaseline,
  Avatar,
  Container,
  Box,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Dirección de Estadísticas e Informática
    <br />
      <a color="inherit" href="http://somoscarupano.com.ve/">
        Alcaldía del Municipio Bermúdez
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Auth(props) {
  const { title, children } = props;
  const classes = useStyles();

  return (
    <>
      <Title title={title} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <GradeIcon /> 
          </Avatar>
          <Typography component="h1" variant="h5">
            {title} 
          </Typography>
          <Typography variant="body2" >
            SASI
          </Typography>

          {children}
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
