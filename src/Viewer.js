import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { mapsUrl } from './Home';
import {
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Popper,
  Fade,
} from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import CloseIcon from '@material-ui/icons/Close';
import usePersistedState from './usePersistedState';

const Viewer = () => {
  const { mapId } = useParams();

  const [imageURL, setImageURL] = usePersistedState('', 'image.url');
  const [mapName, setMapName] = usePersistedState('', 'name');
  const [pins, setPins] = usePersistedState({}, 'pins');

  const [selectedPin, setSelectedPin] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [image, setImage] = useState();

  const pinRefs = useRef({});

  // When map is changed, load in the data
  useEffect(() => {
    if (mapId) {
      setLoading(true);
      axios
        .get(`${mapsUrl}/maps/${mapId}`)
        .then(({ data }) => {
          setError(false);
          const { name, image, pins } = data;
          setImageURL(image.url, false);
          setMapName(name, false);
          setPins(pins, false);
        })
        .catch(e => {
          console.error(e);
          setError(true);
        })
        .then(() => {
          setLoading(false);
        });
    }
  }, [mapId]); // eslint-disable-line react-hooks/exhaustive-deps

  const onPinClick = pinId => {
    setSelectedPin(pinId === selectedPin ? null : pinId);
  };

  const onPinRightClick = (pinId, e) => {
    e.preventDefault();
    const { [pinId]: _, ...otherPins } = pins;
    setPins(otherPins);
    setSelectedPin();
  };

  const renderPins = () =>
    image &&
    Object.keys(pins).map(pinId => {
      const pinData = pins[pinId];
      if (!pinData) return undefined;
      const { x, y } = pinData;
      const isSelected = selectedPin === pinId;

      const refCallback = el => {
        if (pinRefs?.current) {
          pinRefs.current[pinId] = el;
        }
      };

      return (
        <React.Fragment key={pinId}>
          <RoomIcon
            className="pin"
            style={{
              left: `${x * 100}%`,
              top: `${y * 100}%`,
              color: isSelected ? 'yellow' : 'red',
            }}
            onClick={() => onPinClick(pinId)}
            onContextMenu={e => onPinRightClick(pinId, e)}
            ref={refCallback}
          />
          <PinCard
            pin={pinData}
            onClose={() => setSelectedPin()}
            show={isSelected}
            setPin={newData => {
              setPins({
                ...pins,
                [pinId]: newData,
              });
            }}
            anchorEl={pinRefs?.current?.[pinId]}
          />
        </React.Fragment>
      );
    });

  const imageCallback = imageEl => {
    if (imageEl && imageEl !== image) {
      setImage(imageEl);
    }
  };

  const displayData = !loading && !error;

  return (
    <div className="App">
      <header className="App-header">
        <div className="metadata-section">{displayData && mapName}</div>
        {displayData && (
          <div className="image-container">
            {renderPins()}
            <img
              src={imageURL}
              className="App-logo"
              alt="logo"
              ref={imageCallback}
            />
          </div>
        )}
        {loading && <CircularProgress />}
        {error && <p>Could not load the requested map!</p>}
      </header>
    </div>
  );
};

export default Viewer;

const PinCard = ({ x, y, pin, setPin, onClose, show, anchorEl }) => {
  const { title, description, color } = pin;

  return (
    <Popper open={show} anchorEl={anchorEl} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={150}>
          <Card className="description-card">
            <CardHeader
              title={title}
              action={
                <IconButton onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              }
            />
            <CardContent>{description}</CardContent>
          </Card>
        </Fade>
      )}
    </Popper>
  );
};
