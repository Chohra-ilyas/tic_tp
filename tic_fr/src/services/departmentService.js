import api from "./api";

export const departmentService = {
  getAll: async () => {
    const response = await api.get("/departments");
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/departments", data);
    return response.data;
  },
};
