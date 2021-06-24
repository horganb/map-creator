import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { mapsUrl } from './Home';

const usePersistedState = (defaultValue, path) => {
  const [value, setValue] = useState(defaultValue);
  const { mapId } = useParams();

  const updateMap = (updates, method = UpdateMethods.SET) => {
    const updateObject = {
      [method]: updates,
    };
    axios
      .put(`${mapsUrl}/maps/${mapId}`, updateObject)
      .then(() => {})
      .catch(e => {
        console.error(e);
      });
  };

  const updateValue = (newValue, persist = true) => {
    setValue(newValue);
    if (persist) {
      updateMap({
        [path]: newValue,
      });
    }
  };

  return [value, updateValue];
};

export default usePersistedState;

const UpdateMethods = {
  SET: '$set',
  UNSET: '$unset',
};
