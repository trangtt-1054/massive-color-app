import chroma from 'chroma-js';

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const generatePalette = (initialPalette) => {
  let newPalette = {
    paletteName: initialPalette.paletteName,
    id: initialPalette.id,
    emoji: initialPalette.emoji,
    colors: {},
  };

  for (let level of levels) {
    //create new empty array for every level
    newPalette.colors[level] = [];
  }

  for (let color of initialPalette.colors) {
    let scale = generateScale(color.color, 10).reverse();
    // console.log(scale);
    for (let i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, '-'),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace('rgb', 'rgba')
          .replace(')', ',1.0)'),
      });
    }
  }

  return newPalette;
};

const getRange = (hexColor) => {
  const endColor = '#fff';
  //generate an array with 3 color values
  return [
    //take the color, darken it, take the hex value from that, middle value will be hexColor, end value will be endColor. thực ra muốn generate 1 range là [black, color, white] nhưng mà black thì quá đen nên dùng darken của màu gốc
    chroma(hexColor).darken(1.4).hex(),
    hexColor,
    endColor,
  ];
};

const generateScale = (hexColor, numberOfColors) => {
  return chroma.scale(getRange(hexColor)).mode('lab').colors(numberOfColors);
  //lab: lightness ab
  //.colors() will take the scale and generate a number of colors for us, for example 6 colors inside a range
};

export { generatePalette };
