import * as React from "react";
import { 
  List, 
  Datagrid, 
  Edit,
  EditButton,
  SelectInput,
  PasswordInput,
  TextField,
  Create,
  SimpleForm,
  TextInput,
  DeleteButton
} from 'react-admin';
import Filter from './Filter';
import { isEmpty } from '../utils';
import { useSelector } from 'react-redux';

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

  return (
    <List 
      {...props}
      title="Usuarios"
      bulkActionButtons={false}
      filters={<Filter defaultfilter='full_name' />}
    >
      <Datagrid>
        <TextField source="full_name" label="Nombre completo"/>
        <TextField source="login" label="Login" />
        { (user.role === 'ADMIN') && <DeleteButton /> }
      </Datagrid>
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
