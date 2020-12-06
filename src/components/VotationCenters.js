import * as React from "react";
import { useState, useEffect } from 'react';
import { 
  List, 
  Loading,
  PasswordInput,
  Loading as AdminLoading,
  useShowController,
  Edit,
  SelectInput,
  NumberField,
  Datagrid, 
  TextField,
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  SimpleList,
  Show,
} from 'react-admin';
import Actions from './Actions';
import ModuleActions from './ModuleActions';
import { fetchUsers } from '../fetch';
import { useSelector } from 'react-redux';
import Filter from './Filter';
import { 
  useMediaQuery, 
  Grid, 
  Card, 
  CardContent, 
  makeStyles, 
  Typography,
  List as MaterialList,
  ListItem,
  ListItemText
} from '@material-ui/core';
import dateformat from 'dateformat';

const useStyles = makeStyles((theme) => ({
  rootList: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  welcome: {
    width: '100%'
  },
  root: {
    display:'flex',
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
}));

const Title = ({ record }) => {
  return <span>{record ? `${record.name}` : ''}</span>;
}

const validateVotationCenter = (values) => {
  const error = {};

  if (!values.name) {
    error.name = 'Ingrese el name del centro de votación';
  }
  if (!values.municipality) {
    error.municipality = 'Ingrese el municipio';
  }
  if (!values.parish) {
    error.parish = 'Ingrese el name de la parroquia';
  }
  if (!values.user) {
    error.user = 'Seleccione un usuario responsable del centro.';
  }
  if (!values.electors) {
    error.electors = 'Ingrese el número de electores esperados.';
  }

  return error;
}

const validateVotationCenterStore = (values) => {
  const error = {};

  if (!values.name) {
    error.name = 'Ingrese el nombre del centro de votación';
  }
  if (!values.municipality) {
    error.municipality = 'Ingrese el municipio';
  }
  if (!values.parish) {
    error.parish = 'Ingrese el name de la parroquia';
  }
  if (!values.full_name) {
    error.full_name = 'Ingrese el nombre del responsable.';
  }
  if (!values.login) {
    error.login = 'Ingrese el nombre de usuario.';
  }
  if (!values.password) {
    error.password = 'Ingrese la contraseña.';
  }
  if (!values.electors) {
    error.electors = 'Ingrese el número de electores esperados.';
  }

  return error;
}

export const VotationCentersList = (props) => {
  const user = useSelector(store => store.user.user);
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <List 
      {...props}
      title="Centros de votación"
      bulkActionButtons={false}
      actions={
        <ModuleActions
          shouldCreate={(user.role === 'ADMIN')}
        />
      }
      filters={<Filter defaultfilter='name' />}
    >
      {isSmall ? (
        <SimpleList
          primaryText={record => record.name}
          secondaryText={record => `${record.municipality}, ${record.parish}`}
          tertiaryText={record => `${record.votes} votos`}
        />
      ) : (
        <Datagrid>
          <TextField label="Nombre" source="name" />
          <TextField label="Municipio" source="municipality" />
          <TextField label="Parroquia" source="parish" />
          <TextField label="Votos" source="votes" />
          <NumberField label="Electores" source="electors" />
          <TextField label="Responsable" source="user.full_name" />
          <Actions {...props} shouldShow showDelete={(user.role === 'ADMIN') ? true : false} /> 
        </Datagrid>
      )}
    </List>
  );
};

export const VotationCentersCreate = (props) => (
  <Create {...props} title="Nuevo centro de votación" >
    <SimpleForm validate={validateVotationCenterStore} redirect='list' >
      <TextInput source="name" label="Nombre" />
      <TextInput source="municipality" label="Municipio" />
      <TextInput source="parish" label="Parroquia" />
      <NumberInput source='electors' label="Electores" min={1}/>
      <TextInput source="full_name" label="Nombre del responsable" />
      <TextInput source="login" label="Usuario" />
      <PasswordInput source="password" label="Contraseña" />
    </SimpleForm>
  </Create>
);

export const VotationCentersEdit = (props) => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const { response } = await fetchUsers();

    setUsers(response.data);
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <Edit {...props} title={<Title />}>
      <SimpleForm validate={validateVotationCenter}>
        <TextInput source="name" label="Nombre" />
        <TextInput source="municipality" label="Municipio" />
        <TextInput source="parish" label="Parroquia" />
        <NumberInput source='electors' label="Electores" min={1}/>
        <SelectInput
          source="user"
          choices={users}
          optionText="full_name"
          optionValue='id'
          label="Usuario responsable"
          initialValue={'user'}
        />
      </SimpleForm>
    </Edit>
  );
}

export const VotationCentersShow = (props) => {
  const {
    loading, // boolean that is true on mount, and false once the record was fetched
    record,
  } = useShowController(props);
  const classes = useStyles();

  return (
    <Show {...props} title={<Title />}>
      { (!loading) ?
        <Grid>
          <Grid item xs={12}>
            <Card className={classes.root}>
              <CardContent className={classes.details}>
                <Typography component="h5" variant="h5">
                  {record.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {record.user.full_name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {record.electors} electores
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {record.municipality}, {record.parish}
                </Typography>
              </CardContent>
              <div className={classes.cover}>
                <Typography variant="h2">
                  {record.votes}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Votos
                </Typography>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.root}>
              <div className={classes.rootList}>
                <MaterialList>
                  { record.dispatches.map((item, key) => (
                    <ListItem>
                      <ListItemText primary={`${item.votes} votos`} secondary={dateformat(new Date(item.sent_at), 'yyyy-mm-dd h:MM:ss')} />
                    </ListItem>
                  ))}
                </MaterialList>
              </div>
            </Card>
          </Grid>
        </Grid>
        : <AdminLoading />
      }
    </Show>
  );
}
