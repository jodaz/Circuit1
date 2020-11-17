import * as React from "react";
import { 
  List, 
  Datagrid, 
  Pagination,
  TextField,
} from 'react-admin';

const VotersPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

export const VotersList = (props) => {
  return (
    <>
      <List 
        {...props}
        actions={null}
        title='Votantes'
        pagination={<VotersPagination />}
        bulkActionButtons={false}
      >
        <Datagrid>
          <TextField label="Nombre" source="full_name" />
          <TextField label="Cédula" source="personId" />
        </Datagrid>
      </List>
    </>
  );
};
