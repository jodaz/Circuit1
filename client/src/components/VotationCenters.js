import * as React from "react";
import { 
  List, 
  Datagrid, 
  TextField,
  SimpleForm,
  TextInput,
  Create,
  useMutation,
  Button
} from 'react-admin';

const VoteButton = ({ record }) => {
    const [approve, { loading }] = useMutation({
        type: 'update',
        resource: 'votation-centers',
        payload: { id: record.id, data: {} }
    });

    return <Button label="Approve" onClick={approve} disabled={loading} />;
};

export const VotationCentersList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="name" />
      <TextField source="votes" />
      <VoteButton />
    </Datagrid>
  </List>
);

export const VotationCentersCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);
