import React from 'react';
import { Title, Loading } from 'react-admin';
import {
  makeStyles,
  Card,
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

export default function Dashboard() {
  const classes = useStyles();
  const user = useSelector(store => store.user.user);

  if (isEmpty(user)) return <Loading /> 

  return (
    <>
      <Title title='Inicio' />

      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textPrimary" gutterBottom>
            ¡Bienvenido {user.full_name}!
          </Typography>
        </CardContent>
      </Card>

      { (user.role == 'USER') &&
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textPrimary" gutterBottom>
              Centro de votación {user.name}
            </Typography>
          </CardContent>
          <CardActions>
            <VoteDialog />
          </CardActions>
        </Card>
      }
    </>
  );
};
