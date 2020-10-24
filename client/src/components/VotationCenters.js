import * as React from "react";
import { 
  List, 
  Datagrid, 
  TextField,
  SimpleForm,
  TextInput,
  Create,
  useMutation,
  Button,
  CreateButton
} from 'react-admin';

const VoteButton = ({ record }) => {
  const [approve, { loading }] = useMutation({
    type: 'update',
    resource: 'votation-centers',
    payload: { id: record.id, data: {} }
  });

  return <Button label="Approve" onClick={approve} disabled={loading} />;
};

export const VotationCentersList = (props) => {
  return (
    <List 
      {...props}
      actions={<CreateButton />}
      title='Centros de votación'
    >
      <Datagrid>
        <TextField label="Nombre" source="name" />
        <TextField label="Nº de votos" source="votes" />
      </Datagrid>
    </List>
  );
};

export const VotationCentersCreate = (props) => (
  <Create {...props} title="Nuevo centro de votación" >
    <SimpleForm>
      <TextInput source="name" label="Nombre del UBCH" />
      <TextInput source="responsible" label="Nombre y apellidos del jefe de UBCH" />
      <TextInput source="address" label="Dirección del UBCH" />
      <TextInput source="responsible_id" label="Cédula" />
    </SimpleForm>
  </Create>
);
