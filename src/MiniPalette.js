import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';

const MiniPalette = (props) => {
  const {
    classes,
    paletteName,
    emoji,
    colors,
    handleClick,
    deletePalette,
    id,
  } = props; //vì wrap withStyles nên props sẽ có thêm 1 cái là classes, trong classes thì có các classes đã define ở trên, for this component only
  const miniColorBoxes = colors.map((color) => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    ></div>
  ));

  const handleDelete = (e) => {
    e.stopPropagation();
    //lấy id ở đâu? phải pass id từ PaletteList
    deletePalette(id);
  };

  return (
    <div className={classes.root} onClick={handleClick}>
      <DeleteIcon
        className={classes.deleteIcon}
        style={{ transition: 'all 0.3s ease-in-out' }}
        onClick={handleDelete}
      />
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
};

export default withStyles(styles)(MiniPalette);
