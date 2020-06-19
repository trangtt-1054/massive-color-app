import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/styles';

const styles = {
  picker: {
    width: '100% !important',
    marginTop: '2rem'
  },
  addColor: {
    width: '100%',
    padding: '1rem',
    marginTop: '1rem',
    fontSize: '2rem'
  },
  colorNameInput: {
    width: '100%',
    height: 70,
  }
}

const ColorPickerForm = (props) => {
  const [currentColor, setCurrentColor] = useState('teal');
  const [newColorName, setNewColorName] = useState('');
  const { paletteFull, colors, addColor, classes } = props;

  const updateCurrentColor = (newColor) => {
    setCurrentColor(newColor.hex);
  };

  const handleColorNameChange = (e) => {
    setNewColorName(e.target.value);
  };

  const handleSubmit = () => {
    const newColor = {
      color: currentColor,
      name: newColorName,
    };
    addColor(newColor);
    setNewColorName('');
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
  }, [colors]);
  //nếu dependencies là empty array thì effect chỉ chạy 1 lần lúc component mount

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorUnique', (value) => {
      return colors.every(({ color }) => color !== currentColor);
    });
  }, [colors, currentColor]);

  return (
    <div>
      <ChromePicker
        color={currentColor}
        onChangeComplete={(newColor) => updateCurrentColor(newColor)}
        className={classes.picker}
      />
      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator
        placeholder='Color Name'
          className={classes.colorNameInput}
          variant='filled'
          margin='normal'
          name='newColorName'
          value={newColorName}
          onChange={handleColorNameChange}
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={[
            'this field is required',
            'Name taken',
            'Color already exists',
          ]}
        />
        <Button
          variant='contained'
          color='primary'
          style={{ backgroundColor: paletteFull ? 'grey' : currentColor }}
          type='submit'
          disabled={paletteFull}
          className={classes.addColor}
        >
          {paletteFull ? 'Palette Full!' : 'Add Color'}
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default withStyles(styles)(ColorPickerForm);
