import * as React from "react";
import { 
  List, 
  Datagrid, 
  SelectInput,
  PasswordInput,
  TextField,
  Create,
  SimpleForm,
  TextInput,
  DeleteButton
} from 'react-admin';
import { isEmpty } from '../utils';
import { useSelector } from 'react-redux';

export const UsersList = (props) => {
  const user = useSelector(store => store.user.user);

  return (
    <List 
      {...props}
      title="Usuarios"
      bulkActionButtons={false}
    >
      <Datagrid>
        <TextField source="full_name" label="Nombre completo"/>
        <TextField source="login" label="Login" />
      </Datagrid>
    </List>
  );
};

export const UsersCreate = (props) => {
  const choices = [
    { id: 'ADMIN', name: 'ADMIN'},
    { id: 'ANALYST', name: 'ANALYST' },
    { id: 'USER', name: 'USER' }
  ];

  return (
    <Create {...props} title="Nuevo usuario" >
      <SimpleForm>
        <TextInput source="full_name" label="Nombre completo" />
        <TextInput source="login" label="Login" />
        <PasswordInput source="password" label="Contraseña" />
        <SelectInput source="role" choices={choices} optionText="name" optionValue='name'label="Rol"/>
      </SimpleForm>
    </Create>
  );
};
