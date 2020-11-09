import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { MenuItemLink, getResources, Responsive  } from 'react-admin';
import Badge from '@material-ui/core/Badge';
import { withRouter } from 'react-router-dom';
import isEmpty from 'is-empty';

import DashboardIcon from '@material-ui/icons/Dashboard';

const Menu = ({ resources, onMenuClick }) => {
  return (
    <>
      <MenuItemLink
        to="/home"
        primaryText="Inicio"
        onClick={onMenuClick}
        leftIcon={<DashboardIcon />}
      />

      {
        resources.map(resource => (
          <MenuItemLink
            key={resource.name}
            to={`/${resource.name}`}
            primaryText={resource.options.label}
            leftIcon={resource.icon}
            onClick={onMenuClick}
          />
        ))
      }
    </>
  );
}

const mapStateToProps = state => ({
  resources: getResources(state),
});

export default withRouter(connect(mapStateToProps)(Menu));
