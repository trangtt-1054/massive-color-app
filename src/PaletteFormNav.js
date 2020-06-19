import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PaletteMetaForm from "./PaletteMetaForm";
import useStyles from "./styles/PaletteFormNavStyles";

const PaletteFormNav = props => {
  const classes = useStyles();
  const [formShowing, setFormShowing] = useState(false);
  const { open, palettes, setOpen, savePalette } = props;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const showForm = () => {
    setFormShowing(true);
    console.log(formShowing);
  };

  const hideForm = () => {
    setFormShowing(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color='default'
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtn}>
          <Link to='/'>
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
            >
              Go Back
            </Button>
          </Link>
          <Button
            variant='contained'
            color='primary'
            onClick={showForm}
            className={classes.button}
          >
            Save Palette
          </Button>
        </div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          palettes={palettes}
          savePalette={savePalette}
          hideForm={hideForm}
        />
      )}
    </div>
  );
};

export default PaletteFormNav;
