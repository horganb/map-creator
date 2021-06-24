import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { mapsUrl } from './Home';
import {
  Button,
  TextField,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import CloseIcon from '@material-ui/icons/Close';
import { v4 as generateId } from 'uuid';
import usePersistedState from './usePersistedState';

const Editor = () => {
  const { mapId } = useParams();
  const history = useHistory();

  const [imageURL, setImageURL] = usePersistedState('', 'image.url');
  const [mapName, setMapName] = usePersistedState('', 'name');
  const [pins, setPins] = usePersistedState({}, 'pins');

  const [selectedPin, setSelectedPin] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [image, setImage] = useState();

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

  const goHome = () => {
    history.push('/');
  };

  const getPosition = el => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
  };

  const addPin = (x, y) => {
    const id = generateId();
    setPins({
      ...pins,
      [id]: { x, y },
    });
  };

  const onImageClick = e => {
    const { left, top } = getPosition(image);
    const relativeX = e.pageX - left;
    const relativeY = e.pageY - top;
    const xFraction = relativeX / image.width;
    const yFraction = relativeY / image.height;
    addPin(xFraction, yFraction);
  };

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
      const relativeX = x * image.width;
      const relativeY = y * image.height;
      const isSelected = selectedPin === pinId;
      return (
        <React.Fragment key={pinId}>
          <RoomIcon
            className="pin"
            style={{
              left: relativeX,
              top: relativeY,
              color: isSelected ? 'yellow' : 'red',
            }}
            onClick={() => onPinClick(pinId)}
            onContextMenu={e => onPinRightClick(pinId, e)}
          />
          <PinCard
            pin={pinData}
            x={relativeX}
            y={relativeY}
            onClose={() => setSelectedPin()}
            show={isSelected}
            setPin={newData => {
              setPins({
                ...pins,
                [pinId]: newData,
              });
            }}
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
        <div className="metadata-section">
          <Button
            className="return-home"
            variant="contained"
            color="secondary"
            onClick={goHome}
          >
            Back to Home
          </Button>
          {displayData && (
            <>
              <br />
              <TextField
                className="map-name"
                label="Map Name"
                value={mapName}
                onChange={e => setMapName(e.target.value)}
                variant="outlined"
              />
              <br />
              <TextField
                className="image-url"
                label="Image URL"
                value={imageURL}
                onChange={e => setImageURL(e.target.value)}
                variant="filled"
              />
            </>
          )}
        </div>
        {displayData && (
          <div className="image-container">
            {renderPins()}
            <img
              src={imageURL}
              onClick={onImageClick}
              className="App-logo"
              alt="logo"
              ref={imageCallback}
            />
            {/* {renderPinCard()} */}
          </div>
        )}
        {loading && <CircularProgress />}
        {error && <p>Could not load the requested map!</p>}
      </header>
    </div>
  );
};

export default Editor;

const PinCard = ({ x, y, pin, setPin, onClose, show }) => {
  // TODO: use Popper for this?

  const { title, description, color } = pin;
  return (
    <Card
      className="description-card"
      style={{
        left: x,
        top: y,
        opacity: show ? 1 : 0,
        pointerEvents: show ? undefined : 'none',
      }}
    >
      <CardHeader
        title={
          <TextField
            className="title-field"
            label="Item Title"
            value={title}
            onChange={e => setPin({ ...pin, title: e.target.value })}
          />
        }
        action={
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
      />
      <CardContent>
        <TextField
          className="body-field"
          label="Item Description"
          value={description}
          onChange={e => setPin({ ...pin, description: e.target.value })}
          variant="outlined"
          multiline
          rows={3}
        />
      </CardContent>
    </Card>
  );
};
