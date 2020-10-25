import * as React from "react";
import { 
  List, 
  Datagrid, 
  TextField,
  SimpleForm,
  TextInput,
  Create,
  CreateButton,
  DeleteButton
} from 'react-admin';

export const VotationCentersList = (props) => {
  return (
    <List 
      {...props}
      actions={<CreateButton />}
      title='Centros de votación'
    >
      <Datagrid>
        <TextField label="Nombre" source="name" />
        <TextField label="Municipio" source="municipality" />
        <TextField label="Parroquia" source="parish" />
        <TextField label="Votos" source="votes" />
        <DeleteButton />
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
