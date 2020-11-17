import * as React from "react";
import {
  Filter,
  TextInput
} from 'react-admin';

const CustomFilter = (props) => { 
  const {
    defaultfilter
  } = props;

  return (
    <Filter {...props}>
      <TextInput label="Buscar" source={defaultfilter} alwaysOn />
    </Filter>
  );
}

export default CustomFilter;
