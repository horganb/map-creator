import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import mapServer from './dataAccess/mapServer';
import useObject from './dataAccess/hooks/useObject';

export const getInitialPageData = () => ({
  name: 'Untitled Page',
  image: {
    id: '0c1de8f8-c585-4d4a-b5b2-75c8632027b6.jpg',
  },
  pins: {},
});

const initialMapData = {
  name: 'Untitled Map',
  pages: {
    order: ['page1'],
    data: {
      page1: getInitialPageData(),
    },
  },
};

const Home = () => {
  const history = useHistory();

  const { data: maps = [] } = useObject('maps');

  const goToMap = mapId => {
    history.push(`/maps/${mapId}`);
  };

  const mapLinks = maps.map(({ name, _id }) => {
    return (
      <Button
        className="map-button"
        key={_id}
        variant="contained"
        onClick={() => goToMap(_id)}
      >
        {name}
      </Button>
    );
  });

  const newMap = () => {
    mapServer
      .post('maps', initialMapData)
      .then(({ data }) => {
        goToMap(data);
      })
      .catch(e => {
        console.error(e);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button
          className="map-button"
          variant="contained"
          color="primary"
          onClick={newMap}
        >
          Create New Map
        </Button>
        {mapLinks}
      </header>
    </div>
  );
};

export default Home;
