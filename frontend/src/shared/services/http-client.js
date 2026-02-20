import { createHeaders, handleMultipart, getBaseUrl } from './http-helper';

const Http = () => {
  const baseUrl = getBaseUrl();

  const request = async (url, options = {}, queryParams = {}, isMultipart = false) => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const headers = createHeaders(token, isMultipart);

      const query = new URLSearchParams(queryParams).toString();
      const fullUrl = `${baseUrl}${url}${query ? `?${query}` : ''}`;

      const response = await fetch(fullUrl, { ...options, headers });

      if (!response.ok) {
        if (response.status === 401) localStorage.clear();
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw error;
      }

      return await response.json();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const get = (url, queryParams = {}, options = {}) =>
    request(url, { method: 'GET', ...options }, queryParams);

  const post = (url, body = {}, options = {}) => {
    const { isMultipart = false, fileList = [], ...rest } = options;
    const payload = isMultipart
      ? handleMultipart(fileList, body)
      : JSON.stringify(body);
    return request(url, { method: 'POST', body: payload, ...rest }, {}, isMultipart);
  };

  const put = (url, body = {}, options = {}) =>
    request(url, { method: 'PUT', body: JSON.stringify(body), ...options });

  const del = (url, body = {}, options = {}) =>
    request(url, { method: 'DELETE', body: JSON.stringify(body), ...options });

  return { get, post, put, del };
};

export default Http;
