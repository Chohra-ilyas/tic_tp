import api from "./api";

export const studentService = {
  getAll: async () => {
    const response = await api.get("/students");
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/students", data);
    return response.data;
  },
};
