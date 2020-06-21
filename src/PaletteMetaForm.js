import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

const PaletteMetaForm = (props) => {
  const [stage, setStage] = React.useState('form');
  const [newPaletteName, setNewPaletteName] = useState('');
  const { palettes, savePalette, hideForm } = props;

  const handleNewPaletteNameChange = (e) => {
    setNewPaletteName(e.target.value);
  };

  const showEmojiPicker = () => {
    setStage('emoji');
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  }, []);

  const saveFinalPalette = (emojiObject) => {
    savePalette({
      paletteName: newPaletteName,
      emoji: emojiObject.native,
    });
  };

  return (
    <div>
      <Dialog open={stage === 'emoji'} onClose={hideForm}>
        <DialogTitle id='form-dialog-title'>Pick an Emoji</DialogTitle>
        <Picker onSelect={saveFinalPalette} title='Pick palette emoji' />
      </Dialog>
      <Dialog
        open={stage === 'form'}
        onClose={hideForm}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Choose A Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
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
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['Enter Palette Name', 'Name already taken']}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm} color='primary'>
              Cancel
            </Button>
            <Button variant='contained' color='primary' type='submit'>
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};

export default PaletteMetaForm;
