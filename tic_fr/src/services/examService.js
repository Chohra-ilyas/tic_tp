import api from "./api";

export const examService = {
  getAll: async () => {
    const response = await api.get("/exams");
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/exams", data);
    return response.data;
  },
};
