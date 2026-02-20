const createHeaders = (token, isMultipart = false) => {
  const headers = new Headers();

  if (token) headers.set('Authorization', `Bearer ${token}`);
  headers.set('Accept', 'application/json');

  if (!isMultipart) headers.set('Content-Type', 'application/json');

  return headers;
};

const handleMultipart = (fileList = [], object = {}) => {
  const formData = new FormData();
  Object.entries(object).forEach(([key, value]) => formData.append(key, value));
  fileList.forEach((file) => formData.append('files', file));
  return formData;
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location;
    if (hostname.includes('localhost')) return `${protocol}//${hostname}:8080/api/`;
    return 'https://prod/api/'; // Change to match real prod domain
  }
  return '';
};

export { createHeaders, handleMultipart, getBaseUrl };
