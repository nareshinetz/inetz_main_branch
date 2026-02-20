import Http from './http-client';

export const useApi = () => {
  const http = Http();

  return {
    getUser: (params = {}) => http.get('user/get', params),
    createUser: (body = {}) => http.post('user/create', body),
  };
};
