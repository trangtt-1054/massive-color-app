import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const PaletteMetaForm = props => {
  const [open, setOpen] = React.useState(false);
  const [newPaletteName, setNewPaletteName] = useState("");
  const { palettes, savePalette } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewPaletteNameChange = e => {
    setNewPaletteName(e.target.value);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Choose A Palette Name</DialogTitle>
      <ValidatorForm onSubmit={() => savePalette(newPaletteName)}>
        <DialogContent>
          <DialogContentText>
            Enter a palette name. Make sure it is unique.
          </DialogContentText>
          <TextValidator
            value={newPaletteName}
            label='Palette Name'
            name='newPaletteName'
            fullWidth
            margin='normal'
            onChange={handleNewPaletteNameChange}
            validators={["required", "isPaletteNameUnique"]}
            errorMessages={["Enter Palette Name", "Name already taken"]}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button variant='contained' color='primary' type='submit'>
            Save Palette
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
};

export default PaletteMetaForm;
