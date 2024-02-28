import React, { useState } from "react";
import { Button, Menu, MenuItem, Typography, styled } from "@mui/material";
import { User } from "../../../types";
import { useAppDispatch } from "../../../app/hooks";
import { logoutUser } from "../../../features/users/usersSlice";
import { NavLink } from "react-router-dom";

interface Props {
  user: User;
}

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        Hello, {user.username}
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
            <Link to="/trackHistory">History</Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
