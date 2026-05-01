import api from "./api";

export const saleService = {
  getAll: async () => {
    const response = await api.get("/sales");
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/sales", data);
    return response.data;
  },
};
