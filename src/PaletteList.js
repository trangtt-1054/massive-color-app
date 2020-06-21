import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
  //đối với những interactive content, bên trong có nhiều component khác (như colorBox) thì ko nên dùng Link mà dùng History.push
  goToPalette = (id) => {
    this.props.history.push(`/palette/${id}`);
  };

  render() {
    const { palettes, classes, deletePalette } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>Trang's Colors</h1>
            <Link to='/palette/new'>Create Palette</Link>
          </nav>
          <div className={classes.palettes}>
            {palettes.map((palette) => (
              <MiniPalette
                {...palette}
                //make it arrow function because WE NEED TO PASS IN THE ID
                handleClick={() => this.goToPalette(palette.id)}
                deletePalette={deletePalette}
                key={palette.id}
                id={palette.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
