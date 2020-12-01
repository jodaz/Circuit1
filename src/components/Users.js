import * as React from "react";
import { 
  List, 
  Datagrid, 
  Edit,
  SelectInput,
  PasswordInput,
  TextField,
  Create,
  SimpleForm,
  TextInput,
  SimpleList,
} from 'react-admin';
import Actions from './Actions';
import Filter from './Filter';
import ModuleActions from './ModuleActions';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';

const choices = [
  { id: 'ADMIN', name: 'ADMIN'},
  { id: 'ANALYST', name: 'ANALYST' },
  { id: 'USER', name: 'USER' }
];

const validateUsers = (values) => {
  const error = {};

  if (!values.full_name) {
    error.full_name = 'Ingrese el nombre de la persona';
  }
  if (!values.login) {
    error.login = 'Ingrese el login';
  }
  if (!values.password) {
    error.password = 'Ingrese la contraseña';
  }
  if (!values.role) {
    error.role = 'Seleccione el rol del usuario';
  }

  return error;
}

export const UsersList = (props) => {
  const user = useSelector(store => store.user.user);
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <List 
      {...props}
      title="Usuarios"
      actions={
        <ModuleActions
          shouldCreate={(user.role === 'ADMIN')}
        />
      }
      bulkActionButtons={false}
      filters={<Filter defaultfilter='full_name' />}
    >
      {isSmall ? (
        <SimpleList
          primaryText={record => `${record.full_name}`}
          tertiaryText={record => `${record.login}`}
        />
      ) : (
        <Datagrid>
          <TextField source="full_name" label="Nombre completo"/>
          <TextField source="login" label="Login" />
          {
            (user.role === 'ADMIN') &&
            <Actions {...props} /> 
          }
        </Datagrid>
      )}
    </List>
  );
};

export const UsersCreate = (props) => {
  return (
    <Create {...props} title="Nuevo usuario" >
      <SimpleForm validate={validateUsers}>
        <TextInput source="full_name" label="Nombre completo" />
        <TextInput source="login" label="Login" />
        <PasswordInput source="password" label="Contraseña" />
        <SelectInput source="role" choices={choices} optionText="name" optionValue='name'label="Rol"/>
      </SimpleForm>
    </Create>
  );
};

export const UsersEdit = (props) => {
  return (
    <Edit {...props} title="Editar usuario">
      <SimpleForm validate={validateUsers}>
        <TextInput source="full_name" label="Nombre completo" />
        <TextInput source="login" label="Login" />
        <PasswordInput source="password" label="Contraseña" />
        <SelectInput source="role" choices={choices} optionText="name" optionValue='name'label="Rol"/>
      </SimpleForm>
    </Edit>
  );
}
