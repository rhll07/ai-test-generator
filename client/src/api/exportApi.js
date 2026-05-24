import { axiosClient } from './axiosClient.js';

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const downloadExport = async ({ projectId, format, filename }) => {
  const { data } = await axiosClient.get(`/export/${format}/${projectId}`, {
    responseType: 'blob'
  });
  downloadBlob(data, filename);
};
