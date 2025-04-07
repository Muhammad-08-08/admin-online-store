import api from "./Api";

const MijozlarApi = {
  getAll: (params: { order: string }) => {
    return api.get("/api/users", {
      params: params,
    });
  },
  delete: (id: { id: number }) => {
    return api.delete(`/api/users/${id}`);
  },
  post: () => {
    return api.post("/api/banners");
  },
  patch: (id: { id: number }) => {
    return api.patch(`/api/banners${id}`);
  },
};
export default MijozlarApi;
