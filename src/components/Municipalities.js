import * as React from "react";
import { 
  List, 
  NumberField,
  Datagrid, 
  TextField
} from 'react-admin';

const Title = ({ record }) => {
  return <span>{record ? `${record.name}` : ''}</span>;
}

export const MunicipalityList = (props) => {
  return (
    <List 
      {...props}
      title="Municipios"
      bulkActionButtons={false}
      actions={null}
    >
      <Datagrid>
        <TextField label="Municipio" source="name" />
        <NumberField label="Electores" source="totalElectors" />
        <TextField label="Votantes" source="totalVotes" />
      </Datagrid>
    </List>
  );
};
