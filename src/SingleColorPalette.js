import React, { Component } from 'react';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    //add shades to the instance of class because shades never change, they are always the same shades of a certain color => do not need state anymore
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    console.log(this._shades);
  }

  state = {
    format: 'hex',
  };

  //copy from Palette.js
  changeFormat = (val) => {
    this.setState({ format: val });
  };

  gatherShades = (palette, colorToFilter) => {
    //find all the color in the palette that match the "id of color
    let shades = [];
    let allColors = palette.colors;

    //allColors có dạng {100: [], 200: []...900: []} => tìm màu eggplant trong 100, 200...900
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilter)
      );
    }
    return shades.slice(1); //ko cần shade 50 vì nó là màu trắng
  };

  render() {
    const { format } = this.state;
    const { paletteName, emoji, id } = this.props.palette;
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        showFullPalette={false}
      />
      //showLink: ở ColorBox thì có <Link>More</Link>, ở đây dùng lại ColorBox component nhưng mà ko cần link nữa => thêm 1 prop là showLink
    ));
    return (
      <div className='SingleColorPalette Palette'>
        <Navbar handleChange={this.changeFormat} showingAllColors={false} />
        <h1>Single Color Palette</h1>
        <div className='Palette-colors'>
          {colorBoxes}
          <div className='go-back ColorBox'>
            <Link to={`/palette/${id}`} className='back-button'>
              GO BACK
            </Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default SingleColorPalette;
