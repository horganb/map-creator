import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import PinCard from './PinCard';
import MapImage from './MapImage';
import { MapPageContent, PinCardWrapper } from './styles';

/** A single page of a map. */
const MapPage = ({ pageControls, isEditor }) => {
  const { imageId, pins, setPins } = pageControls;

  const [selectedPin, setSelectedPin] = useState();

  const contentRef = useRef();

  const pinData = pins[selectedPin];

  return (
    <>
      <MapPageContent ref={contentRef}>
        {imageId ? (
          <MapImage
            isEditor={isEditor}
            pageControls={pageControls}
            selectedPin={selectedPin}
            setSelectedPin={setSelectedPin}
            contentRef={contentRef}
          />
        ) : (
          <div>
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
      </MapPageContent>
      <PinCardWrapper>
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
      </PinCardWrapper>
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
