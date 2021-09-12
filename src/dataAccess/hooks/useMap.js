import useObject from './useObject';

/** Read/write controls for a single map. */
const useMap = mapId => {
  const {
    data: mapData,
    updateData,
    getProperty,
    error,
    loading,
  } = useObject(`maps/${mapId}`);

  const [mapName, setMapName] = getProperty('Untitled Map', 'name');
  const [pageOrder, setPageOrder, updatePageOrder] = getProperty(
    [],
    'pages.order'
  );
  const [pageData, setPageData] = getProperty({}, 'pages.data');

  const getPageControls = pageId => {
    const pagePath = `pages.data.${pageId}`;
    const [pageData, setPageData] = getProperty({}, pagePath);
    const [imageId, setImageId] = getProperty('', `${pagePath}.imageId`);
    const [pageName, setPageName] = getProperty('', `${pagePath}.name`);
    const [pins, setPins] = getProperty({}, `${pagePath}.pins`);

    return {
      pageData,
      setPageData,
      imageId,
      setImageId,
      pageName,
      setPageName,
      pins,
      setPins,
    };
  };

  return {
    mapData,
    updateMap: updateData,
    mapName,
    setMapName,
    pageOrder,
    pageData,
    setPageData,
    setPageOrder,
    updatePageOrder,
    getPageControls,
    error,
    loading,
  };
};

export default useMap;
