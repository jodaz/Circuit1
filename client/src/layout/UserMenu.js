import React, { forwardRef } from "react";
import { AppBar, UserMenu, MenuItemLink  } from 'react-admin';
import LogoutButton from './LogOut';
// Icons
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const CustomUserMenu = () => 
  <UserMenu logout={<LogoutButton />} />;

export default CustomUserMenu;
