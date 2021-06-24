import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@material-ui/core';

// export const mapsUrl = 'http://localhost:3000';
// export const mapsUrl = 'http://192.168.37.94:3000';
export const mapsUrl = 'https://map-creator-backend.herokuapp.com';

const initialMapData = {
  name: 'Untitled Map',
  image: {
    url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
  },
  pins: {},
};

const Home = () => {
  const [maps, setMaps] = useState([]);
  const history = useHistory();

  // On initial load, load the list of maps.
  useEffect(() => {
    axios
      .get(`${mapsUrl}/maps`)
      .then(({ data }) => {
        setMaps(data);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

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
    axios
      .post(`${mapsUrl}/maps`, initialMapData)
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
          Create New
        </Button>
        {mapLinks}
      </header>
    </div>
  );
};

export default Home;
