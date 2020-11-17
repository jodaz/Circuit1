import * as React from "react";
import {
  useMutation,
  useNotify,
  useUpdate,
  useDelete,
  useRedirect,
} from 'react-admin';
import ButtonMenu from './ButtonMenu';
// Icons
import GetAppIcon from '@material-ui/icons/GetApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Menu } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ITEM_HEIGHT = 48;

const ref =  React.createRef();

const MenuActions = props => {
  const { record, role } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="Opciones"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '16ch',
          },
        }}
      >
        <ButtonMenu
          label='Editar'
          icon={< EditIcon />}
          onClick={
            (e) => {
              handleClose();
          }}
          ref={ref}
        />
        <ButtonMenu
          label='Eliminar'
          icon={<DeleteIcon />}
          onClick={
            (e) => {
              handleClose();
          }}
          ref={ref}
        />
      </Menu>
    </div>
  );
};

export default MenuActions;

