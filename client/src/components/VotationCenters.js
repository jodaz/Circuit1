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

export const VotationCentersList = (props) => {
  const user = useSelector(store => store.user);

  return (
    <List 
      {...props}
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

export const VotationCentersCreate = (props) => (
  <Create {...props} title="Nuevo centro de votación" >
    <SimpleForm>
      <TextInput source="name" label="Nombre del UBCH" />
      <TextInput source="responsible" label="Nombre y apellidos del jefe de UBCH" />
      <TextInput source="municipality" label="Municipio" />
      <TextInput source="parish" label="Parroquia" />
      <TextInput source="responsible_id" label="Cédula" />
    </SimpleForm>
  </Create>
);
