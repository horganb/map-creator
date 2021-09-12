import React from 'react';
import { useHistory } from 'react-router-dom';
import mapServer from './dataAccess/mapServer';
import useObject from './dataAccess/hooks/useObject';
import { MapButton, MapListContainer } from './styles';
import { getInitialMapData } from './dataAccess/initialData';
import { CircularProgress } from '@material-ui/core';

/** A list of the current user's maps. */
const MapList = () => {
  const history = useHistory();

  const { loading, error, data: maps = [] } = useObject('maps');

  const goToMap = mapId => {
    history.push(`/maps/${mapId}`);
  };

  const mapLinks = maps.map(({ name, _id }) => {
    return (
      <MapButton key={_id} variant="contained" onClick={() => goToMap(_id)}>
        {name}
      </MapButton>
    );
  });

  const newMap = () => {
    mapServer
      .post('maps', getInitialMapData())
      .then(({ data }) => {
        goToMap(data);
      })
      .catch(e => {
        console.error(e);
      });
  };

  return (
    <MapListContainer>
      <MapButton variant="contained" color="primary" onClick={newMap}>
        Create New Map
      </MapButton>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <p>Could not load maps!</p>
      ) : mapLinks.length === 0 ? (
        <div>To get started, just click "Create New Map"!</div>
      ) : (
        mapLinks
      )}
    </MapListContainer>
  );
};

export default MapList;
