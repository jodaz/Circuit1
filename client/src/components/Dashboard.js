import React, { useEffect, useState } from 'react';
import { Title, Loading } from 'react-admin';
import {
  makeStyles,
  Card,
  CardHeader,
  Grid,
  CardContent,
  CardActions,
  Typography
} from '@material-ui/core';
import { updateVotes } from '../actions';
import { useSelector } from 'react-redux';
import VoteDialog from './Vote';
import isEmpty from 'is-empty';

const useStyles = makeStyles({
  welcome: {
    width: '100%'
  },
  root: {
    display:'flex'
  },
  cover: {
    display: 'flex',
    flex: '1 0 auto',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
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
  details: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
  },
});

function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(store => store.user.user);
  const votes = useSelector(store => store.commons.votes);
  const classes = useStyles();

  return (
    <>
      <Title title='Inicio' />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.welcome}>
            <CardContent>
              <Typography className={classes.title} color="textPrimary" variant="subtitle1" gutterBottom>
                ¡Bienvenido(a) a CircuitoUnoApp (C1A)!
              </Typography>
              <Typography color="textSecondary" variant="subtitle2">
                Aplicación de contabilización de votos en tiempo real.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      { (user.role == 'USER' && !isEmpty(user.votationCenter)) &&
          <Grid item xs={12}>
            <Card className={classes.root}>
              <CardContent className={classes.details}>
                <Typography component="h5" variant="h5">
                  {user.votationCenter.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {user.full_name}
                </Typography>
                <CardActions>
                  <VoteDialog />
                </CardActions>
              </CardContent>
              <div className={classes.cover}>
                <Typography variant="h2">
                  {votes}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Votos
                </Typography>
              </div>
            </Card>
          </Grid>
        }
      </Grid>
    </>
  );
};

export default Dashboard;
