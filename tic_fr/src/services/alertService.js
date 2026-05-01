import api from "./api";

export const alertService = {
  getAll: async () => {
    const response = await api.get("/alerts");
    return response.data;
  },

  getByStudentEmail: async (email) => {
    const response = await api.get("/alerts", {
      params: { studentEmail: email },
    });
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/alerts", data);
    return response.data;
  },
};
