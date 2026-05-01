import api from "./api";

export const teacherService = {
  getAll: async () => {
    const response = await api.get("/teachers");
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/teachers", data);
    return response.data;
  },
};
