import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import {
  Button,
  TextField,
  CircularProgress,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { uploadFile } from './dataAccess/googleCloudUpload';
import MapPage from './MapPage';
import { v4 as generateId } from 'uuid';
import { getInitialPageData } from './Home';
import useMap from './dataAccess/hooks/useMap';
import { UpdateMethods } from './dataAccess/utils';
import {
  ArrowForwardIos,
  ArrowBackIos,
  AddPhotoAlternate,
} from '@material-ui/icons';

const Editor = ({ isEditor }) => {
  const { mapId } = useParams();
  const history = useHistory();

  const {
    mapName,
    setMapName,
    pageOrder,
    updatePageOrder,
    getPageControls,
    error,
    loading,
  } = useMap(mapId);

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

  const pageButtons = pageOrder.map(pageId => {
    const { pageName } = getPageControls(pageId);
    return (
      <ToggleButton key={pageId} value={pageId}>
        {pageName}
      </ToggleButton>
    );
  });

  isEditor &&
    pageButtons.push(
      <ToggleButton
        key="add"
        value="add"
        onClick={e => {
          e.preventDefault();
          addPage();
        }}
      >
        +
      </ToggleButton>
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
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <>
              <Button
                className="return-home"
                variant="contained"
                color="secondary"
                onClick={goHome}
              >
                Back to Home
              </Button>
            </>
            {displayData && (
              <>
                <TextField
                  className="map-name"
                  label="Map Name"
                  value={mapName}
                  onChange={e => setMapName(e.target.value)}
                  variant="outlined"
                />
                <div>
                  <input
                    type="file"
                    id="file"
                    accept={'image/*'}
                    onChange={onChooseFile}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      <AddPhotoAlternate style={{ marginRight: '0.5rem' }} />
                      Upload
                    </Button>
                  </label>
                  <Button
                    className="view-map"
                    variant="contained"
                    color="primary"
                    onClick={viewMap}
                  >
                    View Map
                  </Button>
                </div>
              </>
            )}
          </Toolbar>
        </AppBar>
      )}
      <Toolbar style={{ backgroundColor: 'pink' }}>
        <ToggleButtonGroup
          value={currentPage}
          exclusive
          onChange={handlePageChange}
          style={{ display: 'flex', margin: '8px 0', overflow: 'auto' }}
        >
          {pageButtons}
        </ToggleButtonGroup>
      </Toolbar>
      {!isEditor && (
        <Toolbar style={{ justifyContent: 'center' }}>
          Tap on an item to learn more about it.
        </Toolbar>
      )}
    </>
  );

  const getContent = () => {
    if (displayData) {
      const pageControls = getPageControls(currentPage);
      return (
        <>
          {pageOrder.length > 1 && (
            <>
              <ArrowBackIos
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0.5rem',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const currentPageIndex = pageOrder.indexOf(currentPage);
                  if (currentPageIndex === 0) {
                    setCurrentPage(pageOrder[pageOrder.length - 1]);
                  } else {
                    setCurrentPage(pageOrder[currentPageIndex - 1]);
                  }
                }}
              />
              <ArrowForwardIos
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '0.5rem',
                  cursor: 'pointer',
                }}
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
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {header}
        {getContent()}
        {loading && <CircularProgress />}
        {error && <p>Could not load the requested map!</p>}
      </header>
    </div>
  );
};

Editor.propTypes = {
  isEditor: PropTypes.bool,
};

Editor.defaultProps = {
  isEditor: true,
};

export default Editor;
