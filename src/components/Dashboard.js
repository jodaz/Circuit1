import React, { useEffect, useState } from 'react';
import { Title, Loading } from 'react-admin';
import {
  makeStyles,
  Card,
  Grid,
  CardContent,
  CardActions,
  Typography
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import VoteDialog from './Vote';
import isEmpty from 'is-empty';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
});

function Dashboard() {
  const user = useSelector(store => store.user.user);
  const classes = useStyles();

  if (isEmpty(user)) return <Loading /> 

  return (
    <>
      <Title title='Inicio' />
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} color="textPrimary" gutterBottom>
                ¡Bienvenido {user.full_name}!  </Typography>
            </CardContent>
          </Card>
        </Grid>

      { (user.role == 'USER' && !isEmpty(user.votationCenter)) &&
          <Grid item md={6}>
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                  Centro de votación {user.votationCenter.name}
                </Typography>
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                  Votos registrados {user.votationCenter.votes}
                </Typography>
              </CardContent>
              <CardActions>
                <VoteDialog />
              </CardActions>
            </Card>
          </Grid>
        }
      </Grid>
    </>
  );
};

export default Dashboard;
