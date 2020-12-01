import React, { useEffect, useState } from 'react';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import ArchiveIcon from '@material-ui/icons/Archive';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import {
  makeStyles,
  IconButton,
  CircularProgress,
  Card,
  Grid,
  CardContent,
  Typography
} from '@material-ui/core';
import { apiURL } from '../config';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(4)
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flex: '6 0 auto'
  },
  content: {
    flex: '1 0 auto',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '3 0 auto'
  },
  icon: {
    height: 50,
    width: 50
  }
}));

const LoadingCards = ({ classes, loading, data, icon }) => ( 
  <Grid item sm={6} xs={12}>
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          { (loading) 
            ? <CircularProgress />
            : <>
              <Typography component="h5" variant="h5">
                {data.total}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {data.name}
              </Typography>
            </>
          }
        </CardContent>
      </div>
      <div className={classes.iconContainer}>
        {React.cloneElement(icon, { className: classes.icon})}
      </div>
    </Card>
  </Grid>
);

function Analytics() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    axios.get(`${apiURL}/analytics/basic`)
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      });
  }, []);

  return (<>
    <LoadingCards
      classes={classes}
      loading={isLoading}
      data={data.votes}
      icon={<ArchiveIcon />}
    />
    <LoadingCards
      classes={classes}
      loading={isLoading}
      data={data.centers}
      icon={<CenterFocusStrongIcon />}
    />
    <LoadingCards
      classes={classes}
      loading={isLoading}
      data={data.electors}
      icon={<EmojiPeopleIcon />}
    />
    <LoadingCards
      classes={classes}
      loading={isLoading}
      data={data.participation}
      icon={<TrendingUpIcon />}
    />
  </>);
};

export default Analytics;
