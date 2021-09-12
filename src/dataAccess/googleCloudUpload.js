import mapServer, { mapsUrl } from './mapServer';

export const uploadFile = files => {
  const file = files?.[0];
  const formData = new FormData();
  formData.append('file', file);

  return mapServer
    .post(`image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      return res.data;
    });
};

export const getImageUrl = fileId => {
  return `${mapsUrl}image/${fileId}`;
};
