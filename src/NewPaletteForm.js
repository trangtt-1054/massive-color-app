import React, { useState } from "react";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import useStyles from "./styles/NewPaletteFormStyle";
import seedColors from "./seedColors";

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(seedColors[0].colors);
  const { palettes, maxColors } = props;
  const paletteFull = colors.length >= maxColors;

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addColor = newColor => {
    setColors([...colors, newColor]);
  };

  const savePalette = finalPalette => {
    props.savePalette({
      ...finalPalette,
      id: finalPalette.paletteName.toLowerCase().replace(/ /g, "-"),
      colors
    });
    props.history.push("/");
  };

  const deleteColor = colorName => {
    setColors(colors.filter(color => color.name !== colorName));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  const clearColor = () => {
    setColors([]);
  };

  const addRandomColor = () => {
    const allColors = props.palettes.map(palette => palette.colors).flat();
    let randomIndex;
    let randomColor;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      randomIndex = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[randomIndex];
      isDuplicateColor = colors.some(
        // eslint-disable-next-line no-loop-func
        color => color.name === randomColor.name
      );
    }
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
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant='h4' gutterBottom>
            Trang's New Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant='contained'
              color='secondary'
              onClick={clearColor}
              className={classes.button}
            >
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
          [classes.contentShift]: open
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
  maxColors: 20
};
