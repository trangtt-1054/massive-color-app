import React, { useState, useEffect } from 'react';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: 'flex',
    alignItems: 'center'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  buttons: {
    width: '100%',
  },
  button: {
    width: '50%'
  }
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(props.palettes[0].colors);
  //const [newColorName, setNewColorName] = useState('');
  //const [newPaletteName, setNewPaletteName] = useState('');
  const { palettes, maxColors } = props;
  const paletteFull = colors.length >= maxColors;

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addColor = (newColor) => {
    setColors([...colors, newColor]);
    //setNewColorName('');
  };

  // const handleNewPaletteNameChange = (e) => {
  //   setNewPaletteName(e.target.value);
  // };

  const savePalette = (palettename) => {
    //let name = newPaletteName;
    const newPalette = {
      id: palettename.toLowerCase().replace(/ /g, '-'),
      paletteName: palettename,
      colors: colors,
    };
    props.savePalette(newPalette);
    props.history.push('/');
  };

  const deleteColor = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  const clearColor = () => {
    setColors([]);
  };

  const addRandomColor = () => {
    const allColors = props.palettes.map((palette) => palette.colors).flat();
    var randomIndex = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[randomIndex];
    setColors([...colors, randomColor]);
  };

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        //classes={classes}
        palettes={palettes}
        setOpen={setOpen}
        colors={colors}
        savePalette={savePalette}
      />
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
        <Typography variant='h4' gutterBottom>Trang's New Palette</Typography>
        <div className={classes.buttons}>
          <Button variant='contained' color='secondary' onClick={clearColor} className={classes.button}>
            Clear Palette
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={addRandomColor}
            disabled={paletteFull}
            className={classes.button}
          >
            Random Color
          </Button>
        </div>
        <ColorPickerForm
          paletteFull={paletteFull}
          addColor={addColor}
          colors={colors}
        />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          deleteColor={deleteColor}
          axis='xy'
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}

PersistentDrawerLeft.defaultProps = {
  maxColors: 20,
};
