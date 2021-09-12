import { cloneDeep } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import mapServer from '../mapServer';
import { getFieldValue, updateFieldValue, UpdateMethods } from '../utils';

/** Returns read/write controls for a chunk of data. */
const useObject = apiUrl => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mapServer
      .get(apiUrl)
      .then(({ data }) => {
        setError(false);
        setData(data);
      })
      .catch(e => {
        console.error(e);
        setError(true);
      })
      .then(() => {
        setLoading(false);
      });
  }, [apiUrl]);

  const updateData = useCallback(
    (updates, method = UpdateMethods.SET) => {
      const updateObject = {
        [method]: updates,
      };
      return mapServer.put(apiUrl, updateObject);
    },
    [apiUrl]
  );

  /** Returns controls for a specific sub-object. */
  const getProperty = (defaultValue, path) => {
    const value = getFieldValue(data, path) || defaultValue;

    const updateValue = (method, newValue, persist = true) => {
      const oldValue = value;
      setData(oldVal => {
        const newVal = cloneDeep(oldVal);
        updateFieldValue(method, newVal, path, newValue);
        return newVal;
      });
      if (persist) {
        updateData(
          {
            [path]: newValue,
          },
          method
        ).catch(e => {
          console.error(e);
          // Update failed - revert to previous local data
          setData(oldVal => {
            const newVal = cloneDeep(oldVal);
            updateFieldValue(method, newVal, path, oldValue);
            return newVal;
          });
        });
      }
    };

    const setValue = (newValue, persist = true) => {
      updateValue(UpdateMethods.SET, newValue, persist);
    };

    return [value, setValue, updateValue];
  };

  return {
    data,
    updateData,
    getProperty,
    error,
    loading,
  };
};

export default useObject;
