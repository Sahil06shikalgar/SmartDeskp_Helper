// Change this to your backend server URL
export const BASE_URL = "http://localhost:8000/api";

export const API_PATHS = {
  AUTH: {
    REGISTER: `${BASE_URL}/auth/register`,
    LOGIN: `${BASE_URL}/auth/login`,    
  
  },
  TICKETS: {
    CREATE: `${BASE_URL}/tickets`,
    GET_ALL: `${BASE_URL}/tickets`,
    GET_ONE: (id) => `${BASE_URL}/tickets/${id}`,
    UPDATE: (id) => `${BASE_URL}/tickets/${id}`,
    DELETE: (id) => `${BASE_URL}/tickets/${id}`,
  },
  KB: {
    CREATE: `${BASE_URL}/kb`,
    GET_ALL: `${BASE_URL}/kb`,
    GET_ONE: (id) => `${BASE_URL}/kb/${id}`,
    UPDATE: (id) => `${BASE_URL}/kb/${id}`,
    DELETE: (id) => `${BASE_URL}/kb/${id}`,
  },
  CONFIG: {
    GET: `${BASE_URL}/config`,
    UPDATE: `${BASE_URL}/config`,
  },
  AGENT_SUGGESTION: {
    GET: `${BASE_URL}/agent-suggestions`,
    CREATE: `${BASE_URL}/agent-suggestions`,
  },
};

export default API_PATHS;
