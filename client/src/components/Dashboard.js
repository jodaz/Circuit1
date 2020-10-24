import React from 'react';
import { Title } from 'react-admin';
import {
  makeStyles,
  Card,
  Button,
  CardContent,
  CardActions,
  Typography
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import VoteDialog from './Vote';

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
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Dashboard() {
  const classes = useStyles();
  const user = useSelector(store => store.user);

  return (
    <>
      <Title title='Inicio' />

      <Card className={classes.root}>

        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Centro de votación {user.name}
          </Typography>
        </CardContent>
        <CardActions>
          <VoteDialog />
        </CardActions>
      </Card>
    </>
  );
};