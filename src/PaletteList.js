import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteListStyles";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const PaletteList = props => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const { palettes, classes, deletePalette } = props;

  const openDialog = useCallback(id => {
    setOpenDeleteDialog(true);
    setIdToDelete(id);
  }, []);

  const closeDialog = () => {
    setOpenDeleteDialog(false);
    setIdToDelete("");
  };

  //đối với những interactive content, bên trong có nhiều component khác (như colorBox) thì ko nên dùng Link mà dùng History.push
  const goToPalette = useCallback(
    id => {
      props.history.push(`/palette/${id}`);
    },
    [props.history]
  );

  const handleDelete = useCallback(
    idToDelete => {
      deletePalette(idToDelete);
      closeDialog();
    },
    [deletePalette]
  );

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>Trang's Colors</h1>
          <Link to='/palette/new'>Create Palette</Link>
        </nav>
        <TransitionGroup className={classes.palettes}>
          {palettes.map(palette => (
            <CSSTransition key={palette.id} classNames='fade' timeout={500}>
              <MiniPalette
                {...palette}
                //make it arrow function because WE NEED TO PASS IN THE ID
                //handleClick={() => goToPalette(palette.id)}
                handleClick={goToPalette}
                openDialog={openDialog}
                key={palette.id}
                id={palette.id}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Dialog
        open={openDeleteDialog}
        aria-labelledby='delete-dialog-title'
        onClose={closeDialog}
      >
        <DialogTitle id='delete-dialog-title'>Delete Palette?</DialogTitle>
        <List>
          <ListItem button onClick={() => handleDelete(idToDelete)}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Delete' />
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Cancel' />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(PaletteList);
