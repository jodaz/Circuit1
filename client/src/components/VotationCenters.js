import * as React from "react";
import { useState, useEffect } from 'react';
import { 
  List, 
  Loading,
  SelectInput,
  Datagrid, 
  TextField,
  Create,
  SimpleForm,
  TextInput,
  DeleteButton
} from 'react-admin';
import { fetchUsers } from '../fetch';
import { isEmpty } from '../utils';
import { useSelector } from 'react-redux';

export const VotationCentersList = (props) => {
  const user = useSelector(store => store.user);

  return (
    <List 
      {...props}
      title="Centros de votación"
      bulkActionButtons={false}
    >
      <Datagrid>
        <TextField label="Nombre" source="name" />
        <TextField label="Municipio" source="municipality" />
        <TextField label="Parroquia" source="parish" />
        <TextField label="Votos" source="votes" />
        { !isEmpty(user) && <DeleteButton /> }
      </Datagrid>
    </List>
  );
};

export const VotationCentersCreate = (props) => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const { response } = await fetchUsers();

    setUsers(response.data);
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <Create {...props} title="Nuevo centro de votación" >
      <SimpleForm>
        <TextInput source="name" label="Nombre" />
        <TextInput source="municipality" label="Municipio" />
        <TextInput source="parish" label="Parroquia" />
        <SelectInput source="user" choices={users} optionText="full_name" optionValue='id'label="Usuario responsable"/>
      </SimpleForm>
    </Create>
  );
};
