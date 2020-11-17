import * as React from "react";
import { cloneElement, useMemo } from 'react';
import {
  useListContext,
  sanitizeListRestProps,
  TopToolbar,
  CreateButton,
} from 'react-admin';

const ModuleActions = props => {
  const {
    className,
    exporter,
    filters,
    maxResults,
    shouldCreate,
    ...rest
  } = props;
  const {
    currentSort,
    resource,
    displayedFilters,
    filterValues,
    hasCreate,
    basePath,
    selectedIds,
    showFilter,
    total,
  } = useListContext();

  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters && cloneElement(filters, {
        resource,
        showFilter,
        displayedFilters,
        filterValues,
        context: 'button',
      })}
      {shouldCreate && <CreateButton label="Agregar" basePath={basePath}/>}
    </TopToolbar>
  );
};

export default ModuleActions;

