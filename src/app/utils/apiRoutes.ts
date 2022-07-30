const SERVER_URL = `http://localhost:8080`;
const API_BASE_URL = `${SERVER_URL}/api/v0`;

const API_SUBENDPOINTS = {
  itemCategory: `${API_BASE_URL}/item-category`,
  itemSubcategory: `${API_BASE_URL}/item-subcategory`,
  report: `${API_BASE_URL}/report`,
};

export const API_ENDPOINTS = {
  itemCategory: {
    create: `${API_SUBENDPOINTS.itemCategory}`,
    update: `${API_SUBENDPOINTS.itemCategory}`,
    search: `${API_SUBENDPOINTS.itemCategory}`,
    delete: (id: number) => `${API_SUBENDPOINTS.itemCategory}/${id}`,
  },
  itemSubcategory: {
    create: `${API_SUBENDPOINTS.itemSubcategory}`,
    update: `${API_SUBENDPOINTS.itemSubcategory}`,
    search: `${API_SUBENDPOINTS.itemSubcategory}`,
    getByName: `${API_SUBENDPOINTS.itemSubcategory}/get`,
    delete: (id: number) => `${API_SUBENDPOINTS.itemSubcategory}/${id}`,
  },
  report: {
    create: `${API_SUBENDPOINTS.report}`,
    update: `${API_SUBENDPOINTS.report}`,
    search: `${API_SUBENDPOINTS.report}`,
    searchSize: `${API_SUBENDPOINTS.report}/search-size`,
    getById: (id: number) => `${API_SUBENDPOINTS.report}/${id}`,
    getLast: `${API_SUBENDPOINTS.report}/get-last`,
    delete: (id: number) => `${API_SUBENDPOINTS.report}/${id}`,
  },
};
