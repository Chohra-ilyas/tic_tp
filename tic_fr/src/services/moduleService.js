import api from "./api";

export const moduleService = {
  getAll: async () => {
    const response = await api.get("/modules");
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/modules", data);
    return response.data;
  },
};
