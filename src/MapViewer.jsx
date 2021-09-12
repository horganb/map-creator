import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { Button, CircularProgress, AppBar } from '@material-ui/core';
import { uploadFile } from './dataAccess/googleCloudUpload';
import MapPage from './MapPage';
import useMap from './dataAccess/hooks/useMap';
import { UpdateMethods } from './dataAccess/utils';
import {
  AddImageIcon,
  EvenToolbar,
  HiddenFileInput,
  LeftPageArrow,
  MapNameField,
  PaddedButton,
  PaddedToggleButton,
  PageList,
  PageToolbar,
  RightPageArrow,
  VerticalLayoutWrapper,
  ViewerHint,
} from './styles';
import { generateId } from './utils';
import { getInitialPageData } from './dataAccess/initialData';
import { authToken } from './dataAccess/mapServer';

/** A component for editing or viewing a single map. */
const MapViewer = ({ isEditor }) => {
  const { mapId } = useParams();
  const history = useHistory();

  const {
    mapData,
    mapName,
    setMapName,
    pageOrder,
    updatePageOrder,
    getPageControls,
    error: loadError,
    loading,
  } = useMap(mapId);

  const authError = isEditor && !loading && authToken !== mapData?.owner;
  const error = loadError || authError;

  const [currentPage, setCurrentPage] = useState();

  const goHome = () => {
    history.push('/');
  };

  const viewMap = () => {
    history.push(`/maps/${mapId}/view`);
  };

  const displayData = !loading && !error;

  useEffect(() => {
    if (displayData && !currentPage) {
      setCurrentPage(pageOrder[0]);
    }
  }, [displayData, currentPage, pageOrder]);

  const handlePageChange = (e, id) => {
    setCurrentPage(id);
  };

  const addPage = () => {
    const pageId = generateId();
    const pageData = getInitialPageData();
    const { setPageData } = getPageControls(pageId);

    setPageData(pageData);
    updatePageOrder(UpdateMethods.PUSH, pageId);
    setCurrentPage(pageId);
  };

  const pageButtons = pageOrder.map((pageId, index) => {
    const { pageName } = getPageControls(pageId); // TODO: use custom page names, and add rename feature
    return (
      <PaddedToggleButton key={pageId} value={pageId}>
        {`Page ${index + 1}`}
      </PaddedToggleButton>
    );
  });

  isEditor &&
    pageButtons.push(
      <PaddedToggleButton
        key="add"
        value="add"
        onClick={e => {
          e.preventDefault();
          addPage();
        }}
      >
        +
      </PaddedToggleButton>
    );

  const onChooseFile = e => {
    const { setImageId } = getPageControls(currentPage);

    uploadFile(e.target.files)
      .then(fileId => {
        setImageId(fileId);
      })
      .catch(e => {
        console.error(e);
      });
  };

  const header = (
    <>
      {isEditor && (
        <AppBar position={'static'}>
          <EvenToolbar>
            <>
              <PaddedButton
                variant="contained"
                color="secondary"
                onClick={goHome}
              >
                Back to Home
              </PaddedButton>
            </>
            {displayData && (
              <>
                <MapNameField
                  label="Map Name"
                  value={mapName}
                  onChange={e => setMapName(e.target.value)}
                  variant="outlined"
                />
                <div>
                  <HiddenFileInput
                    type="file"
                    id="file"
                    accept={'image/*'}
                    onChange={onChooseFile}
                  />
                  <label htmlFor="file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      <AddImageIcon />
                      Upload
                    </Button>
                  </label>
                  <PaddedButton
                    variant="contained"
                    color="primary"
                    onClick={viewMap}
                  >
                    View Map
                  </PaddedButton>
                </div>
              </>
            )}
          </EvenToolbar>
        </AppBar>
      )}
      <PageToolbar>
        <PageList value={currentPage} exclusive onChange={handlePageChange}>
          {pageButtons}
        </PageList>
      </PageToolbar>
      {!isEditor && (
        <ViewerHint>Tap on an item to learn more about it.</ViewerHint>
      )}
    </>
  );

  const getContent = () => {
    const pageControls = getPageControls(currentPage);
    return (
      <>
        {pageOrder.length > 1 && (
          <>
            <LeftPageArrow
              onClick={() => {
                const currentPageIndex = pageOrder.indexOf(currentPage);
                if (currentPageIndex === 0) {
                  setCurrentPage(pageOrder[pageOrder.length - 1]);
                } else {
                  setCurrentPage(pageOrder[currentPageIndex - 1]);
                }
              }}
            />
            <RightPageArrow
              onClick={() => {
                const currentPageIndex = pageOrder.indexOf(currentPage);
                if (currentPageIndex === pageOrder.length - 1) {
                  setCurrentPage(pageOrder[0]);
                } else {
                  setCurrentPage(pageOrder[currentPageIndex + 1]);
                }
              }}
            />
          </>
        )}
        <MapPage pageControls={pageControls} isEditor={isEditor} />
      </>
    );
  };

  return (
    <VerticalLayoutWrapper>
      {header}
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <p>Could not load the requested map!</p>
      ) : (
        getContent()
      )}
    </VerticalLayoutWrapper>
  );
};

MapViewer.propTypes = {
  /** Whether the map can be edited. */
  isEditor: PropTypes.bool,
};

MapViewer.defaultProps = {
  isEditor: true,
};

export default MapViewer;
