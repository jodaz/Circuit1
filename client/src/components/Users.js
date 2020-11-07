import * as React from "react";
import { 
  List, 
  Datagrid, 
  TextField,
  Create,
  SimpleForm,
  TextInput,
  DeleteButton
} from 'react-admin';
import { isEmpty } from '../utils';
import { useSelector } from 'react-redux';

export const UsersList = (props) => {
  const user = useSelector(store => store.user);

  return (
    <List 
      {...props}
      title="Usuarios"
      bulkActionButtons={false}
    >
      <Datagrid>
        <TextField source="full_name" label="Nombre completo"/>
        <TextField source="login" label="Login" />
        { !isEmpty(user) && <DeleteButton /> }
      </Datagrid>
    </List>
  );
};

export const UsersCreate = (props) => (
  <Create {...props} title="Nuevo usuario" >
    <SimpleForm>
      <TextInput source="full_name" label="Nombre completo" />
      <TextInput source="login" label="Login" />
      <TextInput source="password" label="Contraseña" />
    </SimpleForm>
  </Create>
);
