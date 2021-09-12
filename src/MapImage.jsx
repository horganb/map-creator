import React, { useEffect, useRef, useState } from 'react';
import { getImageUrl } from './dataAccess/googleCloudUpload';
import { generateId, getPosition } from './utils';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import { CircularProgress } from '@material-ui/core';
import { StyledPin, MapImg } from './styles';

const MapImage = ({
  isEditor,
  pageControls,
  selectedPin,
  setSelectedPin,
  contentRef,
}) => {
  const { imageId, pins, setPins } = pageControls;

  const [imagePosition, setImagePosition] = useState();
  const [imageLoading, setImageLoading] = useState(true);

  const pinRefs = useRef({});
  const imageRef = useRef();
  const dragging = useRef(false);

  const imageSrc = imageId && getImageUrl(imageId);

  useEffect(() => {
    setImageLoading(true);
  }, [imageSrc]);

  useEffect(() => {
    if (!imageLoading) {
      updateImagePosition();
    }
  }, [imageLoading]);

  const updateImagePosition = () => {
    if (imageRef.current) {
      const { offsetLeft, offsetTop, width, height } = imageRef.current;
      setImagePosition({ offsetLeft, offsetTop, width, height });
    }
  };

  // When the content is resized, recalculate image dimensions and position
  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver(() => {
      updateImagePosition();
    }).observe(contentRef.current);
    return () => {
      observer?.disconnect();
    };
  }, [contentRef.current, imageRef.current]); // eslint-disable-line react-hooks/exhaustive-deps

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
    const { x: relativeX, y: relativeY } = getRelativeCoords(
      mouseEvent,
      imageRef.current
    );
    const x = relativeX / imageRef.current.width;
    const y = relativeY / imageRef.current.height;
    return { x, y };
  };

  /** Reverse of getPinCoords */
  const getPinLocation = pinCoords => {
    const { left, top } = getPosition(imageRef.current);
    const relativeX = pinCoords.x * imageRef.current.width;
    const relativeY = pinCoords.y * imageRef.current.height;
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
        <StyledPin
          key={pinId}
          style={{
            left: `${pinLeft}px`,
            top: `${pinTop}px`,
            color: isSelected ? '#A9000B' : '#f50057',
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

  return (
    <>
      {!imageLoading && renderPins()}
      {imageLoading && <CircularProgress />}
      <MapImg
        src={imageSrc}
        onClick={onImageClick}
        alt="Map Page"
        ref={imageRef}
        onLoad={() => setImageLoading(false)}
        style={imageLoading ? { display: 'none' } : {}}
      />
    </>
  );
};

export default MapImage;
