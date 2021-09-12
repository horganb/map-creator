import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import { v4 as generateId } from 'uuid';
import { getImageUrl } from './dataAccess/googleCloudUpload';

export const getPosition = el => {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
};

/** A page of a map. */
const MapPage = ({ pageControls, isEditor }) => {
  const { imageId, pins, setPins } = pageControls;

  const [selectedPin, setSelectedPin] = useState();
  const [imagePosition, setImagePosition] = useState();

  const pinRefs = useRef({});
  const contentRef = useRef();
  const imageRef = useRef();
  const dragging = useRef(false);

  const image = imageRef.current;
  const content = contentRef.current;

  const updateImagePosition = useCallback(() => {
    if (image) {
      const { offsetLeft, offsetTop, width, height } = image;
      setImagePosition({ offsetLeft, offsetTop, width, height });
    }
  }, [image]);

  // When the content is resized, recalculate image dimensions and position
  useEffect(() => {
    if (!content) return;
    const observer = new ResizeObserver(() => {
      updateImagePosition();
    }).observe(content);
    return () => {
      observer?.disconnect();
    };
  }, [content, updateImagePosition]);

  const onPinClick = pinId => {
    !dragging.current && setSelectedPin(pinId === selectedPin ? null : pinId);
  };

  const addPin = (x, y) => {
    const id = generateId();
    setPins({
      ...pins,
      [id]: { x, y },
    });
  };

  const getRelativeCoords = (mouseEvent, element) => {
    const { left, top } = getPosition(element);
    const x = mouseEvent.pageX - left;
    const y = mouseEvent.pageY - top;
    return { x, y };
  };

  const getPinCoords = mouseEvent => {
    const { x: relativeX, y: relativeY } = getRelativeCoords(mouseEvent, image);
    const x = relativeX / image.width;
    const y = relativeY / image.height;
    return { x, y };
  };

  /** Reverse of getPinCoords */
  const getPinLocation = pinCoords => {
    const { left, top } = getPosition(image);
    const relativeX = pinCoords.x * image.width;
    const relativeY = pinCoords.y * image.height;
    const x = relativeX + left;
    const y = relativeY + top;
    return { x, y };
  };

  const onImageClick = e => {
    if (isEditor) {
      const { x, y } = getPinCoords(e);
      addPin(x, y);
    }
  };

  const onPinRightClick = (pinId, e) => {
    if (isEditor) {
      e.preventDefault();
      const { [pinId]: _, ...otherPins } = pins;
      setPins(otherPins);
      setSelectedPin();
    }
  };

  const renderPins = () =>
    imagePosition &&
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

      const modifyPin = (modifications, persist = true) => {
        setPins(
          {
            ...pins,
            [pinId]: {
              ...pins[pinId],
              ...modifications,
            },
          },
          persist
        );
      };

      let newPinPosition = {};

      const startDrag = e => {
        const { clientX: startX, clientY: startY } = e;
        document.onmousemove = e => {
          dragging.current = true;
          const xDiff = e.clientX - startX;
          const yDiff = e.clientY - startY;
          const { x: rawX, y: rawY } = getPinLocation({ x, y });
          const coordObject = {
            pageX: rawX + xDiff,
            pageY: rawY + yDiff,
          };
          const { x: finalX, y: finalY } = getPinCoords(coordObject);
          newPinPosition = { x: finalX, y: finalY };
          modifyPin(newPinPosition, false);
        };
        document.onmouseup = e => {
          modifyPin(newPinPosition, true);
          document.onmousemove = null;
          document.onmouseup = null;
          setTimeout(() => {
            dragging.current = false;
          }, 0);
        };
      };

      const {
        offsetLeft,
        offsetTop,
        width: imageWidth,
        height: imageHeight,
      } = imagePosition;

      const pinLeft = offsetLeft + x * imageWidth;
      const pinTop = offsetTop + y * imageHeight;

      return (
        <AddCircleIcon
          className="pin"
          key={pinId}
          style={{
            left: `${pinLeft}px`,
            top: `${pinTop}px`,
            color: isSelected ? 'rgb(61, 161, 143)' : 'rgb(37, 247, 209)',
            transform: `translateX(-50%) translateY(-50%)${
              isSelected ? 'scale(1.3)' : 'scale(1)'
            }`,
          }}
          onClick={() => onPinClick(pinId)}
          onContextMenu={e => onPinRightClick(pinId, e)}
          ref={refCallback}
          onMouseDown={startDrag}
        />
      );
    });

  const pinData = pins[selectedPin];

  return (
    <>
      <div className="content" ref={contentRef}>
        {renderPins()}
        {imageId ? (
          <img
            src={imageId && getImageUrl(imageId)}
            onClick={onImageClick}
            className="map-page-image"
            alt="Map Page"
            ref={imageRef}
            onLoad={updateImagePosition}
          />
        ) : (
          <div ref={imageRef}>
            Here's how to get started creating your map:
            <br />
            <br />
            1. Choose an image using the upload button above
            <br />
            2. Click on the image to add tags
            <br />
            3. Click on the tags to edit them
          </div>
        )}
      </div>
      <div className="footer">
        <PinCard
          pin={pinData}
          onClose={() => setSelectedPin()}
          setPin={newData => {
            setPins({
              ...pins,
              [selectedPin]: newData,
            });
          }}
          isEditor={isEditor}
        />
      </div>
    </>
  );
};

MapPage.propTypes = {
  isEditor: PropTypes.bool,
};

MapPage.defaultProps = {
  isEditor: true,
};

export default MapPage;

const PinCard = ({ pin, setPin, onClose, isEditor }) => {
  const { title, description } = pin || {};

  const cardTitle = isEditor ? (
    <TextField
      className="title-field"
      label="Item Title"
      value={title || ''}
      onChange={e => setPin({ ...pin, title: e.target.value })}
    />
  ) : (
    <h5 className="desc-header">{title}</h5>
  );

  const cardContent = isEditor ? (
    <TextField
      className="body-field"
      label="Item Description"
      value={description || ''}
      onChange={e => setPin({ ...pin, description: e.target.value })}
      variant="outlined"
      multiline
      rows={3}
    />
  ) : (
    <p className="desc-body">{description}</p>
  );

  return (
    <Card
      className="description-card"
      style={!pin ? { opacity: 0 } : { opacity: 1 }}
    >
      <CardHeader
        title={cardTitle}
        action={
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
      />
      <CardContent>{cardContent}</CardContent>
    </Card>
  );
};
