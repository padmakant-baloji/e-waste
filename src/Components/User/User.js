import {
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import { Redirect } from "react-router-dom";

const User = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [isLogout, setIsLogout] = useState(false);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");

    handleClose();
    setIsLogout(true);
  };

  const handleToggle = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  // function handleListKeyDown(event) {
  //     if (event.key === 'Tab') {
  //         event.preventDefault();
  //         setOpen(false);
  //     }
  // }

  // return focus to the button when we transitioned from !open -> open
  // const prevOpen = React.useRef(open);
  // useEffect(() => {
  //     if (prevOpen.current === true && open === false) {
  //         anchorRef.current.focus();
  //     }

  //     prevOpen.current = open;
  // }, [open]);

  if (isLogout) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <PersonRoundedIcon fontSize="large" style={{ color: "#fff" }} />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default User;
