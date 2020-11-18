import * as React from "react";
import { useState, useEffect } from 'react';
import { 
  List, 
  Loading,
  Edit,
  SelectInput,
  NumberField,
  Datagrid, 
  TextField,
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
} from 'react-admin';
import Actions from './Actions';
import ModuleActions from './ModuleActions';
import { fetchUsers } from '../fetch';
import { useSelector } from 'react-redux';
import Filter from './Filter';

const Title = ({ record }) => {
  return <span>{record ? `${record.name}` : ''}</span>;
}

const validateVotationCenter = (values) => {
  const error = {};

  if (!values.name) {
    error.name = 'Ingrese el name del centro de votación';
  }
  if (!values.municipality) {
    error.municipality = 'Ingrese el municipio';
  }
  if (!values.parish) {
    error.parish = 'Ingrese el name de la parroquia';
  }
  if (!values.user) {
    error.user = 'Seleccione un usuario responsable del centro.';
  }
  if (!values.electors) {
    error.electors = 'Ingrese el número de electores esperados.';
  }

  return error;
}

export const VotationCentersList = (props) => {
  const user = useSelector(store => store.user.user);

  return (
    <List 
      {...props}
      title="Centros de votación"
      bulkActionButtons={false}
      actions={
        <ModuleActions
          shouldCreate={(user.role === 'ADMIN')}
        />
      }
      filters={<Filter defaultfilter='name' />}
    >
      <Datagrid>
        <TextField label="Nombre" source="name" />
        <TextField label="Municipio" source="municipality" />
        <TextField label="Parroquia" source="parish" />
        <TextField label="Votos" source="votes" />
        <NumberField label="Electores" source="electors" />
        <TextField label="Responsable" source="user.full_name" />
        {
          (user.role === 'ADMIN') &&
          <Actions {...props} shouldEdit /> 
        }
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
      <SimpleForm validate={validateVotationCenter} redirect='list' >
        <TextInput source="name" label="Nombre" />
        <TextInput source="municipality" label="Municipio" />
        <TextInput source="parish" label="Parroquia" />
        <NumberInput source='electors' label="Electores" min={1}/>
        <SelectInput
          source="user"
          choices={users}
          optionText="full_name"
          optionValue='id'
          label="Usuario responsable"
        />
      </SimpleForm>
    </Create>
  );
};

export const VotationCentersEdit = (props) => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const { response } = await fetchUsers();

    setUsers(response.data);
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <Edit {...props} title={<Title />}>
      <SimpleForm validate={validateVotationCenter}>
        <TextInput source="name" label="Nombre" />
        <TextInput source="municipality" label="Municipio" />
        <TextInput source="parish" label="Parroquia" />
        <NumberInput source='electors' label="Electores" min={1}/>
        <SelectInput
          source="user"
          choices={users}
          optionText="full_name"
          optionValue='id'
          label="Usuario responsable"
          initialValue={'user'}
        />
      </SimpleForm>
    </Edit>
  );
}
