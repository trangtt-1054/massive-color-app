import React, { useState, useEffect } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { Switch, Route } from 'react-router-dom';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));

  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  const findPalette = (id) => {
    return palettes.find((palette) => palette.id === id);
  };

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };

  const syncLocalStorage = () => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes));
  };

  useEffect(() => {
    syncLocalStorage();
  }, [palettes]);

  return (
    <Switch>
      <Route
        exact
        path='/palette/new'
        render={(routeProps) => (
          <NewPaletteForm
            palettes={palettes}
            savePalette={savePalette}
            {...routeProps}
          />
        )}
      />
      <Route
        exact
        path='/'
        render={(routeProps) => (
          <PaletteList palettes={palettes} {...routeProps} />
        )}
      />
      <Route
        exact
        path='/palette/:id'
        render={(routeProps) => (
          <Palette
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
      <Route
        exact
        path='/palette/:paletteId/:colorId'
        render={(routeProps) => (
          <SingleColorPalette
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(
              findPalette(routeProps.match.params.paletteId)
            )}
          />
        )}
      />
    </Switch>
    // <div>
    //   <Palette palette={generatePalette(seedColors[4])} />
    // </div>
  );
}

export default App;
