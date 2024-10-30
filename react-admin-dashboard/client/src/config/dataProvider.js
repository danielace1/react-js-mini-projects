import axios from "axios";

const apiUrl = "http://localhost:3000";

const httpClient = (url, options = {}) => {
  options.headers = new Headers({
    Accept: "application/json",
    ...options.headers,
  });
  return axios(url, options).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText);
    }
    return response;
  });
};

const dataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const response = await fetch(
      `http://localhost:3000/${resource}?page=${page}&limit=${perPage}`
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    // Ensure the total is extracted correctly
    const totalHeader = response.headers.get("content-range");
    const total = totalHeader
      ? parseInt(totalHeader.split("/").pop(), 10)
      : data.length;

    return { data: data.data, total };
  },

  getOne: (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    return httpClient(url).then((response) => ({
      data: response.data,
    }));
  },

  create: (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    return httpClient(url, {
      method: "POST",
      data: params.data,
    }).then((response) => ({
      data: { id: response.data.id, ...params.data },
    }));
  },

  update: (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    return httpClient(url, {
      method: "PUT",
      data: params.data,
    }).then((response) => ({
      data: { id: response.data.id, ...params.data },
    }));
  },

  delete: (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    return httpClient(url, {
      method: "DELETE",
    }).then(() => ({ data: { id: params.id } }));
  },
};

export default dataProvider;
